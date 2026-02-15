import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resourcesData } from '../data/mockData';
import { useToast } from '../components/Toast';

const Resources = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (title) => {
    toast.success(`Downloading ${title}...`);
  };

  const handleOpenLink = (title) => {
    toast.success(`Opening ${title}...`);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'book':
        return <span className="material-icons text-primary text-xl">menu_book</span>;
      case 'file':
        return <span className="material-icons text-primary text-xl">description</span>;
      case 'link':
        return <span className="material-icons text-primary text-xl">link</span>;
      case 'code':
        return <span className="material-icons text-primary text-xl">code</span>;
      case 'database':
        return <span className="material-icons text-primary text-xl">storage</span>;
      case 'cpu':
        return <span className="material-icons text-primary text-xl">memory</span>;
      case 'play':
        return <span className="material-icons text-primary text-xl">play_circle</span>;
      case 'article':
        return <span className="material-icons text-primary text-xl">article</span>;
      default:
        return <span className="material-icons text-primary text-xl">description</span>;
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      link: 'bg-primary/20 text-primary border-primary/30',
      pdf: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      github: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return (
      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${colors[type] || colors.link}`}>
        {type.toUpperCase()}
      </span>
    );
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
              <span className="material-icons text-primary">library_books</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Resources <span className="text-primary">Hub</span>
            </h1>
          </div>
          <p className="text-slate-400">Curated materials to accelerate your build.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation, kits..."
            className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
          />
        </div>
      </motion.div>

      {/* API Documentation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
           <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary text-sm">api</span>
            </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">API Documentation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesData.apiDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass-card p-5 hover:border-primary/50 transition-all duration-300 group border border-white/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  {getIcon(doc.icon)}
                </div>
                {getTypeBadge(doc.type)}
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{doc.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 font-mono">
                  {doc.updatedAt || doc.size || doc.source}
                </span>
                <button
                  onClick={() => handleOpenLink(doc.title)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
                >
                  <span className="material-icons text-sm transform group-hover:rotate-45 transition-transform duration-300">
                    {doc.type === 'pdf' ? 'download' : 'arrow_outward'}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Starter Kits */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
           <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary text-sm">construction</span>
            </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Starter Kits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesData.starterKits.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="glass-card p-5 hover:border-primary/50 transition-all duration-300 group border border-white/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  {getIcon(kit.icon)}
                </div>
                {getTypeBadge(kit.type)}
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {kit.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{kit.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 font-mono">
                  {kit.license || kit.size || kit.version}
                </span>
                <button
                  onClick={() => handleOpenLink(kit.title)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
                >
                   <span className="material-icons text-sm transform group-hover:rotate-45 transition-transform duration-300">
                    {kit.type === 'github' ? 'code' : 'download'}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tutorials */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
           <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary text-sm">school</span>
            </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Tutorials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesData.tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="glass-card overflow-hidden hover:border-primary/50 transition-all duration-300 group border border-white/5 w-full"
            >
              {tutorial.thumbnail && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-neon transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <span className="material-icons text-white">play_arrow</span>
                    </div>
                  </div>
                  {tutorial.duration && (
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded border border-white/10">
                      {tutorial.duration}
                    </span>
                  )}
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  {!tutorial.thumbnail && (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      {getIcon(tutorial.icon)}
                    </div>
                  )}
                  {getTypeBadge(tutorial.type)}
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tutorial.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500 font-mono">
                    {tutorial.readTime}
                  </span>
                  <button
                    onClick={() => handleOpenLink(tutorial.title)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
                  >
                     <span className="material-icons text-sm transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">arrow_outward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Resources;
