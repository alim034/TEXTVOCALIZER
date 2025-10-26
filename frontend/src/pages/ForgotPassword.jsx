import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { api, warmUp } from '../lib/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { warmUp().catch(() => {}); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email: email.trim() });
      toast.success('If that email exists, a reset link has been sent');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to request reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative flex flex-col items-center justify-center p-4 antialiased">
      <BackgroundBeams />

      <Link to="/login" className="z-20 flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors duration-200 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded-full mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Login</span>
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-sm w-full mx-auto rounded-2xl p-8 bg-black border border-neutral-800 shadow-2xl shadow-black/20 relative z-10">
        <div className="text-center mb-8">
          <img src="/vocify-main-logo.svg" alt="Voicify Logo" className="w-16 h-16 mx-auto mb-4 rounded-full shadow-lg shadow-green-500/20 ring-2 ring-white ring-offset-2 ring-offset-black" />
          <h2 className="font-bold text-3xl text-white">Forgot Password</h2>
          <p className="text-neutral-400 text-sm mt-2">Enter your email and we'll send you a password reset link</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 border-neutral-700 text-white placeholder-neutral-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
