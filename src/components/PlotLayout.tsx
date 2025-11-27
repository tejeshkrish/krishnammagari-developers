import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { supabase, Plot } from '../lib/supabase';
import PlotItem from './PlotItem';
import ContactModal from './ContactModal';

interface PlotLayoutProps {
  onBack: () => void;
}

export default function PlotLayout({ onBack }: PlotLayoutProps) {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    loadPlots();
  }, []);

  const loadPlots = async () => {
    const { data, error } = await supabase
      .from('plots')
      .select('*')
      .order('plot_number');

    if (!error && data) {
      const updatedData = data.map(p => {
        if (p.plot_number === 1 || p.plot_number === 2) {
          return { ...p, status: 'sold' as const };
        }
        if (p.plot_number === 7 || p.plot_number === 8) {
          return { ...p, status: 'available' as const };
        }
        return p;
      });
      setPlots(updatedData);
    }
  };

  const handlePlotClick = (plotNumber: number) => {
    setSelectedPlot(plotNumber);
  };

  const getPlot = (num: number) => plots.find(p => p.plot_number === num);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-bold">Krishnammagari Developers - Plot Layout</h1>
            <button
              onClick={() => setShowContactModal(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-slate-400">Click on any plot to view details</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-sm text-slate-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                <span className="text-sm text-slate-300">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-600 rounded"></div>
                <span className="text-sm text-slate-300">Sold</span>
              </div>
            </div>
          </div>
          
          
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border-4 border-blue-600 shadow-2xl relative">
          {/* Innovative Compact North Indicator */}
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-600 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl z-10 hover:bg-slate-900 transition-colors cursor-help group">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span className="text-xs font-bold text-slate-200 tracking-wider">NORTH</span>
            <div className="bg-slate-700 rounded-full p-1">
              <ArrowUp className="w-3 h-3 text-emerald-400" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs text-slate-400 px-2 py-1 rounded border border-slate-700 whitespace-nowrap pointer-events-none">
              Top side is North
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <PlotItem plot={getPlot(17)} isSelected={selectedPlot === 17} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(16)} isSelected={selectedPlot === 16} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(15)} isSelected={selectedPlot === 15} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(14)} isSelected={selectedPlot === 14} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(13)} isSelected={selectedPlot === 13} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(12)} isSelected={selectedPlot === 12} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(11)} isSelected={selectedPlot === 11} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(10)} isSelected={selectedPlot === 10} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(9)} isSelected={selectedPlot === 9} onClick={handlePlotClick} />
                </div>

                <div className="space-y-4">
                  <PlotItem plot={getPlot(1)} isSelected={selectedPlot === 1} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(2)} isSelected={selectedPlot === 2} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(3)} isSelected={selectedPlot === 3} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(4)} isSelected={selectedPlot === 4} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(5)} isSelected={selectedPlot === 5} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(6)} isSelected={selectedPlot === 6} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(7)} isSelected={selectedPlot === 7} onClick={handlePlotClick} />
                  <PlotItem plot={getPlot(8)} isSelected={selectedPlot === 8} onClick={handlePlotClick} />
                </div>
              </div>

              <div className="bg-slate-700 py-4 text-center rounded font-semibold">
                25'-0" WIDE ROAD
              </div>

              <div className="grid grid-cols-4 gap-4">
                <PlotItem plot={getPlot(21)} isSelected={selectedPlot === 21} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(20)} isSelected={selectedPlot === 20} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(19)} isSelected={selectedPlot === 19} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(18)} isSelected={selectedPlot === 18} onClick={handlePlotClick} vertical />
              </div>
            </div>

            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="bg-slate-700 px-4 py-12 text-center rounded font-semibold writing-mode-vertical">
                25'-0" WIDE ROAD
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-4 gap-4">
                <PlotItem plot={getPlot(25)} isSelected={selectedPlot === 25} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(24)} isSelected={selectedPlot === 24} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(23)} isSelected={selectedPlot === 23} onClick={handlePlotClick} vertical />
                <PlotItem plot={getPlot(22)} isSelected={selectedPlot === 22} onClick={handlePlotClick} vertical />
              </div>

              <div className="mt-8 bg-slate-700 py-6 text-center rounded font-semibold">
                25'-0" WIDE ROAD
              </div>

              <div className="mt-8 text-center text-slate-400 space-y-2">
                <div className="text-lg font-semibold">NH-4</div>
                <div className="flex items-center justify-between text-sm">
                  <span>← BANGALORE</span>
                  <span>TIRUPATHI →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPlot && (
          <div className="mt-6 bg-slate-800 rounded-lg p-6 border border-emerald-500 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Plot #{selectedPlot} Details</h3>
            {getPlot(selectedPlot) && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="ml-2 font-semibold">
                    {getPlot(selectedPlot)?.width} × {getPlot(selectedPlot)?.height}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>
                  <span className={`ml-2 font-semibold ${
                    getPlot(selectedPlot)?.status === 'available' ? 'text-emerald-400' :
                    getPlot(selectedPlot)?.status === 'reserved' ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {getPlot(selectedPlot)?.status.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowContactModal(true)}
              className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              Inquire About This Plot
            </button>
          </div>
        )}
      </div>

      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}
