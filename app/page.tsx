'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

const GithubProfileReadme = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const addressRefs = useRef<(HTMLElement | null)[]>([null, null, null]); // Initialize with nulls
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const allNeighbors = useRef<{ x: number; y: number }[]>([]); // Store trail positions
  const CELL_SIZE = 20; // Size of each grid cell
  const STROKE_WEIGHT = 2; // Thickness of the stroke
  const BACKGROUND_COLOR = 'rgba(0, 0, 0, 1)'; // Background color (black)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Check if ctx is null

    let currentRow = -1;
    let currentCol = -1;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const row = Math.floor((event.clientY - rect.top) / CELL_SIZE);
      const col = Math.floor((event.clientX - rect.left) / CELL_SIZE);

      // If mouse moves to a new cell, update and store trail positions
      if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col;
        allNeighbors.current.push({ x: col * CELL_SIZE, y: row * CELL_SIZE }); // Add new position to the trail
      }
    };

    const draw = () => {
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the screen with background color

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // White color with transparency
      ctx.lineWidth = STROKE_WEIGHT;
      ctx.lineJoin = 'round';

      // Draw trail effect
      for (let i = 0; i < allNeighbors.current.length; i++) {
        const pos = allNeighbors.current[i];
        ctx.beginPath();
        ctx.arc(pos.x + CELL_SIZE / 2, pos.y + CELL_SIZE / 2, CELL_SIZE / 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Optional: Remove old positions to limit trail length
      if (allNeighbors.current.length > 50) {
        allNeighbors.current.shift(); // Remove the oldest position
      }

      requestAnimationFrame(draw); // Request the next frame
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(draw); // Start the drawing loop

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
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
      icon: <Image src="/airdrop-logo.png" alt="Airdrop Logo" width={40} height={40} />, 
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
              <h2 className="mt-2 font-semibold text-white text-xl">{section.title}</h2>
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
