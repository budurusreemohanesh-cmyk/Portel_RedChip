import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { networkingData } from '../data/mockData';
import { useToast } from '../components/Toast';

const Networking = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const allSkills = [...new Set(networkingData.flatMap((user) => user.skills))];

  const filteredUsers = networkingData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.team.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = !skillFilter || user.skills.includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  const handleConnect = (name) => {
    toast.success(`Connection request sent to ${name}!`);
  };

  const handleViewLinkedIn = (url) => {
    window.open(url, '_blank');
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-500';
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
              <span className="material-icons text-primary">hub</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Networking <span className="text-primary">Hub</span>
            </h1>
          </div>
          <p className="text-slate-400">
            Connect with fellow hackers, find teammates, and build your network.
          </p>
        </div>
        
        {/* Search */}
         <div className="relative w-full md:w-80 group">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackers..."
            className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
          />
        </div>
      </motion.div>

      {/* Skill Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-8 overflow-x-auto scroll-hide pb-2"
      >
        <button
          onClick={() => setSkillFilter('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
            skillFilter === ''
              ? 'bg-primary text-white border-primary shadow-neon'
              : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
          }`}
        >
          All Skills
        </button>
        {allSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => setSkillFilter(skill)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
              skillFilter === skill
                 ? 'bg-primary text-white border-primary shadow-neon'
                 : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {skill}
          </button>
        ))}
      </motion.div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group border border-white/5 relative overflow-hidden"
          >
             {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

            {/* Avatar */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors shadow-lg group-hover:shadow-neon">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 ${getStatusColor(
                    user.status
                  )} rounded-full border-2 border-background-dark`}
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center mb-6">
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors">{user.name}</h3>
              <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{user.team}</p>
              <p className="text-slate-400 text-sm line-clamp-2 h-10">{user.role}</p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {user.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[10px] bg-white/5 text-slate-300 rounded border border-white/10"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="px-2 py-1 text-[10px] bg-white/5 text-slate-300 rounded border border-white/10">
                  +{user.skills.length - 3}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => handleViewLinkedIn(user.linkedin)}
                className="w-full px-4 py-2 rounded-lg border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] text-slate-300 hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2 group/btn"
              >
                <span className="material-icons text-sm" style={{ fontSize: '18px' }}>link</span>
                View Profile
              </button>
               <button
                onClick={() => handleConnect(user.name)}
                className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white text-primary transition-all text-sm font-bold shadow-neon-hover flex items-center justify-center gap-2"
              >
                <span className="material-icons text-sm">person_add</span>
                Connect
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <span className="material-icons text-4xl text-slate-500">search_off</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No hackers found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default Networking;
