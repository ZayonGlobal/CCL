import assert from 'node:assert/strict';
import handler from '../api/channel-signup.ts';
process.env.VITE_SUPABASE_URL='https://test.supabase.co';
process.env.VITE_SUPABASE_PUBLISHABLE_KEY='test-public-key';
const input={name:'Test <Creator>',email:'test@example.com',phone:'+2348061688292',consent:true};
async function call(body,method='POST') {let result; const res={statusCode:0,setHeader(){},end(s){result={status:this.statusCode,...JSON.parse(s)};}};await handler({method,headers:{'content-type':'application/json',origin:'https://ccl-delta.vercel.app'},body},res);return result;}
const original=globalThis.fetch;
try {
 globalThis.fetch=()=>{throw Error('Should not request');};
 assert.equal((await call({...input,consent:false})).status,400);
 assert.equal((await call({...input,email:'invalid'})).status,400);
 assert.equal((await call({...input,website:'bot'})).status,400);
 assert.equal((await call(input,'GET')).status,405);
 delete process.env.BREVO_API_KEY;
 let calls=[];
 globalThis.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return new Response(JSON.stringify('saved-id'),{status:200});};
 const saved=await call(input);assert.equal(saved.saved,true);assert.equal(saved.emailSent,false);assert.equal(calls.length,1);assert.equal(calls[0].body.p_subject,'WhatsApp channel signup');
 process.env.BREVO_API_KEY='test-only';calls=[];
 globalThis.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return new Response('{}',{status:200});};
 const emailed=await call(input);assert.equal(emailed.emailSent,true);assert.equal(calls.length,2);assert.ok(calls[1].body.htmlContent.includes('Test &lt;Creator&gt;'));assert.equal(calls[1].body.replyTo.email,'cclabsupport@gmail.com');
 calls=[];globalThis.fetch=async(url)=>{calls.push(url);return new Response('{}',{status:400});};
 assert.equal((await call(input)).saved,undefined);assert.equal(calls.length,1);
 console.log('PASS: validation, consent, bot trap, save-before-send, missing mail configuration, HTML escaping, save failure prevents mail. No emails sent.');
} finally {globalThis.fetch=original;}
