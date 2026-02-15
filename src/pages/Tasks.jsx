import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tasksData } from '../data/mockData';

const Tasks = () => {
  const [columns, setColumns] = useState(tasksData.columns);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;
    
    if (sourceColumn !== targetColumnId) {
      const newColumns = columns.map((col) => {
        if (col.id === sourceColumn) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== task.id),
            count: col.count - 1,
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, task],
            count: col.count + 1,
          };
        }
        return col;
      });
      
      setColumns(newColumns);
    }
    
    setDraggedTask(null);
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 shadow-[0_0_8px_rgba(234,179,8,0.3)]',
      low: 'bg-blue-500/10 text-blue-500 border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
      done: 'bg-green-500/10 text-green-500 border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.3)]',
    };
    
    return (
      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${styles[priority] || styles.medium}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="p-4 lg:p-8 max-w-full space-y-6 lg:space-y-8 min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 flex-shrink-0"
      >
        <div>
           <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-icons text-primary">checklist</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Task Board
            </h1>
          </div>
          <p className="text-slate-400">Manage your team's development sprints and milestones.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 text-white transition-all flex items-center gap-2 group">
            <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">filter_list</span>
            Filter
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-neon hover:shadow-neon-hover transition-all flex items-center gap-2">
            <span className="material-icons">add</span>
            New Column
          </button>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto lg:pb-4 scroll-hide h-full">
        <div className="flex flex-col lg:flex-row gap-6 h-full min-w-full lg:min-w-max">
        {columns.map((column, columnIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
            className="w-full lg:w-[350px] flex flex-col h-auto lg:h-full bg-surface-dark/30 backdrop-blur-sm rounded-xl border border-white/5 p-4 shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${
                  column.id === 'todo' ? 'bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]' :
                  column.id === 'inprogress' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                  'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                }`} />
                <h3 className="font-bold text-white tracking-wide">{column.title}</h3>
                <span className="px-2 py-0.5 text-xs bg-white/5 text-slate-400 rounded-full border border-white/5">
                  {column.tasks.length}
                </span>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <span className="material-icons text-lg">add</span>
              </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 overflow-y-auto scroll-hide space-y-3 pr-1">
              {column.tasks.map((task, taskIndex) => (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: columnIndex * 0.1 + taskIndex * 0.05 }}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className="glass-card p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-primary/50 transition-all group bg-surface-darker/50"
                  whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    {getPriorityBadge(task.priority)}
                    <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-icons text-lg">more_horiz</span>
                    </button>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-3 leading-snug">{task.title}</h4>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex -space-x-2">
                      {task.assignees && task.assignees.map((assignee, idx) => (
                        <img
                          key={idx}
                          src={`https://ui-avatars.com/api/?name=User+${assignee}&background=random`}
                          alt="Assignee"
                          className="w-6 h-6 rounded-full border-2 border-surface-darker"
                          title={`User ${assignee}`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1 hover:text-primary transition-colors">
                          <span className="material-icons text-[14px]">chat_bubble_outline</span>
                          <span>{task.comments}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                          <span className="material-icons text-[14px]">schedule</span>
                          <span>2d</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
               <button className="w-full py-3 rounded-lg border border-dashed border-white/10 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
                  <span className="material-icons text-sm">add</span>
                  Add Task
                </button>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
