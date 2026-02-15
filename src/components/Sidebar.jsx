import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/team', label: 'Team', icon: 'groups' },
    { path: '/tasks', label: 'Tasks', icon: 'checklist' },
    { path: '/networking', label: 'Networking', icon: 'hub' },
    { path: '/submissions', label: 'Submissions', icon: 'cloud_upload' },
    { path: '/leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
    { path: '/problems', label: 'Problems', icon: 'psychology' },
    { path: '/resources', label: 'Resources', icon: 'library_books' },
  ];

  const bottomNavItems = [
    { path: '/profile', label: 'Profile', icon: 'person' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-[260px] hidden lg:flex flex-col border-r border-primary/10 glass sticky top-0 h-screen z-20 shrink-0 text-left">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-neon">
            <span className="material-icons text-white text-lg">code</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Inno<span className="text-primary">Hacks</span> 2.0
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-6 space-y-3 overflow-y-auto scroll-hide">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
                ${active 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_10px_rgba(242,51,13,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className={`material-icons ${active ? '' : 'group-hover:text-primary transition-colors'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-primary/10">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-4 mb-3 rounded-lg transition-all duration-300 group
              ${isActive(item.path)
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_10px_rgba(242,51,13,0.1)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className={`material-icons ${isActive(item.path) ? '' : 'group-hover:text-primary transition-colors'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 px-2">
          <img
            src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC1iN1sjo1bdCBAqjNpEGD2R098wM4lqe2dliAzzRBGJmkIbJUrq_CgCweaNArE1WGlzvth3EH-3zJGw3pTrb4iYVi7nplDRu6HdMa5VwsHBx5AaZ7NSMuIFxnPsZsgAyKFNZEDahcXj6hAePCHR1uHqSVJ1iMdZ47c6Z-eXDiR6B8mwXZ56iucPx7FBKTghNMEBOT5dkUJlCnHi3c3d4nEcMailq4jl8ZsvUaC7R0iLdxzxFkpOG0HXniIU9QMH7Qz2HBPTfjeXMB7"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-primary/50"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User Name'}</p>
            <p className="text-xs text-slate-500 truncate">Team: {user?.team || 'No Team'}</p>
          </div>
          <button 
            onClick={logout}
            className="text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-icons text-xl">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
