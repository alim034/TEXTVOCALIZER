import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Lightbulb, Users, Rocket, Mic, ArrowRight, Volume2, Zap, Shield, Globe } from 'lucide-react';

// Animation variants for scroll reveal
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' }
  }),
};

const aboutCards = [
  {
    icon: <Lightbulb className="w-10 h-10 text-green-600 mb-4" />,
    title: "The Voicify",
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          Voicify bridges technology and accessibility with simple, inclusive, and innovative voice-driven solutions.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Our mission: make digital experiences more human and universally accessible.
        </p>
      </>
    ),
  },
  {
    icon: <Users className="w-10 h-10 text-green-600 mb-4" />,
    title: "Tailored Solutions",
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          We adapt to your needs—students, professionals, or businesses—offering flexible, scalable, and easy-to-integrate tools.
        </p>
      </>
    ),
  },
  {
    icon: <Rocket className="w-10 h-10 text-green-600 mb-4" />,
    title: "Driving Innovation",
    content: (
      <>
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          We push voice technology and AI forward, building solutions that set new standards for accessibility and communication.
        </p>
      </>
    ),
  },
];

const differenceCards = [
  {
    icon: <Volume2 className="w-7 h-7 text-green-500" />,
    title: "High-Quality Voices",
    subtext: "AI voices so real, you’ll forget they’re synthetic.",
    badge: "✅",
  },
  {
    icon: <Zap className="w-7 h-7 text-green-500" />,
    title: "Lightning-Fast Conversion",
    subtext: "Get instant audio output without long waits.",
    badge: "⚡",
  },
  {
    icon: <Shield className="w-7 h-7 text-green-500" />,
    title: "Secure & Private",
    subtext: "Your data stays yours, always protected.",
    badge: "🔒",
  },
  {
    icon: <Globe className="w-7 h-7 text-green-500" />,
    title: "Global Language Support",
    subtext: "Speak to the world in multiple languages & accents.",
    badge: "🌍",
  },
];


const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
    {/* Background Animation */}
    <div className="absolute inset-0 bg-green-mesh opacity-30 dark:opacity-10" />

    {/* CORRECTED PADDING HERE: Changed to pt-24 pb-20 to match other pages */}
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={fadeUpVariant}
        className="flex flex-col items-center text-center mb-12"
      >
        <div className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800 shadow-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          About Voicify
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent mb-4">
          Transforming Text Into Natural, Human-Like Speech
        </h1>
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mt-2"
        >
          Discover how Voicify is shaping the future of voice technology, accessibility, and digital communication.
        </motion.p>
      </motion.div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {aboutCards.map((card, idx) => (
          <motion.div
            key={card.title}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUpVariant}
            className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-green-100 dark:border-green-900 p-8 min-h-[240px] hover:shadow-xl transition-shadow duration-300"
          >
            {card.icon}
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-3 text-center">{card.title}</h2>
            <div className="text-base text-center">{card.content}</div>
          </motion.div>
        ))}
      </div>

      {/* What Makes Us Different Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUpVariant}
        className="mb-20"
      >
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-8 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {differenceCards.map((card, idx) => (
            <motion.div
              key={card.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUpVariant}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-green-100 dark:border-green-900 shadow-md p-7 flex items-start space-x-4 min-h-[120px] transition-all duration-300"
            >
              <div className="flex-shrink-0">{card.icon}</div>
              <div>
                <div className="flex items-center font-semibold text-lg text-green-800 dark:text-green-200">
                  {card.title}
                  <span className="ml-2 text-xl">{card.badge}</span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm">{card.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUpVariant}
        className="text-center"
      >
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-glow-green transition-all duration-300"
          >
            <span className="flex items-center justify-center text-lg">
              <Mic className="w-5 h-5 mr-2" />
              Try Voicify Today – Turn Your Words Into Voice in Seconds!
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </div>
);

export default About;