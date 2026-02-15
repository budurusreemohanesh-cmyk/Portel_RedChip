import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    role: user?.role || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    skills: user?.skills || [],
    bio: user?.bio || '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...formData, avatar });
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="p-6 lg:p-8 max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
          <span className="material-icons text-primary">manage_accounts</span>
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Profile <span className="text-primary">Settings</span>
          </h1>
        </div>
      </motion.div>
      <p className="text-slate-400 -mt-6 ml-14 mb-8">Manage your personal information and preferences.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center h-fit border border-white/5"
        >
          <div className="relative inline-block mb-6 group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 mx-auto shadow-neon group-hover:border-primary transition-all duration-300">
              <img
                src={avatar}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors shadow-lg border border-black z-10"
            >
              <span className="material-icons text-white text-sm">photo_camera</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{formData.name}</h3>
          <p className="text-primary font-medium mb-4">{formData.role}</p>
          <p className="text-slate-400 text-sm">{user?.team || 'No Team'}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 border border-white/5 space-y-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <span className="material-icons text-primary">person</span>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">badge</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              {/* College */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  College/University
                </label>
                <div className="relative group">
                   <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">school</span>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                    placeholder="Your college name"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Role
                </label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">code</span>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  GitHub Profile
                </label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">link</span>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* LinkedIn */}
               <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  LinkedIn Profile
                </label>
                <div className="relative group">
                   <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-sm">link</span>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="input-field w-full pl-12 glass-card bg-white/5 focus:bg-white/10"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="input-field w-full resize-none glass-card bg-white/5 focus:bg-white/10 p-4"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Skills
              </label>
              <div className="input-field w-full flex flex-wrap items-center gap-2 min-h-[50px] p-3 glass-card bg-white/5 focus-within:bg-white/10">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-white transition-colors ml-1"
                    >
                      <span className="material-icons text-[10px]">close</span>
                    </button>
                  </span>
                ))}
                <div className="flex-1 min-w-[100px] flex items-center">
                   <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission
                        handleAddSkill(e);
                      }
                    }}
                    placeholder="Add a skill..."
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-500 w-full text-sm h-full py-1"
                  />
                   <button
                    type="button" // Make it explicitly a button to prevent form submission if clicked, though we act on Enter/Click logic elsewhere usually
                    onClick={handleAddSkill}
                     className="text-primary hover:text-white transition-colors"
                  >
                      <span className="material-icons text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button type="submit" className="btn-primary flex items-center gap-2 px-8 py-3 shadow-neon-hover">
                <span className="material-icons text-sm">save</span>
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
