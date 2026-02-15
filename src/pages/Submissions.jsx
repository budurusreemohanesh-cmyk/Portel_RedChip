import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';

const Submissions = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectTitle: 'CyberSynthetics AI',
    description: '',
    techStack: ['React', 'Node.js', 'Python'],
    githubUrl: '',
    demoVideo: '',
  });
  const [newTech, setNewTech] = useState('');

  const steps = [
    { id: 1, label: 'PROJECT DETAILS', icon: 'edit' },
    { id: 2, label: 'LINKS', icon: 'link' },
    { id: 3, label: 'TEAM', icon: 'groups' },
  ];

  const handleAddTech = (e) => {
    e.preventDefault();
    if (newTech && !formData.techStack.includes(newTech)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, newTech],
      });
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Project submitted successfully!');
  };

  return (
    <div className="p-4 lg:p-8 max-w-full space-y-6 lg:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary">cloud_upload</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Submit Project
            </h1>
          </div>
          <p className="text-slate-400">Final stretch! Provide the details of your project to complete the hackathon.</p>
        </div>
      </motion.div>

      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center py-6"
      >
        <div className="flex items-center w-full max-w-3xl px-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <div className={`flex-1 h-0.5 mx-4 rounded-full ${isCompleted ? 'bg-primary shadow-[0_0_8px_rgba(242,51,13,0.5)]' : 'bg-white/10'}`} />
                )}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-neon scale-110'
                        : isCompleted
                        ? 'bg-primary/20 text-primary border-primary'
                        : 'bg-surface-dark border-white/10 text-slate-500'
                    }`}
                  >
                    <span className="material-icons text-xl">{step.icon}</span>
                  </div>
                  <span
                    className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${
                      isActive ? 'text-primary' : isCompleted ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6 lg:p-8 rounded-xl border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full bg-surface-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(242,51,13,0.1)] transition-all placeholder:text-slate-600"
                  placeholder="Enter your project name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full bg-surface-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(242,51,13,0.1)] transition-all placeholder:text-slate-600 resize-none"
                  placeholder="Tell us about what you've built, the problem it solves, and the journey..."
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tech Stack
                </label>
                <div className="w-full bg-surface-dark/50 border border-white/10 rounded-lg px-4 py-3 min-h-[50px] flex flex-wrap gap-2 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(242,51,13,0.1)] transition-all">
                  {formData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1 pl-3 pr-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="hover:text-white transition-colors"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTech(e)}
                    placeholder="Add tech..."
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-600 min-w-[100px] flex-1"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    GitHub Repository URL
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-slate-500 group-focus-within:text-primary transition-colors text-lg">code</span>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full bg-surface-dark/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(242,51,13,0.1)] transition-all placeholder:text-slate-600"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Demo Video Link
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-slate-500 group-focus-within:text-primary transition-colors text-lg">play_circle</span>
                    <input
                      type="url"
                      value={formData.demoVideo}
                      onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })}
                      className="w-full bg-surface-dark/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(242,51,13,0.1)] transition-all placeholder:text-slate-600"
                      placeholder="YouTube, Vimeo..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-6 border-t border-white/10 mt-8">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-yellow-500/80 bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20 w-full sm:w-auto">
                  <span className="material-icons text-lg">warning</span>
                  <p className="text-xs font-medium">
                    Editable until submission deadline.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                   <button type="button" className="w-full sm:w-auto px-6 py-3 sm:py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-all font-medium justify-center flex">
                    Save Draft
                  </button>
                  <button type="submit" className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-neon hover:shadow-neon-hover transition-all flex items-center justify-center gap-2 font-bold">
                    <span className="material-icons">rocket_launch</span>
                    Submit Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Tip Card */}
          <div className="glass-card p-6 rounded-xl border border-white/5 bg-gradient-to-br from-surface-dark to-primary/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-neon">
                <span className="material-icons text-primary text-xl">lightbulb</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Pro Tip</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Judges love technical documentation! Make sure your README includes clear installation steps and architecture diagrams.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Status */}
          <div className="glass-card p-6 rounded-xl border border-white/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
               <span className="material-icons text-slate-400">history</span>
               Submission History
            </h3>
            <div className="space-y-3 relative">
               <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-white/10 z-0"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center">
                    <span className="material-icons text-slate-500 text-sm">save</span>
                 </div>
                 <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-medium text-white">Draft Saved</span>
                       <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-400">Auto</span>
                    </div>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                 </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center">
                    <span className="material-icons text-slate-500 text-sm">edit_document</span>
                 </div>
                 <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-medium text-white">Started Draft</span>
                       <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-400">Manual</span>
                    </div>
                    <span className="text-xs text-slate-500">Yesterday</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Submissions;
