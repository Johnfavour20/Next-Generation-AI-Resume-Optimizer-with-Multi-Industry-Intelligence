// Comprehensive keyword database for ATS optimization
export const keywordDatabase = {
  // Technology & Software Development
  technology: {
    programming_languages: [
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go',
      'Swift', 'Kotlin', 'TypeScript', 'Rust', 'Scala', 'R', 'MATLAB'
    ],
    frameworks_libraries: [
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask',
      'Spring', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'jQuery', 'Bootstrap',
      'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'
    ],
    databases: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB',
      'Oracle', 'SQL Server', 'SQLite', 'Elasticsearch', 'Neo4j'
    ],
    cloud_platforms: [
      'AWS', 'Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud',
      'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible'
    ],
    methodologies: [
      'Agile', 'Scrum', 'Kanban', 'DevOps', 'CI/CD', 'TDD', 'BDD',
      'Microservices', 'RESTful APIs', 'GraphQL', 'SOAP'
    ]
  },

  // Healthcare & Medical
  healthcare: {
    clinical_skills: [
      'Patient Care', 'Clinical Assessment', 'Medical Charting', 'Vital Signs',
      'Medication Administration', 'IV Therapy', 'Wound Care', 'CPR',
      'Emergency Response', 'Patient Education'
    ],
    medical_systems: [
      'Electronic Health Records', 'EHR', 'EMR', 'Epic', 'Cerner',
      'Allscripts', 'MEDITECH', 'Practice Management Systems',
      'Telemedicine', 'Healthcare Analytics'
    ],
    compliance_standards: [
      'HIPAA', 'Joint Commission', 'CMS', 'FDA', 'OSHA',
      'Quality Assurance', 'Risk Management', 'Infection Control',
      'Medical Coding', 'ICD-10', 'CPT'
    ],
    specializations: [
      'Cardiology', 'Oncology', 'Pediatrics', 'Geriatrics', 'Mental Health',
      'Surgery', 'Radiology', 'Laboratory', 'Pharmacy', 'Nursing'
    ]
  },

  // Finance & Banking
  finance: {
    financial_analysis: [
      'Financial Modeling', 'Valuation', 'DCF', 'LBO', 'M&A',
      'Portfolio Management', 'Risk Assessment', 'Credit Analysis',
      'Investment Research', 'Market Analysis'
    ],
    regulations_compliance: [
      'SOX', 'Basel III', 'Dodd-Frank', 'MiFID', 'GDPR',
      'Anti-Money Laundering', 'KYC', 'Compliance Monitoring',
      'Regulatory Reporting', 'Audit'
    ],
    financial_instruments: [
      'Equities', 'Fixed Income', 'Derivatives', 'Options', 'Futures',
      'Bonds', 'Commodities', 'Foreign Exchange', 'Structured Products'
    ],
    software_systems: [
      'Bloomberg Terminal', 'Reuters', 'Excel', 'VBA', 'R', 'Python',
      'MATLAB', 'SAS', 'Tableau', 'Power BI', 'SQL'
    ]
  },

  // Marketing & Sales
  marketing: {
    digital_marketing: [
      'SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Social Media Marketing',
      'Content Marketing', 'Email Marketing', 'Marketing Automation',
      'Lead Generation', 'Conversion Optimization'
    ],
    analytics_tools: [
      'Google Analytics', 'Adobe Analytics', 'Mixpanel', 'Hotjar',
      'A/B Testing', 'Heat Mapping', 'Customer Journey Analysis',
      'Attribution Modeling', 'ROI Analysis'
    ],
    platforms_crm: [
      'Salesforce', 'HubSpot', 'Marketo', 'Pardot', 'Mailchimp',
      'Hootsuite', 'Buffer', 'Sprout Social', 'Zendesk', 'Intercom'
    ],
    strategies: [
      'Brand Management', 'Customer Acquisition', 'Retention Marketing',
      'Growth Hacking', 'Influencer Marketing', 'Affiliate Marketing',
      'Performance Marketing', 'Account-Based Marketing'
    ]
  },

  // General Business Skills
  general: {
    soft_skills: [
      'Leadership', 'Communication', 'Problem Solving', 'Critical Thinking',
      'Team Collaboration', 'Project Management', 'Time Management',
      'Adaptability', 'Creativity', 'Decision Making'
    ],
    project_management: [
      'Agile', 'Scrum', 'Kanban', 'Waterfall', 'PMP', 'Six Sigma',
      'Lean', 'Change Management', 'Risk Management', 'Budget Management'
    ],
    business_analysis: [
      'Requirements Gathering', 'Process Improvement', 'Data Analysis',
      'Business Intelligence', 'KPI Development', 'Stakeholder Management',
      'Documentation', 'Gap Analysis', 'ROI Analysis'
    ]
  }
};

// Action verbs for resume optimization
export const actionVerbs = {
  leadership: [
    'Led', 'Managed', 'Supervised', 'Directed', 'Coordinated', 'Oversaw',
    'Guided', 'Mentored', 'Facilitated', 'Spearheaded', 'Championed'
  ],
  achievement: [
    'Achieved', 'Accomplished', 'Delivered', 'Exceeded', 'Improved',
    'Increased', 'Optimized', 'Enhanced', 'Streamlined', 'Maximized'
  ],
  technical: [
    'Developed', 'Designed', 'Built', 'Implemented', 'Deployed',
    'Configured', 'Integrated', 'Automated', 'Programmed', 'Engineered'
  ],
  analytical: [
    'Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated',
    'Identified', 'Diagnosed', 'Forecasted', 'Modeled', 'Calculated'
  ],
  communication: [
    'Presented', 'Communicated', 'Collaborated', 'Negotiated', 'Consulted',
    'Advised', 'Trained', 'Educated', 'Documented', 'Reported'
  ]
};

// Synonym mapping for semantic matching
export const synonymMapping = {
  'software development': ['programming', 'coding', 'application development', 'software engineering'],
  'project management': ['project coordination', 'program management', 'delivery management'],
  'data analysis': ['data analytics', 'business intelligence', 'statistical analysis'],
  'customer service': ['client relations', 'customer support', 'customer success'],
  'team leadership': ['team management', 'staff supervision', 'people management'],
  'problem solving': ['troubleshooting', 'issue resolution', 'critical thinking'],
  'quality assurance': ['quality control', 'testing', 'QA/QC'],
  'business development': ['sales development', 'growth strategy', 'market expansion'],
  'content creation': ['content development', 'creative writing', 'copywriting'],
  'digital marketing': ['online marketing', 'internet marketing', 'web marketing']
};

// Industry-specific keyword importance weights
export const keywordWeights = {
  high: ['Python', 'JavaScript', 'React', 'AWS', 'Machine Learning', 'SQL', 'Agile'],
  medium: ['Git', 'Docker', 'API', 'Database', 'Frontend', 'Backend'],
  low: ['HTML', 'CSS', 'Microsoft Office', 'Email', 'Phone']
};

// Common ATS-unfriendly terms and their replacements
export const termReplacements = {
  'ninja': 'specialist',
  'guru': 'expert',
  'rockstar': 'professional',
  'wizard': 'specialist',
  'evangelist': 'advocate',
  'growth hacker': 'growth marketer',
  'unicorn': 'versatile professional'
};

// Functions for keyword analysis
export const analyzeKeywords = (resumeText, jobDescription, industry = 'general') => {
  const resumeWords = extractWords(resumeText.toLowerCase());
  const jobWords = extractWords(jobDescription.toLowerCase());
  const industryKeywords = keywordDatabase[industry] || keywordDatabase.general;
  
  const analysis = {
    present: [],
    missing: [],
    weak: [],
    recommendations: []
  };

  // Flatten industry keywords
  const allIndustryKeywords = Object.values(industryKeywords).flat();
  
  jobWords.forEach(word => {
    const frequency = countWordFrequency(word, resumeWords);
    const importance = getKeywordImportance(word);
    
    if (frequency === 0) {
      analysis.missing.push({
        keyword: word,
        importance,
        frequency: 0,
        recommended: getRecommendedFrequency(word, importance)
      });
    } else if (frequency < getRecommendedFrequency(word, importance)) {
      analysis.weak.push({
        keyword: word,
        importance,
        frequency,
        recommended: getRecommendedFrequency(word, importance)
      });
    } else {
      analysis.present.push({
        keyword: word,
        importance,
        frequency,
        recommended: getRecommendedFrequency(word, importance)
      });
    }
  });

  return analysis;
};

export const extractWords = (text) => {
  return text.match(/\b\w+\b/g) || [];
};

export const countWordFrequency = (word, words) => {
  return words.filter(w => w === word.toLowerCase()).length;
};

export const getKeywordImportance = (keyword) => {
  if (keywordWeights.high.some(k => k.toLowerCase() === keyword.toLowerCase())) {
    return 'high';
  }
  if (keywordWeights.medium.some(k => k.toLowerCase() === keyword.toLowerCase())) {
    return 'medium';
  }
  return 'low';
};

export const getRecommendedFrequency = (keyword, importance) => {
  switch (importance) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 1;
  }
};

export const generateKeywordSuggestions = (missingKeywords, industry) => {
  const suggestions = [];
  const industryKeywords = keywordDatabase[industry] || keywordDatabase.general;
  
  missingKeywords.forEach(keyword => {
    const synonyms = synonymMapping[keyword.keyword.toLowerCase()] || [];
    if (synonyms.length > 0) {
      suggestions.push({
        original: keyword.keyword,
        alternatives: synonyms,
        importance: keyword.importance
      });
    }
  });
  
  return suggestions;
};

export default {
  keywordDatabase,
  actionVerbs,
  synonymMapping,
  keywordWeights,
  termReplacements,
  analyzeKeywords,
  generateKeywordSuggestions
};