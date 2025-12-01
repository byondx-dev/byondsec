import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './ui/Animations';

const steps = [
  {
    num: "01",
    title: "Reconnaissance",
    desc: "OSINT gathering, passive scanning, and mapping the attack surface to identify potential entry points."
  },
  {
    num: "02",
    title: "Threat Modeling",
    desc: "Analyzing architecture and logic to hypothesize high-impact attack vectors tailored to the business."
  },
  {
    num: "03",
    title: "Exploitation",
    desc: "Active attempts to compromise systems, bypass controls, and execute arbitrary code or extract data."
  },
  {
    num: "04",
    title: "Post-Exploitation",
    desc: "Demonstrating impact through lateral movement, privilege escalation, and persistence simulation."
  },
  {
    num: "05",
    title: "Reporting",
    desc: "Detailed technical breakdown with proof-of-concept exploits and strategic executive summaries."
  }
];

const Methodology: React.FC = () => {
  return (
    <section id="methodology" className="py-32 bg-[#05070D] relative overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20">
        
        {/* Sticky Header */}
        <div className="lg:sticky lg:top-32 h-fit">
          <Reveal>
            <div className="inline-block px-3 py-1 mb-6 border border-primary/20 bg-primary/5 rounded-full">
               <span className="text-primary text-xs font-mono tracking-widest uppercase">The Lifecycle</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-5xl font-display font-bold mb-6">How we dismantle<br/>defenses.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-gray-400 text-lg max-w-md">
              Our methodology follows rigorous industry standards (OSSTMM, PTES) enhanced by custom Red Team tradecraft.
            </p>
          </Reveal>
          <div className="mt-12 hidden lg:block">
            {/* Decorative Matrix Graphic */}
            <div className="w-64 h-64 grid grid-cols-6 grid-rows-6 gap-2 opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                  className="bg-primary rounded-sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/5" />
          
          <div className="flex flex-col gap-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative pl-16 group"
              >
                {/* Connector Dot */}
                <div className="absolute left-0 top-0 w-10 h-10 bg-background border border-white/10 rounded-full flex items-center justify-center z-10 group-hover:border-primary transition-colors duration-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-primary group-hover:shadow-[0_0_10px_#39FF88] transition-all duration-500" />
                </div>

                <span className="text-sm font-mono text-primary/50 mb-2 block">{step.num}</span>
                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed border-l-2 border-white/5 pl-6 group-hover:border-primary/20 transition-colors">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
