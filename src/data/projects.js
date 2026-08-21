import { IconRecycle, IconBarChart, IconMessage, IconMonitor } from '../components/Icons';

// ============================================================
// CASE STUDIES
//
// TO ADD A SCREENSHOT: drop the image into public/projects/ and
// set `image: '/projects/your-file.jpg'` on the project below.
// Without an image the card falls back to the icon tile, so it
// still looks intentional until you have one.
// ============================================================

export const PROJECTS = [
  {
    slug: 'waste-classification-ai',
    name: 'Waste Classification AI',
    category: 'Computer Vision',
    icon: IconRecycle,
    image: null,
    summary: 'A computer vision system that detects and classifies waste in real time so sorting can be automated.',
    problem: 'Manual waste sorting is slow and inconsistent, making recycling programs harder to scale.',
    solution: 'A computer vision system that automatically detects and classifies waste items from camera input in real time, so sorting can be automated or assisted.',
    tech: ['YOLOv8', 'CNN', 'Python', 'OpenCV'],
    features: ['Real-time object detection', 'Multi-class waste classification', 'Trained on a custom dataset'],
  },
  {
    slug: 'business-analytics-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'Data Analytics',
    icon: IconBarChart,
    image: null,
    summary: 'An interactive dashboard pulling sales and operations data into clear, filterable visualizations.',
    problem: 'Business data was spread across spreadsheets with no easy way to see trends or make decisions quickly.',
    solution: 'An interactive dashboard that pulls together sales and operations data into clear, filterable visualizations.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    features: ['Live filterable charts', 'Exportable reports', 'Role-based views'],
  },
  {
    slug: 'ai-support-chatbot',
    name: 'AI Customer Support Chatbot',
    category: 'AI Chatbots & NLP',
    icon: IconMessage,
    image: null,
    summary: 'A conversational assistant handling common queries automatically, with clean handoff to a human.',
    problem: 'Support requests were repetitive and slow to respond to outside business hours.',
    solution: 'A conversational AI assistant that handles common queries automatically and hands off complex ones to a human.',
    tech: ['Python', 'NLP', 'REST APIs'],
    features: ['24/7 automated responses', 'Human handoff flow', 'Website + WhatsApp integration'],
  },
  {
    slug: 'client-portal-web-app',
    name: 'Client Portal Web App',
    category: 'Web & AI Applications',
    icon: IconMonitor,
    image: null,
    summary: 'A full-stack portal with authentication, project tracking, and request submission built in.',
    problem: 'Clients had no self-serve way to track project progress or submit requests.',
    solution: 'A full-stack client portal with authentication, project tracking, and request submission built in.',
    tech: ['React', 'Flask', 'REST APIs'],
    features: ['Secure client login', 'Project status tracking', 'Request & file submission'],
  },
];

export const getProject = (slug) => PROJECTS.find(p => p.slug === slug);

export const PROJECT_CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
