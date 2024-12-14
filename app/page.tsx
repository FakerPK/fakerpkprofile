'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Wallet, 
  Youtube, 
  Linkedin, 
  Twitter 
} from 'lucide-react';

import Image from 'next/image';

const GithubProfileReadme = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const addressRefs = useRef<(HTMLElement | null)[]>([null, null, null]); // Initialize with nulls

  const NeonGridBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        setBackgroundPosition({ x: event.clientX * 0.1, y: event.clientY * 0.1 });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    return (
      <div 
        className="fixed inset-0 z-[-1] bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 128, 0, 0.1), 
              transparent 50%
            ),
            repeating-linear-gradient(
              0deg, 
              rgba(255, 128, 0, 0.05) 0px, 
              rgba(255, 128, 0, 0.05) 1px, 
              transparent 1px, 
              transparent 10px
            ),
            repeating-linear-gradient(
              90deg, 
              rgba(255, 128, 0, 0.05) 0px, 
              rgba(255, 128, 0, 0.05) 1px, 
              transparent 1px, 
              transparent 10px
            )
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
          animation: 'backgroundAnimation 30s ease infinite'
        }}
      >
        <style>
          {`
            @keyframes backgroundAnimation {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}
        </style>
      </div>
    );
  };

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
      icon: <Code className="text-blue-500" />, 
      color: 'bg-blue-500/10' 
    },
    { name: 'JavaScript', 
      icon: <Code className="text-yellow-500" />, 
      color: 'bg-yellow-500/10' 
    },
    { 
      name: 'Git', 
      icon: <Code className="text-orange-500" />, 
      color: 'bg-orange-500/10' 
    }
  ];

  const sections = [
    {
      icon: <Code color="#FF6B00" size={48} />,
      title: 'Python Development',
      content: 'Crafting custom scripts for automation, data processing, and crypto workflows.'
    },
    {
      icon: <Code color="#FF6B00" size={48} />,
      title: 'Game Development',
      content: 'Designing immersive gaming experiences and interactive workflows.'
    },
    {
      icon: <Wallet color="#FF6B00" size={48} />,
      title: 'Crypto Exploration',
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
      <NeonGridBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto bg-transparent backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          <span className="text-white font-['Fighting Spirit']">Faker</span>
          <span className="text-orange-500 font-['Fighting Spirit']">PK</span>&apos;s Digital Realm 👾
        </h1>
        
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
              <h2 className="mt-2 font-semibold text-orange-400">{section.title}</h2>
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

        <div className="bg-gray- 800/50 rounded-lg p-6 mb-8">
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
            alt="GitHub Stats" 
            className="mx-auto rounded-lg shadow-lg"
            width={500}
            height={200}
          />
        </div>
      </div>
  );
};

export default GithubProfileReadme;
