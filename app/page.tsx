'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

const GithubProfileReadme = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const addressRefs = useRef<(HTMLElement | null)[]>([null, null, null]); // Initialize with nulls
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const CELL_SIZE = 20; // Size of each grid cell
  const BACKGROUND_COLOR = 'rgba(0, 0, 0, 1)'; // Background color (black)
  const GRID_COLOR = 'rgba(255, 255, 255, 0.2)'; // Grid line color

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Check if ctx is null

    const drawGrid = () => {
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the screen with background color

      ctx.strokeStyle = GRID_COLOR; // Set grid line color
      ctx.lineWidth = 1; // Set grid line width

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    drawGrid(); // Draw the grid on initial render

    // Optionally, you can resize the canvas to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid(); // Redraw the grid on resize
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Cursor animation logic
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = Array.from({ length: 20 }).map((_, index) => {
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.style.position = 'fixed';
      circle.style.height = '24px';
      circle.style.width = '24px';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'black';
      circle.style.pointerEvents = 'none';
      circle.style.zIndex = '99999999'; // Stay on top of all other elements
      document.body.appendChild(circle);
      return circle;
    });

    const colors = [
      "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e",
      "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c",
      "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f",
      "#950f5f", "#830060", "#7c0060", "#680060", "#60005f",
      "#48005f", "#3d005e"
    ];

    circles.forEach(function (circle, index) {
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function(e){
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px"; // Center the circle
        circle.style.top = y - 12 + "px"; // Center the circle
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`; // Scale effect

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.offsetLeft - x) * 0.3; // Smooth transition to next circle
        y += (nextCircle.offsetTop - y) * 0.3; // Smooth transition to next circle
      });

      requestAnimationFrame(animateCircles); // Continue the animation
    }

    animateCircles(); // Start the animation

    return () => {
      circles.forEach(circle => document.body.removeChild(circle)); // Clean up circles on unmount
    };
  }, []);

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="text-blue-500" />, 
      link: 'https://www.linkedin.com/in/fakerpk/' 
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="text-blue-400" />, 
      link: 'https://x.com/FakerPK' 
    },
    { 
      name: 'YouTube', 
      icon: <Youtube className="text-red-500" />, 
      link: 'https://youtube.com/c/FakerPK' 
    }
  ];

  const skills = [
    { 
      name: 'Python', 
      icon: <Image src="/python-logo.png" alt="Python Logo" width={40} height={40} />, 
      color: 'bg-blue-500/10' 
    },
    { 
      name: 'JavaScript', 
      icon: <Image src="/javascript-logo.png" alt="JavaScript Logo" width={40} height={40} />, 
      color: 'bg-yellow-500/10' 
    },
    { 
      name: 'Git', 
      icon: <Image src="/git-logo.png" alt="Airdrop Logo" width={40} height={40} />, 
      color: 'bg-orange-500/10' 
    }
  ];

  const sections = [
    {
      icon: <Image src="/python-logo.png" alt="Python Logo" width={80} height={80} />,
      title: 'Python Development',
      content: 'Crafting custom scripts for automation, data processing, and crypto workflows.'
    },
    {
      icon: <Image src="/game-dev-logo.png" alt="Game Development Logo" width={80} height={80} />,
      title: 'Game Development',
      content: 'Designing immersive gaming experiences and interactive workflows.'
    },
    {
      icon: <Image src="/airdrop-logo.png" alt="Crypto Exploration Logo" width={80} height={80} />,
      title: 'Airdrops Farming',
      content: 'Innovating airdrop farming techniques and exploring blockchain opportunities.'
    }
  ];

  const handleCopyAddress = (index: number) => {
    if (addressRefs.current[index]) {
      const address = addressRefs.current[index]?.textContent;
      if (address) {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-gray-100 p-8">
      <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" />

      <div className="relative z-10 max-w-4xl mx-auto bg-transparent backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <h1 className="text-6xl font-bold mb-2 text-center">
          <span className="text-white" style={{ fontFamily: 'Fighting Spirit TBS' }}>Faker</span>
          <span className="text-orange-500" style={{ fontFamily: 'Fighting Spirit TBS' }}>PK</span>
        </h1>
        <h2 className="text-2xl text-center text-gray-300 font-['Fighting Spirit']">Faiq Khan</h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-orange-900/50 scale-105 shadow-lg' 
                  : 'bg-gray-800/50 hover:bg-orange-900/30 hover:scale-105'
              }`}
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
            >
              {section.icon}
              <h2 ```javascript
              className="mt-2 font-semibold text-white text-xl">{section.title}</h2>
              {activeSection === index && (
                <p className="mt-2 text-sm text-gray-300">{section.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">💻 Skills & Tools</h2>
          <div className="flex space-x-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${skill.color} hover:scale-105 transition-transform`}
              >
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">💸 Support My Work</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg relative">
              <h3 className="text-blue-400 mb-2">Solana</h3>
              <code
                ref={(el) => { addressRefs.current[0] = el; }}
                className={`text-xs break-words cursor-pointer ${
                  copiedAddress === '9SqcZjiUAz9SYBBLwuA9uJG4UzwqC5HNWV2cvXPk3Kro'
                    ? 'text-green-400'
                    : 'hover:text-orange-400'
                }`}
                onClick={() => handleCopyAddress(0)}
              >
                9SqcZjiUAz9SYBBLwuA9uJG4UzwqC5HNWV2cvXPk3Kro
              </code>
              {copiedAddress === '9SqcZjiUAz9SYBBLwuA9uJG4UzwqC5HNWV2cvXPk3Kro' && (
                <div className="absolute top-0 right-0 bg-green-400 text-white px-2 py-1 rounded-bl-lg">
                  Copied!
                </div>
              )}
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg relative">
              <h3 className="text-green-400 mb-2">EVM</h3>
              <code
                ref={(el) => { addressRefs.current[1] = el; }}
                className={`text-xs break-words cursor-pointer ${
                  copiedAddress === '0x2d550c8A47c60A43F8F4908C5d462184A40922Ef'
                    ? 'text-green-400'
                    : 'hover:text-orange-400'
                }`}
                onClick={() => handleCopyAddress(1)}
              >
                0x2d550c8A47c60A43F8F4908C5d462184A40922Ef
              </code>
              {copiedAddress === '0x2d550c8A47c60A43F8F4908C5d462184A40922Ef' && (
                <div className="absolute top-0 right-0 bg-green-400 text-white px-2 py-1 rounded-bl-lg">
                  Copied!
                </div>
              )}
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg relative">
              <h3 className="text-orange-400 mb-2">BTC</h3>
              <code
                ref={(el) => { addressRefs.current[2] = el; }}
                className={`text-xs break-words cursor-pointer ${
                  copiedAddress === 'bc1qhx7waktcttam9q9nt0ftdguguwg5lzq5hnasmm'
                    ? 'text-green-400'
                    : 'hover:text-orange-400'
                }`}
                onClick={() => handleCopyAddress(2)}
              >
                bc1qhx7waktcttam9q9nt0ftdguguwg5lzq5hnasmm
              </code>
              {copiedAddress === 'bc1qhx7waktcttam9q9nt0ftdguguwg5lzq5hnasmm' && (
                <div className="absolute top-0 right-0 bg-green-400 text-white px-2 py-1 rounded-bl-lg">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="text-center">
          <Image 
            src="https://github-readme-stats.vercel.app/api?username=fakerpk&theme=radical&show_icons=true" 
            alt="Git Hub Stats" 
            className="mx-auto rounded-lg shadow-lg"
            width={500}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default GithubProfileReadme;
