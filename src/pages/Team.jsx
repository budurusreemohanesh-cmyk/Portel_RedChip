import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { teamData } from '../data/mockData';
import { copyToClipboard, generateInviteCode } from '../utils/helpers';

const Team = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [team, setTeam] = useState(teamData);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleCopyInviteCode = async () => {
    const success = await copyToClipboard(team.inviteCode);
    if (success) {
      toast.success('Invite code copied to clipboard!');
    } else {
      toast.error('Failed to copy invite code');
    }
  };

  const handleGenerateNewCode = () => {
    const newCode = generateInviteCode();
    setTeam({ ...team, inviteCode: newCode });
    toast.success('New invite code generated!');
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    const newInvite = {
      email: inviteEmail,
      status: 'sent',
      sentAt: new Date().toISOString(),
    };
    
    setTeam({
      ...team,
      pendingInvites: [...team.pendingInvites, newInvite],
    });
    setInviteEmail('');
    toast.success(`Invitation sent to ${inviteEmail}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
      case 'offline': return 'bg-slate-500';
      default: return 'bg-slate-500';
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
              <span className="material-icons text-primary">groups</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {team.name}
            </h1>
          </div>
          <p className="text-slate-400">Manage your team members and invites</p>
        </div>
        <button className="px-4 py-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 text-white transition-all flex items-center gap-2 group">
          <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">settings</span>
          Team Settings
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Team Members
              <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary border border-primary/30 rounded-full">
                {team.members.length}/{team.maxMembers}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover:border-primary/50 transition-colors"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${getStatusColor(member.status)} rounded-full border-2 border-background-dark`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white truncate">{member.name}</h3>
                      {member.teamRole === 'leader' && (
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center" title="Team Leader">
                          <span className="material-icons text-xs text-primary">emoji_events</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{member.role}</p>
                    <span className={`text-[10px] ${member.status === 'online' ? 'text-green-400' : 'text-slate-500'} uppercase tracking-wider font-bold`}>
                      {member.status}
                    </span>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <span className="material-icons">more_vert</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-xl border border-white/5"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="material-icons text-primary">rocket_launch</span>
                Project Progress
              </h3>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={2 * Math.PI * 36 * (1 - team.projectProgress / 100)}
                      className="text-primary drop-shadow-[0_0_4px_rgba(242,51,13,0.5)]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                    {team.projectProgress}%
                  </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                   <div>
                      <p className="text-white font-medium">Milestones Completed</p>
                      <p className="text-sm text-slate-400">{team.completedTasks} of {team.totalTasks} core features</p>
                   </div>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                   <div className="bg-primary h-full shadow-[0_0_10px_rgba(242,51,13,0.5)]" style={{ width: `${team.projectProgress}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sidebar: Invites */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Invite Code Card */}
          <div className="glass-card p-6 rounded-xl border border-white/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-icons text-primary">person_add</span>
              Invite Members
            </h3>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-4">
              <p className="text-xs text-primary uppercase tracking-wider font-bold mb-2">Unique Invite Code</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-background-dark/50 border border-white/10 rounded px-3 py-2 font-mono text-white tracking-widest text-center select-all">
                  {team.inviteCode}
                </div>
                <button 
                  onClick={handleCopyInviteCode}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 hover:border-primary/50 transition-colors text-slate-400 hover:text-white"
                >
                  <span className="material-icons text-xl">content_copy</span>
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleGenerateNewCode}
              className="w-full py-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2"
            >
              <span className="material-icons text-lg">refresh</span>
              Generate New Code
            </button>
          </div>

          {/* Pending & Send Invite */}
          <div className="glass-card p-6 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-white mb-4">Pending Invites</h4>
            
            <div className="space-y-3 mb-6">
              {team.pendingInvites.length > 0 ? (
                team.pendingInvites.map((invite, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-sm text-slate-300 truncate">{invite.email}</span>
                    <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded uppercase font-bold">
                      Sent
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No pending invites</p>
              )}
            </div>

            <div className="border-t border-white/10 pt-4">
               <h4 className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3">Send New Invite</h4>
               <form onSubmit={handleSendInvite} className="flex gap-2">
                 <input
                   type="email"
                   value={inviteEmail}
                   onChange={(e) => setInviteEmail(e.target.value)}
                   placeholder="email@example.com"
                   className="flex-1 bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder:text-slate-600"
                 />
                 <button 
                   type="submit"
                   className="p-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-neon hover:shadow-neon-hover transition-all"
                 >
                   <span className="material-icons text-xl">send</span>
                 </button>
               </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
