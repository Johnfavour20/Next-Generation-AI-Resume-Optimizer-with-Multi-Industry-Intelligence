// Resume format validation utilities for ATS compatibility
import { formattingGuidelines } from '../data/Templates.js';

/**
 * Validates resume format for ATS compatibility
 * @param {string} resumeText - The resume text content
 * @param {Object} options - Validation options
 * @returns {Object} Validation results with issues and score
 */
export const validateResumeFormat = (resumeText, options = {}) => {
  const validation = {
    score: 100,
    issues: [],
    warnings: [],
    suggestions: [],
    categories: {
      structure: { score: 100, issues: [] },
      formatting: { score: 100, issues: [] },
      content: { score: 100, issues: [] },
      atsCompatibility: { score: 100, issues: [] }
    }
  };

  // Run all validation checks
  validateStructure(resumeText, validation);
  validateFormatting(resumeText, validation);
  validateContent(resumeText, validation);
  validateATSCompatibility(resumeText, validation);

  // Calculate overall score
  const categoryScores = Object.values(validation.categories).map(cat => cat.score);
  validation.score = Math.round(categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length);

  return validation;
};

/**
 * Validates resume structure and organization
 * @param {string} resumeText - Resume text content
 * @param {Object} validation - Validation object to update
 */
export const validateStructure = (resumeText, validation) => {
  const text = resumeText.toLowerCase();
  let score = 100;
  const issues = [];

  // Check for required sections
  const requiredSections = ['experience', 'education', 'skills'];
  const missingSections = requiredSections.filter(section => !text.includes(section));
  
  if (missingSections.length > 0) {
    issues.push(`Missing required sections: ${missingSections.join(', ')}`);
    score -= missingSections.length * 20;
  }

  // Check for contact information
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phonePattern = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
  
  if (!emailPattern.test(resumeText)) {
    issues.push('Email address not found or improperly formatted');
    score -= 15;
  }
  
  if (!phonePattern.test(resumeText)) {
    issues.push('Phone number not found or improperly formatted');
    score -= 10;
  }

  // Check section order
  const sectionOrder = ['summary', 'experience', 'education', 'skills'];
  const foundSections = [];
  
  sectionOrder.forEach(section => {
    const index = text.indexOf(section);
    if (index !== -1) {
      foundSections.push({ section, index });
    }
  });
  
  // Check if sections are in logical order
  for (let i = 1; i < foundSections.length; i++) {
    if (foundSections[i].index < foundSections[i-1].index) {
      issues.push('Sections may be in illogical order for ATS parsing');
      score -= 5;
      break;
    }
  }

  validation.categories.structure = { score: Math.max(score, 0), issues };
};

/**
 * Validates formatting elements that affect ATS parsing
 * @param {string} resumeText - Resume text content
 * @param {Object} validation - Validation object to update
 */
export const validateFormatting = (resumeText, validation) => {
  let score = 100;
  const issues = [];

  // Check for problematic characters
  const problematicPatterns = [
    { pattern: /\t/, message: 'Contains tab characters - use spaces instead', penalty: 5 },
    { pattern: /[│┌┐└┘├┤┬┴┼]/g, message: 'Contains table/box drawing characters', penalty: 15 },
    { pattern: /[•◦▪▫▸▹]/g, message: 'Contains special bullet characters - use standard bullets', penalty: 10 },
    { pattern: /\|/g, message: 'Contains pipe characters that may confuse parsing', penalty: 8 },
    { pattern: /[\u2000-\u206F]/g, message: 'Contains special spacing characters', penalty: 7 }
  ];

  problematicPatterns.forEach(({ pattern, message, penalty }) => {
    if (pattern.test(resumeText)) {
      issues.push(message);
      score -= penalty;
    }
  });

  // Check for multiple column indicators
  const columnIndicators = [
    /\s{10,}/g, // Large spaces indicating columns
    /(.{20,})\s+(.{20,})/g // Text patterns suggesting side-by-side layout
  ];

  columnIndicators.forEach(pattern => {
    if (pattern.test(resumeText)) {
      issues.push('Layout may contain multiple columns - use single column format');
      score -= 20;
      return; // Only flag once
    }
  });

  // Check line length (too long might indicate table format)
  const lines = resumeText.split('\n');
  const longLines = lines.filter(line => line.length > 120);
  
  if (longLines.length > 3) {
    issues.push('Some lines are very long - may indicate table formatting');
    score -= 10;
  }

  // Check for consistent date formatting
  const datePatterns = [
    /\b\d{4}\b/g, // Year only
    /\b\d{1,2}\/\d{4}\b/g, // MM/YYYY
    /\b[A-Za-z]{3,9}\s+\d{4}\b/g, // Month YYYY
    /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g // MM/DD/YYYY
  ];

  let dateFormatCount = 0;
  datePatterns.forEach(pattern => {
    if (pattern.test(resumeText)) {
      dateFormatCount++;
    }
  });

  if (dateFormatCount > 2) {
    issues.push('Inconsistent date formatting detected - use consistent MM/YYYY format');
    score -= 8;
  }

  validation.categories.formatting = { score: Math.max(score, 0), issues };
};

/**
 * Validates content quality and completeness
 * @param {string} resumeText - Resume text content
 * @param {Object} validation - Validation object to update
 */
export const validateContent = (resumeText, validation) => {
  let score = 100;
  const issues = [];

  // Check word count
  const wordCount = resumeText.split(/\s+/).length;
  
  if (wordCount < 200) {
    issues.push('Resume appears too short - add more detail about experiences');
    score -= 25;
  } else if (wordCount > 1000) {
    issues.push('Resume may be too long - consider condensing to key achievements');
    score -= 15;
  }

  // Check for quantified achievements
  const numberPattern = /\b\d+(\.\d+)?(%|k|m|million|billion|\$)?\b/g;
  const numbers = resumeText.match(numberPattern) || [];
  
  if (numbers.length < 3) {
    issues.push('Add more quantified achievements with specific metrics');
    score -= 20;
  }

  // Check for action verbs
  const commonActionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'improved', 'increased',
    'created', 'implemented', 'optimized', 'delivered', 'designed',
    'coordinated', 'supervised', 'established', 'executed'
  ];
  
  const foundVerbs = commonActionVerbs.filter(verb => 
    resumeText.toLowerCase().includes(verb)
  ).length;

  if (foundVerbs < 5) {
    issues.push('Use more action verbs to start bullet points');
    score -= 15;
  }

  // Check for passive voice indicators
  const passiveIndicators = ['was responsible for', 'were responsible for', 'duties included'];
  const passiveCount = passiveIndicators.filter(phrase => 
    resumeText.toLowerCase().includes(phrase)
  ).length;

  if (passiveCount > 2) {
    issues.push('Reduce passive voice - use active voice for stronger impact');
    score -= 12;
  }

  // Check for generic phrases to avoid
  const genericPhrases = [
    'hard worker', 'team player', 'detail oriented', 'excellent communication skills',
    'fast learner', 'highly motivated', 'results driven'
  ];
  
  const foundGeneric = genericPhrases.filter(phrase => 
    resumeText.toLowerCase().includes(phrase.toLowerCase())
  );

  if (foundGeneric.length > 2) {
    issues.push('Replace generic phrases with specific examples and achievements');
    score -= 10;
  }

  validation.categories.content = { score: Math.max(score, 0), issues };
};

/**
 * Validates ATS-specific compatibility issues
 * @param {string} resumeText - Resume text content
 * @param {Object} validation - Validation object to update
 */
export const validateATSCompatibility = (resumeText, validation) => {
  let score = 100;
  const issues = [];

  // Check for problematic file indicators
  const problematicElements = [
    { pattern: /\[image\]/gi, message: 'Images detected - remove all images and graphics', penalty: 25 },
    { pattern: /\[table\]/gi, message: 'Tables detected - convert to simple text format', penalty: 20 },
    { pattern: /\[header\]/gi, message: 'Headers/footers detected - move content to main body', penalty: 15 },
    { pattern: /\[textbox\]/gi, message: 'Text boxes detected - use regular text format', penalty: 18 }
  ];

  problematicElements.forEach(({ pattern, message, penalty }) => {
    if (pattern.test(resumeText)) {
      issues.push(message);
      score -= penalty;
    }
  });

  // Check for non-standard section headers
  const nonStandardHeaders = [
    'about me', 'personal profile', 'career objective', 'references',
    'hobbies', 'interests', 'personal information'
  ];

  const foundNonStandard = nonStandardHeaders.filter(header => 
    resumeText.toLowerCase().includes(header)
  );

  if (foundNonStandard.length > 0) {
    issues.push(`Remove non-essential sections: ${foundNonStandard.join(', ')}`);
    score -= foundNonStandard.length * 5;
  }

  // Check for creative/non-standard formatting
  const creativeElements = [
    /[★☆]/g, // Stars for ratings
    /[◆◇▲▼]/g, // Creative bullets
    /\[.*skill.*bar.*\]/gi, // Skill bars
    /\[.*progress.*\]/gi // Progress indicators
  ];

  creativeElements.forEach(pattern => {
    if (pattern.test(resumeText)) {
      issues.push('Remove creative formatting elements - use simple text format');
      score -= 12;
      return; // Only flag once
    }
  });

  // Check for proper contact information format
  const socialMedia = ['linkedin', 'github', 'portfolio'];
  const foundSocial = socialMedia.filter(platform => 
    resumeText.toLowerCase().includes(platform)
  );

  if (foundSocial.length === 0) {
    issues.push('Consider adding LinkedIn profile or professional portfolio link');
    score -= 5;
  }

  validation.categories.atsCompatibility = { score: Math.max(score, 0), issues };
};

/**
 * Generates formatting improvement suggestions
 * @param {Object} validation - Validation results
 * @returns {Array} Array of actionable suggestions
 */
export const generateImprovementSuggestions = (validation) => {
  const suggestions = [];

  // Priority suggestions based on score impact
  const allIssues = [
    ...validation.categories.structure.issues.map(issue => ({ issue, category: 'structure', priority: 'high' })),
    ...validation.categories.atsCompatibility.issues.map(issue => ({ issue, category: 'ats', priority: 'high' })),
    ...validation.categories.formatting.issues.map(issue => ({ issue, category: 'formatting', priority: 'medium' })),
    ...validation.categories.content.issues.map(issue => ({ issue, category: 'content', priority: 'medium' }))
  ];

  // Sort by priority
  allIssues.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Generate actionable suggestions
  allIssues.forEach(({ issue, category, priority }) => {
    const suggestion = {
      issue,
      category,
      priority,
      action: generateActionForIssue(issue, category),
      impact: getImpactLevel(priority)
    };
    suggestions.push(suggestion);
  });

  return suggestions.slice(0, 10); // Limit to top 10 suggestions
};

/**
 * Generates specific action for an issue
 * @param {string} issue - The identified issue
 * @param {string} category - Issue category
 * @returns {string} Specific action to take
 */
export const generateActionForIssue = (issue, category) => {
  const actionMap = {
    'Missing required sections': 'Add the missing sections with relevant content',
    'Email address not found': 'Add a professional email address at the top of your resume',
    'Contains tab characters': 'Replace all tab characters with 2-4 spaces',
    'Contains table/box drawing characters': 'Convert tables to simple bulleted lists',
    'Layout may contain multiple columns': 'Restructure content into a single column format',
    'Resume appears too short': 'Expand experience descriptions with specific achievements',
    'Add more quantified achievements': 'Include numbers, percentages, and metrics in bullet points',
    'Use more action verbs': 'Start each bullet point with a strong action verb',
    'Images detected': 'Remove all images, logos, and graphics',
    'Tables detected': 'Convert tabular data to simple text format'
  };

  // Try exact match first
  const exactAction = actionMap[issue];
  if (exactAction) return exactAction;

  // Try partial matches
  for (const [key, action] of Object.entries(actionMap)) {
    if (issue.includes(key.toLowerCase()) || key.toLowerCase().includes(issue.toLowerCase())) {
      return action;
    }
  }

  // Default action
  return 'Review and address this formatting issue for better ATS compatibility';
};

/**
 * Gets impact level for priority
 * @param {string} priority - Priority level
 * @returns {string} Impact description
 */
export const getImpactLevel = (priority) => {
  const impacts = {
    high: 'High impact - may prevent ATS from reading resume',
    medium: 'Medium impact - could affect ranking and visibility',
    low: 'Low impact - minor improvement for optimization'
  };
  
  return impacts[priority] || impacts.medium;
};

/**
 * Validates specific file format requirements
 * @param {string} filename - Name of the resume file
 * @param {string} content - File content
 * @returns {Object} File format validation results
 */
export const validateFileFormat = (filename, content) => {
  const validation = {
    isValid: true,
    issues: [],
    recommendations: []
  };

  // Check file extension
  const extension = filename.toLowerCase().split('.').pop();
  const recommendedFormats = ['docx', 'pdf', 'txt'];
  const problematicFormats = ['doc', 'rtf', 'pages', 'odt'];

  if (!recommendedFormats.includes(extension)) {
    validation.isValid = false;
    if (problematicFormats.includes(extension)) {
      validation.issues.push(`${extension.toUpperCase()} format may have compatibility issues`);
      validation.recommendations.push('Convert to .docx or .pdf format');
    } else {
      validation.issues.push('Unrecognized file format');
      validation.recommendations.push('Use .docx or .pdf format');
    }
  }

  // Check filename
  const filenamePattern = /^[a-zA-Z0-9_\-\s]+$/;
  if (!filenamePattern.test(filename.replace(/\.[^.]+$/, ''))) {
    validation.issues.push('Filename contains special characters');
    validation.recommendations.push('Use only letters, numbers, underscores, and hyphens in filename');
  }

  // Suggest naming convention
  if (!filename.toLowerCase().includes('resume') && !filename.toLowerCase().includes('cv')) {
    validation.recommendations.push('Consider including "resume" or your name in the filename');
  }

  return validation;
};

export default {
  validateResumeFormat,
  validateStructure,
  validateFormatting,
  validateContent,
  validateATSCompatibility,
  generateImprovementSuggestions,
  generateActionForIssue,
  getImpactLevel,
  validateFileFormat
};