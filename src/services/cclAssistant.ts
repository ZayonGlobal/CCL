/**
 * CCL Learning Assistant — a local, rule-based help engine.
 *
 * It runs entirely in the browser and only points members to pages that exist.
 * Do not call an AI provider from here with a key in a VITE_ variable: anything in
 * the frontend bundle is public. If a model-backed assistant is added later, call it
 * through a server endpoint (e.g. /api/assistant) that keeps the key server-side.
 */

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    view: string;
    paramId?: string;
  };
}

type Reply = { text: string; action?: { label: string; view: string; paramId?: string } };

const includesAny = (text: string, words: string[]) => words.some((w) => text.includes(w));

export async function askCclAssistant(prompt: string, _history: AssistantMessage[] = []): Promise<Reply> {
  const lower = prompt.toLowerCase();

  if (includesAny(lower, ['scripture', 'bible', 'verse', 'theolog', 'sermon'])) {
    return {
      text: 'AI can help you draft and organise, but it can also misquote or invent Bible verses. Always check every verse against your Bible, name the translation you are quoting (for example ESV or NIV), and let your pastor or ministry leader review anything doctrinal before it is published.',
      action: { label: 'Read the FAQ & Scripture policy', view: 'public_faq' },
    };
  }

  if (includesAny(lower, ['prompt', 'instruction', 'brief'])) {
    return {
      text: 'A clear prompt usually covers five things: who the AI should act as, who the audience is, the exact task, what to avoid, and the format you want back. Try the free prompt builder in Guides & Tools, then review the result and edit it in your own voice.',
      action: { label: 'Open guides & tools', view: 'public_resources' },
    };
  }

  if (includesAny(lower, ['church', 'media', 'team', 'volunteer', 'pastor', 'announcement', 'flyer'])) {
    return {
      text: 'For church communication, start small: announcements, event invitations, flyer ideas and social captions. Keep a person responsible for checking facts, Scripture and permissions before anything goes out. If you lead a media team, tell us what your volunteers need.',
      action: { label: 'Team learning for churches', view: 'public_churches' },
    };
  }

  if (includesAny(lower, ['course', 'lesson', 'learn', 'start', 'beginner', 'lab'])) {
    return {
      text: 'AI Foundations is the open lab: understanding what AI can and cannot do, writing clearer prompts, and checking what it produces. The specialist labs (design, video, content, web, automation, ministry, business and more) are coming soon.',
      action: { label: 'Go to Learn', view: 'learn' },
    };
  }

  if (includesAny(lower, ['challenge', 'project', 'portfolio'])) {
    return {
      text: 'Challenges and projects are where you practise on real work. When a challenge is open it appears on the Challenges page; you can also start your own project from a caption, announcement, design idea or business problem.',
      action: { label: 'Open challenges', view: 'challenges' },
    };
  }

  if (includesAny(lower, ['business', 'freelanc', 'client', 'price', 'pricing'])) {
    return {
      text: 'AI can speed up drafting creative briefs, product descriptions, proposals and customer messages. A useful habit: price around the result you deliver to the client rather than the hours it took, and always check the work yourself before sending it.',
      action: { label: 'Ask the community', view: 'community' },
    };
  }

  if (includesAny(lower, ['privacy', 'permission', 'copyright', 'safe', 'responsib'])) {
    return {
      text: 'Do not paste private or sensitive information about church members or clients into AI tools, get permission before using someone’s photo or words, and keep human judgment in every decision that matters.',
      action: { label: 'Read the FAQ', view: 'public_faq' },
    };
  }

  return {
    text: 'I can point you to the right place in Christian Creator Lab: the AI Foundations lab, the prompt builder and guides, the member community, or team learning for churches. What are you working on?',
    action: { label: 'Go to Learn', view: 'learn' },
  };
}
