import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  
  // Speech synthesis settings
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set default voice (preferably English)
      const defaultVoice = availableVoices.find(voice => 
        voice.lang.startsWith('en') && voice.default
      ) || availableVoices[0];
      
      if (defaultVoice) {
        setSelectedVoice(defaultVoice.name);
      }
    };

    // Load voices immediately
    loadVoices();
    
    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Convert text to speech using Web Speech API
  const handleConvertText = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      return;
    }

    setIsConverting(true);

    try {
      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Create speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Find and set the selected voice
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      
      // Set speech parameters
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = 1;

      // Event handlers
      utterance.onstart = () => {
        toast.success('Starting speech synthesis...');
      };

      utterance.onend = () => {
        setIsConverting(false);
        toast.success('Speech synthesis completed!');
      };

      utterance.onerror = (event) => {
        setIsConverting(false);
        toast.error(`Speech synthesis error: ${event.error}`);
      };

      // Speak the text
      speechSynthesis.speak(utterance);

    } catch (error) {
      setIsConverting(false);
      toast.error('Failed to convert text to speech');
      console.error('TTS Error:', error);
    }
  };

  // Stop current speech
  const handleStopSpeech = () => {
    speechSynthesis.cancel();
    setIsConverting(false);
    toast.success('Speech stopped');
  };

  // Clear text and audio
  const handleClear = () => {
    setText('');
    setAudioUrl('');
    speechSynthesis.cancel();
    setIsConverting(false);
    toast.success('Text cleared');
  };

  return (
    // CORRECTED PADDING HERE: Changed py-8 to pt-24 pb-16 to add space for the navbar
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert your text to speech instantly using our advanced text-to-voice technology
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Text Input Section */}
          <div className="mb-6">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text to Convert
            </label>
            <textarea
              id="text"
              rows={6}
              className="w-full p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
              {text.length}/1000 characters
            </div>
          </div>

          {/* Voice Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voice
              </label>
              <select
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pitch: {pitch}
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            {/* Rate Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Speed: {rate}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleConvertText}
              disabled={!text.trim() || isConverting}
              className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isConverting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Converting...
                </>
              ) : (
                <>
                  🎤 Convert to Speech
                </>
              )}
            </button>

            {isConverting && (
              <button
                onClick={handleStopSpeech}
                className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                ⏹️ Stop
              </button>
            )}

            <button
              onClick={handleClear}
              disabled={!text.trim() && isConverting}
              className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            How to Use Voicify
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Type or paste your text in the text area above (up to 1000 characters)
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Select your preferred voice from the dropdown menu
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Adjust the pitch (0.1-2.0) and speed (0.1-3.0) using the sliders
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Click "Convert to Speech" to hear your text read aloud
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Use "Stop" to interrupt playback or "Clear" to reset everything
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
