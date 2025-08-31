// ATS-friendly resume templates and structures
export const resumeTemplates = {
  technology: {
    sections: ['summary', 'technical_skills', 'experience', 'projects', 'education', 'certifications'],
    sectionTitles: {
      summary: 'Professional Summary',
      technical_skills: 'Technical Skills',
      experience: 'Professional Experience',
      projects: 'Key Projects',
      education: 'Education',
      certifications: 'Certifications'
    },
    sampleContent: {
      summary: 'Results-driven Software Engineer with 5+ years of experience developing scalable web applications using modern technologies. Proven track record of delivering high-quality solutions that improve user experience and increase operational efficiency by 40%.',
      technical_skills: {
        'Programming Languages': ['Python', 'JavaScript', 'Java', 'TypeScript'],
        'Frameworks & Libraries': ['React', 'Node.js', 'Django', 'Express.js'],
        'Databases': ['PostgreSQL', 'MongoDB', 'Redis'],
        'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        'Tools': ['Git', 'Jenkins', 'JIRA', 'Agile/Scrum']
      }
    }
  },

  healthcare: {
    sections: ['summary', 'clinical_experience', 'education', 'certifications', 'skills', 'achievements'],
    sectionTitles: {
      summary: 'Professional Summary',
      clinical_experience: 'Clinical Experience',
      education: 'Education & Training',
      certifications: 'Licenses & Certifications',
      skills: 'Clinical Skills',
      achievements: 'Professional Achievements'
    },
    sampleContent: {
      summary: 'Compassionate Registered Nurse with 7+ years of acute care experience in fast-paced hospital environments. Demonstrated expertise in patient assessment, medication administration, and interdisciplinary collaboration. Consistently achieved 98% patient satisfaction scores.',
      skills: [
        'Patient Assessment & Care Planning',
        'Medication Administration',
        'IV Therapy & Phlebotomy',
        'Electronic Health Records (Epic, Cerner)',
        'HIPAA Compliance',
        'Emergency Response & CPR',
        'Patient Education',
        'Wound Care Management'
      ]
    }
  },

  finance: {
    sections: ['summary', 'experience', 'skills', 'education', 'certifications', 'achievements'],
    sectionTitles: {
      summary: 'Professional Summary',
      experience: 'Professional Experience',
      skills: 'Core Competencies',
      education: 'Education',
      certifications: 'Professional Certifications',
      achievements: 'Key Achievements'
    },
    sampleContent: {
      summary: 'Detail-oriented Financial Analyst with 6+ years of experience in investment banking and portfolio management. Expertise in financial modeling, valuation, and risk assessment. Successfully managed portfolios worth $500M+ with consistent 15% annual returns.',
      skills: [
        'Financial Modeling & Valuation',
        'Risk Management & Assessment',
        'Portfolio Management',
        'Investment Research & Analysis',
        'Bloomberg Terminal & Reuters',
        'Advanced Excel & VBA',
        'Regulatory Compliance (SOX, Basel III)',
        'M&A Analysis'
      ]
    }
  },

  marketing: {
    sections: ['summary', 'experience', 'skills', 'achievements', 'education', 'certifications'],
    sectionTitles: {
      summary: 'Professional Summary',
      experience: 'Professional Experience',
      skills: 'Marketing Expertise',
      achievements: 'Key Achievements',
      education: 'Education',
      certifications: 'Certifications'
    },
    sampleContent: {
      summary: 'Strategic Digital Marketing Manager with 8+ years of experience driving growth through data-driven campaigns. Proven ability to increase lead generation by 200% and improve conversion rates by 45% through innovative marketing strategies.',
      skills: [
        'Digital Marketing Strategy',
        'SEO/SEM & Google Ads',
        'Social Media Marketing',
        'Marketing Automation (HubSpot, Marketo)',
        'Google Analytics & Data Analysis',
        'Content Marketing & Creation',
        'Email Marketing Campaigns',
        'A/B Testing & Optimization'
      ]
    }
  }
};

// ATS-friendly formatting guidelines
export const formattingGuidelines = {
  fonts: {
    recommended: ['Arial', 'Calibri', 'Times New Roman', 'Georgia'],
    avoid: ['Comic Sans', 'Papyrus', 'Brush Script', 'Decorative fonts']
  },
  
  structure: {
    maxPages: 2,
    margins: '0.5 to 1 inch',
    fontSize: {
      body: '10-12pt',
      headers: '12-16pt'
    },
    spacing: 'Single or 1.15 line spacing'
  },

  sections: {
    standardHeaders: [
      'Professional Summary',
      'Professional Experience',
      'Education',
      'Skills',
      'Certifications'
    ],
    avoid: [
      'References',
      'Objective',
      'Personal Information',
      'Hobbies',
      'Photo'
    ]
  },

  formatting: {
    use: [
      'Bullet points for accomplishments',
      'Consistent date format (MM/YYYY)',
      'Standard section headers',
      'Bold for company names and job titles',
      'Simple, clean layout'
    ],
    avoid: [
      'Tables and columns',
      'Text boxes',
      'Headers and footers',
      'Graphics and images',
      'Special characters or symbols',
      'Multiple columns'
    ]
  }
};

// Resume scoring criteria
export const scoringCriteria = {
  format: {
    weight: 25,
    checks: [
      'Single column layout',
      'Standard fonts',
      'No tables or text boxes',
      'Proper section headers',
      'Consistent formatting'
    ]
  },
  
  keywords: {
    weight: 35,
    checks: [
      'Job-relevant keywords present',
      'Industry-specific terminology',
      'Skills mentioned in job description',
      'Proper keyword density',
      'No keyword stuffing'
    ]
  },
  
  content: {
    weight: 25,
    checks: [
      'Quantified achievements',
      'Action verb usage',
      'Relevant experience',
      'Clear job progression',
      'Professional summary'
    ]
  },
  
  structure: {
    weight: 15,
    checks: [
      'Logical section order',
      'Consistent date format',
      'Contact information present',
      'Appropriate length',
      'No spelling/grammar errors'
    ]
  }
};

// Sample resume structures by experience level
export const experienceLevelTemplates = {
  'entry-level': {
    sections: ['summary', 'education', 'projects', 'skills', 'experience', 'certifications'],
    emphasis: 'Education and projects',
    tips: [
      'Emphasize relevant coursework and projects',
      'Include internships and part-time work',
      'Highlight academic achievements',
      'Focus on transferable skills'
    ]
  },
  
  'mid-level': {
    sections: ['summary', 'experience', 'skills', 'education', 'certifications'],
    emphasis: 'Professional experience',
    tips: [
      'Lead with professional experience',
      'Quantify achievements with metrics',
      'Show career progression',
      'Include leadership examples'
    ]
  },
  
  'senior-level': {
    sections: ['summary', 'experience', 'leadership', 'education', 'achievements'],
    emphasis: 'Leadership and strategic impact',
    tips: [
      'Emphasize strategic contributions',
      'Include team leadership examples',
      'Show business impact',
      'Mention board positions or speaking engagements'
    ]
  }
};

// Industry-specific customization rules
export const industryCustomization = {
  technology: {
    prioritySections: ['technical_skills', 'projects'],
    keyMetrics: ['Performance improvements', 'User engagement', 'System uptime', 'Code efficiency'],
    commonMistakes: [
      'Listing every technology ever used',
      'Not quantifying technical achievements',
      'Using outdated technologies',
      'Missing GitHub or portfolio links'
    ]
  },
  
  healthcare: {
    prioritySections: ['certifications', 'clinical_experience'],
    keyMetrics: ['Patient satisfaction', 'Quality scores', 'Compliance rates', 'Cost savings'],
    commonMistakes: [
      'Not including license numbers',
      'Missing continuing education',
      'Vague patient care descriptions',
      'Not mentioning specific medical systems'
    ]
  },
  
  finance: {
    prioritySections: ['certifications', 'achievements'],
    keyMetrics: ['Portfolio performance', 'Risk reduction', 'Revenue generation', 'Cost optimization'],
    commonMistakes: [
      'Not quantifying financial impact',
      'Missing relevant certifications',
      'Vague risk management descriptions',
      'Not mentioning specific financial systems'
    ]
  }
};

// Content enhancement templates
export const contentEnhancement = {
  bulletPointTemplates: [
    '[Action Verb] + [What You Did] + [How/Why] + [Result/Impact]',
    '[Action Verb] + [Specific Achievement] + [Quantified Result]',
    '[Leadership Action] + [Team Size/Scope] + [Outcome]'
  ],
  
  quantificationExamples: [
    'Increased efficiency by X%',
    'Reduced costs by $X',
    'Managed team of X people',
    'Generated $X in revenue',
    'Improved customer satisfaction by X%',
    'Completed projects X% ahead of schedule'
  ],
  
  impactWords: [
    'Achieved', 'Improved', 'Increased', 'Reduced', 'Optimized',
    'Streamlined', 'Enhanced', 'Delivered', 'Exceeded', 'Generated'
  ]
};

// Export functions for template management
export const getTemplateByIndustry = (industry) => {
  return resumeTemplates[industry] || resumeTemplates.technology;
};

export const getTemplateByExperience = (level) => {
  return experienceLevelTemplates[level] || experienceLevelTemplates['mid-level'];
};

export const calculateATSScore = (resumeData) => {
  let totalScore = 0;
  let maxScore = 0;
  
  Object.entries(scoringCriteria).forEach(([category, criteria]) => {
    const categoryScore = evaluateCategory(resumeData, category, criteria.checks);
    totalScore += categoryScore * (criteria.weight / 100);
    maxScore += criteria.weight;
  });
  
  return Math.round((totalScore / maxScore) * 100);
};

const evaluateCategory = (resumeData, category, checks) => {
  // This would contain the actual evaluation logic
  // For now, returning a placeholder score
  return Math.floor(Math.random() * 100) + 1;
};

export const generateContentSuggestions = (industry, experienceLevel) => {
  const template = getTemplateByIndustry(industry);
  const experienceTemplate = getTemplateByExperience(experienceLevel);
  
  return {
    sections: template.sections,
    tips: experienceTemplate.tips,
    sampleContent: template.sampleContent,
    customization: industryCustomization[industry] || {}
  };
};

export default {
  resumeTemplates,
  formattingGuidelines,
  scoringCriteria,
  experienceLevelTemplates,
  industryCustomization,
  contentEnhancement,
  getTemplateByIndustry,
  getTemplateByExperience,
  calculateATSScore,
  generateContentSuggestions
};