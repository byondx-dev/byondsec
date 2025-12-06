import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Loader2, Globe } from 'lucide-react';
import { Reveal, BorderBeam } from './ui/Animations';

const AvailabilityChecker: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'checking' | 'success'>('idle');
    const [delayDuration, setDelayDuration] = useState(3000);

    const checkAvailability = () => {
        setStatus('checking');

        // Calculate next delay (increment by 2s)
        const nextDelay = delayDuration + 2000;

        setTimeout(() => {
            setStatus('success');
            setDelayDuration(nextDelay);
        }, delayDuration);
    };

    return (
        <section className="py-32 container mx-auto px-4">
            <Reveal width="100%">
                <div className="relative max-w-3xl mx-auto">
                    {/* Main Card Container */}
                    <div className="relative bg-[#050505] border border-white/10 rounded-2xl overflow-hidden p-8 md:p-12 text-center shadow-2xl">

                        {/* Fancy Border Beam */}
                        <BorderBeam duration={8} size={400} />

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center justify-center">

                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                            <Globe className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                                            Check Capacity
                                        </h2>
                                        <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                                            Due to high demand and large-scale projects with international enterprise clients, our engineering slots are often fully booked.
                                        </p>
                                        <button
                                            onClick={checkAvailability}
                                            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-black rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(57,255,136,0.3)] hover:shadow-[0_0_30px_rgba(57,255,136,0.5)]"
                                        >
                                            <Calendar className="w-5 h-5" />
                                            Check for free slots
                                        </button>
                                    </motion.div>
                                )}

                                {status === 'checking' && (
                                    <motion.div
                                        key="checking"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center py-8"
                                    >
                                        <div className="relative mb-8">
                                            <div className="w-20 h-20 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Loader2 className="w-8 h-8 text-primary animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-mono text-primary text-sm animate-pulse tracking-widest uppercase">
                                                Accessing Internal PM Tool...
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">
                                                Syncing resource allocation database...
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/50 shadow-[0_0_40px_rgba(57,255,136,0.2)] animate-in fade-in zoom-in duration-500">
                                            <ShieldCheck className="w-10 h-10 text-primary" />
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                            Good News!
                                        </h3>

                                        <div className="max-w-md mx-auto space-y-4">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We verified our schedule and currently have capacity for new engagements. We are ready to take on your project.
                                            </p>
                                            <p className="text-sm text-gray-500 border-t border-white/10 pt-4 mt-4">
                                                Contact us to discuss the details.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default AvailabilityChecker;
