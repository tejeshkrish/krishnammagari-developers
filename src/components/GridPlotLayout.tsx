import { useState } from 'react';
import { ArrowLeft, Navigation } from 'lucide-react';
import ContactModal from './ContactModal';

interface GridPlotLayoutProps {
  onBack: () => void;
}

interface PlotInfo {
  id: number;
  width: string;
  depth: string;
  status: 'available' | 'sold' | 'reserved';
  sqFt: number;
}

export default function GridPlotLayout({ onBack }: GridPlotLayoutProps) {
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const plotsInfo: PlotInfo[] = [
    { id: 1, width: "50'", depth: "34'", status: 'available', sqFt: 1700 },
    { id: 2, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 3, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 4, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 5, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 6, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 7, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 8, width: "50'", depth: "30'", status: 'available', sqFt: 1500 },
    { id: 9, width: "57'-6\"", depth: "30'", status: 'available', sqFt: 1725 },
    { id: 10, width: "57'-6\"", depth: "30'", status: 'available', sqFt: 1725 },
    { id: 11, width: "57'-6\"", depth: "30'", status: 'available', sqFt: 1725 },
    { id: 12, width: "57'-6\"", depth: "30'", status: 'available', sqFt: 1725 },
    { id: 13, width: "57'", depth: "30'", status: 'available', sqFt: 1710 },
    { id: 14, width: "53'-3\"", depth: "30'", status: 'available', sqFt: 1598 },
    { id: 15, width: "49'-6\"", depth: "30'", status: 'available', sqFt: 1485 },
    { id: 16, width: "46'-9\"", depth: "19'-6\"", status: 'available', sqFt: 912 },
    { id: 17, width: "44'-6\"", depth: "19'-6\"", status: 'available', sqFt: 868 },
    { id: 18, width: "40'", depth: "40'", status: 'available', sqFt: 1600 },
    { id: 19, width: "35'", depth: "40'", status: 'available', sqFt: 1400 },
    { id: 20, width: "40'-6\"", depth: "40'", status: 'available', sqFt: 1620 },
    { id: 21, width: "42'", depth: "40'", status: 'available', sqFt: 1680 },
    { id: 22, width: "39'-4\"", depth: "100'", status: 'available', sqFt: 3933 },
    { id: 23, width: "39'-4\"", depth: "100'", status: 'available', sqFt: 3933 },
    { id: 24, width: "39'-4\"", depth: "100'", status: 'available', sqFt: 3933 },
    { id: 25, width: "39'-4\"", depth: "100'", status: 'available', sqFt: 3933 },
  ];

  const getPlotInfo = (id: number) => plotsInfo.find(p => p.id === id);

  const getStatusColor = (status: 'available' | 'sold' | 'reserved') => {
    if (status === 'sold') return 'bg-gray-500 border-gray-600';
    if (status === 'reserved') return 'bg-amber-500 border-amber-600';
    return 'bg-emerald-500 border-emerald-600';
  };

  const Plot = ({ id }: { id: number }) => {
    const info = getPlotInfo(id);
    if (!info) return null;

    return (
      <div
        onClick={() => setSelectedPlot(id)}
        className={`${getStatusColor(info.status)} border-2 p-4 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center relative group`}
      >
        <div className="text-white font-display font-bold text-xl sm:text-2xl">#{id}</div>
        <div className="text-white/90 text-xs sm:text-sm mt-1 font-medium">{info.width} × {info.depth}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-transparent to-transparent"></div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(212,176,81,0.1) 50px, rgba(212,176,81,0.1) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(212,176,81,0.1) 50px, rgba(212,176,81,0.1) 51px)
        `
      }} />

      <div className="relative z-10">
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/60 border-b border-gold-500/20 shadow-2xl">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold hidden sm:inline">Back to Home</span>
              </button>
              <h1 className="text-lg sm:text-2xl font-display font-bold bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Krishnammagari Developers
              </h1>
              <button
                onClick={() => setShowContactModal(true)}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-black font-semibold rounded-xl hover:from-gold-500 hover:via-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-gold-400/50 text-sm sm:text-base"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-6 backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-2xl p-4 sm:p-6">
            <p className="text-gray-300 font-medium">Click on any plot to view details</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">

              <div className="border-4 border-blue-600 p-0 relative bg-white" style={{ maxWidth: '1600px', margin: '0 auto' }}>

                <div className="flex">

                  <div className="flex-1">


                    <div className="grid grid-cols-[1fr_60px_1fr_60px]">
                      <div className="grid grid-rows-[100px_100px_100px_100px_100px_100px_100px_100px_100px]">
                        <Plot id={17} />
                        <Plot id={16} />
                        <Plot id={15} />
                        <Plot id={14} />
                        <Plot id={13} />
                        <Plot id={12} />
                        <Plot id={11} />
                        <Plot id={10} />
                        <Plot id={9} />
                      </div>

                      <div className="bg-slate-300 border-x-2 border-slate-500 flex items-center justify-center">
                        <span className="transform -rotate-90 text-xs font-bold whitespace-nowrap">25'-0" WIDE ROAD</span>
                      </div>

                      <div className="grid grid-rows-[112.5px_112.5px_112.5px_112.5px_112.5px_112.5px_112.5px_112.5px]">
                        <Plot id={1} />
                        <Plot id={2} />
                        <Plot id={3} />
                        <Plot id={4} />
                        <Plot id={5} />
                        <Plot id={6} />
                        <Plot id={7} />
                        <Plot id={8} />
                      </div>

                      <div className="bg-slate-300 border-x-2 border-slate-500 flex items-center justify-center">
                        <span className="transform -rotate-90 text-xs font-bold whitespace-nowrap">25'-0" WIDE ROAD</span>
                      </div>
                    </div>

                    <div className="bg-slate-300 border-y-2 border-slate-500 h-12 flex items-center justify-center text-xs font-bold">
                      25'-0" WIDE ROAD
                    </div>

                    <div className="flex">
                      <div className="w-16 bg-slate-300 border-r-2 border-slate-500 flex items-center justify-center">
                        <span className="transform -rotate-90 text-xs font-bold whitespace-nowrap">25'-0" WIDE ROAD</span>
                      </div>

                      <div className="flex-1">
                        <div className="grid grid-cols-4 gap-0 h-32">
                          <Plot id={21} />
                          <Plot id={20} />
                          <Plot id={19} />
                          <Plot id={18} />
                        </div>

                        <div className="grid grid-cols-4 gap-0" style={{ height: '300px' }}>
                          <Plot id={25} />
                          <Plot id={24} />
                          <Plot id={23} />
                          <Plot id={22} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 border-t-2 border-slate-800 p-6 text-center">
                  <div className="text-white font-bold text-2xl mb-3">NH-4 HIGHWAY</div>
                  <div className="flex justify-between text-yellow-400 text-base font-bold px-12">
                    <span>← BANGALORE</span>
                    <span>TIRUPATHI →</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 backdrop-blur-xl bg-slate-900/40 border border-gold-500/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-display font-bold text-white mb-6 bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Plot Details
              </h2>

              {selectedPlot ? (
                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-slate-800/50 rounded-xl p-5 border border-gold-500/20 shadow-lg">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Plot Number</div>
                    <div className="text-white text-4xl font-display font-bold">#{selectedPlot}</div>
                  </div>

                  <div className="backdrop-blur-xl bg-slate-800/50 rounded-xl p-5 border border-gold-500/20 shadow-lg">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Dimensions</div>
                    <div className="text-gold-300 text-xl font-semibold">
                      {getPlotInfo(selectedPlot)?.width} × {getPlotInfo(selectedPlot)?.depth}
                    </div>
                  </div>

                  <div className="backdrop-blur-xl bg-slate-800/50 rounded-xl p-5 border border-gold-500/20 shadow-lg">
                    <div className="text-gray-400 text-sm mb-2 font-medium">Area</div>
                    <div className="text-gold-300 text-xl font-semibold">
                      {getPlotInfo(selectedPlot)?.sqFt} sq. ft
                    </div>
                  </div>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-black font-semibold rounded-xl hover:from-gold-500 hover:via-gold-600 hover:to-gold-700 transition-all duration-300 shadow-xl hover:shadow-gold-400/50 hover:scale-105"
                  >
                    Inquire About This Plot
                  </button>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-4">📍</div>
                  <p className="font-medium">Select a plot to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </div>
  );
}
