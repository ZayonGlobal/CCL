import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import handler from '../api/channel-signup.ts';
process.env.VITE_SUPABASE_URL='https://test.supabase.co';
process.env.VITE_SUPABASE_PUBLISHABLE_KEY='test-public-key';
const input={name:'Test <Creator>',email:'test@example.com',phone:'+2348061688292',welcomeRequested:true};
async function call(body,method='POST'){let result;const res={statusCode:0,setHeader(){},end(s){result={status:this.statusCode,...JSON.parse(s)};}};await handler({method,headers:{'content-type':'application/json',origin:'https://ccl-delta.vercel.app'},body},res);return result;}
const originalFetch=globalThis.fetch,originalTransport=nodemailer.createTransport;
try{
 globalThis.fetch=()=>{throw Error('Should not request');};
 assert.equal((await call({...input,welcomeRequested:false})).status,400);
 assert.equal((await call({...input,email:'invalid'})).status,400);
 assert.equal((await call({...input,website:'bot'})).status,400);
 assert.equal((await call(input,'GET')).status,405);
 delete process.env.SMTP_PASSWORD;
 let saves=0,sends=0,closed=0,fail=false;
 globalThis.fetch=async()=>{saves++;return new Response(JSON.stringify('saved-id'),{status:200});};
 const saved=await call(input);assert.equal(saved.saved,true);assert.equal(saved.emailSent,false);assert.match(saved.emailError,/not configured/);
 Object.assign(process.env,{SMTP_HOST:'smtp-relay.brevo.com',SMTP_PORT:'587',SMTP_USER:'test-login',SMTP_PASSWORD:'test-key'});
 nodemailer.createTransport=options=>{assert.equal(options.requireTLS,true);return{sendMail:async message=>{sends++;assert.ok(saves>0);assert.ok(message.html.includes('Test &lt;Creator&gt;'));assert.equal(message.replyTo.address,'cclabsupport@gmail.com');if(fail)throw Object.assign(new Error('Simulated rejection'),{code:'EAUTH'});return{accepted:['test@example.com']};},close:()=>closed++};};
 const emailed=await call(input);assert.equal(emailed.emailSent,true);assert.equal(sends,1);assert.equal(closed,1);
 fail=true;const rejected=await call(input);assert.equal(rejected.emailSent,false);assert.match(rejected.emailError,/authentication failed/);assert.equal(closed,2);
 globalThis.fetch=async()=>new Response('{}',{status:400});
 const sendCount=sends;assert.equal((await call(input)).saved,undefined);assert.equal(sends,sendCount);
 console.log('PASS: validation, missing credentials, save-before-send, secure SMTP, HTML escaping, rejected sends, and save failures. No emails sent.');
}finally{globalThis.fetch=originalFetch;nodemailer.createTransport=originalTransport;}
