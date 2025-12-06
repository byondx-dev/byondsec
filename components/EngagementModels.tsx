import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, SpotlightCard, BorderBeam } from './ui/Animations';
import { CheckCircle2, ChevronDown, Check } from 'lucide-react';

interface EngagementModelsProps {
    showEducationalContent?: boolean;
    selectedModels?: string[];
    onToggleModel?: (title: string) => void;
}

const EngagementModels: React.FC<EngagementModelsProps> = ({
    showEducationalContent = false,
    selectedModels = [],
    onToggleModel
}) => {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const models = [
        {
            title: "Standard Pentest",
            price: "from €5k",
            desc: "Time-boxed assessment for performance compliance (ISO/SOC2).",
            features: ["1-2 Weeks", "Standard Report", "1 Retest"],
            educationalTitle: "Why choose Standard?",
            educationalContent: "Perfect for meeting vendor requirements or annual compliance checks. It provides a solid baseline validiation of your security posture within a fixed timeframe."
        },
        {
            title: "Red Teaming",
            price: "Custom",
            desc: "Full-scope adversarial simulation.",
            features: ["4+ Weeks", "Physical & Social", "Attack Path Mapping"],
            highlight: true,
            educationalTitle: "Why choose Red Teaming?",
            educationalContent: "Goes beyond technical vulnerabilities to test your entire organization's resilience. Ideal for mature security programs wanting to validate incident response capabilities."
        },
        {
            title: "Continuous",
            price: "Subscription",
            desc: "Real-time vulnerability management.",
            features: ["Monthly Tests", "Slack Integration", "Instant Retest"],
            educationalTitle: "Why choose Continuous?",
            educationalContent: "Built for agile teams deploying daily. Integrates directly into your CI/CD pipeline ensuring that every release is secure, reducing the attacker's window of opportunity."
        }
    ];

    const handleToggle = (title: string) => {
        if (onToggleModel) {
            onToggleModel(title);
        }
    };

    return (
        <section id="engagement-models" className="py-32 container mx-auto px-4 relative">
            <Reveal>
                <h2 className="text-4xl font-display font-bold mb-12 text-center">Engagement Models</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {models.map((plan, i) => {
                    const isSelected = selectedModels.includes(plan.title);

                    return (
                        <SpotlightCard
                            key={i}
                            className={`
                h-full border rounded-xl p-8 flex flex-col relative transition-all duration-300
                ${showEducationalContent && isSelected ? 'border-primary bg-primary/10' : ''}
                ${plan.highlight && !isSelected ? 'border-primary/50 bg-primary/5' : ''}
                ${!plan.highlight && !isSelected ? 'border-white/10 bg-secondary/20' : ''}
                ${showEducationalContent ? 'cursor-pointer hover:border-primary/50' : ''}
              `}
                        >
                            <div onClick={() => showEducationalContent && handleToggle(plan.title)} className="flex-1 flex flex-col">
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-primary">
                                        <CheckCircle2 className="w-6 h-6 fill-primary/20" />
                                    </div>
                                )}

                                {/* Border Beam only on highlighted card (if not selected) */}
                                {plan.highlight && !isSelected && <BorderBeam duration={12} colorFrom="#39FF88" colorTo="#29E8FF" />}

                                <h3 className="text-xl font-bold font-display mb-2">{plan.title}</h3>
                                <div className="text-3xl font-bold text-white mb-4">{plan.price}</div>
                                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Home Page: Link to Services */}
                            {!showEducationalContent && (
                                <a
                                    href="/services"
                                    className={`w-full py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors z-10 text-center block ${plan.highlight ? 'bg-primary text-black hover:bg-white' : 'border border-white/20 hover:bg-white/10'}`}
                                >
                                    Details
                                </a>
                            )}

                            {/* Services Page: Dropdown */}
                            {showEducationalContent && (
                                <div className="mt-4 border-t border-white/10 pt-4 z-20" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                                        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wider"
                                    >
                                        <span>{plan.educationalTitle}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pt-3 text-sm text-gray-400 leading-relaxed">
                                                    {plan.educationalContent}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </SpotlightCard>
                    );
                })}
            </div>
        </section>
    );
};

export default EngagementModels;
