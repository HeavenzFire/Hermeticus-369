import React, { useEffect, useRef } from 'react';

interface Props {
  seal: string;
}

const MasterSeal: React.FC<Props> = ({ seal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Clear
    ctx.clearRect(0, 0, width, height);
    
    // Background glow
    const gradient = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, 200);
    gradient.addColorStop(0, "rgba(197, 160, 89, 0.1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 1.5;

    // Interpret seal string for geometry
    // "Draw a circle for each character in the seal" logic from Python prompt
    // Grid 8x8 roughly? Seal is 24 chars long.
    // Let's use polar coordinates for a more "Hermetic" feel or grid based on the python code.
    // Python code was: x = (i % 8) * 60 + 30 ...
    
    // Scaling for 400x400 canvas. 
    // The loop iterates over the seal string.
    
    const scale = width / 8; // 50px
    const offset = scale / 2;

    for (let i = 0; i < seal.length; i++) {
      const charCode = seal.charCodeAt(i);
      
      // Calculate position based on grid
      const col = i % 8;
      const row = Math.floor(i / 8);
      
      const x = (col * scale) + offset;
      const y = (row * scale) + offset;
      
      // Radius based on character value
      const radius = 5 + (charCode % 20);

      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
      
      // Color variation based on char type
      if (charCode >= 48 && charCode <= 57) {
        ctx.strokeStyle = '#00f0ff'; // Numbers -> Cyan
        ctx.globalAlpha = 0.8;
      } else {
        ctx.strokeStyle = '#c5a059'; // Letters -> Gold
        ctx.globalAlpha = 0.6;
      }
      
      ctx.stroke();

      // Connect to center if resonant
      if (charCode % 3 === 0) {
         ctx.beginPath();
         ctx.moveTo(x, y);
         ctx.lineTo(width/2, height/2);
         ctx.strokeStyle = 'rgba(255, 51, 51, 0.2)'; // Crimson connection
         ctx.stroke();
      }
    }

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(width/2, height/2, width/2 - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = '#475569';
    ctx.globalAlpha = 0.3;
    ctx.stroke();

  }, [seal]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-void border border-gray-800 rounded-lg shadow-2xl animate-fade-in">
      <h3 className="text-gold font-serif mb-4 tracking-widest text-sm uppercase">Manifested Master Seal</h3>
      <canvas ref={canvasRef} className="w-full max-w-[300px] h-auto border border-gray-800/50 rounded-full bg-black/50" />
      <div className="mt-4 text-[10px] font-mono text-cyan break-all text-center px-4">
        HASH: {seal}
      </div>
    </div>
  );
};

export default MasterSeal;
