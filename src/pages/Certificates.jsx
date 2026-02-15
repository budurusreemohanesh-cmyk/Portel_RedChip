import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Certificates = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    toast.success('Certificate download started!');
  };

  const handleShare = () => {
    const shareUrl = `https://innohacks.tech/certificate/${user?.id || 'guest'}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Shareable link copied to clipboard!');
  };

  const handleCopyBadge = () => {
    const badgeCode = `<img src="https://innohacks.tech/badge/${user?.id || 'guest'}.svg" alt="InnoHacks 2.0 Participant" />`;
    navigator.clipboard.writeText(badgeCode);
    toast.success('Badge code copied to clipboard!');
  };

  const certificates = [
    {
      id: 'cert-1',
      title: 'Participation Certificate',
      description: 'Awarded for participating in InnoHacks 2.0',
      status: 'available',
      icon: 'verified',
      color: 'primary',
      date: 'January 2024',
    },
    {
      id: 'cert-2',
      title: 'Winner Certificate',
      description: 'Awarded to top 3 teams',
      status: 'locked',
      icon: 'emoji_events',
      color: 'yellow',
      date: 'Coming soon',
    },
    {
      id: 'cert-3',
      title: 'Mentor Appreciation',
      description: 'For outstanding mentorship',
      status: 'locked',
      icon: 'stars',
      color: 'blue',
      date: 'Coming soon',
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
          <span className="material-icons text-primary">workspace_premium</span>
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Your <span className="text-primary">Certificates</span>
          </h1>
        </div>
      </motion.div>
      <p className="text-slate-400 -mt-6 ml-14 mb-8">
        Download your achievements and share them with the world.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Certificate */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-8 border border-white/5 relative overflow-hidden group">
             {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-icons text-primary text-3xl">verified</span>
                  <h2 className="text-2xl font-bold text-white">Participation Certificate</h2>
                </div>
                <p className="text-slate-400">
                  Awarded for participating in InnoHacks 2.0 - Inter-College Hackathon
                </p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                <span className="material-icons text-sm">check_circle</span>
                Available
              </span>
            </div>

            {/* Certificate Preview */}
            <div className="relative bg-[#1a1a1a] rounded-xl border border-primary/30 p-8 mb-8 overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-[60px]" />
              
              <div className="relative text-center border-2 border-white/5 p-8 rounded-lg">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center shadow-neon border-4 border-black">
                    <span className="material-icons text-white text-5xl">emoji_events</span>
                  </div>
                </div>
                
                <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
                  Certificate of Participation
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
                  {user?.name || 'Alex Chen'}
                </h3>
                <p className="text-slate-400 mb-2 font-light">
                  has successfully participated in
                </p>
                <h4 className="text-2xl font-bold text-white mb-2">
                  InnoHacks 2.0
                </h4>
                <p className="text-slate-500 text-sm mb-10 font-mono">
                  Inter-College Hackathon | January 15-17, 2024
                </p>
                
                <div className="flex items-center justify-center gap-16">
                  <div className="text-center">
                    <div className="w-32 h-px bg-white/20 mb-2 mx-auto" />
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Organizer Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-px bg-white/20 mb-2 mx-auto" />
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Date Issued</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={handleDownload} className="btn-primary flex items-center gap-2 px-6 py-3 shadow-neon-hover">
                <span className="material-icons text-sm">download</span>
                Download PDF
              </button>
              <button onClick={handleShare} className="btn-secondary flex items-center gap-2 px-6 py-3 hover:text-white">
                <span className="material-icons text-sm">share</span>
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="glass-card p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <span className="material-icons text-primary text-lg">local_police</span>
               Shareable Badge
            </h3>
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/30 flex items-center justify-center shadow-neon relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="material-icons text-primary text-7xl relative z-10 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">workspace_premium</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 text-center">
              Add this badge to your GitHub profile or portfolio to showcase your achievement.
            </p>
            <button
              onClick={handleCopyBadge}
              className="w-full btn-secondary flex items-center justify-center gap-2 group"
            >
              <span className="material-icons text-sm group-hover:text-primary transition-colors">code</span>
              Copy Badge Code
            </button>
          </div>

          {/* All Certificates */}
          <div className="glass-card p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <span className="material-icons text-primary text-lg">collections_bookmark</span>
               All Certificates
            </h3>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    cert.status === 'available'
                      ? 'bg-white/5 border-primary/20 hover:bg-white/10 hover:border-primary/40'
                      : 'bg-black/20 border-white/5 opacity-60 grayscale'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    cert.status === 'available' ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`material-icons text-xl ${
                      cert.status === 'available' ? 'text-primary' : 'text-slate-500'
                    }`}>{cert.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{cert.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{cert.description}</p>
                  </div>
                  {cert.status === 'available' ? (
                     <span className="material-icons text-green-400 text-sm" title="Available">check_circle</span>
                  ) : (
                    <span className="material-icons text-slate-500 text-sm" title="Locked">lock</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="glass-card p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <span className="material-icons text-primary text-lg">verified_user</span>
               Verify Certificate
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Anyone can verify the authenticity of your certificate using the link below.
            </p>
            <div className="flex items-center gap-2 p-1 pl-3 rounded-lg bg-black/40 border border-white/10 focus-within:border-primary/50 transition-colors">
              <input
                type="text"
                value={`https://innohacks.tech/verify/${user?.id || 'guest'}`}
                readOnly
                className="flex-1 bg-transparent text-xs text-slate-300 outline-none font-mono py-2"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://innohacks.tech/verify/${user?.id || 'guest'}`);
                  toast.success('Verification link copied!');
                }}
                className="p-2 rounded-md hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <span className="material-icons text-sm">content_copy</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;
