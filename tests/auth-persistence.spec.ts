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
  app_metadata: {}, user_metadata: { first_name: 'Real', last_name: 'Creator' }, identities: [], created_at: new Date().toISOString() };
const profile = { user_id: userId, profile: { firstName: 'Real', lastName: 'Creator' }, onboarding_completed: true };
const course = { id: 'test-course', slug: 'test-course', title: 'Test Learning Course', shortDesc: 'A real saved enrollment',
  thumbnail: '/avatar.svg', labId: 'ai-foundations', labName: 'AI Foundations', level: 'Explorer', difficulty: 'Beginner',
  durationMinutes: 10, lessonCount: 1, membershipAccess: 'free', learningOutcomes: [], prerequisites: [], published: true,
  instructor: { name: 'Teacher', title: 'Instructor', avatar: '/avatar.svg', bio: '' },
  modules: [{ id: 'test-module', courseId: 'test-course', title: 'First steps', description: '', order: 1,
    lessons: [{ id: 'test-lesson', moduleId: 'test-module', courseId: 'test-course', title: 'First lesson', description: '',
      youtubeVideoId: 'kCc8FmEb1nY', durationMinutes: 10, transcript: '', notes: '', resources: [], order: 1 }] }], projectsOverview: '', faq: [] };

async function mockBackend(page: any) {
  const state: any = { profile: structuredClone(profile), enrollments: [], progress: [], bookmarks: [], records: [] };
  const exp = Math.floor(Date.now()/1000) + 3600;
  const accessToken = `${Buffer.from(JSON.stringify({alg:'HS256'})).toString('base64url')}.${Buffer.from(JSON.stringify({sub:userId,exp,role:'authenticated'})).toString('base64url')}.test`;
  const session = { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: exp, refresh_token: 'test-refresh-token', user };
  await page.route('https://ccl-test.supabase.co/**', async (route: any) => {
    const request = route.request(); const url = new URL(request.url()); const method = request.method();
    const body = request.postDataJSON(); let result: any = []; let status = 200;
    if (url.pathname.endsWith('/signup')) result = { user, session: null };
    else if (url.pathname.endsWith('/token')) {
      if (body.password === 'wrong-password') { status=400; result={code:'invalid_credentials',msg:'Invalid login credentials'}; }
      else result = session;
    } else if (url.pathname.endsWith('/user')) result = user;
    else if (url.pathname.endsWith('/logout')) result = {};
    else if (url.pathname.includes('/rest/v1/')) {
      const table = url.pathname.split('/').pop();
      const single = (request.headers()['accept'] || '').includes('object+json');
      if (table === 'ccl_catalog') result = [{kind:'course',id:course.id,payload:course,published:true}];
      else if (table === 'ccl_accounts') result = [{ user_id: userId, role: 'student', membership_tier: 'free' }];
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

async function signIn(page: any) {
  await page.getByRole('button', { name: 'Join CCL →', exact: true }).click();
  await page.getByRole('button', {name:'Already have an account? Sign in'}).click();
  await page.getByLabel('Email address', {exact:true}).fill('creator@example.com');
  await page.getByLabel('Password', {exact:true}).fill('a-valid-password');
  await page.getByRole('button',{name:'Sign in',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toBeVisible();
}

test('signup uses entered identity and shows email confirmation without a fake login',async ({page})=>{
  await mockBackend(page);
  await page.goto('/');
  await page.getByRole('button',{name:'Join CCL →',exact:true}).click();
  await page.getByLabel('First name',{exact:true}).fill('Actual');
  await page.getByLabel('Last name',{exact:true}).fill('Learner');
  await page.getByLabel('Email address',{exact:true}).fill('actual@example.com');
  await page.getByLabel('Password',{exact:true}).fill('long-enough-password');
  await page.getByLabel('Confirm password',{exact:true}).fill('long-enough-password');
  const sent = page.waitForRequest((r:any)=>new URL(r.url()).pathname === '/auth/v1/signup');
  await page.getByRole('button',{name:'Create free account',exact:true}).click();
  const request = await sent;
  expect(request.postDataJSON().data.first_name).toBe('Actual');
  expect(request.postDataJSON().data.role).toBeUndefined();
  await expect(page.getByRole('status')).toContainText('Check your email');
  await expect(page.getByRole('heading', { name: 'Account created successfully' })).toBeVisible();
  await expect(page.getByLabel('First name', { exact: true })).toHaveCount(0);
  await expect(page.getByLabel('Password', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Continue to sign in', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Welcome back', exact: true })).toBeVisible();
  await expect(page.getByLabel('Email address', { exact: true })).toHaveValue('actual@example.com');
  await expect(page.getByLabel('Password', { exact: true })).toHaveValue('');
  await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toHaveCount(0);
  await expect(page.getByText('Demo Experience Role')).toHaveCount(0);
});

test('password login rejects invalid credentials',async ({page})=>{
  await mockBackend(page); await page.goto('/');
  await page.getByRole('button',{name:'Join CCL →',exact:true}).click();
  await page.getByRole('button',{name:'Already have an account? Sign in'}).click();
  await page.getByLabel('Email address',{exact:true}).fill(user.email);
  await page.getByLabel('Password',{exact:true}).fill('wrong-password');
  await page.getByRole('button',{name:'Sign in',exact:true}).click();
  await expect(page.getByRole('alert')).toContainText('Invalid login credentials');
  await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toHaveCount(0);
});

test('contact preserves entered data on failure and confirms only an acknowledged save', async ({ page }) => {
  await mockBackend(page);
  let failing = true;
  let saved: any;
  await page.route('**/rest/v1/rpc/ccl_submit_inquiry', async route => {
    if (failing) await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ message: 'Database unavailable' }) });
    else {
      saved = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify('33333333-3333-4333-8333-333333333333') });
    }
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Contact Curriculum Team', exact: true }).click();
  await page.getByLabel('Full Name', { exact: true }).fill('Real Visitor');
  await page.getByLabel('Email Address', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Please tell me about joining CCL.');
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Database unavailable');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Please tell me about joining CCL.');
  await expect(page.getByRole('heading', { name: 'Message Saved Successfully' })).toHaveCount(0);
  failing = false;
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Message Saved Successfully' })).toBeVisible();
  expect(saved.p_email).toBe('visitor@example.com');
  expect(saved.p_message).toBe('Please tell me about joining CCL.');
});

test('saved enrollment and new project survive reload and signout clears identity',async ({page})=>{
  const state = await mockBackend(page); const errors:string[]=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.goto('/'); await signIn(page);
  await page.getByRole('button',{name:'Learn',exact:true}).first().click();
  await expect(page.getByText(course.title,{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Enroll Free',exact:true}).click();
  await page.getByRole('button',{name:'Learn',exact:true}).first().click();
  await expect(page.getByText('Enrolled',{exact:true})).toBeVisible();
  expect(state.enrollments).toHaveLength(1);
  await page.reload();
  await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toBeVisible();
  await expect(page.getByText(course.title,{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Projects',exact:true}).first().click();
  await page.getByRole('button',{name:'New Project',exact:true}).click();
  const dialog=page.locator('form').last();
  await dialog.locator('input').first().fill('Saved Creator Project');
  await dialog.locator('textarea').first().fill('My actual creative work');
  await dialog.getByRole('button',{name:'Add Project to Portfolio',exact:true}).click();
  await expect(page.getByText('Saved Creator Project',{exact:true})).toBeVisible();
  expect(state.records).toHaveLength(1);
  await page.reload(); await expect(page.getByRole('heading',{name:'Welcome, Real.'})).toBeVisible();
  await page.getByRole('button',{name:'Projects',exact:true}).first().click();
  await expect(page.getByText('Saved Creator Project',{exact:true})).toBeVisible();
  await page.getByRole('button').filter({has:page.locator('img[alt="Real"]')}).click();
  await page.getByRole('button',{name:'Sign Out',exact:true}).click();
  await expect(page.getByRole('button',{name:'Join CCL →',exact:true})).toBeVisible();
  await expect(page.getByText('Saved Creator Project',{exact:true})).toHaveCount(0);
  expect(errors).toEqual([]);
});
