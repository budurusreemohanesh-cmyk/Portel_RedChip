import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { problemStatementsData } from '../data/mockData';
import { useToast } from '../components/Toast';

const Problems = () => {
  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState('All Tracks');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [lockedProblems, setLockedProblems] = useState([]);

  const filters = ['All Tracks', 'AI/ML', 'FinTech', 'EdTech'];

  const filteredProblems = activeFilter === 'All Tracks'
    ? problemStatementsData
    : problemStatementsData.filter((p) => p.domain === activeFilter);

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <span className="material-icons text-green-500 text-sm">hourglass_empty</span>;
      case 'medium':
        return <span className="material-icons text-yellow-500 text-sm">bolt</span>;
      case 'hard':
        return <span className="material-icons text-red-500 text-sm">stars</span>;
      default:
        return null;
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'EASY';
      case 'medium':
        return 'MEDIUM';
      case 'hard':
        return 'HARD';
      default:
        return difficulty.toUpperCase();
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'AI/ML':
        return 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_8px_rgba(242,51,13,0.2)]';
      case 'FinTech':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.2)]';
      case 'EdTech':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const handleLockProblem = (problemId) => {
    if (lockedProblems.includes(problemId)) {
      setLockedProblems(lockedProblems.filter((id) => id !== problemId));
      toast.success('Problem unlocked');
    } else {
      setLockedProblems([...lockedProblems, problemId]);
      toast.success('Problem locked - other teams cannot see your choice');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
           <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary">psychology</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Problem Sets
            </h1>
          </div>
          <p className="text-slate-400">Select a challenge track and start hacking.</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-1 bg-surface-dark border border-white/10 rounded-lg p-1 overflow-x-auto max-w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-neon'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card overflow-hidden hover:border-primary/50 transition-all duration-300 group rounded-xl border border-white/5 relative ${
                lockedProblems.includes(problem.id) ? 'border-primary shadow-neon bg-primary/5' : ''
              }`}
            >
              {/* Top Border */}
              <div className={`h-1 w-full absolute top-0 left-0 ${
                problem.domain === 'AI/ML' ? 'bg-primary shadow-[0_0_10px_rgba(242,51,13,0.5)]' :
                problem.domain === 'FinTech' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
              }`} />
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 mt-2">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getDomainColor(problem.domain)}`}>
                    {problem.domain}
                  </span>
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                    {getDifficultyIcon(problem.difficulty)}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      problem.difficulty === 'easy' ? 'text-green-500' :
                      problem.difficulty === 'medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {getDifficultyLabel(problem.difficulty)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {problem.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Points</p>
                    <p className="text-lg font-bold text-white font-mono">{problem.points}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Submissions</p>
                    <p className="text-lg font-bold text-white font-mono">{problem.submissions}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProblem(problem)}
                    className="flex-1 px-4 py-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 text-white transition-all text-sm font-medium flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <span className="material-icons text-sm transform group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => handleLockProblem(problem.id)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      lockedProblems.includes(problem.id)
                        ? 'bg-primary/20 border-primary text-primary shadow-neon'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={lockedProblems.includes(problem.id) ? 'Unlock problem' : 'Lock problem'}
                  >
                    <span className="material-icons text-sm">
                        {lockedProblems.includes(problem.id) ? 'lock' : 'lock_open'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Problem Detail Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl relative"
            >
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="p-8 relative z-10">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getDomainColor(selectedProblem.domain)}`}>
                        {selectedProblem.domain}
                      </span>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                        {getDifficultyIcon(selectedProblem.difficulty)}
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          selectedProblem.difficulty === 'easy' ? 'text-green-500' :
                          selectedProblem.difficulty === 'medium' ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {getDifficultyLabel(selectedProblem.difficulty)}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">{selectedProblem.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  >
                     <span className="material-icons">close</span>
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                     <span className="material-icons text-sm">description</span>
                     Description
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{selectedProblem.description}</p>
                </div>

                {/* Evaluation Criteria */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                     <span className="material-icons text-sm">checklist</span>
                     Evaluation Criteria
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProblem.criteria.map((criterion, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group"
                      >
                         <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:border-primary transition-colors">
                           <span className="material-icons text-primary text-[12px] group-hover:text-white">check</span>
                         </div>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-8 p-6 rounded-xl bg-surface-dark border border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Points</p>
                    <p className="text-2xl font-bold text-white font-mono">{selectedProblem.points}</p>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Submissions</p>
                    <p className="text-2xl font-bold text-white font-mono">{selectedProblem.submissions}</p>
                  </div>
                   <div className="w-px h-10 bg-white/10"></div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Success Rate</p>
                    <div className="flex items-center gap-2">
                       <p className="text-2xl font-bold text-white font-mono">
                         {Math.round((selectedProblem.submissions / 500) * 100)}%
                       </p>
                       <span className="text-xs text-green-500 font-bold bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">+5%</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleLockProblem(selectedProblem.id);
                      setSelectedProblem(null);
                    }}
                    className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                       lockedProblems.includes(selectedProblem.id)
                       ? 'bg-transparent border border-primary text-primary hover:bg-primary/10'
                       : 'bg-primary hover:bg-primary-dark text-white shadow-neon hover:shadow-neon-hover'
                    }`}
                  >
                     <span className="material-icons">{lockedProblems.includes(selectedProblem.id) ? 'lock_open' : 'lock'}</span>
                    {lockedProblems.includes(selectedProblem.id) ? 'Unlock Problem' : 'Lock Problem Choice'}
                  </button>
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-all font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Problems;
