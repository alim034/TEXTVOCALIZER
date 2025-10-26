import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Lock, ArrowLeft } from 'lucide-react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { api, warmUp } from '../lib/api';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { warmUp().catch(() => {}); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error('Please enter a new password');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      toast.success('Password reset successful. Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to reset password');
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
          <h2 className="font-bold text-3xl text-white">Reset Password</h2>
          <p className="text-neutral-400 text-sm mt-2">Enter and confirm your new password</p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 border-neutral-700 text-white placeholder-neutral-500"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">Show</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 border-neutral-700 text-white placeholder-neutral-500"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">Show</button>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
