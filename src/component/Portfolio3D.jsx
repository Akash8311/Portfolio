import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Rotating Core Component
const RotatingCore = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        emissive="#00ff88"
        emissiveIntensity={0.8}
        wireframe
        color="#00ff88"
      />
      <pointLight intensity={2} distance={100} color="#00ff88" />
    </mesh>
  );
};

// Project Card Component
const ProjectCard = ({ position, project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={1 + index * 0.2}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={position}
    >
      <group>
        <mesh
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <boxGeometry args={[2, 2, 0.2]} />
          <meshStandardMaterial
            color={hovered ? '#ff0088' : '#0088ff'}
            emissive={hovered ? '#ff0088' : '#0044ff'}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        <Html distanceFactor={1.5} position={[0, 0, 0.1]}>
          <div className="w-48 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-cyan-500/30 pointer-events-auto">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">
              {project.name}
            </h3>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-300 mb-3">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-cyan-500 text-black rounded text-xs font-semibold hover:bg-cyan-400 transition"
                >
                  Visit Site
                </a>
              </motion.div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
};

// 3D Scene Component
const Scene3D = () => {
  const projects = [
    {
      name: 'NovaExam',
      description: 'Online exam portal with real-time grading',
      link: 'https://novaexam.vercel.app',
      position: [6, 3, 0],
    },
    {
      name: 'AI Resume',
      description: 'Intelligent resume generator',
      link: 'https://ai-resume-amber-beta.vercel.app',
      position: [-6, 3, 0],
    },
    {
      name: 'NovaMart',
      description: 'Full-featured e-commerce platform',
      link: '#',
      position: [0, -6, 0],
    },
    {
      name: 'Image Search',
      description: 'Advanced image search engine',
      link: '#',
      position: [6, -3, 0],
    },
    {
      name: 'Age Calculator',
      description: 'Interactive age calculation tool',
      link: '#',
      position: [-6, -3, 0],
    },
  ];

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
      <RotatingCore />
      
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          position={project.position}
          index={index}
        />
      ))}

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={true}
        enablePan={true}
        minDistance={15}
        maxDistance={100}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
};

// Overlay UI Component
const OverlayUI = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Crafting scalable web applications and interactive user experiences.';
  const techStack = ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Express.js'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 p-8 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Akash Maity
          </h1>
          <p className="text-xl text-gray-300 mb-2">Full Stack Developer</p>
          <p className="text-gray-400 h-6">{displayedText}</p>
        </div>
      </motion.header>

      {/* Left Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-8 pointer-events-auto"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 w-72 shadow-2xl">
          <h2 className="text-cyan-400 font-bold text-lg mb-4">Tech Stack</h2>
          <div className="space-y-2 mb-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition"
              >
                {tech}
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <a
              href="https://www.linkedin.com/in/akash-maity-aa917b38a"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-300 font-semibold hover:bg-blue-600/40 transition text-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Akash8311"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-gray-700/20 border border-gray-500/50 rounded-lg text-gray-300 font-semibold hover:bg-gray-700/40 transition text-center"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Sidebar */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-8 pointer-events-auto"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 w-72 shadow-2xl">
          <h2 className="text-cyan-400 font-bold text-lg mb-4">About</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div>
              <p className="text-cyan-400 font-semibold mb-1">Education</p>
              <p>BCA at JIS University</p>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-1">Experience</p>
              <p>Full Stack Development Intern at Prasarnet</p>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-1">Focus</p>
              <p>Building scalable web applications with modern stack</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Instructions */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 p-8 text-center text-gray-400 text-sm pointer-events-auto"
      >
        <p>Drag to rotate • Scroll to zoom</p>
      </motion.div>
    </div>
  );
};

// Main App Component
export default function Portfolio3D() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene3D />
      </Canvas>
      <OverlayUI />
    </div>
  );
}