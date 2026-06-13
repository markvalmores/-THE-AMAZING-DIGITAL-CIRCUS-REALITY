import React, { useEffect, useRef } from 'react';
import { WeatherType } from '../types';

interface WeatherSceneryCanvasProps {
  weather: WeatherType;
  disaster: string;
}

export const WeatherSceneryCanvas: React.FC<WeatherSceneryCanvasProps> = ({ weather, disaster }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 500;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    
    // Set up ResizeObserver
    const parent = canvas.parentElement;
    let resizeObserver: ResizeObserver | null = null;
    if (parent) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(parent);
    }
    window.addEventListener('resize', handleResize);

    // Weather particles list setup
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life?: number;
      maxLife?: number;
      angle?: number;
      spinSpeed?: number;
      type?: string;
    }

    let particles: Particle[] = [];
    const maxParticles = 140;

    // Helper to generate a particle
    const createParticle = (initBottom = false): Particle => {
      const pType = weather;
      let particle: Particle = {
        x: Math.random() * width,
        y: initBottom ? Math.random() * height : -10,
        vx: 0,
        vy: 0,
        size: 1,
        color: '#fff',
        alpha: 1,
      };

      if (disaster === 'Typhoon' || disaster === 'Tornado') {
        // Spiral particles
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * width * 0.4;
        particle.x = width / 2 + Math.cos(angle) * dist;
        particle.y = height / 2 + Math.sin(angle) * dist;
        particle.vx = -Math.sin(angle) * (2 + Math.random() * 4);
        particle.vy = Math.cos(angle) * (2 + Math.random() * 4) - (0.5 + Math.random() * 1.5);
        particle.size = 1 + Math.random() * 2.5;
        particle.color = Math.random() < 0.3 ? '#a855f7' : '#64748b';
        particle.alpha = 0.3 + Math.random() * 0.5;
        particle.life = 0;
        particle.maxLife = 100 + Math.random() * 150;
        particle.type = 'tornado';
        return particle;
      }

      switch (pType) {
        case 'Snowy':
          particle.size = 1.5 + Math.random() * 3.5;
          particle.vx = (Math.random() * 1.2 - 0.6) + (disaster === 'None' ? -0.2 : -1.8); // slight drift or storm drift
          particle.vy = 1.0 + Math.random() * 1.8;
          particle.color = '#ffffff';
          particle.alpha = 0.5 + Math.random() * 0.5;
          particle.angle = Math.random() * Math.PI * 2;
          particle.spinSpeed = (Math.random() * 0.02 - 0.01);
          break;

        case 'Rainy':
        case 'Thunderstorm':
          particle.size = 1 + Math.random() * 1.5;
          particle.vx = -2.5 - Math.random() * 1.5; // Angled driving rain
          particle.vy = 8 + Math.random() * 6;
          particle.color = pType === 'Thunderstorm' ? 'rgba(165, 243, 252, 0.7)' : 'rgba(56, 189, 248, 0.5)';
          particle.alpha = 0.4 + Math.random() * 0.4;
          break;

        case 'Firestorm':
          // Embers float upwards
          particle.y = initBottom ? Math.random() * height : height + 10;
          particle.size = 1.2 + Math.random() * 4;
          particle.vx = Math.random() * 1.6 - 0.8;
          particle.vy = -1.2 - Math.random() * 2.5; // float up
          particle.color = Math.random() < 0.45 ? '#ffcc00' : (Math.random() < 0.7 ? '#ef4444' : '#f97316');
          particle.alpha = 0.7 + Math.random() * 0.3;
          particle.life = 0;
          particle.maxLife = 120 + Math.random() * 100;
          break;

        case 'Void Incursion':
          particle.size = 7 + Math.random() * 5;
          particle.vx = 0;
          particle.vy = 1.5 + Math.random() * 3;
          particle.color = Math.random() < 0.5 ? '#8b5cf6' : '#c084fc';
          particle.alpha = 0.3 + Math.random() * 0.6;
          particle.type = 'matrix_code';
          break;

        case 'Glitch Wave':
          particle.y = Math.random() * height;
          particle.size = 4 + Math.random() * 14;
          particle.vx = Math.random() * 6 - 3;
          particle.vy = Math.random() * 1.5 - 0.75;
          particle.color = Math.random() < 0.5 ? '#ec4899' : '#06b6d4';
          particle.alpha = 0.2 + Math.random() * 0.6;
          particle.life = 0;
          particle.maxLife = 15 + Math.random() * 30;
          particle.type = 'glitch_block';
          break;

        case 'Sunny':
        default:
          // Drifting sun-dust golden pollen particles
          particle.y = initBottom ? Math.random() * height : Math.random() * height;
          particle.size = 1.0 + Math.random() * 2.5;
          particle.vx = 0.1 + Math.random() * 0.4;
          particle.vy = Math.random() * 0.3 - 0.15;
          particle.color = '#ffcc00';
          particle.alpha = 0.15 + Math.random() * 0.3;
          particle.life = 0;
          particle.maxLife = 200 + Math.random() * 200;
          break;
      }

      return particle;
    };

    // Preseed starting particles across screen space
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // Static fog mists drifting in background
    let fogs = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      vx: 0.15 + Math.random() * 0.25,
      radius: 120 + Math.random() * 100,
      alpha: 0.05 + Math.random() * 0.10
    }));

    // Lightning Flash tracking for Thunderstorm
    let lightningFlash = 0;
    let lightningDuration = 0;

    // Simulation loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Handle custom environmental overlays/shadows based on weather
      if (weather === 'Firestorm') {
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.06)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (weather === 'Rainy' || weather === 'Thunderstorm') {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.fillRect(0, 0, width, height);
      } else if (weather === 'Void Incursion') {
        ctx.fillStyle = 'rgba(76, 29, 149, 0.03)';
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Fog/Air mist drifts (especially for forests or high elevation or custom storms)
      fogs.forEach(f => {
        f.x += f.vx;
        if (f.x > width + f.radius) f.x = -f.radius;
        
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(f.x, f.y, 10, f.x, f.y, f.radius);
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${f.alpha})`);
        radGrad.addColorStop(0.5, `rgba(255, 255, 255, ${f.alpha * 0.4})`);
        radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = radGrad;
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      // Handle lightning strike triggers in real-time
      if (weather === 'Thunderstorm') {
        if (lightningDuration > 0) {
          lightningDuration--;
          if (lightningDuration === 0) {
            lightningFlash = 0;
          }
        } else if (Math.random() < 0.006) {
          lightningFlash = 150 + Math.floor(Math.random() * 105); // Flash intensity
          lightningDuration = 3 + Math.floor(Math.random() * 8); // Duration
        }

        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(240, 249, 255, ${lightningFlash / 255 * 0.5})`;
          ctx.fillRect(0, 0, width, height);

          // Draw a real jagged lightning bolt from top to middle occasionally!
          if (Math.random() < 0.35) {
            ctx.strokeStyle = 'rgba(165, 243, 252, 0.95)';
            ctx.lineWidth = 2 + Math.random() * 3;
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            
            let lx = width * 0.3 + Math.random() * width * 0.4;
            let ly = 0;
            ctx.moveTo(lx, ly);
            
            while (ly < height * 0.8) {
              lx += (Math.random() * 50 - 25);
              ly += (20 + Math.random() * 30);
              ctx.lineTo(lx, ly);
            }
            ctx.stroke();
            ctx.closePath();
            // Reset blur
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw active Disaster Vortex (Tornado spinning funnel)
      if (disaster === 'Typhoon' || disaster === 'Tornado') {
        const cenX = width * 0.55;
        const cenY = height * 0.45;
        ctx.save();
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.12)';
        ctx.lineWidth = 1;
        // Radial swirling funnel lines
        for (let r = 20; r < Math.min(width, height) * 0.4; r += 14) {
          ctx.beginPath();
          const pulseR = r + (Date.now() / 15) % 14;
          ctx.ellipse(cenX, cenY, pulseR, pulseR * 0.42, (Date.now() / 400) % (Math.PI * 2), 0, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
        }
        ctx.restore();

        // Draw tornado text warning inside status HUD
        ctx.fillStyle = 'rgba(225, 29, 72, 0.35)'; // Rose text glow
      }

      // Animate Particles
      particles.forEach((p, index) => {
        // Move particle
        if (p.type === 'tornado') {
          // Spiraling orbit decay
          const cenX = width * 0.55;
          const cenY = height * 0.45;
          const dx = p.x - cenX;
          const dy = p.y - cenY;
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;
          
          // Angle update
          let angle = Math.atan2(dy, dx) + 0.04;
          // Slowly pull closer to core center, then orbit back out
          const targetDist = dist < 20 ? (120 + Math.random() * width * 0.4) : (dist - 1.5);
          p.x = cenX + Math.cos(angle) * targetDist;
          p.y = cenY + Math.sin(angle) * targetDist * 0.46; // isometric slant
          
          p.life = (p.life || 0) + 1;
          if (p.life >= (p.maxLife || 100)) {
            particles[index] = createParticle();
            return;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Cycle limits check
        if (p.type !== 'tornado') {
          if (p.y > height + 20 || p.x > width + 20 || p.x < -20) {
            particles[index] = createParticle();
            return;
          }
        }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        if (p.type === 'matrix_code') {
          // Drop digital characters
          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = '#10b981'; // green code drops
          const termChar = Math.random() < 0.5 ? '1' : '0';
          ctx.fillText(termChar, p.x, p.y);
        } else if (p.type === 'glitch_block') {
          p.life = (p.life || 0) + 1;
          if (p.life > (p.maxLife || 20)) {
            particles[index] = createParticle();
            return;
          }
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.35);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(p.x, p.y, p.size, p.size * 0.35);
        } else if (p.type === 'tornado') {
          // debris dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (weather === 'Snowy') {
          // Custom beautiful star snowflake representation
          ctx.save();
          p.angle = (p.angle || 0) + (p.spinSpeed || 0.01);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          
          // Draw standard cross crystal snowflake
          ctx.fillRect(-p.size/2, -0.5, p.size, 1);
          ctx.fillRect(-0.5, -p.size/2, 1, p.size);
          ctx.restore();
        } else if (weather === 'Rainy' || weather === 'Thunderstorm') {
          // Streaking line
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.5, p.y + p.vy * 1.2);
          ctx.stroke();
          ctx.closePath();
        } else {
          // Standard circular particle (Sunny, Firestorm embers)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0; // reset
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [weather, disaster]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
