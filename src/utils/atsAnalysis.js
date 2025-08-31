// ATS Analysis utility functions
import { keywordDatabase, analyzeKeywords, synonymMapping } from '../data/keywords.js';
import { scoringCriteria, calculateATSScore } from '../data/templates.js';

/**
 * Performs comprehensive ATS analysis on resume content
 * @param {string} resumeText - The resume text content
 * @param {string} jobDescription - The job description text
 * @param {string} industry - Target industry
 * @returns {Object} Analysis results with score and recommendations
 */
export const performATSAnalysis = (resumeText, jobDescription, industry = 'general') => {
  const analysis = {
    overallScore: 0,
    categoryScores: {},
    keywords: [],
    formatIssues: [],
    suggestions: [],
    industrySpecific: [],
    semanticMatches: []
  };

  try {
    // Keyword Analysis
    const keywordAnalysis = analyzeKeywords(resumeText, jobDescription, industry);
    analysis.keywords = [...keywordAnalysis.missing, ...keywordAnalysis.weak, ...keywordAnalysis.present];
    
    // Format Analysis
    const formatAnalysis = analyzeFormat(resumeText);
    analysis.formatIssues = formatAnalysis.issues;
    analysis.categoryScores.format = formatAnalysis.score;

    // Content Analysis
    const contentAnalysis = analyzeContent(resumeText, jobDescription);
    analysis.categoryScores.content = contentAnalysis.score;
    analysis.suggestions = contentAnalysis.suggestions;

    // Industry-specific Analysis
    const industryAnalysis = analyzeIndustryFit(resumeText, industry);
    analysis.industrySpecific = industryAnalysis.recommendations;
    analysis.categoryScores.industry = industryAnalysis.score;

    // Semantic Matching
    analysis.semanticMatches = generateSemanticMatches(resumeText, jobDescription);

    // Calculate Overall Score
    analysis.overallScore = calculateOverallScore(analysis.categoryScores);

    return analysis;
  } catch (error) {
    console.error('Error performing ATS analysis:', error);
    return generateMockAnalysis(industry);
  }
};

/**
 * Analyzes resume format for ATS compatibility
 * @param {string} resumeText - The resume text content
 * @returns {Object} Format analysis results
 */
export const analyzeFormat = (resumeText) => {
  const issues = [];
  let score = 100;

  // Check for common format issues
  const formatChecks = [
    {
      pattern: /\|/g,
      issue: 'Contains pipe characters that may confuse ATS parsing',
      penalty: 10
    },
    {
      pattern: /\t/g,
      issue: 'Contains tab characters - use spaces for alignment',
      penalty: 5
    },
    {
      pattern: /[@#$%^&*()]/g,
      issue: 'Contains special characters in contact information',
      penalty: 8
    },
    {
      pattern: /\b(table|column|textbox)\b/gi,
      issue: 'References to tables or columns detected - avoid complex layouts',
      penalty: 15
    }
  ];

  formatChecks.forEach(check => {
    if (check.pattern.test(resumeText)) {
      issues.push(check.issue);
      score -= check.penalty;
    }
  });

  // Check section headers
  const standardHeaders = ['experience', 'education', 'skills', 'summary'];
  const hasStandardHeaders = standardHeaders.some(header => 
    resumeText.toLowerCase().includes(header)
  );

  if (!hasStandardHeaders) {
    issues.push('Use standard section headers (Experience, Education, Skills)');
    score -= 20;
  }

  return {
    score: Math.max(score, 0),
    issues: issues.slice(0, 5) // Limit to 5 most important issues
  };
};

/**
 * Analyzes resume content quality and relevance
 * @param {string} resumeText - The resume text content
 * @param {string} jobDescription - The job description text
 * @returns {Object} Content analysis results
 */
export const analyzeContent = (resumeText, jobDescription) => {
  const suggestions = [];
  let score = 80; // Base score

  // Check for quantified achievements
  const numberPattern = /\b\d+(\.\d+)?%?\b/g;
  const numbers = resumeText.match(numberPattern) || [];
  
  if (numbers.length < 3) {
    suggestions.push('Add quantifiable achievements with specific metrics and percentages');
    score -= 15;
  }

  // Check for action verbs
  const actionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'improved', 'increased',
    'created', 'implemented', 'optimized', 'delivered', 'designed'
  ];
  
  const verbCount = actionVerbs.filter(verb => 
    resumeText.toLowerCase().includes(verb)
  ).length;

  if (verbCount < 5) {
    suggestions.push('Use more action verbs to start bullet points and descriptions');
    score -= 10;
  }

  // Check resume length
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 200) {
    suggestions.push('Resume appears too short - add more detail about experiences');
    score -= 20;
  } else if (wordCount > 800) {
    suggestions.push('Resume may be too long - consider condensing to key achievements');
    score -= 10;
  }

  // Check for passive voice
  const passiveIndicators = ['was', 'were', 'been', 'being'];
  const passiveCount = passiveIndicators.filter(word => 
    resumeText.toLowerCase().split(/\s+/).includes(word)
  ).length;

  if (passiveCount > wordCount / 50) {
    suggestions.push('Reduce passive voice - use active voice for stronger impact');
    score -= 8;
  }

  return {
    score: Math.max(score, 0),
    suggestions: suggestions.slice(0, 6)
  };
};

/**
 * Analyzes industry-specific fit and requirements
 * @param {string} resumeText - The resume text content
 * @param {string} industry - Target industry
 * @returns {Object} Industry analysis results
 */
export const analyzeIndustryFit = (resumeText, industry) => {
  const recommendations = [];
  let score = 75;

  const industryKeywords = keywordDatabase[industry];
  
  if (industryKeywords) {
    const allKeywords = Object.values(industryKeywords).flat();
    const presentKeywords = allKeywords.filter(keyword => 
      resumeText.toLowerCase().includes(keyword.toLowerCase())
    );

    const keywordCoverage = presentKeywords.length / allKeywords.length;
    
    if (keywordCoverage < 0.1) {
      recommendations.push(`Add more ${industry}-specific keywords and terminology`);
      score -= 25;
    } else if (keywordCoverage < 0.2) {
      recommendations.push(`Include additional ${industry} technologies and skills`);
      score -= 15;
    }

    // Industry-specific recommendations
    switch (industry) {
      case 'technology':
        if (!resumeText.toLowerCase().includes('github') && 
            !resumeText.toLowerCase().includes('portfolio')) {
          recommendations.push('Consider adding GitHub profile or portfolio link');
        }
        if (!resumeText.toLowerCase().includes('agile') && 
            !resumeText.toLowerCase().includes('scrum')) {
          recommendations.push('Add experience with Agile/Scrum methodologies');
        }
        break;
      
      case 'healthcare':
        if (!resumeText.toLowerCase().includes('license') && 
            !resumeText.toLowerCase().includes('certification')) {
          recommendations.push('Ensure all relevant licenses and certifications are listed');
        }
        if (!resumeText.toLowerCase().includes('patient')) {
          recommendations.push('Emphasize patient care experience and outcomes');
        }
        break;
      
      case 'finance':
        if (!resumeText.toLowerCase().includes('cfa') && 
            !resumeText.toLowerCase().includes('frm') &&
            !resumeText.toLowerCase().includes('cpa')) {
          recommendations.push('Consider adding relevant financial certifications');
        }
        if (!/\$[\d,]+/.test(resumeText)) {
          recommendations.push('Quantify financial achievements with dollar amounts');
        }
        break;
    }
  }

  return {
    score: Math.max(score, 0),
    recommendations: recommendations.slice(0, 4)
  };
};

/**
 * Generates semantic matches between resume and job description
 * @param {string} resumeText - The resume text content
 * @param {string} jobDescription - The job description text
 * @returns {Array} Semantic match suggestions
 */
export const generateSemanticMatches = (resumeText, jobDescription) => {
  const matches = [];
  
  Object.entries(synonymMapping).forEach(([original, alternatives]) => {
    if (jobDescription.toLowerCase().includes(original.toLowerCase())) {
      const hasAlternatives = alternatives.some(alt => 
        resumeText.toLowerCase().includes(alt.toLowerCase())
      );
      
      if (!resumeText.toLowerCase().includes(original.toLowerCase()) && hasAlternatives) {
        matches.push({
          original,
          alternatives: alternatives.filter(alt => 
            resumeText.toLowerCase().includes(alt.toLowerCase())
          )
        });
      }
    }
  });
  
  return matches.slice(0, 5);
};

/**
 * Calculates overall ATS score from category scores
 * @param {Object} categoryScores - Scores for each category
 * @returns {number} Overall score (0-100)
 */
export const calculateOverallScore = (categoryScores) => {
  const weights = {
    format: 0.25,
    content: 0.35,
    keywords: 0.30,
    industry: 0.10
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([category, weight]) => {
    if (categoryScores[category] !== undefined) {
      totalScore += categoryScores[category] * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

/**
 * Generates mock analysis for demonstration purposes
 * @param {string} industry - Target industry
 * @returns {Object} Mock analysis results
 */
export const generateMockAnalysis = (industry = 'technology') => {
  return {
    overallScore: 78 + Math.floor(Math.random() * 15),
    categoryScores: {
      format: 85,
      content: 72,
      keywords: 68,
      industry: 88
    },
    keywords: [
      { keyword: 'Python', status: 'missing', importance: 'high', frequency: 0, recommended: 3 },
      { keyword: 'Machine Learning', status: 'present', importance: 'high', frequency: 2, recommended: 4 },
      { keyword: 'Data Analysis', status: 'weak', importance: 'medium', frequency: 1, recommended: 3 },
      { keyword: 'SQL', status: 'missing', importance: 'medium', frequency: 0, recommended: 2 }
    ],
    formatIssues: [
      'Remove tables and columns for better ATS parsing',
      'Use standard section headers (Experience, Education, Skills)',
      'Avoid special characters in contact information'
    ],
    suggestions: [
      'Add quantifiable achievements (increased efficiency by 25%)',
      'Include specific programming frameworks and tools',
      'Use industry-standard job titles',
      'Add relevant certifications and training'
    ],
    industrySpecific: [
      'Add cloud platform experience (AWS, Azure, GCP)',
      'Include version control systems (Git, SVN)',
      'Mention agile methodologies and project management'
    ],
    semanticMatches: [
      { original: 'Data Science', alternatives: ['Analytics', 'Business Intelligence'] },
      { original: 'Software Development', alternatives: ['Programming', 'Coding'] }
    ]
  };
};

/**
 * Optimizes resume content based on analysis results
 * @param {string} resumeText - Original resume text
 * @param {Object} analysisResults - Results from ATS analysis
 * @returns {Object} Optimization suggestions and improved content
 */
export const generateOptimizationSuggestions = (resumeText, analysisResults) => {
  const optimizations = {
    quickFixes: [],
    contentEnhancements: [],
    keywordSuggestions: [],
    formatImprovements: []
  };

  // Quick fixes based on format issues
  analysisResults.formatIssues.forEach(issue => {
    optimizations.quickFixes.push({
      issue,
      impact: '+2-5 ATS points',
      action: 'Apply formatting fix'
    });
  });

  // Content enhancements
  analysisResults.suggestions.forEach(suggestion => {
    optimizations.contentEnhancements.push({
      suggestion,
      complexity: 'Medium',
      impact: '+3-8 ATS points'
    });
  });

  // Keyword suggestions
  analysisResults.keywords
    .filter(k => k.status === 'missing' || k.status === 'weak')
    .forEach(keyword => {
      optimizations.keywordSuggestions.push({
        keyword: keyword.keyword,
        currentFrequency: keyword.frequency,
        recommendedFrequency: keyword.recommended,
        importance: keyword.importance
      });
    });

  return optimizations;
};

export default {
  performATSAnalysis,
  analyzeFormat,
  analyzeContent,
  analyzeIndustryFit,
  generateSemanticMatches,
  calculateOverallScore,
  generateMockAnalysis,
  generateOptimizationSuggestions
};