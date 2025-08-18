import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone,
  Github, 
  Linkedin, 
  Mail,
  Heart,
  Volume2,
  Shield,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/alim034', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-alim-7a8a52289/', icon: Linkedin },
    { name: 'Phone', href: 'tel:9370150313', icon: Phone },
    { name: 'Email', href: 'mailto:hello@voicify.com', icon: Mail }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- IMPROVED GRID FOR RESPONSIVENESS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2" // Adjusted column span for better layout
          >
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Voicify
              </span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Transform your text into natural, human-like speech with cutting-edge AI technology. Perfect for creators, educators, and professionals worldwide.
            </p>
             <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your data stays secure and private</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Volume2 className="w-4 h-4 text-green-500" />
                <span>Convert text to speech in seconds</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Github className="w-4 h-4 text-green-500" />
                <span>Support for 50+ languages</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0" // Added margin top for mobile
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0" // Added margin top for mobile
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-2">Get in touch</p>
                <a 
                  href="mailto:hello@voicify.com" 
                  className="text-green-400 hover:text-green-300 transition-colors text-sm"
                >
                  <b>alimmohammad034@gmail.com</b>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- IMPROVED BOTTOM SECTION FOR RESPONSIVENESS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left"
        >
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Voicify. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Created by</span>
            <span className="text-green-400 font-semibold">Mohammad Alim</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;