import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-black font-semibold shadow-[0_10px_30px_rgba(57,255,136,0.3)] hover:shadow-[0_12px_36px_rgba(57,255,136,0.45)] transition-shadow"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
      Top
    </button>
  );
};

export default ScrollToTop;
