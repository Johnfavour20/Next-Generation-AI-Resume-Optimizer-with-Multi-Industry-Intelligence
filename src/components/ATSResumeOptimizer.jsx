import React, { useState, useRef } from 'react';
import { Upload, FileText, Target, BarChart3, CheckCircle, AlertCircle, Download, Sparkles, Brain, Users, TrendingUp, Eye, RefreshCw, Search, BookOpen, Lightbulb, Globe, Building2, Zap, LineChart, Mail, Phone, User, Edit3, Plus, Copy, ExternalLink, Shield, Lock, Clock, Star, Briefcase, GraduationCap, Code, Palette, Heart, DollarSign, Truck, Camera, Settings } from 'lucide-react';

const ATSResumeOptimizer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  // Dummy logout function for demonstration
  const onLogout = () => {
    console.log("Logging out...");
  };

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
        [cite_start]<div className={`p-3 rounded-xl bg-${color}-100 ml-4`}> [cite: 328]
          [cite_start]<Icon className={`w-8 h-8 text-${color}-600`} /> [cite: 328]
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
            [cite_start]? `border-${industry.color}-500 bg-${industry.color}-50 shadow-lg` [cite: 330]
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-3">
          [cite_start]<div className={`p-2 rounded-lg bg-${industry.color}-100`}> [cite: 330]
            [cite_start]<Icon className={`w-6 h-6 text-${industry.color}-600`} /> [cite: 330]
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
                [cite_start]className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-1000`} [cite: 331]
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
                  <h1 className="text-xl font-bold text-gray-900">Resume Optimizer</h1>
                  <p className="text-sm text-gray-500">ATS Intelligence Platform</p>
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
                <span className="text-sm text-gray-600">Secured</span>
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
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Next-Gen AI Resume Optimizer
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Beat ATS systems with 94% success rate. Our AI analyzes 1000+ job requirements to optimize your resume for any industry.
                </p>
              </div>
            </div>

            {/* Hero Image/Graphic - Placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg">
                {/* Replace with actual hero graphic or illustration */}
                <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50 L200 150 L100 250 L10 150 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2"/>
                  <circle cx="200" cy="150" r="30" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2"/>
                  <text x="200" y="155" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">AI</text>
                  <path d="M300 100 L350 150 L300 200 L250 150 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2"/>
                  <circle cx="350" cy="150" r="20" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2"/>
                  <text x="350" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ATS</text>
                </svg>
              </div>
            </div>
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
              <nav className="flex overflow-x-auto px-2 sm:px-6 space-x-2 sm:space-x-8" aria-label="Tabs">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'upload', label: 'Upload Resume', icon: Upload },
                  { id: 'builder', label: 'Resume Builder', icon: Edit3 },
                  { id: 'analyze', label: 'ATS Analysis', icon: Brain },
                  { id: 'results', label: 'Results', icon: Target },
                  { id: 'optimize', label: 'Optimizer', icon: Sparkles },
                  { id: 'integrations', label: 'Integrations', icon: ExternalLink }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-all duration-300 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                      activeTab === id
                        ? 'border-blue-600 text-blue-600 bg-white bg-opacity-50 rounded-t-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:block">{label}</span>
                    <span className="sm:hidden text-xs">{label.split(' ')[0]}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">ATS Compatibility Dashboard</h3>
                    <p className="text-gray-600 mb-8">Track your resume optimization progress and ATS compatibility metrics</p>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">ATS-Compatible Resume Builder</h3>
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
                            <Plus className="w-4 h-4 mr-1" /> Add Experience
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
                            <Eye className="w-5 h-5 mr-2 text-blue-600" /> Live ATS Preview
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
                                    <Mail className="w-4 h-4 mr-1" /> {resumeBuilder.personalInfo.email}
                                  </span>
                                )}
                                {resumeBuilder.personalInfo.phone && (
                                  <span className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" /> {resumeBuilder.personalInfo.phone}
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
                          <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" /> AI Suggestions
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">ATS Compatibility Analysis</h3>
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
                            <Search className="w-4 h-4 mr-2" /> Browse Jobs
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" /> Use Template
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
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>Entry Level (0-2 years)</option>
                              <option>Mid Level (3-5 years)</option>
                              <option>Senior Level (5+ years)</option>
                              <option>Executive Level</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => setActiveTab('upload')}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4 mr-2 inline-block" /> Reset
                        </button>
                      </div>
                    </div>
                  )}

                  {analysisComplete && (
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Overall Score Card */}
                        <div className="lg:col-span-1 bg-white rounded-xl p-8 shadow-2xl border border-blue-100 flex flex-col items-center justify-center">
                          <h4 className="text-xl font-bold text-gray-900 mb-6">Overall ATS Score</h4>
                          <ScoreCircle score={atsScore} size={180} label="Resume Score" />
                          <p className="text-center text-sm text-gray-600 mt-4">
                            Your resume has an excellent compatibility score. Keep up the great work!
                          </p>
                          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                            Download Report
                          </button>
                        </div>
                        {/* Summary Stats */}
                        <div className="lg:col-span-2 space-y-6">
                          <h4 className="text-2xl font-bold text-gray-900">Analysis Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StatCard icon={CheckCircle} title="Keywords Matched" value="25/30" color="green" />
                            <StatCard icon={AlertCircle} title="Format Issues" value="2" color="orange" />
                            <StatCard icon={BookOpen} title="Readability Score" value="78" color="blue" />
                            <StatCard icon={BarChart3} title="Industry Alignment" value="95%" color="purple" />
                          </div>
                        </div>
                      </div>

                      {/* Detailed Analysis Section */}
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-6">Detailed Recommendations</h4>
                        <div className="space-y-8">

                          {/* Keyword Analysis */}
                          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Target className="w-5 h-5 mr-2 text-red-600" />
                              Keyword Optimization
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h6 className="font-semibold text-gray-800">Missing Keywords</h6>
                                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                                  {optimization.keywords.filter(k => k.status === 'missing').map((k, i) => (
                                    <li key={i}>{k.keyword} <span className="text-gray-500 text-xs"> (Recommended: {k.recommended})</span></li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="font-semibold text-gray-800">Present Keywords</h6>
                                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                                  {optimization.keywords.filter(k => k.status === 'present').map((k, i) => (
                                    <li key={i}>{k.keyword} <span className="text-gray-500 text-xs"> (Found: {k.frequency})</span></li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="font-semibold text-gray-800">Weak Keywords</h6>
                                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                                  {optimization.keywords.filter(k => k.status === 'weak').map((k, i) => (
                                    <li key={i}>{k.keyword} <span className="text-gray-500 text-xs"> (Found: {k.frequency})</span></li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Formatting Issues */}
                          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                              Formatting & Compatibility
                            </h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                              {optimization.formatIssues.map((issue, i) => (
                                <li key={i}>{issue}</li>
                              ))}
                            </ul>
                          </div>

                          {/* AI Suggestions */}
                          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                              AI-Powered Suggestions
                            </h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                              {optimization.suggestions.map((suggestion, i) => (
                                <li key={i}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Download Section */}
                      <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Optimize?</h4>
                        <p className="text-gray-600 mb-6">Download your optimized resume or continue editing with the builder.</p>
                        <div className="flex justify-center space-x-4">
                          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                            <Download className="w-5 h-5 mr-2 inline-block" /> Download .docx
                          </button>
                          <button onClick={() => setActiveTab('builder')} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-lg font-semibold">
                            <Edit3 className="w-5 h-5 mr-2 inline-block" /> Back to Builder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Resume Optimizer</h3>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered platform to maximize your resume's potential.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29,2.25H5.43c-1.3,0-2.3,1-2.3,2.3V7.9c0,1.3,1,2.3,2.3,2.3H8.29c1.3,0,2.3-1,2.3-2.3V4.55C10.59,3.25,9.59,2.25,8.29,2.25ZM10.59,21.75V11.23h-2.3V21.75H5.43V11.23h-2.3V21.75h2.3V11.23h2.86V21.75ZM19.26,11.23V21.75H16.4V11.23h-2.3V21.75h2.3V11.23H19.26ZM19.26,2.25V7.9c0,1.3-1,2.3-2.3,2.3h-2.86c-1.3,0-2.3-1-2.3-2.3V2.25H16.4V7.9c0,1.3,1,2.3,2.3,2.3H19.26V2.25Z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.4,6.6A1.8,1.8,0,0,1,16.2,10.2a1.8,1.8,0,0,1-2.4,1.4,1.8,1.8,0,0,1-1.4,2.4,1.8,1.8,0,0,1-2.4-1.4,1.8,1.8,0,0,1-1.4-2.4,1.8,1.8,0,0,1,1.4-1.4,1.8,1.8,0,0,1,2.4,1.4Z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.46,6.23a.75.75,0,0,0-.73-.55H18.91a.75.75,0,0,0-.75.75V8.12a.75.75,0,0,0,.75.75h2.78a.75.75,0,0,0,.75-.75V6.23Zm-2.61,4.36a.75.75,0,0,0-.75.75v1.86a.75.75,0,0,0,.75.75h2.78a.75.75,0,0,0,.75-.75V11.34a.75.75,0,0,0-.75-.75H19.85ZM12,2a10,10,0,1,0,10,10A10,10,0,0,0,12,2Zm0,18.5a8.5,8.5,0,1,1,8.5-8.5A8.5,8.5,0,0,1,12,20.5ZM17.18,9.75a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,17.18,9.75Zm-5,0a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,12.18,9.75Zm-5,0a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,7.18,9.75Z"/></svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-200">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">ATS Optimizer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API for Developers</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-200">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-200">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
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
                © 2025 Resume Optimizer. All rights reserved.
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
