import { Code, Heart, DollarSign, TrendingUp, Palette, GraduationCap, Truck, Camera } from 'lucide-react';

export const industries = [
  {
    id: 'technology',
    name: 'Technology & IT',
    icon: Code,
    color: 'blue',
    keywords: [
      'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker',
      'Kubernetes', 'Machine Learning', 'AI', 'Data Science',
      'Cloud Computing', 'DevOps', 'Agile', 'Scrum', 'API',
      'Database', 'SQL', 'NoSQL', 'Git', 'CI/CD'
    ],
    skills: [
      'Software Development', 'Full-Stack Development', 'Frontend Development',
      'Backend Development', 'Mobile Development', 'Web Development',
      'System Architecture', 'Database Design', 'API Integration',
      'Performance Optimization', 'Security Implementation', 'Testing'
    ],
    certifications: [
      'AWS Certified Solutions Architect', 'Google Cloud Professional',
      'Microsoft Azure Fundamentals', 'Certified Kubernetes Administrator',
      'Certified ScrumMaster', 'CompTIA Security+'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    icon: Heart,
    color: 'red',
    keywords: [
      'Patient Care', 'Clinical Research', 'Healthcare Management',
      'Medical Records', 'HIPAA', 'EHR', 'EMR', 'Telemedicine',
      'Nursing', 'Pharmaceutical', 'Medical Device', 'Compliance',
      'Quality Assurance', 'Healthcare Analytics', 'Population Health'
    ],
    skills: [
      'Patient Assessment', 'Clinical Documentation', 'Medical Coding',
      'Healthcare Administration', 'Quality Improvement', 'Risk Management',
      'Infection Control', 'Medical Research', 'Healthcare Technology',
      'Patient Education', 'Interdisciplinary Collaboration'
    ],
    certifications: [
      'Registered Nurse (RN)', 'Certified Medical Assistant (CMA)',
      'Healthcare Management Certificate', 'HIPAA Certification',
      'Medical Coding Certification', 'Clinical Research Certification'
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    icon: DollarSign,
    color: 'green',
    keywords: [
      'Financial Analysis', 'Risk Management', 'Portfolio Management',
      'Investment Banking', 'Credit Analysis', 'Financial Modeling',
      'Derivatives', 'Fixed Income', 'Equity Research', 'Compliance',
      'Anti-Money Laundering', 'KYC', 'Basel III', 'IFRS', 'GAAP'
    ],
    skills: [
      'Financial Planning', 'Budget Management', 'Financial Reporting',
      'Investment Strategy', 'Risk Assessment', 'Regulatory Compliance',
      'Market Analysis', 'Client Relationship Management', 'Trading',
      'Underwriting', 'Loan Processing', 'Audit'
    ],
    certifications: [
      'CFA (Chartered Financial Analyst)', 'FRM (Financial Risk Manager)',
      'CPA (Certified Public Accountant)', 'Series 7', 'Series 63',
      'CAMS (Certified Anti-Money Laundering Specialist)'
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    icon: TrendingUp,
    color: 'purple',
    keywords: [
      'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing',
      'Content Marketing', 'Email Marketing', 'PPC', 'Analytics',
      'Brand Management', 'Lead Generation', 'CRM', 'A/B Testing',
      'Conversion Optimization', 'Marketing Automation', 'ROI'
    ],
    skills: [
      'Campaign Management', 'Market Research', 'Customer Segmentation',
      'Brand Strategy', 'Public Relations', 'Event Management',
      'Sales Strategy', 'Customer Acquisition', 'Retention Marketing',
      'Performance Marketing', 'Influencer Marketing', 'Growth Hacking'
    ],
    certifications: [
      'Google Ads Certification', 'Google Analytics Certified',
      'HubSpot Inbound Marketing', 'Facebook Blueprint',
      'Salesforce Certified Administrator', 'Hootsuite Social Media'
    ]
  },
  {
    id: 'design',
    name: 'Design & Creative',
    icon: Palette,
    color: 'pink',
    keywords: [
      'UI/UX Design', 'Graphic Design', 'Web Design', 'Brand Identity',
      'Adobe Creative Suite', 'Figma', 'Sketch', 'Prototyping',
      'User Research', 'Wireframing', 'Typography', 'Color Theory',
      'Design Systems', 'Accessibility', 'Responsive Design'
    ],
    skills: [
      'Visual Design', 'User Experience Design', 'Interface Design',
      'Creative Direction', 'Design Strategy', 'Art Direction',
      'Motion Graphics', 'Illustration', 'Photography', 'Video Editing',
      'Design Thinking', 'Creative Problem Solving'
    ],
    certifications: [
      'Adobe Certified Expert', 'Google UX Design Certificate',
      'Certified Usability Analyst', 'Design Thinking Certificate',
      'Figma Professional Certificate', 'UX Certification from Nielsen Norman Group'
    ]
  },
  {
    id: 'education',
    name: 'Education & Training',
    icon: GraduationCap,
    color: 'yellow',
    keywords: [
      'Curriculum Development', 'Instructional Design', 'Educational Technology',
      'Learning Management Systems', 'Student Assessment', 'Pedagogy',
      'E-Learning', 'Training Programs', 'Academic Administration',
      'Special Education', 'Adult Learning', 'Educational Research'
    ],
    skills: [
      'Teaching', 'Lesson Planning', 'Classroom Management', 'Student Engagement',
      'Educational Assessment', 'Learning Analytics', 'Academic Counseling',
      'Professional Development', 'Educational Leadership', 'Research Methods',
      'Grant Writing', 'Community Outreach'
    ],
    certifications: [
      'Teaching License', 'Instructional Design Certificate',
      'Educational Technology Certification', 'Special Education License',
      'Adult Education Certification', 'Project Management in Education'
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: Truck,
    color: 'orange',
    keywords: [
      'Supply Chain Management', 'Inventory Management', 'Warehousing',
      'Transportation', 'Procurement', 'Vendor Management', 'ERP',
      'Demand Planning', 'Logistics Coordination', 'Quality Control',
      'Cost Optimization', 'Lean Manufacturing', 'Six Sigma'
    ],
    skills: [
      'Operations Management', 'Project Management', 'Data Analysis',
      'Process Improvement', 'Vendor Relations', 'Contract Negotiation',
      'Risk Management', 'International Trade', 'Customs Compliance',
      'Fleet Management', 'Distribution Management', 'Strategic Planning'
    ],
    certifications: [
      'APICS Supply Chain Operations Reference', 'Certified Supply Chain Professional',
      'Six Sigma Green Belt', 'Project Management Professional (PMP)',
      'Certified in Production and Inventory Management', 'Lean Manufacturing Certificate'
    ]
  },
  {
    id: 'media',
    name: 'Media & Communications',
    icon: Camera,
    color: 'indigo',
    keywords: [
      'Content Creation', 'Journalism', 'Public Relations', 'Broadcasting',
      'Digital Media', 'Social Media', 'Video Production', 'Audio Editing',
      'Copywriting', 'Brand Communications', 'Crisis Communication',
      'Media Planning', 'Storytelling', 'Content Strategy'
    ],
    skills: [
      'Writing', 'Editing', 'Research', 'Interview Techniques',
      'Media Relations', 'Crisis Management', 'Event Planning',
      'Content Management', 'SEO Writing', 'Multimedia Production',
      'Audience Engagement', 'Brand Messaging'
    ],
    certifications: [
      'Google Analytics for Content', 'HubSpot Content Marketing',
      'Facebook Social Media Marketing', 'Adobe Premiere Pro Certification',
      'AP Style Certification', 'Crisis Communication Certificate'
    ]
  }
];

export const getIndustryById = (id) => {
  return industries.find(industry => industry.id === id);
};

export const getIndustryKeywords = (industryId) => {
  const industry = getIndustryById(industryId);
  return industry ? industry.keywords : [];
};

export const getIndustrySkills = (industryId) => {
  const industry = getIndustryById(industryId);
  return industry ? industry.skills : [];
};

export default industries;