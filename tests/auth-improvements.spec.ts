import { test as baseTest, expect, chromium } from '@playwright/test';

// A single-process Chromium runtime needs a fresh browser per test.
const test = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? baseTest.extend({
  page: async ({ launchOptions, baseURL }, use) => {
    const browser = await chromium.launch({ ...launchOptions, headless: true });
    const context = await browser.newContext({ baseURL });
    try { await use(await context.newPage()); } finally { await browser.close(); }
  },
}) : baseTest;

// Browser tests emulate the Supabase HTTP boundary; PostgreSQL/RLS is tested separately.
// A provisioned live project is still required for real Auth and SMTP checks.
const userId = '11111111-1111-4111-8111-111111111111';
const user = { id: userId, email: 'creator@example.com', aud: 'authenticated', role: 'authenticated',
  app_metadata: {}, user_metadata: { first_name: 'Real', last_name: 'Creator' }, identities: [{id:userId}], email_confirmed_at:new Date().toISOString(), created_at: new Date().toISOString() };
const profile = { user_id: userId, profile: { firstName: 'Real', lastName: 'Creator' }, onboarding_completed: true };
const course = { id: 'test-course', slug: 'test-course', title: 'Test Learning Course', shortDesc: 'A real saved enrollment',
  thumbnail: '/avatar.svg', labId: 'ai-foundations', labName: 'AI Foundations', level: 'Explorer', difficulty: 'Beginner',
  durationMinutes: 10, lessonCount: 1, membershipAccess: 'free', learningOutcomes: [], prerequisites: [], published: true,
  instructor: { name: 'Teacher', title: 'Instructor', avatar: '/avatar.svg', bio: '' },
  modules: [{ id: 'test-module', courseId: 'test-course', title: 'First steps', description: '', order: 1,
    lessons: [{ id: 'test-lesson', moduleId: 'test-module', courseId: 'test-course', title: 'First lesson', description: '',
      youtubeVideoId: 'kCc8FmEb1nY', durationMinutes: 10, transcript: '', notes: '', resources: [], order: 1 }] }], projectsOverview: '', faq: [] };

async function mockBackend(page: any, role = 'student') {
  const state: any = { profile: structuredClone(profile), enrollments: [], progress: [], bookmarks: [], records: [] };
  const exp = Math.floor(Date.now()/1000) + 3600;
  const accessToken = `${Buffer.from(JSON.stringify({alg:'HS256'})).toString('base64url')}.${Buffer.from(JSON.stringify({sub:userId,exp,role:'authenticated'})).toString('base64url')}.test`;
  const session = { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: exp, refresh_token: 'test-refresh-token', user };
  await page.route('https://ccl-test.supabase.co/**', async (route: any) => {
    const request = route.request(); const url = new URL(request.url()); const method = request.method();
    const body = request.postDataJSON(); let result: any = []; let status = 200;
    if (url.pathname.endsWith('/signup')) result = { user:{...user,email_confirmed_at:null}, session: null };
    else if (url.pathname.endsWith('/verify')) {if(body.token==='123456')result=session;else{status=403;result={code:'otp_expired',msg:'Invalid code'};}}
    else if (url.pathname.endsWith('/resend')) result={};
    else if (url.pathname.includes('/functions/v1/ccl-password-recovery')) {if(body.email==='missing@example.com'){status=404;result={error:'No account exists with this email address. Please create an account.'};}else result={sent:true};}
    else if (url.pathname.endsWith('/token')) {
      if (body.password === 'wrong-password') { status=400; result={code:'invalid_credentials',msg:'Invalid login credentials'}; }
      else result = session;
    } else if (url.pathname.endsWith('/user')) result = user;
    else if (url.pathname.endsWith('/logout')) result = {};
    else if (url.pathname.includes('/rest/v1/')) {
      const table = url.pathname.split('/').pop();
      const single = (request.headers()['accept'] || '').includes('object+json');
      if (table === 'ccl_catalog') result = [{kind:'course',id:course.id,payload:course,published:true}];
      else if (table === 'ccl_accounts') result = [{ user_id: userId, role, membership_tier: 'free' }];
      else if (table === 'ccl_profiles') {
        if (method==='PATCH') { state.profile={...state.profile,...body}; result=[]; }
        else result=[state.profile];
      } else if (table === 'ccl_enrollments') {
        if (method==='POST') { state.enrollments.push(body); result=[body]; }
        else result=state.enrollments;
      } else if (table === 'ccl_lesson_progress') {
        if (method==='POST') { state.progress=[body]; result=[body]; } else result=state.progress;
      } else if (table === 'ccl_bookmarks') result=state.bookmarks;
      else if (table === 'ccl_records') {
        if (method==='POST') { const record={...body,id:'22222222-2222-4222-8222-222222222222',created_at:new Date().toISOString(),payload:{...body.payload,creator:{id:userId,name:'Real Creator',avatar:'/avatar.svg',headline:''}}};state.records.push(record); result=[record]; }
        else result=state.records;
      }
      if (single && Array.isArray(result)) result=result[0] || null;
    }
    await route.fulfill({status,contentType:'application/json',body:JSON.stringify(result)});
  });
  return state;
}

test('public pages and auth controls render with readable dark surfaces',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('ccl_theme','dark');sessionStorage.setItem('ccl-channel-popup-dismissed','1');});
 await mockBackend(page);await page.goto('/');await page.setViewportSize({width:1440,height:1000});
 for(const name of ['Home','Courses','Community','Guides & Tools','Churches','About','Contact']){
  await page.locator('header').getByRole('button',{name,exact:true}).click();
  await expect(page.locator('main h1').first()).toBeVisible();
  expect(await page.locator('header').evaluate((e:any)=>getComputedStyle(e).backgroundColor)).toBe('rgb(23, 24, 30)');
  await page.screenshot({path:`/tmp/ccl-public-${name.replaceAll(' ','-')}-dark.png`,fullPage:true});
 }
 await page.getByRole('button',{name:'Join CCL →',exact:true}).click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toBeVisible();
 expect(await dialog.evaluate((e:any)=>getComputedStyle(e).backgroundColor)).toBe('rgb(23, 24, 30)');
 await page.screenshot({path:'/tmp/ccl-auth-dark.png',fullPage:true});
});



async function openAuth(page:any, mode:'register'|'login'='register') {
 await page.goto('/');
 await page.getByRole('button',{name:'Join CCL →',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Create your CCL account'});
 if(mode==='login')await dialog.getByRole('button',{name:'Sign in',exact:true}).click();
 return page.getByRole('dialog');
}
test('signup requires matching passwords and remains on code verification until a valid code',async({page})=>{
 await mockBackend(page);const dialog=await openAuth(page);
 await dialog.getByLabel('First name',{exact:true}).fill('Real');
 await dialog.getByLabel('Last name',{exact:true}).fill('Creator');
 await dialog.getByLabel('Email address',{exact:true}).fill('creator@example.com');
 await dialog.getByLabel('Password',{exact:true}).fill('long-enough-password');
 await dialog.getByLabel('Confirm password',{exact:true}).fill('different-password');
 await dialog.getByRole('button',{name:'Show password',exact:true}).click();
 await expect(dialog.getByLabel('Password',{exact:true})).toHaveAttribute('type','text');
 await dialog.getByRole('button',{name:'Create free account',exact:true}).click();
 await expect(dialog.getByRole('alert')).toHaveText('Your passwords do not match.');
 await dialog.getByLabel('Confirm password',{exact:true}).fill('long-enough-password');
 await dialog.getByRole('button',{name:'Create free account',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Verify your email'})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('heading',{name:'Verify your email'})).toBeVisible();
 await page.getByLabel('Email verification code').fill('999999');
 await page.getByRole('button',{name:'Verify email and continue'}).click();
 await expect(page.getByRole('alert')).toContainText('invalid or has expired');
 await page.getByLabel('Email verification code').fill('123456');
 await page.getByRole('button',{name:'Verify email and continue'}).click();
 await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toBeVisible();
 await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('password recovery reports missing accounts and confirms accepted recovery requests',async({page})=>{
 await mockBackend(page);const dialog=await openAuth(page,'login');
 await dialog.getByRole('button',{name:'Forgot your password?'}).click();
 await dialog.getByLabel('Email address',{exact:true}).fill('missing@example.com');
 await dialog.getByRole('button',{name:'Send recovery link'}).click();
 await expect(dialog.getByRole('alert')).toContainText('No account exists');
 await dialog.getByLabel('Email address',{exact:true}).fill('creator@example.com');
 await dialog.getByRole('button',{name:'Send recovery link'}).click();
 await expect(dialog.getByRole('status')).toContainText('recovery link has been sent');
});
for(const [role,heading] of [
 ['student','Welcome, Real.'],['administrator','CCL management'],['super_admin','CCL management'],
 ['instructor','Instructor Studio'],['mentor','Guide with purpose, Real.'],['organization_admin','Organization workspace']
]){
 test(`${role} lands on its workspace and renders in dark mode on mobile`,async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('ccl_theme','dark'));
  await page.setViewportSize({width:390,height:844});await mockBackend(page,role);
  const dialog=await openAuth(page,'login');
  await dialog.getByLabel('Email address',{exact:true}).fill('creator@example.com');
  await dialog.getByLabel('Password',{exact:true}).fill('long-enough-password');
  await dialog.getByRole('button',{name:'Show password',exact:true}).click();
  await expect(dialog.getByLabel('Password',{exact:true})).toHaveAttribute('type','text');
  await dialog.getByRole('button',{name:'Sign in',exact:true}).click();
  await expect(page.getByRole('heading',{name:heading,exact:true})).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  await page.screenshot({path:`/tmp/ccl-${role}-dark-mobile.png`,fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:`/tmp/ccl-${role}-dark-desktop.png`,fullPage:true});
  if(role==='administrator'){await page.getByRole('tab',{name:'Members & access'}).click();await expect(page.getByRole('textbox',{name:'Search members'})).toBeVisible();}
 });
}


test('free guides build and copy a useful prompt without an account', async({page}) => {
 await mockBackend(page); await page.goto('/');
 await page.locator('header').getByRole('button',{name:'Guides & Tools',exact:true}).click();
 await page.getByLabel('What do you want to create?').fill('Plan an outreach invitation');
 await page.getByLabel('Who is it for?').fill('First-time visitors');
 await page.getByLabel('Details the tool needs').fill('Saturday at 4pm, main church hall');
 await expect(page.locator('pre')).toContainText('Saturday at 4pm, main church hall');
 await expect(page.getByRole('dialog')).toHaveCount(0);
 await page.evaluate(() => Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{(window as any).copiedPrompt=text;}}}));
 await page.getByRole('button',{name:'Copy prompt',exact:true}).click();
 await expect(page.getByRole('status').filter({hasText:'Prompt copied.'})).toBeVisible();
 expect(await page.evaluate(()=>(window as any).copiedPrompt)).toContain('First-time visitors');
 await page.locator('header').getByRole('button',{name:'Community',exact:true}).click();
 await page.getByRole('button',{name:'Open the member community'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
});
