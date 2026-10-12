import nodemailer from 'nodemailer';
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
    let emailError = 'Your details are saved, but welcome email sending is not configured. Please contact CCL support.';
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const port = Number(process.env.SMTP_PORT || '587');
    if (host && user && pass && Number.isInteger(port) && port > 0 && port <= 65535) {
      const escape = (s:string) => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
      const transport = nodemailer.createTransport({
        host, port, secure: port === 465, requireTLS: port !== 465,
        auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
      });
      try {
        const sent = await transport.sendMail({
          from: {name: process.env.SMTP_FROM_NAME || 'Christian Creator Lab', address: process.env.SMTP_FROM_EMAIL || 'zayoncreatives@gmail.com'},
          replyTo: {name:'CCL Support',address:'cclabsupport@gmail.com'},
          to: [{name,address:email}],
          subject:'Welcome to Christian Creator Lab — join our WhatsApp channel',
          text: `Welcome to CCL, ${name}. Join our free WhatsApp channel for practical AI tips, creative resources, and CCL updates: ${channel}\nYour free AI Bible, along with loads of other helpful AI and creative resources, is available in the WhatsApp channel.\nNeed help? cclabsupport@gmail.com or +234 806 168 8292.`,
          html: `<html><body style="margin:0;background:#f4f4f2;padding:32px 16px;font-family:Arial,sans-serif;color:#171717"><div style="max-width:520px;margin:auto;background:white;padding:32px;border-radius:16px"><img src="https://ccl-delta.vercel.app/brand/ccl-logo.png" width="140" alt="Christian Creator Lab" style="display:block;width:140px;max-width:100%;height:auto"><h1 style="font-size:26px;margin-top:28px">Welcome to CCL, ${escape(name)}.</h1><p style="line-height:1.7">Thank you for connecting with Christian Creator Lab. Join our free WhatsApp channel for practical AI tips, creative learning resources, and CCL updates.</p><p style="line-height:1.7">Your free AI Bible, along with loads of other helpful AI and creative resources, is available in the WhatsApp channel. Join using the button below to get your copy.</p><p style="margin:28px 0"><a href="${channel}" style="background:#111;color:white;padding:15px 22px;border-radius:30px;text-decoration:none;display:inline-block">Join the WhatsApp channel</a></p><p style="font-size:13px;line-height:1.7">Need help? Email <a href="mailto:cclabsupport@gmail.com">cclabsupport@gmail.com</a> or call +234 806 168 8292.</p><p style="font-size:12px;color:#737373">You received this one-time welcome email because this address was submitted on CCL. If this was not you, you can ignore it.</p></div></body></html>`,
        });
        emailSent = sent.accepted.some((address: unknown) => typeof address === 'string' && address.toLowerCase() === email);
        if (!emailSent) emailError = 'Your details are saved, but the email service did not accept the welcome email. Please contact CCL support.';
      } catch (error) {
        const code = String((error as {code?: string}).code || '');
        emailError = code === 'EAUTH'
          ? 'Your details are saved. Email service authentication failed. Please contact CCL support.'
          : 'Your details are saved, but the welcome email could not be sent. Please contact CCL support.';
        console.error('CCL welcome SMTP failed', ['EAUTH','ECONNECTION','ETIMEDOUT','EENVELOPE','EMESSAGE'].includes(code) ? code : 'SMTP_ERROR');
      } finally { transport.close(); }
    }
    return reply(200,{saved:true,emailSent,...(!emailSent ? {emailError} : {}),channel});
  } catch { console.error('CCL channel signup failed'); return reply(503,{error:'Signup is temporarily unavailable. Please try again.'}); }
}
