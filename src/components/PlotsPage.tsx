import { ArrowLeft, MapPin, Trees, Sun } from 'lucide-react';
import ContactModal from './ContactModal';
import { useState, useEffect } from 'react';

interface PlotsPageProps {
  onBack: () => void;
}

export default function PlotsPage({ onBack }: PlotsPageProps) {
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1.35;
  const roadWidth = 56.875;
  const startX = 25;
  const startY = 25;
  const parkWidth = 22;

  const leftColWidth = 57.5 * scale;
  const vRoad1X = startX + leftColWidth;
  const col2X = vRoad1X + roadWidth;
  const col2Width = 50 * scale;
  const vRoad2X = col2X + col2Width;
  const col3X = vRoad2X + roadWidth;
  const col3Width = 50 * scale;

  const vRoad3X = startX + roadWidth;

  const plot1H = 34 * scale;
  const plotH = 30 * scale;

  const row1Y = startY;
  const row2Y = startY + plot1H;
  const row3Y = row2Y + plotH;
  const row4Y = row3Y + plotH;
  const row5Y = row4Y + plotH;

  const hRoad1Y = row5Y + plotH;
  const row6Y = hRoad1Y + roadWidth;
  const row7Y = row6Y + plotH;
  const row8Y = row7Y + plotH;
  const row9Y = row8Y + plotH;

  const hRoad2Y = row9Y + plotH;
  const row10Y = hRoad2Y + roadWidth;
  const row11Y = row10Y + 40 * scale;
  const nhRoadY = row11Y + 100 * scale;

  const totalWidth = col3X + col3Width - startX;
  const totalHeight = nhRoadY + 40 - startY;

  const plotData = [
    { id: 1, width: "50'", depth: "34'", x: col2X, y: row1Y, w: col2Width, h: plot1H, sold: false },
    { id: 2, width: "50'", depth: "30'", x: col2X, y: row2Y, w: col2Width, h: plotH, sold: false },
    { id: 3, width: "50'", depth: "30'", x: col2X, y: row3Y, w: col2Width, h: plotH, sold: false },
    { id: 4, width: "50'", depth: "30'", x: col2X, y: row4Y, w: col2Width, h: plotH, sold: false },
    { id: 5, width: "50'", depth: "30'", x: col2X, y: row6Y, w: col2Width, h: plotH, sold: false },
    { id: 6, width: "50'", depth: "30'", x: col2X, y: row7Y, w: col2Width, h: plotH, sold: false },
    { id: 7, width: "50'", depth: "30'", x: col2X, y: row8Y, w: col2Width, h: plotH, sold: true },
    { id: 8, width: "50'", depth: "30'", x: col2X, y: row9Y, w: col2Width, h: plotH, sold: true },

    { id: 17, width: "44'-6\"", depth: "30'", x: vRoad3X, y: row1Y, w: 44.5 * scale, h: plotH, sold: false },
    { id: 16, width: "46'-9\"", depth: "30'", x: vRoad3X, y: row2Y, w: 46.75 * scale, h: plotH, sold: false },
    { id: 15, width: "49'-6\"", depth: "30'", x: vRoad3X, y: row3Y, w: 49.5 * scale, h: plotH, sold: false },
    { id: 14, width: "53'-3\"", depth: "30'", x: vRoad3X, y: row4Y, w: 53.25 * scale, h: plotH, sold: false },
    { id: 13, width: "57'", depth: "30'", x: vRoad3X, y: row6Y, w: 57 * scale, h: plotH, sold: false },
    { id: 12, width: "57'-6\"", depth: "30'", x: vRoad3X, y: row7Y, w: leftColWidth - roadWidth, h: plotH, sold: false },
    { id: 11, width: "57'-6\"", depth: "30'", x: vRoad3X, y: row8Y, w: leftColWidth - roadWidth, h: plotH, sold: false },
    { id: 10, width: "57'-6\"", depth: "30'", x: vRoad3X, y: row9Y, w: leftColWidth - roadWidth, h: plotH, sold: false },
    { id: 9, width: "57'-6\"", depth: "30'", x: vRoad3X + parkWidth, y: row5Y, w: leftColWidth - roadWidth - parkWidth, h: plotH, sold: false },

    { id: 21, width: "42'", depth: "40'", x: vRoad3X, y: row10Y, w: 42 * scale, h: 40 * scale, sold: false },
    { id: 20, width: "40'-6\"", depth: "40'", x: vRoad3X + 42 * scale, y: row10Y, w: 40.5 * scale, h: 40 * scale, sold: false },
    { id: 19, width: "35'", depth: "40'", x: vRoad3X + 82.5 * scale, y: row10Y, w: 35 * scale, h: 40 * scale, sold: false },
    { id: 18, width: "40'", depth: "40'", x: vRoad3X + 117.5 * scale, y: row10Y, w: 40 * scale, h: 40 * scale, sold: false },

    { id: 25, width: "39'-4\"", depth: "100'", x: vRoad3X, y: row11Y, w: 39.33 * scale, h: 100 * scale, sold: false },
    { id: 24, width: "39'-4\"", depth: "100'", x: vRoad3X + 39.33 * scale, y: row11Y, w: 39.33 * scale, h: 100 * scale, sold: false },
    { id: 23, width: "39'-4\"", depth: "100'", x: vRoad3X + 78.66 * scale, y: row11Y, w: 39.33 * scale, h: 100 * scale, sold: false },
    { id: 22, width: "39'-4\"", depth: "100'", x: vRoad3X + 117.99 * scale, y: row11Y, w: 39.33 * scale, h: 100 * scale, sold: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)
        `
      }} />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      <header className={`fixed top-0 right-0 z-50 p-6 flex items-center gap-3 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-lg">K</span>
        </div>
        <div>
          <h2 className="text-white font-bold">Krishnammagari</h2>
          <p className="text-xs text-yellow-400">Developers</p>
        </div>
      </header>

      <div className="relative z-10 min-h-screen p-8 pt-24">
        <button
          onClick={onBack}
          className={`fixed top-8 left-8 z-40 flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">Premium Plot Layout</h1>
            <p className="text-gray-400 text-lg">25 Exclusive Plots in Prime Location - Click to explore details</p>

            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Trees className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">Eco-Friendly Layout</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-yellow-400">Near NH-4</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl p-6 border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500">
              <div className="relative w-full" style={{ height: '800px', overflowY: 'auto', overflowX: 'hidden' }}>
                <div className="w-full" style={{ minHeight: '1200px' }}>
                <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20">
                  <Trees className="w-full h-full text-green-500 animate-pulse" style={{ animationDuration: '3s' }} />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
                  <Trees className="w-full h-full text-green-500 animate-pulse" style={{ animationDuration: '4s' }} />
                </div>
                <div className="absolute -bottom-4 left-1/4 w-16 h-16 opacity-20">
                  <Sun className="w-full h-full text-yellow-500 animate-pulse" style={{ animationDuration: '5s' }} />
                </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-inner relative">
                <div className="absolute top-4 left-4 text-green-600 opacity-10 text-6xl">🌳</div>
                <div className="absolute bottom-4 right-4 text-green-600 opacity-10 text-6xl">🌳</div>
                <div className="absolute top-1/3 right-8 text-green-500 opacity-10 text-5xl">🌿</div>
                <div className="absolute bottom-1/3 left-8 text-green-500 opacity-10 text-5xl">🌿</div>
                <svg viewBox="0 0 310 590" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  <rect width="310" height="590" fill="#ffffff"/>

                  <rect x={startX} y={startY} width={totalWidth} height={totalHeight} fill="none" stroke="#2563eb" strokeWidth="2.5"/>

                  <rect x={startX} y={startY} width={roadWidth} height={nhRoadY - startY} fill="#d1d5db"/>
                  <text x={startX + roadWidth/2} y={startY + 100} fontSize="6" fontWeight="bold" textAnchor="middle" fill="#374151" transform={`rotate(90, ${startX + roadWidth/2}, ${startY + 100})`}>25' ROAD</text>

                  <rect x={vRoad1X} y={startY} width={roadWidth} height={hRoad2Y - startY} fill="#d1d5db"/>
                  <text x={vRoad1X + roadWidth/2} y={startY + 95} fontSize="6" fontWeight="bold" textAnchor="middle" fill="#374151" transform={`rotate(90, ${vRoad1X + roadWidth/2}, ${startY + 95})`}>25' ROAD</text>

                  <rect x={vRoad2X} y={startY} width={roadWidth} height={hRoad2Y - startY} fill="#d1d5db"/>
                  <text x={vRoad2X + roadWidth/2} y={startY + 95} fontSize="6" fontWeight="bold" textAnchor="middle" fill="#374151" transform={`rotate(90, ${vRoad2X + roadWidth/2}, ${startY + 95})`}>25' ROAD</text>

                  <rect x={startX} y={hRoad1Y} width={totalWidth} height={roadWidth} fill="#d1d5db"/>
                  <text x={startX + 75} y={hRoad1Y + 18} fontSize="7" fontWeight="bold" textAnchor="middle" fill="#374151">25' ROAD</text>

                  <rect x={startX} y={hRoad2Y} width={totalWidth} height={roadWidth} fill="#d1d5db"/>
                  <text x={startX + 75} y={hRoad2Y + 18} fontSize="7" fontWeight="bold" textAnchor="middle" fill="#374151">25' ROAD</text>

                  <rect x={vRoad3X} y={row5Y} width={parkWidth} height={hRoad1Y - row5Y} fill="#86efac" fillOpacity="0.3"/>
                  <text x={vRoad3X + parkWidth/2} y={row5Y + 25} fontSize="5" fontWeight="bold" textAnchor="middle" fill="#15803d" transform={`rotate(90, ${vRoad3X + parkWidth/2}, ${row5Y + 25})`}>PARK</text>

                  {plotData.map((plot) => {
                    const isSelected = selectedPlot === plot.id;
                    const isSold = plot.sold;
                    return (
                      <g key={plot.id} onClick={() => !isSold && setSelectedPlot(isSelected ? null : plot.id)} style={{ cursor: isSold ? 'not-allowed' : 'pointer' }} className="plot-item">
                        <rect
                          x={plot.x}
                          y={plot.y}
                          width={plot.w}
                          height={plot.h}
                          fill={isSold ? '#9ca3af' : (isSelected ? '#fbbf24' : '#f3f4f6')}
                          stroke={isSold ? '#6b7280' : (isSelected ? '#f59e0b' : '#9ca3af')}
                          strokeWidth="2"
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        <rect
                          x={plot.x}
                          y={plot.y}
                          width={plot.w}
                          height={plot.h}
                          fill={isSelected ? '#fbbf24' : 'transparent'}
                          opacity={isSelected ? '0.3' : '0'}
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          {isSelected && !isSold && (
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                          )}
                        </rect>
                        {isSold && (
                          <>
                            <line x1={plot.x} y1={plot.y} x2={plot.x + plot.w} y2={plot.y + plot.h} stroke="#374151" strokeWidth="3" />
                            <line x1={plot.x + plot.w} y1={plot.y} x2={plot.x} y2={plot.y + plot.h} stroke="#374151" strokeWidth="3" />
                            <text x={plot.x + plot.w/2} y={plot.y + plot.h/2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">SOLD OUT</text>
                          </>
                        )}
                        <circle cx={plot.x + 20} cy={plot.y + plot.h/2} r="12" fill="white" stroke={isSold ? '#6b7280' : (isSelected ? '#f59e0b' : '#000')} strokeWidth={isSelected || isSold ? '2' : '1'} style={{ transition: 'all 0.3s ease' }}/>
                        <text x={plot.x + 20} y={plot.y + plot.h/2 + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={isSold ? '#6b7280' : (isSelected ? '#000' : '#1f2937')}>{plot.id}</text>
                        <text x={plot.x + 40} y={plot.y + 15} fontSize="10" fill="#dc2626" fontWeight="600">{plot.width}</text>
                        {plot.depth && <text x={plot.x + 40} y={plot.y + 28} fontSize="10" fill="#dc2626" fontWeight="600">{plot.depth}</text>}
                      </g>
                    );
                  })}

                  <rect x={startX} y={nhRoadY} width={totalWidth} height={40} fill="#f59e0b"/>
                  <text x={startX + 8} y={nhRoadY + 24} fontSize="6.5" fill="#000" fontWeight="bold">&lt;&lt; BANGALORE</text>
                  <text x={startX + 75} y={nhRoadY + 24} fontSize="8" fill="#000" fontWeight="bold">NH-4 HIGHWAY</text>
                  <text x={startX + totalWidth - 8} y={nhRoadY + 24} fontSize="6.5" fill="#000" fontWeight="bold" textAnchor="end">TIRUPATHI &gt;&gt;</text>

                  <g transform="translate(240, 85)">
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#dc2626" strokeWidth="1.5"/>
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#dc2626" strokeWidth="1.5"/>
                    <line x1="0" y1="-15" x2="0" y2="-20" stroke="#dc2626" strokeWidth="2"/>
                    <text x="0" y="-23" fontSize="7" fill="#dc2626" textAnchor="middle" fontWeight="bold">N</text>
                  </g>
                </svg>
              </div>
              </div>
              </div>
            </div>

            <div className="w-full lg:w-80 lg:sticky lg:top-24 lg:self-start bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur rounded-2xl p-4 md:p-6 border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-200px)]">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">Plot Details</h2>

              {selectedPlot ? (
                <div className="space-y-3 md:space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-3 md:p-4">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Plot Number</p>
                    <p className="text-3xl md:text-4xl font-bold text-yellow-400">#{selectedPlot}</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 md:p-4">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Dimensions</p>
                    <p className="text-xl md:text-2xl text-white font-semibold">
                      {plotData.find(p => p.id === selectedPlot)?.width} × {plotData.find(p => p.id === selectedPlot)?.depth}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 md:p-4">
                    <p className="text-gray-400 text-xs md:text-sm mb-2">Status</p>
                    {plotData.find(p => p.id === selectedPlot)?.sold ? (
                      <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gray-500/20 border border-gray-500 text-gray-400 text-xs md:text-sm font-semibold rounded-full">
                        ✗ Sold Out
                      </span>
                    ) : (
                      <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-green-500/20 border border-green-500 text-green-400 text-xs md:text-sm font-semibold rounded-full animate-pulse">
                        ✓ Available Now
                      </span>
                    )}
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 md:p-4">
                    <p className="text-gray-400 text-xs md:text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      Location
                    </p>
                    <p className="text-white text-sm md:text-base font-medium mb-1">Prime location near NH-4</p>
                    <p className="text-xs md:text-sm text-gray-400">Between Bangalore & Tirupathi</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-3 md:p-4">
                    <p className="text-gray-300 text-xs md:text-sm mb-2 font-semibold">✨ Amenities</p>
                    <ul className="text-xs md:text-sm text-gray-400 space-y-1">
                      <li className="flex items-center gap-2">🌳 Green Spaces</li>
                      <li className="flex items-center gap-2">⚡ Electricity Ready</li>
                      <li className="flex items-center gap-2">🛣️ Wide Roads</li>
                    </ul>
                  </div>
                  {!plotData.find(p => p.id === selectedPlot)?.sold && (
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="w-full mt-4 md:mt-6 px-3 md:px-4 py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-sm md:text-base font-bold rounded-xl transition-all hover:shadow-2xl hover:shadow-yellow-400/40 hover:scale-105 transform duration-300"
                    >
                      Inquire About Plot #{selectedPlot}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 md:py-16">
                  <div className="mb-4 md:mb-6 mx-auto w-16 h-16 md:w-24 md:h-24 bg-yellow-400/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 animate-bounce" />
                  </div>
                  <p className="text-gray-300 text-base md:text-lg font-medium mb-2">Select a Plot</p>
                  <p className="text-gray-500 text-xs md:text-sm">Click on any plot in the layout to view detailed information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}
