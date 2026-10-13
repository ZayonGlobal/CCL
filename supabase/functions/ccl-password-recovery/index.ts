const allowed = new Set(['https://ccl-delta.vercel.app','http://localhost:3000']);
Deno.serve(async (req: Request) => {
  const origin=req.headers.get('origin') || '';
  const headers={'Content-Type':'application/json','Cache-Control':'no-store', ...(allowed.has(origin)?{'Access-Control-Allow-Origin':origin,'Vary':'Origin','Access-Control-Allow-Headers':'authorization,apikey,content-type,x-client-info','Access-Control-Allow-Methods':'POST,OPTIONS'}:{})};
  const reply=(status:number,data:object)=>new Response(JSON.stringify(data),{status,headers});
  if (!allowed.has(origin)) return reply(403,{error:'Please use the CCL website.'});
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(req.method!=='POST')return reply(405,{error:'Use POST.'});
  if(!req.headers.get('content-type')?.includes('application/json'))return reply(415,{error:'Use JSON.'});
  try {
    const raw=await req.text(); if(raw.length>2048)return reply(413,{error:'Request too large.'});
    const email=String(JSON.parse(raw).email || '').trim().toLowerCase();
    if(email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return reply(400,{error:'Enter a valid email address.'});
    const url=Deno.env.get('SUPABASE_URL')!;
    const service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const anon=Deno.env.get('SUPABASE_ANON_KEY')!;
    const ip=req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('cf-connecting-ip') || 'unknown';
    const checked=await fetch(url+'/rest/v1/rpc/ccl_recovery_lookup',{method:'POST',headers:{apikey:service,Authorization:'Bearer '+service,'Content-Type':'application/json'},body:JSON.stringify({p_email:email,p_ip:ip}),signal:AbortSignal.timeout(10000)});
    if(!checked.ok){const detail=await checked.json().catch(()=>({}));return reply(String(detail.message).includes('recovery_rate_limit')?429:503,{error:String(detail.message).includes('recovery_rate_limit')?'Please wait a minute before trying again.':'Recovery is temporarily unavailable. Please try again.'});}
    if(await checked.json()!==true)return reply(404,{error:'No account exists with this email address. Please create an account.'});
    const sent=await fetch(url+'/auth/v1/recover?redirect_to='+encodeURIComponent('https://ccl-delta.vercel.app/?recovery=1'),{method:'POST',headers:{apikey:anon,'Content-Type':'application/json'},body:JSON.stringify({email}),signal:AbortSignal.timeout(10000)});
    if(!sent.ok)return reply(sent.status===429?429:503,{error:sent.status===429?'Please wait before requesting another recovery email.':'The recovery email could not be sent. Please try again.'});
    return reply(200,{sent:true});
  } catch {return reply(503,{error:'Recovery is temporarily unavailable. Please try again.'});}
});

