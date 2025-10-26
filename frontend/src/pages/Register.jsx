import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register: registerUser, loading, error, isAuthenticated, clearError, warmUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  // Warm backend on page mount to avoid first-submit delays
  useEffect(() => {
    warmUp()?.catch?.(() => {});
  }, [warmUp]);

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

  const result = await registerUser({ name: name.trim(), email: email.trim(), password });
    
    if (result.success) {
      toast.success(result.message || 'Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative flex flex-col items-center justify-center p-4 antialiased pt-20 sm:pt-24">
      <BackgroundBeams />
      
      {/* --- "BACK TO HOME" BUTTON REMOVED --- */}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full mx-auto rounded-2xl p-8 bg-black border border-neutral-800 shadow-2xl shadow-black/20 relative z-10"
      >
        <div className="text-center mb-8">
          <img
            src="/vocify-main-logo.svg"
            alt="Voicify Logo"
            className="w-16 h-16 mx-auto mb-4 rounded-full shadow-lg shadow-green-500/20 ring-2 ring-white ring-offset-2 ring-offset-black"
          />
          <h2 className="font-bold text-3xl text-white">
            Join Voicify
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Create your account to start transforming text
          </p>
           <p className="text-neutral-400 text-sm mt-4">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-green-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
            <div className="relative">
                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  name="name"
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-neutral-700'
                  } text-white placeholder-neutral-500`}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={onChange}
                  required
                />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
             <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  name="email"
                  type="email"
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-neutral-700'
                  } text-white placeholder-neutral-500`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                  required
                />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`w-full pl-10 pr-10 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.password ? 'border-red-500' : 'border-neutral-700'
                } text-white placeholder-neutral-500`}
                placeholder="Create a password"
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
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
            <div className="relative">
                 <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className={`w-full pl-10 pr-10 py-3 bg-neutral-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-neutral-700'
                } text-white placeholder-neutral-500`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={onChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>}
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
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;