import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { leaderboardData } from '../data/mockData';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 10;

  const topThree = leaderboardData.filter((team) => team.isTop);
  const otherTeams = leaderboardData.filter((team) => !team.isTop);

  const getTrendIcon = (trend) => {
    if (trend > 0) return <span className="material-icons text-green-500 text-sm">trending_up</span>;
    if (trend < 0) return <span className="material-icons text-red-500 text-sm">trending_down</span>;
    return <span className="material-icons text-slate-500 text-sm">remove</span>;
  };

  const getTrendValue = (trend) => {
    if (trend === 0) return null;
    return (
      <span className={`text-xs font-bold ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {Math.abs(trend)}
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
              <span className="material-icons text-primary">leaderboard</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Leaderboard
            </h1>
          </div>
          <p className="text-slate-400">Real-time ranking of all 120 participating teams.</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-dark border border-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'global'
                ? 'bg-primary text-white shadow-neon'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'track'
                ? 'bg-primary text-white shadow-neon'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Track Specific
          </button>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative py-10"
      >
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-primary/10 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>

        <div className="flex justify-center items-end gap-2 md:gap-8 min-h-[250px] md:min-h-[300px]">
          {/* 2nd Place */}
          {topThree.find((t) => t.rank === 2) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center group relative z-10"
            >
              <div className="relative mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden border-2 md:border-4 border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={topThree.find((t) => t.rank === 2).avatar}
                    alt="2nd place"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-slate-300 rounded-full flex items-center justify-center text-background-dark font-black text-xs md:text-lg shadow-lg border-2 border-background-dark transform rotate-3">
                  2
                </div>
              </div>
              <div className="glass-card p-3 md:p-5 text-center w-28 md:w-48 bg-slate-300/10 border-slate-300/20 card-hover">
                <h3 className="font-bold text-white mb-1 truncate px-2 text-xs md:text-base">
                  {topThree.find((t) => t.rank === 2).team}
                </h3>
                <p className="text-slate-300 text-[10px] md:text-sm font-mono">
                  {topThree.find((t) => t.rank === 2).points} PTS
                </p>
              </div>
              <div className="h-16 md:h-24 w-full bg-slate-300/20 mt-2 md:mt-4 rounded-t-lg backdrop-blur-md border-x border-t border-slate-300/10 mx-auto w-20 md:w-32"></div>
            </motion.div>
          )}

          {/* 1st Place */}
          {topThree.find((t) => t.rank === 1) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center group relative z-20 -mt-8 md:-mt-12"
            >
               <div className="absolute -top-12 md:-top-16 text-yellow-500 animate-bounce">
                  <span className="material-icons text-2xl md:text-4xl shadow-glow">emoji_events</span>
               </div>
              <div className="relative mb-4 md:mb-6">
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-2 md:border-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)] group-hover:scale-105 transition-transform duration-300 ring-4 ring-yellow-500/20">
                  <img
                    src={topThree.find((t) => t.rank === 1).avatar}
                    alt="1st place"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 md:-bottom-5 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-background-dark font-black text-sm md:text-2xl shadow-xl border-4 border-background-dark">
                  1
                </div>
              </div>
              <div className="glass-card p-4 md:p-6 text-center w-36 md:w-56 bg-gradient-to-b from-yellow-500/10 to-transparent border-yellow-500/30 card-hover shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                <h3 className="text-sm md:text-xl font-bold text-white mb-1 truncate px-2">
                  {topThree.find((t) => t.rank === 1).team}
                </h3>
                <p className="text-yellow-400 font-bold font-mono text-xs md:text-lg">
                  {topThree.find((t) => t.rank === 1).points} PTS
                </p>
              </div>
              <div className="h-24 md:h-32 w-full bg-yellow-500/20 mt-2 md:mt-4 rounded-t-lg backdrop-blur-md border-x border-t border-yellow-500/20 mx-auto w-28 md:w-40 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent"></div>
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {topThree.find((t) => t.rank === 3) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center group relative z-10"
            >
              <div className="relative mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden border-2 md:border-4 border-orange-700 shadow-[0_0_20px_rgba(194,65,12,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={topThree.find((t) => t.rank === 3).avatar}
                    alt="3rd place"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-orange-700 rounded-full flex items-center justify-center text-white font-black text-xs md:text-lg shadow-lg border-2 border-background-dark transform -rotate-3">
                  3
                </div>
              </div>
              <div className="glass-card p-3 md:p-5 text-center w-28 md:w-48 bg-orange-700/10 border-orange-700/20 card-hover">
                <h3 className="font-bold text-white mb-1 truncate px-2 text-xs md:text-base">
                  {topThree.find((t) => t.rank === 3).team}
                </h3>
                <p className="text-orange-400 text-[10px] md:text-sm font-mono">
                  {topThree.find((t) => t.rank === 3).points} PTS
                </p>
              </div>
              <div className="h-12 md:h-16 w-full bg-orange-700/20 mt-2 md:mt-4 rounded-t-lg backdrop-blur-md border-x border-t border-orange-700/10 mx-auto w-20 md:w-32"></div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden border border-white/5 rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="text-left py-4 px-4 md:px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-left py-4 px-4 md:px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Team Name
                </th>
                <th className="text-left py-4 px-4 md:px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Points
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center hidden md:table-cell">
                  Progress
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right hidden md:table-cell">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {otherTeams.map((team, index) => (
                <motion.tr
                  key={team.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${
                    team.isMyTeam ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className={`font-bold font-mono ${team.isMyTeam ? 'text-primary' : 'text-slate-500 group-hover:text-white transition-colors'}`}>
                      #{team.rank}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={team.avatar}
                        alt={team.team}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <p className={`font-semibold ${team.isMyTeam ? 'text-primary' : 'text-white'}`}>
                          {team.team}
                        </p>
                        {team.isMyTeam && (
                          <p className="text-[10px] text-primary/70 uppercase tracking-wider font-bold">YOUR TEAM</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-bold font-mono ${team.isMyTeam ? 'text-primary' : 'text-white'}`}>
                      {team.points}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                     <div className="w-full max-w-[140px] mx-auto">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div
                           className={`h-full rounded-full ${
                              team.isMyTeam ? 'bg-primary shadow-[0_0_8px_rgba(242,51,13,0.5)]' : 'bg-gradient-to-r from-primary/80 to-primary/40'
                           }`}
                           style={{ width: `${(team.points / 1000) * 100}%` }}
                           />
                        </div>
                     </div>
                  </td>
                  <td className="py-4 px-6 text-right hidden md:table-cell">
                    <div className="flex items-center justify-end gap-1">
                      {getTrendIcon(team.trend)}
                      {getTrendValue(team.trend)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/5">
          <p className="text-xs text-slate-400">
            Showing <span className="text-white font-bold">{otherTeams.length}</span> of <span className="text-white font-bold">120</span> teams
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-surface-dark border border-white/10 hover:border-primary/50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="material-icons text-sm">chevron_left</span>
            </button>
            <span className="text-xs text-slate-400 px-2">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg bg-surface-dark border border-white/10 hover:border-primary/50 hover:text-primary transition-all"
            >
              <span className="material-icons text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
