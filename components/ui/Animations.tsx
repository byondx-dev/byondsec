import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- 1. Shiny Text ---
interface ShinyTextProps {
  text: string;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = "" }) => {
  return (
    <span
      className={`relative inline-block bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shiny ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #39FF88 30%, #fff 40%, #39FF88 50%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animation: 'shine 5s linear infinite',
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
};

// --- 2. Magnetic Button ---
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- 3. Tilt Card ---
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

// --- 4. Spotlight Card ---
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", spotlightColor = "rgba(57, 255, 136, 0.15)" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- 5. Scroll Reveal ---
interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0 }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- 6. Glitch Text (Simple CSS Pulse) ---
interface GlitchTextProps {
  text: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  return (
    <div className="relative group inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 delay-75 animate-pulse">
        {text}
      </span>
    </div>
  );
};

// --- 7. Custom Cursor ---
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 border border-primary rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-difference hidden md:block transition-transform duration-100 ease-out"
    >
      <div className="absolute inset-0 bg-primary opacity-20 rounded-full blur-[2px]"></div>
    </div>
  );
};

// --- 8. Animated Grid ---
export const AnimatedGridBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-[0.15]" style={{ backgroundSize: '40px 40px' }}></div>
    </div>
  )
}

// --- 9. Orbiting Circles (Refined) ---
interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className = "",
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}) => {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/10 stroke-1 fill-none"
            cx="50%"
            cy="50%"
            r={radius}
          />
        </svg>
      )}

      <div
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={`absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border-none bg-transparent [animation-delay:calc(var(--delay)*1000ms)] ${reverse ? "[animation-direction:reverse]" : ""
          } ${className}`}
      >
        <div className="relative flex size-full items-center justify-center">
          <div className="absolute flex h-full w-full items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: `translateX(${radius}px)` }}>
              <div className={reverse ? "animate-orbit-reverse" : "animate-orbit-maintain"}>
                {children}
              </div>
            </div>
          </div>
        </div>
        <style>{`
            @keyframes orbit {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes orbit-reverse {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(-360deg); }
            }
            @keyframes orbit-maintain {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(-360deg); }
            }
            .animate-orbit {
                animation: orbit calc(var(--duration) * 1s) linear infinite;
            }
            .animate-orbit-reverse {
                 animation: orbit-reverse calc(var(--duration) * 1s) linear infinite;
            }
            .animate-orbit-maintain {
                 animation: orbit-maintain calc(var(--duration) * 1s) linear infinite;
            }
        `}</style>
      </div>
    </>
  );
};

// --- 10. Aurora Background ---
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col h-[100vh] items-center justify-center bg-background transition-bg overflow-hidden ${className || ""}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            absolute -inset-[10px] opacity-30
            [--white-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_7%,transparent_10%,transparent_12%,rgba(255,255,255,0.1)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_7%,transparent_10%,transparent_12%,rgba(0,0,0,0.1)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#39FF88_10%,#29E8FF_15%,#1A1D26_20%,#39FF88_25%,#29E8FF_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert-0
            after:content-[""] after:absolute after:inset-0 
            after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
          `}
        ></div>
        {showRadialGradient && (
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" />
        )}
      </div>
      {children}
    </div>
  );
};

// --- 11. Decrypted Text ---
interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  revealDelay?: number;
  animateOnHover?: boolean;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  className = "",
  revealDelay = 0,
  animateOnHover = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    let interval: any;
    let iteration = 0;

    const startAnimation = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText(prev =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    if (!animateOnHover) {
      const timeout = setTimeout(startAnimation, revealDelay);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    } else if (isHovered) {
      startAnimation();
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [text, speed, revealDelay, animateOnHover, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => animateOnHover && setIsHovered(true)}
      onMouseLeave={() => animateOnHover && setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

// --- 12. Border Beam ---
interface BorderBeamProps {
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration = 10,
  borderWidth = 2,
  colorFrom = "#39FF88",
  colorTo = "#29E8FF",
  className,
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className || ""}`}
      style={{
        "--duration": duration,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-[inherit] border-[length:var(--border-width)] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      />
      <div
        className="absolute aspect-square w-full rounded-[inherit] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent opacity-0 animate-border-beam"
        style={{
          offsetPath: "rect(0 auto auto 0 round calc(var(--border-width) + 2px))",
        }}
      />
    </div>
  )
}

// --- 13. Threads Background ---
interface ThreadsProps {
  amplitude?: number;
  distance?: number;
  color?: string;
  children?: React.ReactNode;
}

export const Threads: React.FC<ThreadsProps> = ({
  amplitude = 1,
  distance = 5,
  color = "#39FF88",
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    // Use scrollHeight of container to ensure background covers entire scrollable area
    let height = canvas.height = Math.max(window.innerHeight, container.scrollHeight);
    let time = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.max(window.innerHeight, container.scrollHeight);
    };

    // --- Added ResizeObserver for robust mobile handling ---
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const alpha = (i / 20) * 0.5;
        ctx.strokeStyle = `rgba(57, 255, 136, ${alpha})`;
        if (i % 3 === 0) ctx.strokeStyle = `rgba(41, 232, 255, ${alpha})`;
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 10) {
          const y = height / 2
            + Math.sin(x * 0.003 + time + i * 0.1) * 100 * amplitude
            + Math.sin(x * 0.01 + time * 0.5) * 50;
          const perspectiveY = y + (i - 10) * distance;
          if (x === 0) ctx.moveTo(x, perspectiveY);
          else ctx.lineTo(x, perspectiveY);
        }
        ctx.stroke();
      }
      time += 0.02;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", resize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [amplitude, distance, color]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

// --- 14. Terminal Typing Effect ---
interface TerminalProps {
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Original Boot Sequence
  const bootSequence = [
    { text: "> initializing connection...", delay: 500 },
    { text: "> target: enterprise_infrastructure", delay: 1200 },
    { text: "> scanning ports [22, 80, 443, 8080]...", delay: 2000 },
    { text: "> finding entry point...", delay: 2800 },
    { text: "> bypass_firewall: SUCCESS", delay: 3500, highlight: true },
    { text: "> injecting payload...", delay: 4200 },
    { text: "> session established.", delay: 5000, color: "#39FF88" },
  ];

  // Commands list
  const commands = [
    { cmd: "nmap -sV -p- 192.168.1.10", output: "Starting Nmap 7.92... Open ports found: 22, 80, 443, 3306" },
    { cmd: "whoami", output: "root" },
    { cmd: "cat /etc/shadow", output: "root:$6$hG9... (HASH ENCRYPTED)" },
    { cmd: "sqlmap -u target.com/id=1 --dbs", output: "[*] fetching database names... available databases [3]: 'users', 'admin', 'logs'" },
    { cmd: "hydra -l admin -P rocky.txt target.com ssh", output: "[22][ssh] host: target.com   login: admin   password: password123" },
    { cmd: "metasploit > use exploit/multi/handler", output: "[*] Started reverse TCP handler on 0.0.0.0:4444" },
    { cmd: "check_gateway_status.sh", output: "Gateway: ONLINE | Latency: 14ms | Packet Loss: 0%" },
    { cmd: "arp-scan --localnet", output: "Interface: eth0, datalink type: EN10MB\n192.168.1.1   00:1a:2b:3c:4d:5e\n192.168.1.10  08:00:27:12:34:56" },
    { cmd: "nikto -h http://internal-server", output: "+ Server: Apache/2.4.41 (Ubuntu)\n+ No CGI Directories found" },
    { cmd: "hashcat -m 0 hashes.txt rockyou.txt", output: "Session..........: hashcat\nStatus...........: Cracked\nInput.Mode.......: File (hashes.txt)" },
    { cmd: "msfvenom -p windows/x64/meterpreter_reverse_tcp", output: "Payload size: 510 bytes\nSaved as: shell.exe" },
    { cmd: "kubectl get pods --all-namespaces", output: "NAMESPACE     NAME              READY   STATUS    RESTARTS   AGE\nkube-system   coredns-78f...   1/1     Running   0          4d" },
    { cmd: "wireshark -i eth0 -k", output: "Capturing on 'eth0'..." },
    { cmd: "dirb http://target.com/admin", output: "GENERATED WORDS: 4612\nSCANNING: http://target.com/admin/\n+ http://target.com/admin/index.php (CODE:200)" },
    { cmd: "ssh root@10.0.0.5", output: "Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-74-generic x86_64)" },
    { cmd: "ps aux | grep apache", output: "root      1234  0.0  0.2  12345  6789 ?        Ss   10:00   0:00 /usr/sbin/apache2 -k start" },
    { cmd: "netstat -tuln", output: "Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State" },
    { cmd: "git clone https://github.com/exploit/cve-2025.git", output: "Cloning into 'cve-2025'...\nReceiving objects: 100% (14/14), done." },
    { cmd: "python3 exploit.py --target 10.0.0.5", output: "[*] Sending payload...\n[+] Exploit successful! Shell spawned." },
    { cmd: "rm -rf /var/logs/audit.log", output: "rm: cannot remove '/var/logs/audit.log': Permission denied" },
    { cmd: "sudo rm -rf /var/logs/audit.log", output: "" } // Empty output for successful silent command
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cmdIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isWebShell = false;

    // Run Boot Sequence
    const runBoot = () => {
      bootSequence.forEach((item) => {
        setTimeout(() => {
          setLines(prev => [...prev, item.text]);
        }, item.delay);
      });
    };

    runBoot();

    // Loop Function
    const loop = () => {
      if (!isWebShell) return;

      const currentCmdObj = commands[cmdIndex];
      const cmdText = currentCmdObj.cmd;

      if (isTyping) {
        if (charIndex < cmdText.length) {
          setCurrentLine(prev => prev + cmdText[charIndex]);
          charIndex++;
          // Faster typing for hacker feel (30-80ms)
          timeout = setTimeout(loop, 30 + Math.random() * 50);
        } else {
          isTyping = false;
          timeout = setTimeout(loop, 400); // Wait before executing
        }
      } else {
        // Execute command
        setLines(prev => {
          // Keep last 16 lines to ensure history doesn't grow indefinitely but keeps context
          const newLines = [...prev, `user@byondSEC:~# ${cmdText}`, currentCmdObj.output].filter(l => l !== "");
          return newLines.slice(-16);
        });
        setCurrentLine("");
        charIndex = 0;
        cmdIndex = (cmdIndex + 1) % commands.length;
        isTyping = true;
        // Delay before next command typing starts
        timeout = setTimeout(loop, 800);
      }
    };

    // Start shell loop after boot sequence finishes (approx 6s)
    const startLoop = () => {
      isWebShell = true;
      loop();
    };

    const bootTimeout = setTimeout(startLoop, 6000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(bootTimeout);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <div className={`font-mono text-xs md:text-sm bg-[#050505] border border-white/10 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      <div className="bg-[#1A1A1A] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <div className="ml-2 text-gray-500 text-[10px]">byondSEC -- root -- bash -- 80x24</div>
      </div>
      <div
        ref={containerRef}
        className="p-4 h-[250px] md:h-[300px] overflow-y-auto overflow-x-hidden flex flex-col justify-start gap-1 custom-scrollbar text-left"
      >
        {lines.map((line, i) => (
          <div key={i} className={`${line.includes("SUCCESS") || line.includes("session") ? 'text-primary' : (line.startsWith("user@") ? 'text-primary mt-2' : 'text-gray-400 pl-2')} break-words whitespace-pre-wrap`}>
            {line}
          </div>
        ))}
        {/* Always show cursor line at bottom, but only active during shell phase */}
        <div className="text-primary mt-2">
          user@byondSEC:~# {currentLine}<span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

// --- 15. Letter Glitch (Canvas) ---
interface LetterGlitchProps {
  text?: string;
  width?: number;
  height?: number;
  className?: string;
  colors?: { text: string; glitch: string; bg: string };
}

export const LetterGlitch: React.FC<LetterGlitchProps> = ({
  text = "GLITCH",
  width = 300,
  height = 100,
  className = "",
  colors = { text: "#ffffff", glitch: "#39FF88", bg: "#000000" }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let glitchFrame = 0;

    const fontSize = 48;
    ctx.font = `bold ${fontSize}px Space Grotesk`;

    const draw = () => {
      // Clear
      ctx.fillStyle = colors.bg;
      ctx.clearRect(0, 0, width, height); // Transparent clear

      // Draw Main Text
      ctx.fillStyle = colors.text;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2);

      // Glitch Effect
      if (Math.random() < 0.1 || glitchFrame > 0) {
        if (glitchFrame === 0) glitchFrame = Math.floor(Math.random() * 5) + 2;
        glitchFrame--;

        const slices = 5;
        const maxOffset = 5;

        for (let i = 0; i < slices; i++) {
          const sy = Math.random() * height;
          const sh = Math.random() * (height / 4);
          const dx = (Math.random() - 0.5) * maxOffset;
          const dy = (Math.random() - 0.5) * maxOffset;

          // Get image data of slice
          const imgData = ctx.getImageData(0, sy, width, sh);

          // Draw RGB Split sometimes
          if (Math.random() < 0.3) {
            ctx.fillStyle = colors.glitch;
            ctx.fillText(text, width / 2 + dx + 2, height / 2 + dy);
          }

          ctx.putImageData(imgData, dx, sy + dy);
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [text, width, height, colors]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`block ${className}`}
    />
  );
};