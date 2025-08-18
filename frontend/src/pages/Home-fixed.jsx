import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Volume2, 
  Mic, 
  Play, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  ChevronDown
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Volume2 className="h-8 w-8 text-green-500" />,
      title: "Natural Voices",
      description: "Choose from 50+ lifelike AI voices in multiple languages and accents."
    },
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Lightning Fast",
      description: "Convert text to speech in seconds with our optimized AI engine."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Privacy First",
      description: "Your data stays secure. We don't store your text or generated audio."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Multi-language",
      description: "Support for 30+ languages with native pronunciation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-green-mesh opacity-30 dark:opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Text to Speech
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent mb-6 leading-tight">
                Voicify: Where Your Text Finds Its
                <span className="block bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  Voice
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                Instantly convert any text into natural, human-like speech with our state-of-the-art AI.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-glow-green transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Mic className="w-5 h-5 mr-2" />
                    {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-semibold rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2 inline-block" />
                View Demo
                <ChevronDown className="w-4 h-4 ml-2 inline-block group-hover:animate-bounce" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="inline-flex items-center space-x-4">
                <span>✨ No credit card required</span>
                <span>•</span>
                <span>🎯 1000 characters free</span>
                <span>•</span>
                <span>🌍 50+ voice options</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Voicify</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of text-to-speech technology with powerful features designed for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 dark:border-green-900 hover:shadow-glow-green/20 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-xl w-fit group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Feature Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">AI Voices</div>
              <div className="text-gray-600 dark:text-gray-300">Multiple languages and accents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Uptime</div>
              <div className="text-gray-600 dark:text-gray-300">Reliable service you can trust</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">30+</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Languages</div>
              <div className="text-gray-600 dark:text-gray-300">Global reach and accessibility</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Voicify</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Voicify is a cutting-edge text-to-speech platform that transforms written content into natural, human-like speech using advanced AI technology.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you're a content creator, educator, developer, or business owner, Voicify provides the tools you need to bring your text to life with stunning audio quality and realistic voices.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Advanced neural networks for natural speech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Real-time processing and instant results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Enterprise-grade security and privacy</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">High-Quality Audio Output</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">Lightning-Fast Processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">Secure & Private</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">Global Language Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-800 dark:to-green-900">
        <div className="absolute inset-0 bg-green-mesh opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Give Your Text a Voice?
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Join thousands of creators who trust Voicify for their text-to-speech needs. Start creating amazing audio content today.
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-green-600 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Create Your Account
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300"
                  >
                    Already have an account? Sign In
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
