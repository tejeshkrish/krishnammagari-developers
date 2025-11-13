import { useState } from 'react';
import { Building2, Sparkles } from 'lucide-react';
import ContactModal from './ContactModal';

interface LandingPageProps {
  onViewLayout: () => void;
}

export default function LandingPage({ onViewLayout }: LandingPageProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-transparent to-transparent"></div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(212,176,81,0.1) 50px, rgba(212,176,81,0.1) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(212,176,81,0.1) 50px, rgba(212,176,81,0.1) 51px)
        `
      }} />

      <header className="fixed top-0 right-0 z-50 p-4 sm:p-6">
        <div className="flex items-center gap-3 px-4 py-3 backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-2xl shadow-2xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/50">
            <span className="text-black font-display font-bold text-lg sm:text-xl">K</span>
          </div>
          <div>
            <h2 className="text-white font-display font-bold text-base sm:text-lg">Krishnammagari</h2>
            <p className="text-xs text-gold-400 font-medium">Developers</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20">
        <div className="text-center max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 backdrop-blur-xl bg-gold-500/10 border border-gold-400/30 rounded-full shadow-lg shadow-gold-500/10 animate-fade-in">
            <Building2 className="w-5 h-5 text-gold-400" />
            <span className="text-sm font-medium text-gold-300">Premium Real Estate Development</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">Discover Your</span>
            <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">Perfect Plot</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
            Exclusive residential plots located between the Bangalore–Tirupati Highway, offering prime locations and exceptional investment potential. Connect with us today to explore the available opportunities.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 max-w-lg mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gold-400 mb-1 sm:mb-2">25</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Premium Plots</div>
            </div>
            <div className="backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-1 sm:mb-2">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gold-400 mx-auto" />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Prime Location</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => setShowContactModal(true)}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-600 hover:to-gold-700 text-black font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/50 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            <button
              onClick={onViewLayout}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 backdrop-blur-xl bg-slate-900/40 hover:bg-slate-800/60 border-2 border-gold-400/40 hover:border-gold-400/60 text-gold-200 hover:text-gold-100 font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/20 active:scale-95"
            >
              View Plots
            </button>
          </div>
        </div>
      </div>

      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}
