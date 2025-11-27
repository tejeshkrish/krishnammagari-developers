import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  onClose: () => void;
  plotNumber?: number | null;
}

export default function ContactModal({ onClose, plotNumber }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plotNumber: plotNumber ? `Plot #${plotNumber}` : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to database (keep this for record keeping)
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (dbError) {
        console.error('Error saving to database:', dbError);
        // Continue to send email even if DB save fails, or handle as needed
      }

      // Send email via Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `New Inquiry from ${formData.name} ${plotNumber ? `for Plot #${plotNumber}` : ''}`,
          from_name: 'Krishnammagari Developers',
          // Web3Forms sends the data as a table by default. 
          // We can't inject custom HTML into the 'message' field effectively without it being escaped.
          // So we'll send the raw data and let Web3Forms handle the formatting.
          ...formData,
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', email: '', phone: '', message: '', plotNumber: '' });
        }, 2000);
      } else {
        console.error('Web3Forms Error:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="backdrop-blur-xl bg-slate-900/90 rounded-lg sm:rounded-2xl shadow-2xl max-w-md w-full border border-gold-500/20 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-2 sm:p-6 border-b border-gold-500/20 sticky top-0 bg-slate-900/90 backdrop-blur-xl z-10">
          <h2 className="text-sm sm:text-2xl font-display font-bold bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent">Connect With Us</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-gold-400 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-2 sm:p-6 space-y-2 sm:space-y-5" autoComplete="off" data-lpignore="true" data-form-type="other">
          <div>
            <label htmlFor="name" className="block text-[10px] sm:text-sm font-medium text-gold-300 mb-0.5 sm:mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              data-form-type="other"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2 sm:px-4 py-1.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-md sm:rounded-xl text-white text-xs sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-[10px] sm:text-sm font-medium text-gold-300 mb-0.5 sm:mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="off"
              data-form-type="other"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-2 sm:px-4 py-1.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-md sm:rounded-xl text-white text-xs sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[10px] sm:text-sm font-medium text-gold-300 mb-0.5 sm:mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              data-form-type="other"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-2 sm:px-4 py-1.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-md sm:rounded-xl text-white text-xs sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[10px] sm:text-sm font-medium text-gold-300 mb-0.5 sm:mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              data-form-type="other"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-2 sm:px-4 py-1.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-md sm:rounded-xl text-white text-xs sm:text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none transition-all"
              placeholder="Any specific requirements or questions?"
            />
          </div>

          {plotNumber && (
            <div>
              <label htmlFor="plotNumber" className="block text-[10px] sm:text-sm font-medium text-gold-300 mb-0.5 sm:mb-2">
                Selected Plot
              </label>
              <input
                type="text"
                id="plotNumber"
                readOnly
                value={`Plot #${plotNumber}`}
                className="w-full px-2 sm:px-4 py-1.5 sm:py-3 backdrop-blur-xl bg-slate-800/50 border border-gold-500/20 rounded-md sm:rounded-xl text-gold-400 font-bold text-xs sm:text-base cursor-not-allowed opacity-80"
              />
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="backdrop-blur-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-2 sm:px-4 py-1.5 sm:py-3 rounded-md sm:rounded-xl font-medium text-[10px] sm:text-base">
              Thank you! We'll contact you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="backdrop-blur-xl bg-red-500/20 border border-red-400 text-red-300 px-2 sm:px-4 py-1.5 sm:py-3 rounded-md sm:rounded-xl font-medium text-[10px] sm:text-base">
              Something went wrong. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-3 sm:px-6 py-2 sm:py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-600 hover:to-gold-700 disabled:from-gold-700 disabled:via-gold-800 disabled:to-gold-900 text-black font-semibold text-xs sm:text-base rounded-md sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-gold-500/50 active:scale-95 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed touch-manipulation"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
