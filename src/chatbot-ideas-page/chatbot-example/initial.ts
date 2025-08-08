import { ChatbotMessage } from 'ai-ui-components/Chatbot';

export const defaultChatbotMessages: Array<ChatbotMessage> = [
  {
    speaker: 'human',
    content: 'What do I need to apply to graduate school?',
  },
  {
    speaker: 'ai',
    content: `1. A Statement of Purpose, explaining what is your intent for going to graduate school and why you are qualified for this particular program.\n2. Two recommendation letters from academic or professional sources who can vouch for your work history.\n3. A resumé.\n4. (Optional) GRE test scores. Though the GRE is not as used as it had been a decade ago, it is still required for some schools and used as a differentiator by others.`,
  },
  {
    speaker: 'human',
    content:
      'I live in the New York City area. What colleges would you recommend I apply to? My budget for the tuition should be less than 50k.',
  },
  {
    speaker: 'ai',
    content: `1. New York public colleges, as Brooklyn Tech, Hunter College, City College and the Graduate Center.\n2. Pace University\n3. Stevens Institute (in New Jersey)\n4. Fordham University\n\nHere are online options:\n1. Georgia Tech\n2. UT Austin\n\nThese are the options that do not fit within your budget, but are in New York:\n1. New York University\n2. Columbia University`,
  },
  {
    speaker: 'human',
    content: 'What would be a good schedule for the application process?',
  },
  {
    speaker: 'ai',
    content:
      'August -\n1. Review / double-check the requirements for each college\n2. Begin drafting the SOP and Resume\n3. Identify sources for Recommendation Letters\n4. (Optional) Study for GRE\n\nSeptember -\n1. Take the GRE\n2. Review and polish SOP and resume\n3. Petition for recommendation letters\n\nFall (most application deadlines are in the fall or in the winter) -\n1. Apply',
  },
];
