import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Target, BarChart3, CheckCircle, AlertCircle, Download, Sparkles, Brain, Users, TrendingUp, Award, Eye, RefreshCw, Search, Filter, BookOpen, Lightbulb, Settings, Globe, Building2, Zap, LineChart, PieChart, Calendar, Mail, Phone, MapPin, User, Edit3, Plus, Minus, Save, Copy, Share2, ExternalLink, Shield, Lock, Clock, Star, ThumbsUp, MessageCircle, Briefcase, GraduationCap, Code, Palette, Heart, DollarSign, Truck, Camera, Mic } from 'lucide-react';

const ATSResumeOptimizer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [resumeBuilder, setResumeBuilder] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    experience: [],
    education: [],
    skills: [],
    summary: ''
  });
  const [optimization, setOptimization] = useState({
    keywords: [],
    formatIssues: [],
    suggestions: [],
    industrySpecific: [],
    semanticMatches: []
  });
  const fileInputRef = useRef(null);

  const industries = [
    { id: 'technology', name: 'Technology & IT', icon: Code, color: 'blue' },
    { id: 'healthcare', name: 'Healthcare & Medical', icon: Heart, color: 'red' },
    { id: 'finance', name: 'Finance & Banking', icon: DollarSign, color: 'green' },
    { id: 'marketing', name: 'Marketing & Sales', icon: TrendingUp, color: 'purple' },
    { id: 'design', name: 'Design & Creative', icon: Palette, color: 'pink' },
    { id: 'education', name: 'Education & Training', icon: GraduationCap, color: 'yellow' },
    { id: 'logistics', name: 'Logistics & Supply Chain', icon: Truck, color: 'orange' },
    { id: 'media', name: 'Media & Communications', icon: Camera, color: 'indigo' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setActiveTab('analyze');
    }
  };

  const simulateAnalysis = () => {
    setAnalysisComplete(false);
    setTimeout(() => {
      setAtsScore(85);
      setOptimization({
        keywords: [
          { keyword: 'Python', status: 'missing', importance: 'high', frequency: 0, recommended: 3 },
          { keyword: 'Machine Learning', status: 'present', importance: 'high', frequency: 2, recommended: 4 },
          { keyword: 'Data Analysis', status: 'weak', importance: 'medium', frequency: 1, recommended: 3 },
          { keyword: 'SQL', status: 'missing', importance: 'medium', frequency: 0, recommended: 2 },
          { keyword: 'TensorFlow', status: 'missing', importance: 'high', frequency: 0, recommended: 2 },
          { keyword: 'Deep Learning', status: 'present', importance: 'high', frequency: 1, recommended: 2 }
        ],
        formatIssues: [
          'Remove tables and columns for better ATS parsing',
          'Use standard section headers (Experience, Education, Skills)',
          'Avoid special characters in contact information',
          'Convert PDF to .docx format for optimal compatibility'
        ],
        suggestions: [
          'Add quantifiable achievements (increased efficiency by 25%)',
          'Include specific programming frameworks and tools',
          'Use industry-standard job titles',
          'Add relevant certifications and training',
          'Strengthen summary with 3-4 key accomplishments',
          'Include soft skills relevant to leadership roles'
        ],
        industrySpecific: [
          'Add cloud platform experience (AWS, Azure, GCP)',
          'Include version control systems (Git, SVN)',
          'Mention agile methodologies and project management',
          'Add API development and integration experience'
        ],
        semanticMatches: [
          { original: 'Data Science', alternatives: ['Analytics', 'Business Intelligence', 'Statistical Analysis'] },
          { original: 'Software Development', alternatives: ['Programming', 'Coding', 'Application Development'] },
          { original: 'Project Management', alternatives: ['Project Coordination', 'Team Leadership', 'Delivery Management'] }
        ]
      });
      setAnalysisComplete(true);
      setActiveTab('results');
    }, 3000);
  };

  const ScoreCircle = ({ score, size = 120, label = "ATS Score" }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative flex justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(229 231 235)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke={score >= 80 ? "rgb(34 197 94)" : score >= 60 ? "rgb(251 146 60)" : "rgb(239 68 68)"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{score}</div>
            <div className="text-xs sm:text-sm text-gray-500">{label}</div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, trend, color = "blue", subtitle }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</p>
          {subtitle && <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">{subtitle}</p>}
          {trend && (
            <p className="text-green-600 text-xs sm:text-sm mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{trend}</span>
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-xl bg-${color}-100 ml-2 sm:ml-4 flex-shrink-0`}>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const IndustryCard = ({ industry, isSelected, onClick }) => {
    const Icon = industry.icon;
    return (
      <div
        onClick={onClick}
        className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isSelected
            ? `border-${industry.color}-500 bg-${industry.color}-50 shadow-lg`
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`p-1.5 sm:p-2 rounded-lg bg-${industry.color}-100 flex-shrink-0`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${industry.color}-600`} />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{industry.name}</h4>
          </div>
        </div>
      </div>
    );
  };

  const ProgressTracker = () => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      <div className="space-y-3 sm:space-y-4">
        {[
          { label: 'Profile Completeness', progress: 85, color: 'blue' },
          { label: 'ATS Optimization', progress: atsScore, color: 'green' },
          { label: 'Industry Alignment', progress: 72, color: 'purple' },
          { label: 'Keyword Density', progress: 68, color: 'orange' }
        ].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-xs sm:text-sm text-gray-500">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-1000`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsChart = () => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Application Success Rate</h3>
      <div className="h-32 sm:h-48 flex items-end justify-between space-x-1 sm:space-x-2">
        {[65, 72, 68, 80, 85, 78, 82, 88].map((height, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full transition-all duration-1000"
              style={{ height: `${(height / 100) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-1 sm:mt-2">{`W${index + 1}`}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs sm:text-sm text-gray-600">
          88% success rate this week <span className="text-green-600">↑ 12%</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">Resume Optimizer</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Enterprise ATS Intelligence Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    <span className="hidden sm:inline">{lang.flag} {lang.name}</span>
                    <span className="sm:hidden">{lang.flag}</span>
                  </option>
                ))}
              </select>

              <div className="hidden lg:flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Enterprise Secured</span>
              </div>

              <nav className="hidden xl:flex space-x-6">
                <a href="#" className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-sm">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Templates</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Analytics</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">API</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight px-2">
              Intelligent Resume Optimizer for <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ATS Compatibility</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Transform your resume into an ATS-friendly powerhouse with AI-driven optimization, real-time keyword analysis, and intelligent formatting suggestions that get you noticed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Launch Platform</span>
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span className="hidden sm:inline">API Documentation</span>
                <span className="sm:hidden">API Docs</span>
              </button>
            </div>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
              {['Multi-Language', '20+ Industries', 'Real-time Analysis', 'Semantic AI', 'Enterprise Security', 'API Integration'].map((feature, index) => (
                <span key={index} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white bg-opacity-20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white border-opacity-30">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced floating elements - hidden on small screens */}
        <div className="absolute top-20 left-4 lg:left-10 animate-pulse hidden lg:block">
          <div className="p-2 lg:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-8 lg:right-16 animate-bounce hidden lg:block">
          <div className="p-2 lg:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 left-8 lg:left-20 animate-pulse hidden lg:block">
          <div className="p-2 lg:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-4 lg:right-12 animate-bounce hidden lg:block">
          <div className="p-2 lg:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <StatCard
              icon={Users}
              title="Global Users"
              value="250,000+"
              trend="+28% this quarter"
              color="blue"
              subtitle="Across 45 countries"
            />
            <StatCard
              icon={FileText}
              title="Resumes Optimized"
              value="1.2M+"
              trend="+45% this quarter"
              color="green"
              subtitle="Multi-language support"
            />
            <StatCard
              icon={Target}
              title="Average Success Rate"
              value="92%"
              trend="+8% improvement"
              color="purple"
              subtitle="Industry-optimized"
            />
            <StatCard
              icon={Building2}
              title="Enterprise Clients"
              value="500+"
              trend="+35% this quarter"
              color="orange"
              subtitle="Fortune 1000 companies"
            />
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

            {/* Enhanced Tab Navigation */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <nav className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 lg:space-x-8 px-4 sm:px-8 whitespace-nowrap">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, shortLabel: 'Dashboard' },
                  { id: 'upload', label: 'Upload Resume', icon: Upload, shortLabel: 'Upload' },
                  { id: 'builder', label: 'Resume Builder', icon: Edit3, shortLabel: 'Builder' },
                  { id: 'analyze', label: 'Smart Analysis', icon: Brain, shortLabel: 'Analyze' },
                  { id: 'results', label: 'ATS Intelligence', icon: Target, shortLabel: 'Results' },
                  { id: 'optimize', label: 'AI Optimizer', icon: Sparkles, shortLabel: 'Optimize' },
                  { id: 'integrations', label: 'Integrations', icon: ExternalLink, shortLabel: 'API' }
                ].map(({ id, label, icon: Icon, shortLabel }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`py-3 sm:py-4 px-2 sm:px-3 lg:px-4 border-b-2 font-medium text-xs sm:text-sm transition-all duration-300 flex items-center space-x-1 sm:space-x-2 min-w-max ${
                      activeTab === id
                        ? 'border-blue-600 text-blue-600 bg-white bg-opacity-50 rounded-t-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{shortLabel}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Track your career optimization progress and success metrics</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="lg:col-span-2">
                      <AnalyticsChart />
                    </div>
                    <div className="order-first lg:order-last">
                      <ProgressTracker />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Recent Activity</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-700">Resume analyzed - Software Engineer role</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-700">Keywords optimized for Data Science</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-700">ATS score improved to 85%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600">Interview Rate</span>
                          <span className="text-xs sm:text-sm font-semibold text-green-600">78%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600">Response Rate</span>
                          <span className="text-xs sm:text-sm font-semibold text-green-600">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600">Applications Sent</span>
                          <span className="text-xs sm:text-sm font-semibold text-blue-600">23</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100 md:col-span-2 xl:col-span-1">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-gray-700">• Add Python certification</p>
                        <p className="text-xs sm:text-sm text-gray-700">• Update LinkedIn profile</p>
                        <p className="text-xs sm:text-sm text-gray-700">• Apply to 3 more roles</p>
                      </div>
                      <button className="mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm hover:bg-purple-700 transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Upload & Analyze Resume</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Upload your resume for advanced ATS analysis and optimization</p>
                  </div>

                  <div
                    className="border-2 border-dashed border-blue-300 rounded-xl p-8 sm:p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Drop your resume here'}
                    </h4>
                    <p className="text-gray-600 mb-4">or click to browse files</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span>✓ PDF</span>
                      <span>✓ DOC/DOCX</span>
                      <span>✓ TXT</span>
                      <span>✓ Multi-language</span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </div>

                  {/* Industry Selection */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Select Target Industry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                      {industries.map((industry) => (
                        <IndustryCard
                          key={industry.id}
                          industry={industry}
                          isSelected={selectedIndustry === industry.id}
                          onClick={() => setSelectedIndustry(industry.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-green-800 text-sm sm:text-base">File uploaded successfully!</p>
                        <p className="text-green-600 text-xs sm:text-sm truncate">{uploadedFile.name} is ready for analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Resume Builder Tab */}
              {activeTab === 'builder' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">AI-Powered Resume Builder</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Build an ATS-optimized resume with real-time scoring and suggestions</p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                    {/* Builder Form */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                          Personal Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            value={resumeBuilder.personalInfo.name}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, name: e.target.value }
                            })}
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            value={resumeBuilder.personalInfo.email}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, email: e.target.value }
                            })}
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            value={resumeBuilder.personalInfo.phone}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, phone: e.target.value }
                            })}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            value={resumeBuilder.personalInfo.location}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, location: e.target.value }
                            })}
                          />
                          <input
                            type="url"
                            placeholder="LinkedIn Profile"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base sm:col-span-2"
                            value={resumeBuilder.personalInfo.linkedin}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, linkedin: e.target.value }
                            })}
                          />
                          <input
                            type="url"
                            placeholder="Website/Portfolio"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base sm:col-span-2"
                            value={resumeBuilder.personalInfo.website}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, website: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                          Professional Summary
                        </h4>
                        <textarea
                          className="w-full h-24 sm:h-32 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
                          value={resumeBuilder.summary}
                          onChange={(e) => setResumeBuilder({
                            ...resumeBuilder,
                            summary: e.target.value
                          })}
                        />
                        <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                          <span>AI will optimize this for ATS compatibility</span>
                          <span>{resumeBuilder.summary.length}/300 characters</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                            Experience
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors flex items-center">
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Add Experience</span>
                            <span className="sm:hidden">Add</span>
                          </button>
                        </h4>
                        <div className="text-center py-8 text-gray-500">
                          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">Click "Add Experience" to get started</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
                        Live Preview
                      </h4>
                      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner min-h-96">
                        <div className="text-center text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-sm">Your resume preview will appear here as you build it</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analyze Tab */}
              {activeTab === 'analyze' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Smart Resume Analysis</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Paste a job description to get targeted optimization recommendations</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Job Description</h4>
                        <textarea
                          className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Paste the job description here to get targeted ATS optimization..."
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="mt-3 flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={simulateAnalysis}
                            disabled={!uploadedFile || !jobDescription}
                            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                          >
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Analyze Resume</span>
                          </button>
                          <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                            <span className="hidden sm:inline">Upload Different Resume</span>
                            <span className="sm:hidden">Upload</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Analysis Preview</h4>
                      {!analysisComplete ? (
                        <div className="text-center py-8 sm:py-12">
                          <Brain className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-indigo-400 opacity-50" />
                          <p className="text-gray-600 text-sm sm:text-base">Upload a resume and job description to start analysis</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <ScoreCircle score={atsScore} size={100} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm sm:text-base text-gray-600">
                              Your resume scores <span className="font-semibold text-green-600">{atsScore}%</span> for ATS compatibility
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Results Tab */}
              {activeTab === 'results' && analysisComplete && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">ATS Intelligence Report</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Comprehensive analysis with actionable optimization recommendations</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Score Overview */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100 text-center">
                      <ScoreCircle score={atsScore} size={120} />
                      <div className="mt-4">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">Overall ATS Score</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Improvement'}
                        </p>
                      </div>
                    </div>

                    {/* Keywords Analysis */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                        Keyword Analysis
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-64 overflow-y-auto">
                        {optimization.keywords.map((item, index) => (
                          <div key={index} className={`p-3 sm:p-4 rounded-lg border-2 ${
                            item.status === 'missing' ? 'border-red-200 bg-red-50' :
                            item.status === 'weak' ? 'border-orange-200 bg-orange-50' :
                            'border-green-200 bg-green-50'
                          }`}>
                            <div className="flex items-center justify-between mb-1 sm:mb-2">
                              <span className="font-medium text-gray-900 text-sm sm:text-base">{item.keyword}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                item.importance === 'high' ? 'bg-red-100 text-red-700' :
                                item.importance === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {item.importance}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                              <span>Current: {item.frequency}</span>
                              <span>Recommended: {item.recommended}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                        Format Issues
                      </h4>
                      <div className="space-y-2 sm:space-y-3 max-h-48 overflow-y-auto">
                        {optimization.formatIssues.map((issue, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 sm:p-3 bg-orange-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-700">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-600" />
                        Optimization Suggestions
                      </h4>
                      <div className="space-y-2 sm:space-y-3 max-h-48 overflow-y-auto">
                        {optimization.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 sm:p-3 bg-yellow-50 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-700">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                      onClick={() => setActiveTab('optimize')}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Apply Optimizations</span>
                    </button>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Optimize Tab */}
              {activeTab === 'optimize' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">AI Resume Optimizer</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Apply intelligent optimizations to boost your ATS compatibility</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-green-800 text-sm sm:text-base">Optimization Complete!</h4>
                          <p className="text-green-600 text-xs sm:text-sm">Your resume has been optimized for ATS systems</p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Download</span>
                        </button>
                        <button className="px-3 sm:px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2">
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm sm:text-base">
                      Ready to apply? Your optimized resume is now <span className="font-semibold text-green-600">92% ATS compatible</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Platform Integrations</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 px-4">Connect with your favorite job boards and applicant tracking systems</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { name: 'LinkedIn', icon: Users, color: 'blue', status: 'Connected' },
                      { name: 'Indeed', icon: Search, color: 'indigo', status: 'Available' },
                      { name: 'Glassdoor', icon: Building2, color: 'green', status: 'Available' },
                      { name: 'AngelList', icon: TrendingUp, color: 'purple', status: 'Available' },
                      { name: 'Monster', icon: Eye, color: 'orange', status: 'Available' },
                      { name: 'ZipRecruiter', icon: Zap, color: 'red', status: 'Available' }
                    ].map((integration, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-${integration.color}-100`}>
                              <integration.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${integration.color}-600`} />
                            </div>
                            <span className="font-semibold text-gray-900 text-sm sm:text-base">{integration.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            integration.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {integration.status}
                          </span>
                        </div>
                        <button className={`w-full py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                          integration.status === 'Connected' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                          {integration.status === 'Connected' ? 'Manage Connection' : 'Connect Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 sm:py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Resume Optimizer</h3>
                  <p className="text-xs sm:text-sm text-gray-400">AI-Powered ATS Platform</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Get your resume noticed by employers worldwide with our intelligent optimization tools.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Optimization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API for Developers</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
                © 2025 Resume Optimizer. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-400">
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">99.9% Uptime</span>
                </span>
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">250K+ Users</span>
                </span>
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">4.9/5 Rating</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ATSResumeOptimizer;
