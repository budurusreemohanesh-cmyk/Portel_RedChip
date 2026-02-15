import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { announcementsData } from '../data/mockData';
import { calculateCountdown } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState({ days: 2, hours: 12, minutes: 4, seconds: 45 });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock event end date (2 days, 12 hours, 4 minutes, 45 seconds from now)
  const eventEndDate = new Date(currentTime.getTime() + 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 4 * 60 * 1000 + 45 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateCountdown(eventEndDate);
      setCountdown(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [eventEndDate]);

  return (
    <div className="p-6 lg:p-8 max-w-full space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">{user?.name?.split(' ')[0] || 'User'}</span>!
          </h2>
          <p className="text-slate-400 mt-1">Let's build something incredible today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all relative">
            <span className="material-icons">notifications</span>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Team Status', value: 'Active', sub: 'Team CyberSynthetics', icon: 'check_circle', color: 'green', type: 'simple' },
          { title: 'Submission', value: 'Pending', sub: 'Due in 12 hours', icon: 'pending', color: 'yellow', type: 'simple' },
          { title: 'Total Points', value: '450', sub: '', icon: 'bolt', color: 'primary', type: 'progress', progress: 75 },
          { title: 'Global Rank', value: '#12', sub: 'Top 5%', icon: 'public', color: 'blue', type: 'rank' }
        ].map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-medium">{card.title}</p>
              <span className={`material-icons text-${card.color === 'primary' ? 'primary' : card.color + '-400'} text-lg`}>{card.icon}</span>
            </div>
            
            {card.type === 'simple' && (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${card.color}-500 shadow-[0_0_8px_rgba(${card.color === 'green' ? '34,197,94' : '234,179,8'},0.6)]`}></div>
                <h3 className="text-2xl font-bold text-white">{card.value}</h3>
              </div>
            )}
            
            {card.type === 'progress' && (
              <>
                <h3 className="text-2xl font-bold text-white">{card.value}</h3>
                <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full shadow-[0_0_10px_rgba(242,51,13,0.5)]" style={{ width: `${card.progress}%` }}></div>
                </div>
              </>
            )}

            {card.type === 'rank' && (
               <>
                <h3 className="text-2xl font-bold text-white">{card.value}</h3>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <span className="material-icons text-xs">arrow_upward</span> {card.sub}
                </p>
               </>
            )}

            {card.type !== 'rank' && card.type !== 'progress' && (
               <p className="text-xs text-slate-500 mt-2">{card.sub}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Countdown Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative rounded-2xl overflow-hidden min-h-[240px] flex items-center justify-center p-8 group"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6 animate-pulse">Hacking Ends In</h3>
          <div className="grid grid-cols-4 gap-4 md:gap-12 w-full">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, idx) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className={`bg-surface-dark/80 backdrop-blur-md border ${item.label === 'Seconds' ? 'border-primary/40 shadow-[0_0_30px_rgba(242,51,13,0.15)]' : 'border-white/10'} rounded-lg p-4 w-full md:w-32 shadow-2xl relative`}>
                  <span className={`text-4xl md:text-6xl font-bold ${item.label === 'Seconds' ? 'text-primary' : 'text-white'} block`}>
                    {String(item.value).padStart(2, '0')}
                  </span>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 flex flex-col gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                    </div>
                  )}
                </div>
                <span className={`text-xs ${item.label === 'Seconds' ? 'text-primary' : 'text-slate-400'} mt-3 uppercase tracking-wider`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Grid: Announcements & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latest Announcements */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 glass-card rounded-xl border border-white/5 p-6 flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-icons text-primary">campaign</span>
              Latest Announcements
            </h3>
            <button className="text-sm text-slate-400 hover:text-primary transition-colors">View All</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {announcementsData.map((announcement, idx) => (
              <div 
                key={announcement.id} 
                className={`bg-white/5 rounded-lg p-4 border-l-4 ${idx === 0 ? 'border-primary' : 'border-slate-600'} hover:bg-white/10 transition-colors cursor-pointer`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-white text-sm">{announcement.title}</h4>
                  <span className="text-xs text-slate-500">{announcement.timestamp}</span>
                </div>
                <p className="text-slate-400 text-sm line-clamp-2">{announcement.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="glass-card rounded-xl border border-white/5 p-6 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-icons text-primary">bolt</span>
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <button className="w-full group relative overflow-hidden bg-primary text-white font-bold py-4 px-6 rounded-lg shadow-neon hover:shadow-neon-hover transition-all transform hover:-translate-y-0.5">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <div className="flex items-center justify-center gap-2">
                  <span className="material-icons">rocket_launch</span>
                  Submit Project
                </div>
              </button>
              
              <button className="w-full bg-transparent border border-white/20 hover:border-primary text-white hover:text-primary font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group">
                <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">calendar_month</span>
                Book Mentor
              </button>
              
              <div className="pt-6 mt-6 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Your Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300">React</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300">Node.js</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300">Python</span>
                  <button className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary text-xs hover:bg-primary hover:text-white transition-colors">
                    <span className="material-icons text-[14px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
