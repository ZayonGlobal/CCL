import { GoogleGenAI } from '@google/genai';

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

const SYSTEM_INSTRUCTION = `You are the CCL Assistant, an educational and technical AI assistant inside Christian Creator Lab (CCL).
Christian Creator Lab equips believers to use generative AI and digital tools for creative excellence, ministry communication, career advancement, and Kingdom impact.

CRITICAL RULES & BOUNDARIES:
1. Help users understand platform learning material, master AI prompting, select tools, understand lesson concepts, and refine creative workflows.
2. NEVER claim spiritual authority, divine inspiration, prophetic insight, or that God told you something.
3. NEVER replace pastoral counseling, spiritual direction, or prayer. If asked for personal spiritual direction or deep emotional crisis help, kindly direct them to their local church pastor or spiritual elders.
4. NEVER invent fake Bible verses or misattribute scriptures. When quoting Scripture, ALWAYS clearly specify the Bible translation used (e.g., ESV, CSB, NIV, NKJV).
5. Always present AI as a computational tool to be stewarded with excellence and moral responsibility, not as a replacement for human relationships or spiritual discernment.
6. Tone: Encouraging, intellectually sharp, respectful, precise, and practical.`;

export async function askCclAssistant(
  prompt: string,
  history: AssistantMessage[] = []
): Promise<{ text: string; action?: { label: string; view: string; paramId?: string } }> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
                 '';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents = [
        ...history.slice(-6).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: prompt }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here to help you navigate Christian Creator Lab courses, prompting workflows, and creative systems.";
      return { text: replyText };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local CCL assistant engine', err);
    }
  }

  // High quality context-aware fallback response engine
  const lower = prompt.toLowerCase();

  if (lower.includes('easter') || lower.includes('challenge')) {
    return {
      text: "For the Church Easter Campaign Challenge, our mentor team recommends focusing on authentic visual atmosphere rather than cliché golden rays. Use the 5-layer prompt framework to generate background textures (e.g., first-century Judean morning stone at dawn) and pair with clean, high-contrast typography. Be sure to cite your Scripture translation (e.g., 1 Corinthians 15:55-57 ESV).",
      action: {
        label: 'Open Easter Campaign Challenge',
        view: 'challenge_detail',
        paramId: 'ch_easter_campaign',
      },
    };
  }

  if (lower.includes('prompt') || lower.includes('recipe')) {
    return {
      text: "Effective prompt architecture in CCL follows our 5-Layer Framework: 1) Persona/Role, 2) Context & Audience, 3) Core Execution Task, 4) Explicit Negative Constraints, and 5) Output Schema. Check out our curated Prompt Library for verified prompts across design, sermons, and business proposals.",
      action: {
        label: 'Explore Prompt Library',
        view: 'prompts',
      },
    };
  }

  if (lower.includes('church') || lower.includes('media') || lower.includes('pastor') || lower.includes('sermon')) {
    return {
      text: "In our Ministry Lab, we emphasize that AI is an operational assistant—it can transcribe, summarize notes, and draft social slides in minutes, freeing up your media team for personal relationship and prayer. Remember: always have human eyes verify theology and scripture citations before publishing!",
      action: {
        label: 'View Church Media AI Course',
        view: 'course_detail',
        paramId: 'crs_church_media_teams',
      },
    };
  }

  if (lower.includes('freelanc') || lower.includes('client') || lower.includes('price') || lower.includes('business')) {
    return {
      text: "In the Business Lab ('Freelancing With AI'), Babatunde Williams teaches value-based project pricing instead of charging by the hour. When using AI tools to work 4x faster, billing by the hour penalizes your efficiency. Focus on the business outcome you deliver to your client.",
      action: {
        label: 'View Freelancing Course',
        view: 'course_detail',
        paramId: 'crs_freelancing_with_ai',
      },
    };
  }

  if (lower.includes('vibe') || lower.includes('code') || lower.includes('web') || lower.includes('app')) {
    return {
      text: "Vibe coding allows you to build custom church portals, event RSVP systems, and digital tools by directing AI code editors like Cursor and Claude. Start in our Web & Build Lab to see real end-to-end demonstrations.",
      action: {
        label: 'Explore Web & Build Lab',
        view: 'learn',
      },
    };
  }

  return {
    text: "Welcome to Christian Creator Lab. As your learning assistant, I can help you find relevant courses across our 10 Labs, refine your prompts for Midjourney and Gemini, or clarify technical concepts. What are you building or studying today?",
    action: {
      label: 'Browse Course Library',
      view: 'learn',
    },
  };
}
