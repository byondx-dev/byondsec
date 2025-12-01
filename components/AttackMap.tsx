import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, OrbitingCircles, LetterGlitch } from './ui/Animations';
import { Database, Globe, Lock, Wifi, Smartphone, Cloud, Server, Shield } from 'lucide-react';

const AttackMap: React.FC = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden flex flex-col items-center">
        {/* Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 text-center mb-16 relative z-10">
            <Reveal>
                <h2 className="text-4xl font-display font-bold mb-4">Visualize your Attack Surface</h2>
                <p className="text-gray-400">Everything is connected. Everything is a target.</p>
            </Reveal>
        </div>

        <div className="relative flex h-[600px] w-full max-w-[800px] flex-col items-center justify-center overflow-hidden rounded-lg bg-background/50 border border-white/5 shadow-2xl">
            {/* Center Core with Letter Glitch */}
            <div className="z-20 flex items-center justify-center bg-black/80 rounded-full w-40 h-40 border border-primary/30 shadow-[0_0_50px_rgba(57,255,136,0.2)]">
                <LetterGlitch 
                    text="SYSTEM CORE" 
                    width={150} 
                    height={80} 
                    colors={{ text: "#ffffff", glitch: "#39FF88", bg: "transparent" }}
                />
            </div>

            {/* Inner Circle */}
            <OrbitingCircles
                className="size-[180px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={90}
            >
                 <Globe className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[180px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={90}
            >
                 <Smartphone className="h-6 w-6 text-gray-400 hover:text-purple-400 transition-colors" />
            </OrbitingCircles>

            {/* Middle Circle (Reverse) */}
            <OrbitingCircles
                className="size-[300px] border-none bg-transparent"
                radius={150}
                duration={25}
                reverse
            >
                <Cloud className="h-8 w-8 text-gray-400 hover:text-accent transition-colors" />
            </OrbitingCircles>
             <OrbitingCircles
                className="size-[300px] border-none bg-transparent"
                radius={150}
                duration={25}
                delay={12.5}
                reverse
            >
                <Server className="h-8 w-8 text-gray-400 hover:text-yellow-400 transition-colors" />
            </OrbitingCircles>

            {/* Outer Circle */}
            <OrbitingCircles
                className="size-[450px] border-none bg-transparent"
                radius={225}
                duration={35}
                delay={5}
            >
                <Shield className="h-10 w-10 text-gray-400 hover:text-red-400 transition-colors" />
            </OrbitingCircles>
             <OrbitingCircles
                className="size-[450px] border-none bg-transparent"
                radius={225}
                duration={35}
                delay={20}
            >
                <Lock className="h-10 w-10 text-gray-400 hover:text-blue-400 transition-colors" />
            </OrbitingCircles>
             <OrbitingCircles
                className="size-[450px] border-none bg-transparent"
                radius={225}
                duration={35}
                delay={30}
            >
                <Database className="h-10 w-10 text-gray-400 hover:text-green-400 transition-colors" />
            </OrbitingCircles>
        </div>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-grid-pattern [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-10 pointer-events-none" />
    </section>
  );
};

export default AttackMap;
