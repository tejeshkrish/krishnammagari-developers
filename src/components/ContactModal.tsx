import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send email notification
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="backdrop-blur-xl bg-slate-900/90 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full border border-gold-500/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gold-500/20 sticky top-0 bg-slate-900/90 backdrop-blur-xl z-10">
          <h2 className="text-lg sm:text-2xl font-display font-bold bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent">Connect With Us</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-gold-400 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gold-300 mb-1.5 sm:mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gold-300 mb-1.5 sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gold-300 mb-1.5 sm:mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gold-300 mb-1.5 sm:mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none transition-all"
              placeholder="Any specific requirements or questions?"
            />
          </div>

          {submitStatus === 'success' && (
            <div className="backdrop-blur-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
              Thank you! We'll contact you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="backdrop-blur-xl bg-red-500/20 border border-red-400 text-red-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
              Something went wrong. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-600 hover:to-gold-700 disabled:from-gold-700 disabled:via-gold-800 disabled:to-gold-900 text-black font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-gold-500/50 active:scale-95 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed touch-manipulation"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
