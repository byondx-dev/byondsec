import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { NavItem } from '../types';
import { MagneticButton, DecryptedText } from './ui/Animations';
import { Menu, X, Box } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Cases', href: '#cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/30 rounded group-hover:border-primary transition-colors">
              <Box className="w-5 h-5 text-primary group-hover:animate-spin" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
                byond<span className="text-primary">SEC</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-sm font-medium text-gray-400 hover:text-white relative group transition-colors"
              >
                <DecryptedText text={item.label} speed={100} animateOnHover={true} />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton>
              <a href="#contact" className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/50 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 clip-path-slant">
                Request Pentest
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left shadow-[0_0_10px_#39FF88]"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 top-20 z-40 bg-background/95 backdrop-blur-lg flex flex-col p-8 gap-6 md:hidden"
        >
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-2xl font-display font-bold text-white border-b border-white/10 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact"
            className="mt-4 w-full py-4 bg-primary text-black font-bold text-center uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
             Request Pentest
          </a>
        </motion.div>
      )}
    </>
  );
};

export default Header;