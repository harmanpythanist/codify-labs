import {
  IconBrain, IconMessage, IconEye, IconGlobe, IconZap,
  IconBarChart, IconMonitor, IconSettings, IconPalette, IconWrench,
} from '../components/Icons';

// Each service becomes its own indexable page at /services/<slug>.
export const SERVICES = [
  {
    slug: 'ai-machine-learning',
    label: 'AI & Machine Learning',
    icon: IconBrain,
    tagline: 'Custom AI & Machine Learning',
    short: 'Custom AI models, predictive analytics, and intelligent automation tailored to your business.',
    desc: 'We design and train machine learning models around your actual data and business problem — not a generic off-the-shelf model. From predictive analytics to recommendation engines, we build systems that ship to production, not just notebooks.',
    capabilities: ['Predictive models & forecasting', 'Recommendation systems', 'Model training, evaluation & tuning', 'ML pipeline & deployment (API/desktop)'],
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
  },
  {
    slug: 'ai-chatbots-nlp',
    label: 'AI Chatbots & NLP',
    icon: IconMessage,
    tagline: 'AI Chatbots & NLP',
    short: 'Natural language processing, conversational AI, and smart chatbot development.',
    desc: 'Conversational AI that actually understands your customers — support chatbots, internal assistants, and NLP pipelines for text classification, summarization, and information extraction.',
    capabilities: ['Customer support chatbots', 'Internal knowledge assistants', 'Text classification & summarization', 'Integration with WhatsApp, web & apps'],
    stack: ['Python', 'LangChain-style pipelines', 'NLP libraries', 'REST APIs'],
  },
  {
    slug: 'computer-vision',
    label: 'Computer Vision',
    icon: IconEye,
    tagline: 'Computer Vision',
    short: 'Image recognition, object detection, and visual AI systems for real-world applications.',
    desc: 'Image and video-based AI systems for detection, classification, and automated visual inspection — built on modern object detection architectures.',
    capabilities: ['Object detection & classification', 'Automated visual inspection', 'Real-time video analysis', 'Custom dataset training'],
    stack: ['YOLOv8', 'OpenCV', 'CNNs', 'Python'],
  },
  {
    slug: 'website-development',
    label: 'Website Development',
    icon: IconGlobe,
    tagline: 'Website Development',
    short: 'Fast, modern, responsive websites and business web platforms built with clean code.',
    desc: 'Fast, modern, responsive websites and business web platforms — from marketing sites to client portals — built with clean, maintainable code.',
    capabilities: ['Business & marketing websites', 'Client/admin portals', 'Responsive, mobile-first UI', 'SEO-friendly structure'],
    stack: ['React', 'Next.js', 'JavaScript', 'Flask'],
  },
  {
    slug: 'web-ai-applications',
    label: 'Web & AI Applications',
    icon: IconZap,
    tagline: 'Web & AI Applications',
    short: 'Full-stack applications combining a modern front-end with an AI-powered backend.',
    desc: 'Full-stack applications that combine a modern web front-end with an AI-powered backend — dashboards, SaaS tools, and internal platforms.',
    capabilities: ['Full-stack SaaS & internal tools', 'AI-powered features inside web apps', 'API design & integration', 'Cloud-ready architecture'],
    stack: ['React', 'Python', 'Flask', 'REST APIs'],
  },
  {
    slug: 'data-analytics',
    label: 'Data Analytics',
    icon: IconBarChart,
    tagline: 'Data Analytics',
    short: 'Turn raw data into actionable insights with advanced analytics and visualization.',
    desc: 'We turn raw, messy data into clear, actionable insight — interactive dashboards, reports, and analysis that support real decisions.',
    capabilities: ['Data cleaning & processing', 'Interactive dashboards', 'Business intelligence reporting', 'Ad-hoc analysis & visualization'],
    stack: ['Pandas', 'NumPy', 'Plotly', 'Streamlit'],
  },
  {
    slug: 'custom-software',
    label: 'Custom Software',
    icon: IconMonitor,
    tagline: 'Custom Software',
    short: 'Desktop and cross-platform software built around your exact workflow.',
    desc: 'Desktop and cross-platform software built around your exact workflow, when off-the-shelf tools do not fit — from internal tools to client-facing products.',
    capabilities: ['Desktop & cross-platform apps', 'Internal business tools', 'System integration', 'Ongoing feature development'],
    stack: ['Python', 'React', 'SQL', 'REST APIs'],
  },
  {
    slug: 'business-automation',
    label: 'Business Automation',
    icon: IconSettings,
    tagline: 'Business Automation',
    short: 'Automate repetitive manual work and save hours every week.',
    desc: 'We identify repetitive, manual work in your business and automate it — saving hours every week and cutting down on human error.',
    capabilities: ['Workflow & process automation', 'Report & data automation', 'Third-party tool integration', 'Scheduled/triggered pipelines'],
    stack: ['Python', 'APIs', 'Scripting', 'Cloud functions'],
  },
  {
    slug: 'ui-ux-design',
    label: 'UI/UX Design',
    icon: IconPalette,
    tagline: 'UI/UX Design',
    short: 'Clean, purposeful interface design focused on clarity and usability.',
    desc: 'Clean, purposeful interface design for web and desktop products — focused on clarity and usability, not just visual polish.',
    capabilities: ['Product & web UI design', 'User flow & wireframing', 'Design systems', 'Usability-focused iteration'],
    stack: ['Figma', 'Design systems', 'Prototyping'],
  },
  {
    slug: 'maintenance-support',
    label: 'Maintenance & Support',
    icon: IconWrench,
    tagline: 'Maintenance & Support',
    short: 'Ongoing support, updates, and monitoring after launch.',
    desc: 'Ongoing support for software and AI systems we build — bug fixes, updates, monitoring, and small feature additions after launch.',
    capabilities: ['Bug fixes & updates', 'Performance monitoring', 'Security & dependency updates', 'Small feature additions'],
    stack: ['Ongoing SLAs', 'Version control', 'Monitoring'],
  },
];

export const getService = (slug) => SERVICES.find(s => s.slug === slug);

export const SERVICE_NAMES = SERVICES.map(s => s.label);

export const PROCESS = [
  { n: '01', t: 'Discover', d: 'We start by understanding your business, the problem, and what success looks like.' },
  { n: '02', t: 'Plan', d: 'We decide the right technology, architecture, and scope for the project.' },
  { n: '03', t: 'Design', d: 'We plan the UI/UX and system flow before writing production code.' },
  { n: '04', t: 'Develop', d: 'We build the software or AI system in focused, reviewable milestones.' },
  { n: '05', t: 'Test', d: 'We test functionality, performance, and edge cases before handover.' },
  { n: '06', t: 'Deploy', d: 'We deploy, hand over, and stay available for support afterward.' },
];

export const TIERS = [
  { name: 'Starter', desc: 'Small business or basic website', items: ['Single-page or small website', 'Basic design & content setup', 'Fast turnaround'] },
  { name: 'Business', desc: 'Advanced website, dashboard or automation', items: ['Multi-page site or web app', 'Dashboards & data integrations', 'Workflow automation'], highlight: true },
  { name: 'Custom', desc: 'AI, custom software or complex applications', items: ['Custom AI/ML models', 'Full-stack or desktop software', 'Ongoing development & support'] },
];
