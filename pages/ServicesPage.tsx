import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchText, Reveal, TiltCard, MagneticButton } from '../components/ui/Animations';
import Contact from '../components/Contact';
import EngagementModels from '../components/EngagementModels';
import AvailabilityChecker from '../components/AvailabilityChecker';
import MatrixRain from '../components/ui/MatrixRain';
import { Globe, Server, Smartphone, Cloud, Key, Users, Wifi, Database, Code, Cpu, Search, Layers, Terminal, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

const allServices: ServiceItem[] = [
  {
    title: "Web Application Pentest",
    description: "Comprehensive assessment of web applications focusing on OWASP Top 10, business logic flaws, and complex vulnerability chains that automated scanners miss.",
    tags: ["OWASP", "Business Logic", "API"],
    icon: <Globe className="w-8 h-8 text-primary" />
  },
  {
    title: "API & Microservices",
    description: "Deep dive into REST, GraphQL, and gRPC endpoints. We test for broken object level authorization, injection attacks, and improperly handled data exposure.",
    tags: ["GraphQL", "REST", "AuthZ"],
    icon: <Server className="w-8 h-8 text-accent" />
  },
  {
    title: "Mobile App Security",
    description: "Static and dynamic analysis (SAST/DAST) of iOS and Android binaries. We verify secure storage, certificate pinning, and runtime protections.",
    tags: ["iOS", "Android", "Reversing"],
    icon: <Smartphone className="w-8 h-8 text-purple-400" />
  },
  {
    title: "Cloud Security Assessment",
    description: "Reviewing AWS, Azure, and GCP environments. We audit IAM roles, S3 bucket policies, and Kubernetes configurations to prevent privilege escalation.",
    tags: ["AWS", "Azure", "Kubernetes"],
    icon: <Cloud className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Internal Infrastructure",
    description: "Simulating an insider threat. We map attack paths from a compromised workstation to Domain Admin using Active Directory exploitation techniques.",
    tags: ["AD", "Kerberos", "Lateral Movement"],
    icon: <Key className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Red Teaming",
    description: "Full-scope adversarial simulation. We combine physical security, social engineering, and network exploitation to test your blue team's detection capabilities.",
    tags: ["Phishing", "Physical", "Stealth"],
    icon: <Users className="w-8 h-8 text-red-500" />
  },
  {
    title: "Wireless Security",
    description: "Assessment of Wi-Fi networks (WPA2/WPA3, Enterprise). We test for weak configurations, rogue access points, and segmentation issues.",
    tags: ["WiFi", "WPA3", "Segmentation"],
    icon: <Wifi className="w-8 h-8 text-green-400" />
  },
  {
    title: "Database Security",
    description: "Hardening audits for SQL and NoSQL databases. We check for injection vulnerabilities, weak encryption, and improper access controls.",
    tags: ["SQL", "NoSQL", "Encryption"],
    icon: <Database className="w-8 h-8 text-orange-400" />
  },
  {
    title: "Source Code Review",
    description: "Manual line-by-line code analysis to identify security flaws early in the development lifecycle. We support Java, Python, Go, C++, and more.",
    tags: ["SAST", "Secure Coding", "DevSecOps"],
    icon: <Code className="w-8 h-8 text-pink-400" />
  },
  {
    title: "IoT & Firmware",
    description: "Reverse engineering of firmware and hardware analysis. We look for hardcoded credentials, debug ports (JTAG/UART), and insecure communication.",
    tags: ["IoT", "Hardware", "Firmware"],
    icon: <Cpu className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Social Engineering",
    description: "Testing the human element. Targeted phishing campaigns, vishing, and physical tailgating to assess security awareness.",
    tags: ["Phishing", "OSINT", "Awareness"],
    icon: <Search className="w-8 h-8 text-teal-400" />
  },
  {
    title: "Blockchain & Smart Contracts",
    description: "Auditing Solidity and Rust smart contracts for reentrancy attacks, overflow bugs, and logical errors in DeFi protocols.",
    tags: ["Web3", "Solidity", "DeFi"],
    icon: <Layers className="w-8 h-8 text-indigo-400" />
  }
];

const ServicesPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const toggleService = (title: string) => {
    setSelectedServices(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const toggleModel = (title: string) => {
    setSelectedModels(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const initialMessage = (selectedServices.length > 0 || selectedModels.length > 0)
    ? `I am interested in:\n\n` +
    (selectedServices.length > 0 ? `Services:\n${selectedServices.map(s => `- ${s}`).join('\n')}\n\n` : '') +
    (selectedModels.length > 0 ? `Engagement Models:\n${selectedModels.map(s => `- ${s}`).join('\n')}\n\n` : '') +
    `Project details:`
    : '';

  return (
    <div className="min-h-screen text-gray-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 border-b border-white/5 bg-black">
        <MatrixRain color="#39FF88" fontSize={16} speed={35} />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background/90" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6 backdrop-blur-md">
              <Terminal className="w-4 h-4" />
              <span>Cyber Operations</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              <GlitchText text="Elite Offensive Security" />
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
              We provide a complete spectrum of offensive security services. From deep-dive manual penetration testing to full-scale red team simulations, we find the vulnerabilities that matter.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <MagneticButton>
              <a href="#service-grid" className="inline-flex items-center gap-2 px-8 py-4 rounded bg-primary text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
                Explore Capabilities
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section id="service-grid" className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <p className="text-center text-lg md:text-xl text-primary font-mono mb-12 max-w-3xl mx-auto border border-primary/20 bg-primary/5 py-4 rounded-lg">
              Choose the service you are interested in and contact us in the contact form down below.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, idx) => {
              const isSelected = selectedServices.includes(service.title);
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <TiltCard className="h-full">
                    <div
                      onClick={() => toggleService(service.title)}
                      className={`group relative h-full border p-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,136,0.1)] cursor-pointer
                      ${isSelected ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(57,255,136,0.15)]' : 'bg-secondary/20 border-white/5 hover:border-primary/40'}
                    `}
                    >
                      {/* Hover Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`p-3 w-fit rounded-lg border transition-all duration-300
                          ${isSelected ? 'bg-primary/20 border-primary text-primary scale-110' : 'bg-white/5 border-white/5 group-hover:scale-105 md:group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20'}
                        `}>
                            {React.cloneElement(service.icon as React.ReactElement, { className: `w-8 h-8 ${isSelected ? 'text-primary' : (service.icon as React.ReactElement).props.className}` })}
                          </div>
                          {isSelected && <CheckCircle2 className="w-6 h-6 text-primary animate-in fade-in zoom-in" />}
                        </div>

                        <h3 className={`text-xl font-bold font-display mb-3 transition-colors ${isSelected ? 'text-primary' : 'group-hover:text-primary'}`}>
                          {service.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                          {service.tags.map(tag => (
                            <span key={tag} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border transition-colors
                            ${isSelected ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/40 text-gray-400 border-white/10 group-hover:border-primary/30 group-hover:text-primary/80'}
                          `}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <EngagementModels
        showEducationalContent={true}
        selectedModels={selectedModels}
        onToggleModel={toggleModel}
      />

      {/* Availability Checker */}
      <AvailabilityChecker />

      {/* Contact Form Integration */}
      <Contact initialMessage={initialMessage} />
    </div>
  );
};

export default ServicesPage;
