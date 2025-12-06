import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { hackingIncidents } from "../data/hackingIncidents";
import { ShieldCheck, ArrowRight, BarChart3 } from "lucide-react";
import { MagneticButton, SpotlightCard } from "./ui/Animations";

// Helper to format currency
const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
    }).format(value);
};

// Animated Number Component
const AnimatedNumber = ({ value, currency }: { value: number, currency: string }) => {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => formatCurrency(Math.floor(current), currency));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

const CyberDamageTicker: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % hackingIncidents.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, []);

    const incident = hackingIncidents[currentIndex];

    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.08),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* LEFT SIDE: Big Impact Text */}
                    <div className="flex-1 space-y-8 sticky top-24 mb-16 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Data Breaches Radar
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                                Pentesting can save you from damages amounting to{" "}
                                <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tabular-nums">
                                    <AnimatedNumber value={incident.amount} currency={incident.currency} />
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            className="text-xl text-gray-400 max-w-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Cyber attacks aren't just IT problems—they are existential financial risks.
                            Secure your infrastructure before you become a statistic.
                        </motion.p>
                    </div>

                    {/* RIGHT SIDE: Incident Details Card + Chart + Button */}
                    <div className="flex-1 w-full max-w-lg space-y-6">
                        {/* Incident Card */}
                        <SpotlightCard className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm" spotlightColor="rgba(239, 68, 68, 0.15)">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{incident.name}</h3>
                                            <span className="text-red-400 font-mono text-sm">{incident.year}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Estimated Cost/Loss</span>
                                            <span className="text-xl font-bold text-red-500">{formatCurrency(incident.amount, incident.currency)}</span>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                                    <div>
                                        <h4 className="text-lg font-medium text-gray-200 mb-2">{incident.description}</h4>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {incident.details}
                                        </p>
                                    </div>

                                    {/* Removed Metadata Footer as requested */}
                                </motion.div>
                            </AnimatePresence>
                        </SpotlightCard>

                        {/* Cost Comparison Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Cost Analysis</span>
                            </div>

                            <div className="space-y-6">
                                {/* Incident Cost Bar */}
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-300">Avg. Data Breach Cost</span>
                                        {/* No numbers visible as requested */}
                                    </div>
                                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 text-right">Devastating Impact</p>
                                </div>

                                {/* Pentest Cost Bar */}
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-300">Pentest costs by us. Yes the bar is really that low *-*</span>
                                    </div>
                                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex items-center">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "1%" }} // Represents ~10k vs 5M (0.2%) - visually minimal
                                            transition={{ duration: 0.5, delay: 0.8 }}
                                            className="h-full w-1 bg-primary shadow-[0_0_10px_rgba(57,255,136,0.6)] rounded-full"
                                        />
                                    </div>
                                    <p className="text-[10px] text-primary/70 mt-1 text-right">Preventive Investment</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-2"
                        >
                            <a href="/services" className="block">
                                <MagneticButton className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold rounded-xl text-lg hover:bg-white transition-colors">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span>Hire us and protect yourself</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </MagneticButton>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CyberDamageTicker;
