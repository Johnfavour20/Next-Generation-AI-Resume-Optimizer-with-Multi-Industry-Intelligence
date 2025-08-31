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
      <div className="relative" style={{ width: size, height: size }}>
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
            <div className="text-3xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, trend, color = "blue", subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
          {trend && (
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100 ml-4`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const IndustryCard = ({ industry, isSelected, onClick }) => {
    const Icon = industry.icon;
    return (
      <div
        onClick={onClick}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isSelected
            ? `border-${industry.color}-500 bg-${industry.color}-50 shadow-lg`
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${industry.color}-100`}>
            <Icon className={`w-6 h-6 text-${industry.color}-600`} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{industry.name}</h4>
          </div>
        </div>
      </div>
    );
  };

  const ProgressTracker = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      <div className="space-y-4">
        {[
          { label: 'Profile Completeness', progress: 85, color: 'blue' },
          { label: 'ATS Optimization', progress: atsScore, color: 'green' },
          { label: 'Industry Alignment', progress: 72, color: 'purple' },
          { label: 'Keyword Density', progress: 68, color: 'orange' }
        ].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm text-gray-500">{item.progress}%</span>
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
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Success Rate</h3>
      <div className="h-48 flex items-end justify-between space-x-2">
        {[65, 72, 68, 80, 85, 78, 82, 88].map((height, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full transition-all duration-1000"
              style={{ height: `${(height / 100) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{`W${index + 1}`}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          88% success rate this week <span className="text-green-600">↑ 12%</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Resume Optimizer Pro</h1>
                  <p className="text-sm text-gray-500">Enterprise ATS Intelligence Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Enterprise Secured</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Templates</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Analytics</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">API</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Next-Generation AI Resume Optimizer
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                with Multi-Industry Intelligence
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced semantic matching, real-time ATS scoring, industry-specific optimization, 
              and intelligent content enhancement powered by cutting-edge machine learning algorithms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Launch Platform</span>
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>API Documentation</span>
              </button>
            </div>
            
            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Multi-Language Support', '20+ Industries', 'Real-time Analysis', 'Semantic AI', 'Enterprise Security', 'API Integration'].map((feature, index) => (
                <span key={index} className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm border border-white border-opacity-30">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Globe className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-bounce">
          <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-pulse">
          <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-12 animate-bounce">
          <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* Enhanced Tab Navigation */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'upload', label: 'Upload Resume', icon: Upload },
                  { id: 'builder', label: 'Resume Builder', icon: Edit3 },
                  { id: 'analyze', label: 'Smart Analysis', icon: Brain },
                  { id: 'results', label: 'ATS Intelligence', icon: Target },
                  { id: 'optimize', label: 'AI Optimizer', icon: Sparkles },
                  { id: 'integrations', label: 'Integrations', icon: ExternalLink }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === id
                        ? 'border-blue-600 text-blue-600 bg-white bg-opacity-50 rounded-t-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                    <p className="text-gray-600 mb-8">Track your career optimization progress and success metrics</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <AnalyticsChart />
                    </div>
                    <ProgressTracker />
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Resume analyzed - Software Engineer role</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">Keywords optimized for Data Science</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">ATS score improved to 85%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Interview Rate</span>
                          <span className="text-sm font-semibold text-green-600">78%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Rate</span>
                          <span className="text-sm font-semibold text-green-600">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Applications Sent</span>
                          <span className="text-sm font-semibold text-blue-600">23</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">• Add Python certification</p>
                        <p className="text-sm text-gray-700">• Update LinkedIn profile</p>
                        <p className="text-sm text-gray-700">• Apply to 3 more roles</p>
                      </div>
                      <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload & Analyze Resume</h3>
                    <p className="text-gray-600 mb-8">Upload your resume for advanced ATS analysis and optimization</p>
                  </div>
                  
                  <div 
                    className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Drop your resume here'}
                    </h4>
                    <p className="text-gray-600 mb-4">or click to browse files</p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500">
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Target Industry</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">File uploaded successfully!</p>
                        <p className="text-green-600 text-sm">{uploadedFile.name} is ready for analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Resume Builder Tab */}
              {activeTab === 'builder' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Resume Builder</h3>
                    <p className="text-gray-600 mb-8">Build an ATS-optimized resume with real-time scoring and suggestions</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Builder Form */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.name}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, name: e.target.value }
                            })}
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.email}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, email: e.target.value }
                            })}
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.phone}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, phone: e.target.value }
                            })}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.location}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, location: e.target.value }
                            })}
                          />
                          <input
                            type="url"
                            placeholder="LinkedIn Profile"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.linkedin}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, linkedin: e.target.value }
                            })}
                          />
                          <input
                            type="url"
                            placeholder="Website/Portfolio"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={resumeBuilder.personalInfo.website}
                            onChange={(e) => setResumeBuilder({
                              ...resumeBuilder,
                              personalInfo: { ...resumeBuilder.personalInfo, website: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-green-600" />
                          Professional Summary
                        </h4>
                        <textarea
                          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
                          value={resumeBuilder.summary}
                          onChange={(e) => setResumeBuilder({
                            ...resumeBuilder,
                            summary: e.target.value
                          })}
                        />
                        <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                          <span>AI will optimize this for ATS compatibility</span>
                          <span>{resumeBuilder.summary.length}/300 characters</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                            Experience
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Experience
                          </button>
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <input
                                type="text"
                                placeholder="Job Title"
                                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="Company Name"
                                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <textarea
                              className="w-full h-24 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Describe your achievements and responsibilities..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Eye className="w-5 h-5 mr-2 text-blue-600" />
                            Live ATS Preview
                          </div>
                          <div className="flex items-center space-x-2">
                            <ScoreCircle score={78} size={60} label="Live Score" />
                          </div>
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                          <div className="space-y-4">
                            <div className="text-center">
                              <h5 className="text-xl font-bold text-gray-900">{resumeBuilder.personalInfo.name || 'Your Name'}</h5>
                              <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mt-2">
                                {resumeBuilder.personalInfo.email && (
                                  <span className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {resumeBuilder.personalInfo.email}
                                  </span>
                                )}
                                {resumeBuilder.personalInfo.phone && (
                                  <span className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {resumeBuilder.personalInfo.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {resumeBuilder.summary && (
                              <div>
                                <h6 className="font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h6>
                                <p className="text-sm text-gray-700">{resumeBuilder.summary}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                          AI Suggestions
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Add quantifiable achievements with percentages</span>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Include industry-specific keywords</span>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                            <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Use action verbs to start bullet points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Smart Analysis Tab */}
              {activeTab === 'analyze' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Job Analysis</h3>
                    <p className="text-gray-600 mb-8">Advanced semantic analysis with industry-specific optimization</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Job Description Analysis
                      </label>
                      <textarea
                        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Paste the complete job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <Search className="w-4 h-4 mr-2" />
                            Browse Jobs
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Use Template
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          {jobDescription.length} characters
                        </div>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Options</h4>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Semantic keyword matching</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Industry-specific optimization</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Format compatibility check</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-sm text-gray-700">Bias detection analysis</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Target Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>Entry Level (0-2 years)</option>
                              <option>Mid Level (3-5 years)</option>
                              <option>Senior Level (5+ years)</option>
                              <option>Executive Level</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>Full-time</option>
                              <option>Contract</option>
                              <option>Part-time</option>
                              <option>Freelance</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={simulateAnalysis}
                        disabled={!uploadedFile || !jobDescription}
                        className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold flex items-center space-x-3 text-lg shadow-lg transform hover:scale-105"
                      >
                        <Brain className="w-6 h-6" />
                        <span>Start AI Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Results Tab */}
              {activeTab === 'results' && (
                <div className="space-y-8">
                  {!analysisComplete && (
                    <div className="text-center py-16">
                      <div className="relative">
                        <RefreshCw className="w-20 h-20 text-blue-500 mx-auto mb-6 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Analysis in Progress...</h3>
                      <p className="text-gray-600 mb-6">Processing semantic analysis and industry optimization</p>
                      <div className="flex justify-center space-x-4 text-sm text-gray-500">
                        <span>✓ Keyword extraction</span>
                        <span>✓ Format analysis</span>
                        <span>⏳ Semantic matching</span>
                        <span>⏳ Industry optimization</span>
                      </div>
                    </div>
                  )}

                  {analysisComplete && (
                    <>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis Results</h3>
                        <p className="text-gray-600 mb-8">Comprehensive ATS intelligence with industry-specific insights</p>
                      </div>

                      {/* Enhanced Score Dashboard */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
                          <ScoreCircle score={atsScore} size={140} />
                          <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Overall ATS Score</h4>
                            <p className="text-gray-600 text-sm">Excellent compatibility</p>
                            <div className="mt-3 flex justify-center">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Top 15%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
                          <ScoreCircle score={92} size={100} label="Keywords" />
                          <h4 className="text-sm font-semibold text-gray-900 mt-3">Keyword Match</h4>
                          <p className="text-gray-600 text-xs">Strong alignment</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100">
                          <ScoreCircle score={74} size={100} label="Format" />
                          <h4 className="text-sm font-semibold text-gray-900 mt-3">Format Score</h4>
                          <p className="text-gray-600 text-xs">Needs improvement</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
                          <ScoreCircle score={88} size={100} label="Industry" />
                          <h4 className="text-sm font-semibold text-gray-900 mt-3">Industry Fit</h4>
                          <p className="text-gray-600 text-xs">Excellent match</p>
                        </div>
                      </div>

                      {/* Enhanced Analysis Sections */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Keyword Analysis */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-blue-600" />
                            Advanced Keyword Analysis
                          </h4>
                          <div className="space-y-3">
                            {optimization.keywords.map((item, index) => (
                              <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-gray-900">{item.keyword}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.status === 'present' ? 'bg-green-100 text-green-700' :
                                      item.status === 'weak' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {item.status}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.importance === 'high' ? 'bg-red-100 text-red-700' :
                                      'bg-blue-100 text-blue-700'
                                    }`}>
                                      {item.importance}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                  <span>Current: {item.frequency}x</span>
                                  <span>Recommended: {item.recommended}x</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Semantic Matching */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-purple-600" />
                            Semantic Intelligence
                          </h4>
                          <div className="space-y-4">
                            {optimization.semanticMatches.map((item, index) => (
                              <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                                <div className="font-medium text-gray-900 mb-2">{item.original}</div>
                                <div className="flex flex-wrap gap-2">
                                  {item.alternatives.map((alt, altIndex) => (
                                    <span key={altIndex} className="px-2 py-1 bg-white text-purple-700 rounded text-xs font-medium">
                                      {alt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comprehensive Suggestions */}
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                          <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
                          AI-Powered Enhancement Recommendations
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Content Improvements</h5>
                            <div className="space-y-2">
                              {optimization.suggestions.slice(0, 3).map((suggestion, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{suggestion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Industry-Specific Tips</h5>
                            <div className="space-y-2">
                              {optimization.industrySpecific.slice(0, 3).map((tip, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                                  <Building2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Enhanced Optimize Tab */}
              {activeTab === 'optimize' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Resume Optimizer</h3>
                    <p className="text-gray-600 mb-8">Apply intelligent improvements with one-click optimization</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Quick Fixes */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                          Quick Fixes
                          <span className="ml-auto text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            +12 ATS Points
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {[
                            { fix: 'Remove formatting tables', impact: '+3 points', status: 'ready' },
                            { fix: 'Add missing keywords', impact: '+5 points', status: 'ready' },
                            { fix: 'Optimize section headers', impact: '+2 points', status: 'ready' },
                            { fix: 'Improve keyword density', impact: '+2 points', status: 'ready' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <div>
                                <span className="text-gray-700">{item.fix}</span>
                                <div className="text-xs text-green-600">{item.impact}</div>
                              </div>
                              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                                Apply
                              </button>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Apply All Quick Fixes
                        </button>
                      </div>

                      {/* Advanced Enhancements */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-green-500" />
                          AI Content Enhancement
                          <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                            Premium
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {[
                            { enhancement: 'Rewrite bullet points with action verbs', complexity: 'Advanced' },
                            { enhancement: 'Add quantifiable achievements', complexity: 'Medium' },
                            { enhancement: 'Optimize for industry trends', complexity: 'Expert' },
                            { enhancement: 'Enhance technical skills section', complexity: 'Medium' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <div>
                                <span className="text-gray-700">{item.enhancement}</span>
                                <div className="text-xs text-purple-600">{item.complexity}</div>
                              </div>
                              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Enhance
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Preview */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Eye className="w-5 h-5 mr-2 text-blue-600" />
                          Optimized Preview
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Before:</span>
                          <ScoreCircle score={78} size={40} label="" />
                          <span className="text-sm text-gray-500">After:</span>
                          <ScoreCircle score={92} size={40} label="" />
                        </div>
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto border-2 border-dashed border-gray-300">
                        <div className="text-center text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-medium">Optimized Resume Preview</p>
                          <p className="text-sm mt-1">Apply enhancements to see the improved version</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Text
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Version Comparison */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                      Before vs After Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">78%</div>
                        <div className="text-sm text-gray-600 mb-3">Original Score</div>
                        <div className="text-xs text-gray-500">
                          • Missing keywords<br/>
                          • Format issues<br/>
                          • Weak descriptions
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-4xl text-green-500">→</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
                        <div className="text-sm text-gray-600 mb-3">Optimized Score</div>
                        <div className="text-xs text-gray-500">
                          • Complete keywords<br/>
                          • ATS-friendly format<br/>
                          • Strong achievements
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Integrations</h3>
                    <p className="text-gray-600 mb-8">Connect with job boards and career platforms for seamless application workflow</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'LinkedIn', icon: Users, connected: true, color: 'blue', jobs: '2.5M+' },
                      { name: 'Indeed', icon: Search, connected: true, color: 'blue', jobs: '1.8M+' },
                      { name: 'Glassdoor', icon: Building2, connected: false, color: 'green', jobs: '900K+' },
                      { name: 'Monster', icon: Briefcase, connected: false, color: 'purple', jobs: '650K+' },
                      { name: 'ZipRecruiter', icon: Zap, connected: true, color: 'orange', jobs: '1.2M+' },
                      { name: 'AngelList', icon: Star, connected: false, color: 'red', jobs: '150K+' }
                    ].map((platform, index) => (
                      <div key={index} className={`bg-white rounded-xl p-6 border-2 shadow-lg transition-all duration-300 hover:shadow-xl ${
                        platform.connected ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-${platform.color}-100`}>
                              <platform.icon className={`w-6 h-6 text-${platform.color}-600`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                              <p className="text-sm text-gray-500">{platform.jobs} jobs</p>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            platform.connected ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        </div>
                        <button className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                          platform.connected 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {platform.connected ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* API Integration */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Code className="w-6 h-6 mr-3 text-indigo-600" />
                      Developer API Integration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Available APIs</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                            <Code className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-700">Resume Analysis API</span>
                            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                            <Target className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-700">ATS Scoring API</span>
                            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                            <Brain className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-700">Keyword Extraction API</span>
                            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Beta</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Quick Start</h5>
                        <div className="bg-gray-900 rounded-lg p-4 text-sm">
                          <div className="text-green-400 mb-2">// Initialize API client</div>
                          <div className="text-blue-300">const</div>
                          <div className="text-white"> client = </div>
                          <div className="text-yellow-300">new</div>
                          <div className="text-white"> ResumeOptimizer(apiKey);</div>
                          <br/>
                          <div className="text-green-400 mb-2">// Analyze resume</div>
                          <div className="text-blue-300">const</div>
                          <div className="text-white"> result = </div>
                          <div className="text-blue-300">await</div>
                          <div className="text-white"> client.analyze(resume);</div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          Get API Key
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6">Enterprise-Grade Features</h3>
            <p className="text-blue-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Advanced AI technology meets comprehensive career development tools to deliver 
              unmatched resume optimization and job matching capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'Semantic AI Analysis',
                description: 'Advanced NLP understands context and meaning beyond simple keyword matching'
              },
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Process resumes and job descriptions in 25+ languages with cultural adaptations'
              },
              {
                icon: Building2,
                title: '20+ Industry Templates',
                description: 'Specialized optimization for healthcare, tech, finance, and more industries'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade encryption with GDPR compliance and data protection'
              },
              {
                icon: Zap,
                title: 'Real-Time Processing',
                description: 'Instant analysis and feedback with millisecond response times'
              },
              {
                icon: LineChart,
                title: 'Advanced Analytics',
                description: 'Comprehensive dashboards with success metrics and trend analysis'
              },
              {
                icon: ExternalLink,
                title: 'API Integration',
                description: 'Robust APIs for seamless integration with existing HR systems'
              },
              {
                icon: Users,
                title: 'Collaboration Tools',
                description: 'Team features for career centers and recruitment agencies'
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{title}</h4>
                <p className="text-blue-100 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <h4 className="text-2xl font-bold mb-4">Ready to Transform Your Career?</h4>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of professionals who have optimized their resumes and landed their dream jobs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Resume Optimizer Pro</span>
                  <div className="text-sm text-gray-400">Enterprise Edition</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering professionals worldwide with AI-driven resume optimization, 
                multi-industry intelligence, and enterprise-grade career development tools.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">GDPR Compliant</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-lg">Product</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-lg">Support</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-lg">Company</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Resume Optimizer Pro. All rights reserved. | Developed by AMAECHI CHUKWUEMEKA QUINCY
              </p>
              <div className="flex items-center space-x-6 text-gray-400">
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">99.9% Uptime</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">250K+ Users</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">4.9/5 Rating</span>
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