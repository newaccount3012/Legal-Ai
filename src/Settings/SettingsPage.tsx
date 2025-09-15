import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LexiHeader from '../Components/Header/LexiHeader';

interface UserProfile {
  name: string;
  email: string;
  organization: string;
  role: string;
}

interface SettingsState {
  darkMode: boolean;
  jurisdiction: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
  };
}

const ToggleSwitch = ({ 
  enabled, 
  onChange, 
  label 
}: { 
  enabled: boolean; 
  onChange: (value: boolean) => void; 
  label: string; 
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[#2C3E50] font-medium">{label}</span>
      <motion.button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-[#00BCD4]' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!enabled)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
          animate={{ x: enabled ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
};

const SelectDropdown = ({ 
  value, 
  onChange, 
  options, 
  label 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  options: { value: string; label: string }[]; 
  label: string; 
}) => {
  return (
    <div className="py-3">
      <label className="block text-[#2C3E50] font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] bg-white text-[#2C3E50]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const SettingsForm = ({ 
  profile, 
  onProfileChange 
}: { 
  profile: UserProfile; 
  onProfileChange: (profile: UserProfile) => void; 
}) => {
  const handleInputChange = (field: keyof UserProfile, value: string) => {
    onProfileChange({ ...profile, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[#2C3E50] font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-[#2C3E50] font-medium mb-2">Email Address</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label className="block text-[#2C3E50] font-medium mb-2">Organization</label>
        <input
          type="text"
          value={profile.organization}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
          placeholder="Enter your organization"
        />
      </div>
      <div>
        <label className="block text-[#2C3E50] font-medium mb-2">Role</label>
        <select
          value={profile.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] bg-white"
        >
          <option value="lawyer">Lawyer</option>
          <option value="paralegal">Paralegal</option>
          <option value="legal_assistant">Legal Assistant</option>
          <option value="client">Client</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'privacy' | 'security'>('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@lawfirm.com',
    organization: 'Doe & Associates',
    role: 'lawyer'
  });

  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    jurisdiction: 'us',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      dataSharing: false,
      analytics: true
    }
  });

  const jurisdictionOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'eu', label: 'European Union' },
    { value: 'in', label: 'India' },
    { value: 'other', label: 'Other' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' }
  ];

  const handleSettingsChange = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof SettingsState['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const handlePrivacyChange = (key: keyof SettingsState['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const handleSaveSettings = () => {
    // Implement save functionality
    console.log('Saving settings:', { profile, settings });
    // Show success message
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <LexiHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#2C3E50] text-white'
                        : 'text-[#2C3E50] hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="profile"
                >
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Profile Information</h2>
                  <SettingsForm profile={profile} onProfileChange={setProfile} />
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="preferences"
                >
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Preferences</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Appearance</h3>
                      <ToggleSwitch
                        enabled={settings.darkMode}
                        onChange={(value) => handleSettingsChange('darkMode', value)}
                        label="Dark Mode"
                      />
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Regional Settings</h3>
                      <SelectDropdown
                        value={settings.jurisdiction}
                        onChange={(value) => handleSettingsChange('jurisdiction', value)}
                        options={jurisdictionOptions}
                        label="Legal Jurisdiction"
                      />
                      <SelectDropdown
                        value={settings.language}
                        onChange={(value) => handleSettingsChange('language', value)}
                        options={languageOptions}
                        label="Language"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Notifications</h3>
                      <ToggleSwitch
                        enabled={settings.notifications.email}
                        onChange={(value) => handleNotificationChange('email', value)}
                        label="Email Notifications"
                      />
                      <ToggleSwitch
                        enabled={settings.notifications.push}
                        onChange={(value) => handleNotificationChange('push', value)}
                        label="Push Notifications"
                      />
                      <ToggleSwitch
                        enabled={settings.notifications.sms}
                        onChange={(value) => handleNotificationChange('sms', value)}
                        label="SMS Notifications"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="privacy"
                >
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Data Management</h3>
                      <ToggleSwitch
                        enabled={settings.privacy.dataSharing}
                        onChange={(value) => handlePrivacyChange('dataSharing', value)}
                        label="Allow Data Sharing for Service Improvement"
                      />
                      <ToggleSwitch
                        enabled={settings.privacy.analytics}
                        onChange={(value) => handlePrivacyChange('analytics', value)}
                        label="Enable Analytics and Usage Tracking"
                      />
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Data Retention Policy</h4>
                      <p className="text-sm text-yellow-700">
                        Your documents and data are stored securely and encrypted. We retain your data for as long as your account is active or as needed to provide services. You can request data deletion at any time.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="security"
                >
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Password</h3>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#2C3E50] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#34495e] transition-colors duration-200"
                      >
                        Change Password
                      </motion.button>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#00BCD4] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00ACC1] transition-colors duration-200"
                      >
                        Enable 2FA
                      </motion.button>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">🚨 Account Deletion</h4>
                      <p className="text-sm text-red-700 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete Account
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 border border-gray-300 text-[#2C3E50] rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveSettings}
                    className="px-6 py-2 bg-[#00BCD4] text-white rounded-lg font-medium hover:bg-[#00ACC1] transition-colors duration-200"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};