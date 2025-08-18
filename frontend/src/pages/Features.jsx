import { motion } from 'framer-motion';
import { 
  Volume2, 
  Settings, 
  Shield, 
  Zap, 
  Globe, 
  Download,
  Mic,
  Headphones,
  FileAudio,
  Sparkles
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Volume2 className="h-8 w-8 text-green-500" />,
      title: "50+ AI Voices",
      description: "Choose from a diverse library of natural-sounding voices in multiple languages and accents.",
      details: ["Male and female voices", "Various age ranges", "Professional quality", "Emotional tones"]
    },
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Lightning Fast",
      description: "Generate speech in seconds with our optimized AI engine. No waiting, instant results.",
      details: ["Real-time processing", "Batch conversion", "API integration", "Cloud-based"]
    },
    {
      icon: <Settings className="h-8 w-8 text-green-500" />,
      title: "Advanced Controls",
      description: "Fine-tune speed, pitch, tone, and emphasis to get the perfect voice for your content.",
      details: ["Speed adjustment", "Pitch control", "Volume settings", "Pause insertion"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Privacy First",
      description: "Your data stays secure. We don't store your text or generated audio files.",
      details: ["No data retention", "GDPR compliant", "Encrypted processing", "Secure API"]
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Multi-language",
      description: "Support for 30+ languages with native pronunciation and cultural context.",
      details: ["Regional accents", "Cultural nuances", "Proper pronunciation", "Language detection"]
    },
    {
      icon: <Download className="h-8 w-8 text-green-500" />,
      title: "Multiple Formats",
      description: "Download your audio in various formats including MP3, WAV, and more.",
      details: ["MP3 export", "WAV format", "Custom bitrates", "Bulk download"]
    }
  ];

  return (
    // REMOVED pt-20 from here to match Home.jsx
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-green-mesh opacity-30 dark:opacity-10" />
      
      {/* APPLIED PADDING HERE to match Home.jsx (pt-24 pb-20) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Features
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover everything Voicify has to offer - from advanced AI voices to powerful customization tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 dark:border-green-900 hover:shadow-glow-green/20 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-xl w-fit group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Sections */}
        <div className="space-y-20">
          {/* Voice Quality Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-green-100 dark:border-green-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Headphones className="h-8 w-8 text-green-500" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Studio-Quality Audio
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our advanced neural networks produce crystal-clear audio that sounds natural and engaging, perfect for any professional use case.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">22kHz sampling rate for pristine quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Advanced noise reduction algorithms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Professional audio format support</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <FileAudio className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">22kHz</div>
                  <div className="text-green-600 dark:text-green-400">Studio Quality</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* API Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-green-100 dark:border-green-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8">
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div className="mb-2">curl -X POST https://api.voicify.com/v1/synthesize \</div>
                  <div className="mb-2 ml-4">-H "Authorization: Bearer $API_KEY" \</div>
                  <div className="mb-2 ml-4">-H "Content-Type: application/json" \</div>
                  <div className="ml-4">-d {`'{"text": "Hello, world!", "voice": "sarah"}'`}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Mic className="h-8 w-8 text-green-500" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Developer-Friendly API
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Integrate Voicify into your applications with our simple REST API. Get started in minutes with comprehensive documentation.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">RESTful API with JSON responses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">SDKs for popular programming languages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Comprehensive documentation and examples</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;