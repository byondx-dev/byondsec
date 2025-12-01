import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
           <div className="mb-8 md:mb-0">
              <h3 className="font-display font-bold text-2xl tracking-tight text-white mb-2">byondSEC</h3>
              <p className="text-gray-500 text-sm">Built by hackers, not marketers.</p>
           </div>
           
           <div className="flex gap-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                 <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ y: -5, color: '#39FF88' }}
                    className="text-gray-500 transition-colors"
                 >
                    <Icon className="w-6 h-6" />
                 </motion.a>
              ))}
           </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-600 font-mono">
           <div className="flex gap-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Imprint</a>
              <a href="#" className="text-primary hover:text-white">security.txt</a>
           </div>
           <div>
              &copy; 2025 byondSEC GmbH.
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;