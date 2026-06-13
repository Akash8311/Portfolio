import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Portfolio3D from './Portfolio3D';

const Home = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fullText = "Hi, I'm Akash Maity - Full Stack Developer";
  const tagline = 'Crafting scalable web applications and interactive user experiences.';

  // Typing animation for main text
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleEnterPortfolio = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowPortfolio(true);
      setIsLoading(false);
    }, 800);
  };

  // Show 3D portfolio when toggled
  if (showPortfolio) {
    return (
      <div className="relative w-full h-screen">
        <Portfolio3D />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setShowPortfolio(false)}
          className="absolute top-6 right-6 z-50 px-6 py-3 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300 font-semibold hover:bg-red-600/40 transition"
        >
          ← Back to Home
        </motion.button>
      </div>
    );
  }

  // Home landing page
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
          >
            <span className="text-cyan-400 text-sm font-semibold">👋 Welcome to my portfolio</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-cyan-400"
            >
              |
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {tagline}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              { label: 'Projects', value: '5+' },
              { label: 'Tech Skills', value: '10+' },
              { label: 'Experience', value: '1+ Years' },
              { label: 'Passion', value: '∞' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-4 bg-white/5 border border-cyan-500/20 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition"
              >
                <p className="text-cyan-400 font-bold text-lg">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnterPortfolio}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⚙️</span>
                    Loading...
                  </>
                ) : (
                  <>
                    Explore 3D Portfolio
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.a
              href="https://github.com/Akash8311"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-700/20 border border-gray-500/50 text-gray-300 font-bold rounded-lg hover:bg-gray-700/40 hover:border-gray-500 transition"
            >
              GitHub Profile 🔗
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/akash-maity-aa917b38a"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600/20 border border-blue-500/50 text-blue-300 font-bold rounded-lg hover:bg-blue-600/40 hover:border-blue-500 transition"
            >
              LinkedIn Profile 💼
            </motion.a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <h3 className="text-gray-400 text-sm font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'React',
                'Node.js',
                'MongoDB',
                'Express.js',
                'JavaScript',
                'Python',
                'Java',
                'C++',
              ].map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="text-cyan-400 text-sm">Scroll down for more</div>
          <div className="flex justify-center mt-2">
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent via-black to-black"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400">Some of my best work showcasing full-stack capabilities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'NovaExam',
                desc: 'Online exam portal with real-time grading',
                link: 'https://novaexam.vercel.app',
                icon: '📝',
              },
              {
                name: 'AI Resume',
                desc: 'Intelligent resume generator with AI',
                link: 'https://ai-resume-amber-beta.vercel.app',
                icon: '🤖',
              },
              {
                name: 'NovaMart',
                desc: 'Full-featured e-commerce platform',
                link: '#',
                icon: '🛍️',
              },
              {
                name: 'Image Search',
                desc: 'Advanced image search engine',
                link: '#',
                icon: '🔍',
              },
              {
                name: 'Age Calculator',
                desc: 'Interactive age calculation tool',
                link: '#',
                icon: '📅',
              },
              {
                name: '3D Portfolio',
                desc: 'This amazing interactive portfolio',
                link: '#',
                icon: '🚀',
              },
            ].map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target={project.link !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -10 }}
                className="group p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition cursor-pointer"
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                <div className="text-cyan-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                  View Project <span>→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20 bg-black"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-cyan-400 font-bold text-lg mb-2">📚 Education</h3>
                <p className="text-gray-300">Bachelor of Computer Applications (BCA)</p>
                <p className="text-gray-400 text-sm">JIS University</p>
              </div>

              <div>
                <h3 className="text-cyan-400 font-bold text-lg mb-2">💼 Experience</h3>
                <p className="text-gray-300">Full Stack Development Intern</p>
                <p className="text-gray-400 text-sm">Prasarnet</p>
              </div>

              <div>
                <h3 className="text-cyan-400 font-bold text-lg mb-2">🎯 Focus</h3>
                <p className="text-gray-300">Building scalable web applications with modern technologies and interactive user experiences.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">Languages & Frameworks</h3>
                <ul className="space-y-2">
                  {['C', 'C++', 'Java', 'Python', 'JavaScript', 'React', 'Node.js', 'Express.js'].map(
                    (skill, i) => (
                      <li key={i} className="text-gray-300 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                        {skill}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-blue-400 font-bold text-lg mb-4">Tools & Databases</h3>
                <ul className="space-y-2">
                  {['MongoDB', 'SQL', 'Git', 'Vercel', 'Docker', 'REST APIs'].map((tool, i) => (
                    <li key={i} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-gradient-to-t from-black via-black to-transparent py-12 px-4"
      >
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/Akash8311"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-gray-700/20 border border-gray-500/30 rounded-lg hover:border-gray-500 transition"
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/akash-maity-aa917b38a"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:border-blue-500 transition"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="mailto:akash@example.com"
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition"
            >
              Email
            </motion.a>
          </div>

          <p className="text-gray-400 text-sm">
            © 2024 Akash Maity. Built with React, Three.js & Tailwind CSS.
          </p>
          <p className="text-gray-500 text-xs">
            Crafting scalable web applications and interactive user experiences.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;