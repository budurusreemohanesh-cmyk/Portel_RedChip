import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mentorsData } from '../data/mockData';
import { useToast } from '../components/Toast';

const Mentors = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const filteredMentors = mentorsData.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleBookSession = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }
    toast.success(`Session booked with ${selectedMentor.name}!`);
    setSelectedMentor(null);
    setBookingStep(1);
    setSelectedSlot(null);
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'Available'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  // Mock time slots
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

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
              <span className="material-icons text-primary">school</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Mentor <span className="text-primary">Booking</span>
            </h1>
          </div>
          <p className="text-slate-400">
            Book sessions with industry experts to guide your project.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors..."
            className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
          />
        </div>
      </motion.div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group border border-white/5 relative overflow-hidden"
          >
             {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

            {/* Avatar */}
            <div className="flex justify-center mb-6 relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors shadow-lg group-hover:shadow-neon">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center mb-6">
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors">{mentor.name}</h3>
              <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{mentor.role}</p>
              <p className="text-slate-400 text-sm font-mono">{mentor.company}</p>
            </div>

            {/* Expertise */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {mentor.expertise.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[10px] bg-white/5 text-slate-300 rounded border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getAvailabilityColor(
                  mentor.availability
                )}`}
              >
                {mentor.availability}
              </span>
            </div>

            {/* Next Slot */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 font-mono">
              <span className="material-icons text-sm">schedule</span>
              <span>Next: {mentor.nextSlot}</span>
            </div>

            {/* Book Button */}
            <button
              onClick={() => setSelectedMentor(mentor)}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-neon-hover"
              disabled={mentor.availability !== 'Available'}
            >
              Book Session
            </button>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full max-h-[90vh] overflow-y-auto border border-primary/20 shadow-neon"
            >
              <div className="p-6 lg:p-8">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedMentor.avatar}
                      alt={selectedMentor.name}
                      className="w-16 h-16 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedMentor.name}</h3>
                      <p className="text-primary font-medium">{selectedMentor.role}</p>
                      <p className="text-slate-400 text-sm">{selectedMentor.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>

                {/* Bio */}
                <div className="mb-8">
                   <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-primary/70 text-sm">info</span>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm bg-white/5 p-4 rounded-lg border border-white/5">{selectedMentor.bio}</p>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                   <div className="flex items-center gap-2 mb-3">
                    <span className="material-icons text-primary/70 text-sm">psychology</span>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expertise</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded font-bold uppercase tracking-wider"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mb-8">
                   <div className="flex items-center gap-2 mb-3">
                    <span className="material-icons text-primary/70 text-sm">schedule</span>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Time Slot</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${
                          selectedSlot === slot
                            ? 'bg-primary text-white border-primary shadow-neon transform scale-105'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-white/5">
                  <button
                    onClick={handleBookSession}
                    className="flex-1 btn-primary shadow-neon-hover py-3"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="flex-1 btn-secondary py-3"
                  >
                    Cancel
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

export default Mentors;
