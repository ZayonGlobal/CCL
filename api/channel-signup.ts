import type { IncomingMessage, ServerResponse } from 'node:http';
import process from 'node:process';

const channel = 'https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i';
export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  const reply = (status: number, body: object) => { res.statusCode = status; res.setHeader('Content-Type','application/json'); res.setHeader('Cache-Control','no-store'); res.end(JSON.stringify(body)); };
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return reply(405,{error:'Use POST.'}); }
  if (!String(req.headers['content-type'] || '').includes('application/json')) return reply(415,{error:'Use JSON.'});
  const origin = req.headers.origin;
  if (origin && !['https://ccl-delta.vercel.app', `https://${process.env.VERCEL_URL}`, 'http://localhost:3000'].includes(origin)) return reply(403,{error:'Please submit through the CCL website.'});
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const name = String(body.name || '').trim(); const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();
    if (body.website) return reply(400,{error:'Unable to submit this form.'});
    if (!name || name.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 30 || (phone && !/^[+\d\s()-]{7,30}$/.test(phone)) || (body.welcomeRequested !== true && body.consent !== true)) return reply(400,{error:'Enter your name and a valid email, and submit to request the welcome email.'});
    const url = process.env.VITE_SUPABASE_URL; const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return reply(503,{error:'Signup is temporarily unavailable. Please try again.'});
    const saved = await fetch(`${url}/rest/v1/rpc/ccl_submit_inquiry`, {method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({p_name:name,p_email:email,p_subject:'WhatsApp channel signup',p_message:JSON.stringify({phone,consent:body.welcomeRequested === true ? 'Welcome email requested by submitting the channel signup form' : 'CCL welcome email and WhatsApp channel link',source:'channel-popup',submittedAt:new Date().toISOString()})}),signal:AbortSignal.timeout(10000)});
    if (!saved.ok) return reply(saved.status===400 || saved.status===429 ? 429 : 503,{error:'Could not save your signup. If you recently submitted, please wait before trying again.'});
    let emailSent = false;
    let emailError = 'Your details are saved, but welcome email sending is not configured.';
    const brevoApiKey = process.env.BREVO_API_KEY || process.env.Brevo_API_Key;
    if (brevoApiKey) {
      const escape = (s:string) => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
      try {
        const sent = await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':brevoApiKey,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:'Christian Creator Lab',email:process.env.BREVO_SENDER_EMAIL || 'zayoncreatives@gmail.com'},replyTo:{name:'CCL Support',email:'cclabsupport@gmail.com'},to:[{name,email}],subject:'Welcome to Christian Creator Lab — join our WhatsApp channel',htmlContent:`<html><body style="margin:0;background:#f4f4f2;padding:32px 16px;font-family:Arial,sans-serif;color:#171717"><div style="max-width:520px;margin:auto;background:white;padding:32px;border-radius:16px"><img src="https://ccl-delta.vercel.app/brand/ccl-logo.png" width="220" alt="Christian Creator Lab" style="max-width:100%;height:auto"><h1 style="font-size:26px;margin-top:28px">Welcome to CCL, ${escape(name)}.</h1><p style="line-height:1.7">Thank you for connecting with Christian Creator Lab. Join our free WhatsApp channel for practical AI tips, creative learning resources, and CCL updates.</p><p style="margin:28px 0"><a href="${channel}" style="background:#111;color:white;padding:15px 22px;border-radius:30px;text-decoration:none;display:inline-block">Join the WhatsApp channel</a></p><p style="font-size:13px;line-height:1.7">Need help? Email <a href="mailto:cclabsupport@gmail.com">cclabsupport@gmail.com</a> or call +234 806 168 8292.</p><p style="font-size:12px;color:#737373">You received this one-time welcome email because this address was submitted on CCL. If this was not you, you can ignore it.</p></div></body></html>`}),signal:AbortSignal.timeout(10000)});
        emailSent=sent.ok;
        if (!sent.ok) {
          const details = await sent.json().catch(()=>({}));
          const code = typeof details.code === 'string' && /^[a-z_]{1,50}$/i.test(details.code) ? details.code : 'provider_error';
          const hint = sent.status === 401 ? 'Email service authentication failed.' : sent.status === 403 ? 'Email service access was denied.' : sent.status === 429 ? 'The email service sending limit was reached.' : 'The email service rejected the welcome email.';
          emailError = `Your details are saved. ${hint} Please contact CCL support (mail ${sent.status}/${code}).`;
          console.error('CCL welcome email provider rejected request',sent.status,code);
        }
      } catch { emailError = 'Your details are saved, but the email service could not be reached. Please contact CCL support.'; console.error('CCL welcome email provider unavailable'); }
    }
    return reply(200,{saved:true,emailSent,...(!emailSent ? {emailError} : {}),channel});
  } catch { console.error('CCL channel signup failed'); return reply(503,{error:'Signup is temporarily unavailable. Please try again.'}); }
}
