import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LexiHeader from '../Components/Header/LexiHeader';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

const SidebarNav = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '📤', label: 'Upload', path: '/upload', active: true },
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📋', label: 'Analysis', path: '/analysis' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16 z-40 shadow-sm"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[#2C3E50] mb-6 font-serif">Navigation</h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 5, backgroundColor: '#F9FAFB' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                item.active 
                  ? 'bg-[#2C3E50] text-white shadow-md' 
                  : 'text-gray-700 hover:bg-[#F9FAFB]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

const FileUploadBox = ({ onFileUpload }: { onFileUpload: (files: FileList) => void }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          animate={{
            borderColor: isDragOver ? '#00BCD4' : '#E5E7EB',
            backgroundColor: isDragOver ? '#F0FDFF' : '#FFFFFF'
          }}
          transition={{ duration: 0.2 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-[#00BCD4] hover:bg-[#F0FDFF] transition-all duration-300 cursor-pointer"
        >
          <motion.div
            animate={{ scale: isDragOver ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#00BCD4] to-[#2C3E50] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">📄</span>
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 font-serif">
            {isDragOver ? 'Drop your files here' : 'Upload Legal Documents'}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Drag and drop your legal documents here, or click to browse.
            <br />
            Supported formats: PDF, DOCX, DOC, TXT (Max 50MB)
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            htmlFor="file-upload"
            className="inline-block bg-[#2C3E50] text-white px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-[#34495e] transition-all duration-200 shadow-md"
          >
            Choose Files
          </motion.label>
        </motion.div>
        
        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center space-x-2 text-green-800">
            <span>🔒</span>
            <span className="font-medium">Your documents are secure</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            All uploads are encrypted end-to-end and processed in compliance with legal industry standards.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FileInfoCard = ({ file, onRemove, onAnalyze }: { file: UploadedFile; onRemove: (id: string) => void; onAnalyze: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#00BCD4]/10 rounded-lg flex items-center justify-center">
            <span className="text-[#00BCD4]">📄</span>
          </div>
          <div>
            <h4 className="font-medium text-[#2C3E50] truncate max-w-[200px]">{file.name}</h4>
            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(file.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          ✕
        </motion.button>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Upload Progress</span>
          <span className="text-[#2C3E50] font-medium">{file.uploadProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${file.uploadProgress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#00BCD4] to-[#2C3E50] h-2 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          file.status === 'completed' ? 'text-green-600' :
          file.status === 'error' ? 'text-red-600' : 'text-[#00BCD4]'
        }`}>
          {file.status === 'completed' ? '✓ Upload Complete' :
           file.status === 'error' ? '✗ Upload Failed' : '⏳ Uploading...'}
        </span>
        
        {file.status === 'completed' && (
          <motion.button
            onClick={() => onAnalyze(file.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-[#2C3E50] text-white px-3 py-1 rounded font-medium hover:bg-[#34495e] transition-colors duration-200"
          >
            Analyze
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const UploadPage = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = useCallback((files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === file.id && f.uploadProgress < 100) {
              const newProgress = Math.min(f.uploadProgress + Math.random() * 30, 100);
              return {
                ...f,
                uploadProgress: newProgress,
                status: newProgress === 100 ? 'completed' : 'uploading'
              };
            }
            return f;
          })
        );
      }, 500);

      setTimeout(() => clearInterval(interval), 3000);
    });
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const handleAnalyze = useCallback((id: string) => {
    navigate(`/analysis/${id}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <LexiHeader />
      <div className="flex pt-16">
        <SidebarNav />
        
        <main className="flex-1 ml-64">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-[#2C3E50] mb-4 font-serif">
                Upload Documents
              </h1>
              <p className="text-xl text-gray-600">
                Securely upload your legal documents for AI-powered analysis and verification.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Area */}
              <div className="lg:col-span-2">
                <FileUploadBox onFileUpload={handleFileUpload} />
              </div>

              {/* Uploaded Files Sidebar */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2C3E50] font-serif">
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <AnimatePresence>
                  {uploadedFiles.map(file => (
                    <FileInfoCard
                      key={file.id}
                      file={file}
                      onRemove={handleRemoveFile}
                      onAnalyze={handleAnalyze}
                    />
                  ))}
                </AnimatePresence>
                
                {uploadedFiles.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <span className="text-4xl mb-2 block">📁</span>
                    <p>No files uploaded yet</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadPage;