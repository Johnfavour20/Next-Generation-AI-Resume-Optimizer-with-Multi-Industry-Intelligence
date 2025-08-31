// Keyword extraction and processing utilities
import { keywordDatabase, synonymMapping, actionVerbs } from '../data/Keywords.js';

/**
 * Extracts keywords from job description using NLP techniques
 * @param {string} jobDescription - The job description text
 * @param {string} industry - Target industry for context
 * @returns {Object} Extracted keywords with importance and frequency
 */
export const extractJobKeywords = (jobDescription, industry = 'general') => {
  const text = jobDescription.toLowerCase();
  const words = tokenize(text);
  const phrases = extractPhrases(text);
  
  const extractedKeywords = {
    skills: [],
    technologies: [],
    qualifications: [],
    softSkills: [],
    certifications: []
  };

  // Extract single-word keywords
  const industryKeywords = keywordDatabase[industry] || keywordDatabase.general;
  
  Object.entries(industryKeywords).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      const frequency = countOccurrences(keyword.toLowerCase(), text);
      if (frequency > 0) {
        const importance = determineImportance(keyword, frequency, category);
        extractedKeywords.skills.push({
          keyword,
          frequency,
          importance,
          category
        });
      }
    });
  });

  // Extract multi-word phrases
  phrases.forEach(phrase => {
    if (phrase.length > 1 && isRelevantPhrase(phrase, industry)) {
      const phraseText = phrase.join(' ');
      const frequency = countOccurrences(phraseText, text);
      const importance = determineImportance(phraseText, frequency, 'phrase');
      
      extractedKeywords.technologies.push({
        keyword: phraseText,
        frequency,
        importance,
        category: 'phrase'
      });
    }
  });

  // Extract qualifications and requirements
  const qualificationPatterns = [
    /(\d+)\+?\s*years?\s*of\s*experience/gi,
    /bachelor'?s?\s*degree/gi,
    /master'?s?\s*degree/gi,
    /phd|doctorate/gi,
    /certified|certification/gi
  ];

  qualificationPatterns.forEach(pattern => {
    const matches = jobDescription.match(pattern) || [];
    matches.forEach(match => {
      extractedKeywords.qualifications.push({
        keyword: match.trim(),
        frequency: 1,
        importance: 'high',
        category: 'qualification'
      });
    });
  });

  return extractedKeywords;
};

/**
 * Tokenizes text into individual words and cleans them
 * @param {string} text - Input text to tokenize
 * @returns {Array} Array of cleaned tokens
 */
export const tokenize = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !isStopWord(word));
};

/**
 * Extracts meaningful phrases from text
 * @param {string} text - Input text
 * @returns {Array} Array of phrase arrays
 */
export const extractPhrases = (text) => {
  const words = tokenize(text);
  const phrases = [];
  
  // Extract 2-3 word phrases
  for (let i = 0; i < words.length - 1; i++) {
    // Two-word phrases
    const twoWordPhrase = [words[i], words[i + 1]];
    if (isRelevantPhrase(twoWordPhrase)) {
      phrases.push(twoWordPhrase);
    }
    
    // Three-word phrases
    if (i < words.length - 2) {
      const threeWordPhrase = [words[i], words[i + 1], words[i + 2]];
      if (isRelevantPhrase(threeWordPhrase)) {
        phrases.push(threeWordPhrase);
      }
    }
  }
  
  return phrases;
};

/**
 * Counts occurrences of a keyword/phrase in text
 * @param {string} keyword - Keyword to search for
 * @param {string} text - Text to search in
 * @returns {number} Number of occurrences
 */
export const countOccurrences = (keyword, text) => {
  const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\export const countOccurrences = (keyword, text) => {
  const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;')}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

/**
 * Determines keyword importance based on frequency and context
 * @param {string} keyword - The keyword to evaluate
 * @param {number} frequency - How often it appears
 * @param {string} category - Keyword category
 * @returns {string} Importance level (high, medium, low)
 */
export const determineImportance = (keyword, frequency, category) => {
  // High importance keywords
  const highImportanceCategories = ['programming_languages', 'certifications', 'qualifications'];
  const highImportanceKeywords = [
    'required', 'must have', 'essential', 'critical', 'mandatory',
    'senior', 'lead', 'manager', 'director'
  ];

  if (highImportanceCategories.includes(category) || 
      highImportanceKeywords.some(hi => keyword.toLowerCase().includes(hi.toLowerCase()))) {
    return 'high';
  }

  // Medium importance based on frequency
  if (frequency >= 3) return 'high';
  if (frequency >= 2) return 'medium';
  return 'low';
};

/**
 * Checks if a word is a stop word (should be filtered out)
 * @param {string} word - Word to check
 * @returns {boolean} True if it's a stop word
 */
export const isStopWord = (word) => {
  const stopWords = [
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
    'after', 'above', 'below', 'between', 'among', 'will', 'would', 'should',
    'could', 'can', 'may', 'might', 'must', 'shall', 'have', 'has', 'had',
    'do', 'does', 'did', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'this', 'that', 'these', 'those', 'we', 'you', 'they', 'them', 'their'
  ];
  
  return stopWords.includes(word.toLowerCase());
};

/**
 * Checks if a phrase is relevant and meaningful
 * @param {Array} phrase - Array of words forming a phrase
 * @param {string} industry - Industry context
 * @returns {boolean} True if phrase is relevant
 */
export const isRelevantPhrase = (phrase, industry = 'general') => {
  const phraseText = phrase.join(' ');
  
  // Skip if contains only stop words
  if (phrase.every(word => isStopWord(word))) {
    return false;
  }
  
  // Common relevant phrases
  const relevantPatterns = [
    /\w+\s+(development|management|analysis|design|engineering)/,
    /\w+\s+(experience|skills|knowledge|expertise)/,
    /(project|team|data|software|web|mobile)\s+\w+/,
    /\w+\s+(certification|degree|license)/
  ];
  
  return relevantPatterns.some(pattern => pattern.test(phraseText));
};

/**
 * Compares resume keywords against job description keywords
 * @param {string} resumeText - Resume content
 * @param {Object} jobKeywords - Extracted job keywords
 * @returns {Object} Comparison results with matches and gaps
 */
export const compareKeywords = (resumeText, jobKeywords) => {
  const resumeWords = tokenize(resumeText);
  const comparison = {
    matches: [],
    gaps: [],
    suggestions: []
  };

  // Check each job keyword against resume
  Object.entries(jobKeywords).forEach(([category, keywords]) => {
    keywords.forEach(keywordObj => {
      const { keyword, importance, frequency: jobFrequency } = keywordObj;
      const resumeFrequency = countOccurrences(keyword, resumeText);
      
      if (resumeFrequency > 0) {
        comparison.matches.push({
          keyword,
          resumeFrequency,
          jobFrequency,
          importance,
          category,
          status: resumeFrequency >= jobFrequency ? 'optimal' : 'weak'
        });
      } else {
        comparison.gaps.push({
          keyword,
          jobFrequency,
          importance,
          category,
          suggestions: generateKeywordSuggestions(keyword, category)
        });
      }
    });
  });

  return comparison;
};

/**
 * Generates suggestions for missing keywords
 * @param {string} keyword - Missing keyword
 * @param {string} category - Keyword category
 * @returns {Array} Array of suggestions
 */
export const generateKeywordSuggestions = (keyword, category) => {
  const suggestions = [];
  
  // Check for synonyms
  const synonyms = synonymMapping[keyword.toLowerCase()];
  if (synonyms) {
    suggestions.push(`Consider using synonyms: ${synonyms.join(', ')}`);
  }
  
  // Category-specific suggestions
  switch (category) {
    case 'programming_languages':
      suggestions.push(`Add ${keyword} to your technical skills section`);
      suggestions.push(`Mention ${keyword} projects or experience`);
      break;
    case 'frameworks_libraries':
      suggestions.push(`Include ${keyword} in your technology stack`);
      break;
    case 'certifications':
      suggestions.push(`Consider obtaining ${keyword} certification`);
      break;
    default:
      suggestions.push(`Include ${keyword} in relevant experience descriptions`);
  }
  
  return suggestions;
};

/**
 * Extracts action verbs from text
 * @param {string} text - Text to analyze
 * @returns {Object} Action verb analysis
 */
export const analyzeActionVerbs = (text) => {
  const foundVerbs = [];
  const missingVerbs = [];
  
  Object.entries(actionVerbs).forEach(([category, verbs]) => {
    verbs.forEach(verb => {
      const frequency = countOccurrences(verb, text);
      if (frequency > 0) {
        foundVerbs.push({ verb, frequency, category });
      }
    });
  });
  
  // Suggest missing high-impact verbs
  if (foundVerbs.length < 10) {
    const recommendedVerbs = [
      'achieved', 'improved', 'increased', 'developed', 'managed',
      'led', 'optimized', 'implemented', 'delivered', 'created'
    ];
    
    recommendedVerbs.forEach(verb => {
      if (!foundVerbs.some(fv => fv.verb.toLowerCase() === verb)) {
        missingVerbs.push(verb);
      }
    });
  }
  
  return {
    found: foundVerbs,
    missing: missingVerbs.slice(0, 5),
    score: Math.min((foundVerbs.length / 15) * 100, 100)
  };
};

/**
 * Performs semantic analysis to find related terms
 * @param {string} text - Text to analyze
 * @param {Array} targetKeywords - Keywords to find semantic matches for
 * @returns {Array} Semantic matches found
 */
export const performSemanticAnalysis = (text, targetKeywords) => {
  const semanticMatches = [];
  
  targetKeywords.forEach(keyword => {
    const synonyms = synonymMapping[keyword.toLowerCase()] || [];
    const foundSynonyms = synonyms.filter(synonym => 
      text.toLowerCase().includes(synonym.toLowerCase())
    );
    
    if (foundSynonyms.length > 0) {
      semanticMatches.push({
        targetKeyword: keyword,
        foundSynonyms,
        strength: foundSynonyms.length / synonyms.length
      });
    }
  });
  
  return semanticMatches;
};

/**
 * Calculates keyword density for optimization
 * @param {string} text - Text to analyze
 * @param {Array} keywords - Keywords to check density for
 * @returns {Object} Density analysis results
 */
export const calculateKeywordDensity = (text, keywords) => {
  const totalWords = tokenize(text).length;
  const densityAnalysis = {};
  
  keywords.forEach(keyword => {
    const frequency = countOccurrences(keyword, text);
    const density = (frequency / totalWords) * 100;
    
    densityAnalysis[keyword] = {
      frequency,
      density: Math.round(density * 100) / 100,
      recommendation: getDensityRecommendation(density),
      optimal: density >= 1 && density <= 3
    };
  });
  
  return densityAnalysis;
};

/**
 * Gets recommendation based on keyword density
 * @param {number} density - Current keyword density
 * @returns {string} Recommendation message
 */
export const getDensityRecommendation = (density) => {
  if (density === 0) return 'Add this keyword to your resume';
  if (density < 1) return 'Consider increasing frequency';
  if (density > 3) return 'Reduce frequency to avoid keyword stuffing';
  return 'Optimal density';
};

/**
 * Extracts technical skills from text
 * @param {string} text - Text to analyze
 * @param {string} industry - Industry context
 * @returns {Array} Found technical skills
 */
export const extractTechnicalSkills = (text, industry = 'technology') => {
  const industryKeywords = keywordDatabase[industry];
  const technicalSkills = [];
  
  if (industryKeywords) {
    const techCategories = [
      'programming_languages', 'frameworks_libraries', 'databases', 
      'cloud_platforms', 'tools'
    ];
    
    techCategories.forEach(category => {
      if (industryKeywords[category]) {
        industryKeywords[category].forEach(skill => {
          const frequency = countOccurrences(skill, text);
          if (frequency > 0) {
            technicalSkills.push({
              skill,
              frequency,
              category,
              proficiency: estimateProficiency(skill, frequency, text)
            });
          }
        });
      }
    });
  }
  
  return technicalSkills;
};

/**
 * Estimates proficiency level based on context
 * @param {string} skill - Technical skill
 * @param {number} frequency - How often mentioned
 * @param {string} text - Full text for context
 * @returns {string} Estimated proficiency level
 */
export const estimateProficiency = (skill, frequency, text) => {
  const expertTerms = ['expert', 'advanced', 'senior', 'lead', 'architect'];
  const intermediateTerms = ['experienced', 'proficient', 'skilled'];
  const beginnerTerms = ['basic', 'beginner', 'learning', 'familiar'];
  
  const skillContext = text.toLowerCase();
  
  if (expertTerms.some(term => skillContext.includes(`${term} ${skill.toLowerCase()}`))) {
    return 'expert';
  }
  if (intermediateTerms.some(term => skillContext.includes(`${term} ${skill.toLowerCase()}`))) {
    return 'intermediate';
  }
  if (beginnerTerms.some(term => skillContext.includes(`${term} ${skill.toLowerCase()}`))) {
    return 'beginner';
  }
  
  // Estimate based on frequency
  if (frequency >= 3) return 'intermediate';
  if (frequency >= 2) return 'beginner';
  return 'mentioned';
};

export default {
  extractJobKeywords,
  tokenize,
  extractPhrases,
  countOccurrences,
  determineImportance,
  isStopWord,
  isRelevantPhrase,
  compareKeywords,
  generateKeywordSuggestions,
  analyzeActionVerbs,
  performSemanticAnalysis,
  calculateKeywordDensity,
  getDensityRecommendation,
  extractTechnicalSkills,
  estimateProficiency
};