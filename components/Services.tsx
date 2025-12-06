import React from 'react';
import { TiltCard, Reveal, MagneticButton } from './ui/Animations';
import { Globe, Server, Smartphone, Cloud, Key, Users, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Web Application Pentest",
    description: "Deep dive into OWASP Top 10 and business logic flaws. We exploit what scanners miss.",
    tags: ["OWASP", "Business Logic", "API"],
    icon: <Globe className="w-8 h-8 text-primary" />
  },
  {
    title: "API & Microservices",
    description: "Testing REST, GraphQL, and gRPC endpoints for broken authorization and injection attacks.",
    tags: ["GraphQL", "REST", "AuthZ"],
    icon: <Server className="w-8 h-8 text-accent" />
  },
  {
    title: "Mobile App Security",
    description: "Static and dynamic analysis of iOS and Android binaries to secure sensitive data at rest.",
    tags: ["iOS", "Android", "Reversing"],
    icon: <Smartphone className="w-8 h-8 text-purple-400" />
  },
  {
    title: "Cloud Native & K8s",
    description: "Reviewing IAM roles, S3 permissions, and Kubernetes configurations for privilege escalation.",
    tags: ["AWS", "Azure", "Kubernetes"],
    icon: <Cloud className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Internal & Active Directory",
    description: "Simulating an insider threat to map attack paths from a compromised workstation to Domain Admin.",
    tags: ["AD", "Kerberos", "Lateral Movement"],
    icon: <Key className="w-8 h-8 text-yellow-400" />
  },
  {
    title: "Red Teaming",
    description: "Full-scope adversary simulation covering physical, social engineering, and network exploitation.",
    tags: ["Phishing", "Physical", "Stealth"],
    icon: <Users className="w-8 h-8 text-red-500" />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Offensive services <br />
                <span className="text-gray-500">tailored to your stack.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 max-w-xl">
                We don't just run automated scans. Our certified engineers manually probe for logic flaws and complex vulnerability chains.
              </p>
            </Reveal>
          </div>

          <MagneticButton className="min-w-fit">
            <a href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/50 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300">
              To our services <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <TiltCard className="h-full">
                <div className="group relative h-full bg-secondary/30 border border-white/5 p-8 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>



    </section >
  );
};

export default Services;
