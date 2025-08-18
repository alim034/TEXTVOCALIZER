import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ArrowUp } from 'lucide-react'; // Changed to ArrowUp

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login({ email: email.trim(), password });
    if (result.success) {
      toast.success(result.message || 'Login successful!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative flex flex-col items-center justify-center p-4 antialiased">
      <BackgroundBeams />

      {/* --- UPDATED "BACK TO HOME" BUTTON --- */}
      <Link 
        to="/" 
        className="z-20 flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors duration-200 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded-full mb-8"
      >
        <ArrowUp className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm w-full mx-auto rounded-2xl p-8 bg-black border border-neutral-800 shadow-2xl shadow-black/20 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
            <span className="text-3xl font-bold text-white">V</span>
          </div>
          <h2 className="font-bold text-3xl text-white">
            Welcome Back
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Sign in to continue to{' '}
            <span className="text-green-400 font-semibold">Voicify</span>
          </p>
          <p className="text-neutral-400 text-sm mt-4">
            New here?{' '}
            <Link 
              to="/register" 
              className="text-green-400 font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full px-4 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-neutral-700'
              } text-white placeholder-neutral-500`}
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password"className="block text-sm font-medium text-neutral-300">Password</label>
              <Link to="/forgot-password"className="text-xs text-green-400 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.password ? 'border-red-500' : 'border-neutral-700'
                } text-white placeholder-neutral-500 pr-10`}
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;