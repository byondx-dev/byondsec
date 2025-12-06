import React from 'react';
import { motion } from 'framer-motion';
import { ShinyText, MagneticButton, Threads, DecryptedText, Terminal } from './ui/Animations';
import { ArrowDown, Command } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <Threads amplitude={1.5} distance={10}>
      <section className="relative w-full min-h-[130vh] md:min-h-screen flex items-start md:items-center justify-center pt-32 pb-16 md:py-24 z-10 px-4">

        <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 border border-primary/20 mb-8"
            >
              <Command className="w-3 h-3 text-primary" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase">
                NextGen Pentesting by byondSEC
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter"
            >
              <DecryptedText text="SECURE" speed={60} className="block text-white" />
              <span className="text-gray-600">BY</span> <ShinyText text="BREAKING" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light"
            >
              <span className="text-primary font-mono">{'>'}</span> We simulate sophisticated cyber adversaries to expose your blind spots before they become headlines. NextGen Pentests by byondSEC
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              <MagneticButton>
                <a href="#contact" className="rounded-full px-8 py-4 bg-primary text-black font-bold font-mono uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(57,255,136,0.5)] transition-all flex items-center gap-2">
                  Execute Audit
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#methodology" className="rounded-full px-8 py-4 bg-transparent border border-white/20 text-white font-bold font-mono uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-2 group backdrop-blur-sm">
                  View Methodology <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Terminal Emulator Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-5 relative mt-12 lg:mt-0"
          >
            {/* Decorative background glow behind terminal */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 rounded-full pointer-events-none"></div>

            <Terminal className="relative z-10 w-full shadow-2xl border-primary/30" />

            {/* Decorative elements around terminal */}
            <motion.div
              className="absolute -right-8 -bottom-8 hidden md:flex flex-col gap-2 font-mono text-[10px] text-gray-600 text-right"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span>ENCRYPTION: AES-256</span>
              <span>STATUS: LIVE</span>
              <span>LATENCY: 12ms</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-10 left-4 md:left-10 flex flex-col items-start gap-2 opacity-50 hidden md:flex"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-[10px] font-mono uppercase text-primary">System.ScrollY</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>
    </Threads>
  );
};

export default Hero;
