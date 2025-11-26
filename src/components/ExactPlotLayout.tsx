import { useEffect, useState } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { supabase, Plot } from '../lib/supabase';
import ContactModal from './ContactModal';

interface ExactPlotLayoutProps {
  onBack: () => void;
}

export default function ExactPlotLayout({ onBack }: ExactPlotLayoutProps) {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [viewMode, setViewMode] = useState<'topdown' | 'perspective'>('topdown');

  useEffect(() => {
    loadPlots();
  }, []);

  const loadPlots = async () => {
    const { data, error } = await supabase
      .from('plots')
      .select('*')
      .order('plot_number');

    if (!error && data) {
      // Override statuses as per requirement
      const updatedData = data.map(plot => {
        if (plot.plot_number === 1 || plot.plot_number === 2) {
          return { ...plot, status: 'sold' as const };
        }
        if (plot.plot_number === 7 || plot.plot_number === 8) {
          return { ...plot, status: 'available' as const };
        }
        return plot;
      });
      setPlots(updatedData);
    }
  };

  const handlePlotClick = (plotNumber: number) => {
    setSelectedPlot(selectedPlot === plotNumber ? null : plotNumber);
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
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('topdown')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'topdown'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Top View
              </button>
              <button
                onClick={() => setViewMode('perspective')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'perspective'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Highway View
              </button>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Compass className="w-5 h-5" />
              <span className="text-sm">North ↑</span>
            </div>
          </div>
        </div>

        {viewMode === 'topdown' ? (
          <TopDownView plots={plots} selectedPlot={selectedPlot} onPlotClick={handlePlotClick} />
        ) : (
          <PerspectiveView plots={plots} selectedPlot={selectedPlot} onPlotClick={handlePlotClick} />
        )}

        {selectedPlot && getPlot(selectedPlot) && (
          <div className="mt-6 bg-slate-800 rounded-lg p-6 border border-emerald-500 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-xl font-bold mb-4">Plot #{selectedPlot} Details</h3>
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

function TopDownView({ plots, selectedPlot, onPlotClick }: { plots: Plot[]; selectedPlot: number | null; onPlotClick: (num: number) => void }) {
  const getPlot = (num: number) => plots.find(p => p.plot_number === num);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'reserved': return '#f59e0b';
      case 'sold': return '#64748b';
      default: return '#71717a';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-8 border-4 border-blue-600 shadow-2xl overflow-auto">
      <svg viewBox="0 0 1000 1400" className="w-full max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        <rect width="1000" height="1400" fill="url(#grid)" />

        <g id="boundary">
          <polygon
            points="100,150 900,100 950,700 900,1200 500,1350 200,1200 50,700"
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
          />
        </g>

        <g id="plots">
          {[17, 16, 15, 14, 13, 12, 11, 10, 9].map((num, idx) => {
            const plot = getPlot(num);
            if (!plot) return null;
            const x = 150;
            const y = 180 + idx * 115;
            const isSelected = selectedPlot === num;

            return (
              <g key={num}>
                <rect
                  x={x}
                  y={y}
                  width="130"
                  height="110"
                  fill={getStatusColor(plot.status)}
                  fillOpacity={isSelected ? 0.8 : 0.6}
                  stroke={isSelected ? '#ffffff' : '#e2e8f0'}
                  strokeWidth={isSelected ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-80 transition-all"
                  onClick={() => onPlotClick(num)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none'
                  }}
                />
                <text x={x + 65} y={y + 40} textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                  {num}
                </text>
                <text x={x + 65} y={y + 60} textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  {plot.width}
                </text>
                <text x={x + 65} y={y + 75} textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  × {plot.height}
                </text>
              </g>
            );
          })}

          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => {
            const plot = getPlot(num);
            if (!plot) return null;
            const x = 350;
            const y = 180 + idx * 115;
            const isSelected = selectedPlot === num;

            return (
              <g key={num}>
                <rect
                  x={x}
                  y={y}
                  width="130"
                  height="110"
                  fill={getStatusColor(plot.status)}
                  fillOpacity={isSelected ? 0.8 : 0.6}
                  stroke={isSelected ? '#ffffff' : '#e2e8f0'}
                  strokeWidth={isSelected ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-80 transition-all"
                  onClick={() => onPlotClick(num)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none'
                  }}
                />
                <text x={x + 65} y={y + 40} textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                  {num}
                </text>
                <text x={x + 65} y={y + 60} textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  {plot.width}
                </text>
                <text x={x + 65} y={y + 75} textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  × {plot.height}
                </text>
              </g>
            );
          })}

          <rect x="150" y="1100" width="330" height="60" fill="#475569" stroke="#e2e8f0" strokeWidth="2" />
          <text x="315" y="1135" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            25'-0" WIDE ROAD
          </text>

          {[21, 20, 19, 18].map((num, idx) => {
            const plot = getPlot(num);
            if (!plot) return null;
            const x = 150 + idx * 95;
            const y = 1180;
            const isSelected = selectedPlot === num;

            return (
              <g key={num}>
                <rect
                  x={x}
                  y={y}
                  width="85"
                  height="130"
                  fill={getStatusColor(plot.status)}
                  fillOpacity={isSelected ? 0.8 : 0.6}
                  stroke={isSelected ? '#ffffff' : '#e2e8f0'}
                  strokeWidth={isSelected ? 3 : 1}
                  className="cursor-pointer hover:fill-opacity-80 transition-all"
                  onClick={() => onPlotClick(num)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none'
                  }}
                />
                <text x={x + 42} y={y + 50} textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                  {num}
                </text>
                <text x={x + 42} y={y + 75} textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
                  {plot.width}
                </text>
                <text x={x + 42} y={y + 90} textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
                  × {plot.height}
                </text>
              </g>
            );
          })}

          <g id="roads-labels">
            <text x="100" y="100" fill="#9ca3af" fontSize="14" fontWeight="bold">
              25'-0" WIDE ROAD
            </text>
            <text x="600" y="150" fill="#9ca3af" fontSize="12" opacity="0.7">
              ↑ NORTH
            </text>
          </g>
        </g>

        <g id="highway">
          <text x="500" y="1350" textAnchor="middle" fill="#9ca3af" fontSize="16" fontWeight="bold">
            NH-4 Highway ← BANGALORE | TIRUPATHI →
          </text>
        </g>
      </svg>
    </div>
  );
}

function PerspectiveView({ plots, selectedPlot, onPlotClick }: { plots: Plot[]; selectedPlot: number | null; onPlotClick: (num: number) => void }) {
  const getPlot = (num: number) => plots.find(p => p.plot_number === num);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'reserved': return '#f59e0b';
      case 'sold': return '#64748b';
      default: return '#71717a';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-8 border-4 border-blue-600 shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-emerald-400">Highway Perspective View</h3>
        <p className="text-slate-400 text-sm mt-2">How the development appears from NH-4 Highway</p>
      </div>

      <svg viewBox="0 0 1200 600" className="w-full max-w-5xl mx-auto" style={{ minHeight: '400px' }}>
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <rect width="1200" height="600" fill="url(#skyGradient)" />

        <rect x="0" y="350" width="1200" height="250" fill="url(#roadGradient)" />

        <line x1="0" y1="380" x2="1200" y2="380" stroke="#fbbf24" strokeWidth="3" strokeDasharray="20,10" opacity="0.7" />
        <line x1="0" y1="420" x2="1200" y2="420" stroke="#fbbf24" strokeWidth="2" strokeDasharray="20,10" opacity="0.5" />

        <text x="600" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="24" fontWeight="bold">
          KRISHNAMMAGARI DEVELOPERS
        </text>
        <text x="600" y="85" textAnchor="middle" fill="#94a3b8" fontSize="14">
          Premium Residential Plots
        </text>

        <g id="perspective-plots">
          {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((num, idx) => {
            const plot = getPlot(num);
            if (!plot) return null;
            const baseX = 80 + idx * 115;
            const baseY = 150;
            const scale = 1 - idx * 0.08;
            const perspective = idx * 15;
            const height = 120 * scale;
            const width = 90 * scale;
            const x = baseX + perspective;
            const isSelected = selectedPlot === num;

            return (
              <g key={num} opacity={0.7 + idx * 0.035}>
                <rect
                  x={x - width / 2}
                  y={baseY - height}
                  width={width}
                  height={height}
                  fill={getStatusColor(plot.status)}
                  fillOpacity={isSelected ? 0.9 : 0.7}
                  stroke={isSelected ? '#ffffff' : '#cbd5e1'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="cursor-pointer hover:fill-opacity-90 transition-all"
                  onClick={() => onPlotClick(num)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none'
                  }}
                />
                <text
                  x={x}
                  y={baseY - height / 2 - 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize={`${14 * scale}`}
                  fontWeight="bold"
                >
                  {num}
                </text>
                <text
                  x={x}
                  y={baseY - height / 2 + 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize={`${10 * scale}`}
                  opacity="0.85"
                >
                  {plot.width}
                </text>
              </g>
            );
          })}
        </g>

        <text x="600" y="560" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
          ← BANGALORE | NH-4 HIGHWAY | TIRUPATHI →
        </text>
      </svg>

      <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <p className="text-slate-300 text-sm">
          This perspective view shows how your property appears from the NH-4 highway. Plots closer to the highway (shown larger) offer better visibility and accessibility.
        </p>
      </div>
    </div>
  );
}
