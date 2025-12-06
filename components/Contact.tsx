import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, MagneticButton } from './ui/Animations';
import { Send } from 'lucide-react';

interface ContactProps {
  initialMessage?: string;
}

const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const [message, setMessage] = React.useState(initialMessage);

  React.useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-16">

          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-5xl font-display font-bold mb-6">Ready to test<br />your limits?</h2>
              <p className="text-gray-400 mb-8">
                Tell us about your environment. We will propose a tailored attack plan within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Currently accepting new engagements
                </div>
                <div className="text-sm text-gray-500">
                  Encrypted communication available via PGP key 0x4A2B...
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500">Name</label>
                  <input type="text" className="w-full bg-secondary/50 border border-white/10 p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all rounded-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500">Work Email</label>
                  <input type="email" className="w-full bg-secondary/50 border border-white/10 p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all rounded-sm" placeholder="john@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-500">Scope of Interest</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Web App', 'Network', 'Mobile', 'Cloud', 'Red Team', 'Source Code'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 border-white/20 bg-transparent rounded checked:bg-primary accent-primary" />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-500">Project Details</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-secondary/50 border border-white/10 p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all rounded-sm h-32"
                  placeholder="Tell us about your tech stack and objectives..."
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="mt-1" required />
                <p className="text-xs text-gray-500">I acknowledge that I am authorized to request security testing for this entity.</p>
              </div>

              <div className="pt-4">
                <MagneticButton className="w-full md:w-auto">
                  <button type="button" className="w-full md:w-auto px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                    Initialize Request <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
