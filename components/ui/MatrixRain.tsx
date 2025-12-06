import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
    color?: string;
    fontSize?: number;
    speed?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
    color = '#0F0',
    fontSize = 14,
    speed = 30
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();

        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1);

        // Characters (Katakana + Latin + Numbers)
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ';

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            // Control speed
            setTimeout(() => {
                animationFrameId = requestAnimationFrame(draw);
            }, 1000 / speed);
        };

        draw();

        window.addEventListener('resize', setCanvasSize);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, fontSize, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
        />
    );
};

export default MatrixRain;
