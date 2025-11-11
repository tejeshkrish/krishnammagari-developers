import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { ArrowLeft, MapPin } from 'lucide-react';
import ContactModal from './ContactModal';

interface FabricPlotLayoutProps {
  onBack: () => void;
}

interface PlotInfo {
  id: number;
  width: string;
  depth: string;
  status: 'available' | 'sold' | 'reserved';
}

export default function FabricPlotLayout({ onBack }: FabricPlotLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const plotsInfo: PlotInfo[] = [
    { id: 1, width: "50'", depth: "34'", status: 'available' },
    { id: 2, width: "50'", depth: "30'", status: 'available' },
    { id: 3, width: "50'", depth: "30'", status: 'available' },
    { id: 4, width: "50'", depth: "30'", status: 'available' },
    { id: 5, width: "50'", depth: "30'", status: 'available' },
    { id: 6, width: "50'", depth: "30'", status: 'available' },
    { id: 7, width: "50'", depth: "30'", status: 'available' },
    { id: 8, width: "50'", depth: "30'", status: 'available' },
    { id: 9, width: "57'-6\"", depth: "30'", status: 'available' },
    { id: 10, width: "57'-6\"", depth: "30'", status: 'available' },
    { id: 11, width: "57'-6\"", depth: "30'", status: 'available' },
    { id: 12, width: "57'-6\"", depth: "30'", status: 'available' },
    { id: 13, width: "57'", depth: "30'", status: 'available' },
    { id: 14, width: "53'-3\"", depth: "30'", status: 'available' },
    { id: 15, width: "49'-6\"", depth: "30'", status: 'available' },
    { id: 16, width: "46'-9\"", depth: "30'", status: 'available' },
    { id: 17, width: "44'-6\"", depth: "30'", status: 'available' },
    { id: 18, width: "40'", depth: "40'", status: 'available' },
    { id: 19, width: "35'", depth: "40'", status: 'available' },
    { id: 20, width: "40'-6\"", depth: "40'", status: 'available' },
    { id: 21, width: "42'", depth: "40'", status: 'available' },
    { id: 22, width: "39'-4\"", depth: "100'", status: 'available' },
    { id: 23, width: "39'-4\"", depth: "100'", status: 'available' },
    { id: 24, width: "39'-4\"", depth: "100'", status: 'available' },
    { id: 25, width: "39'-4\"", depth: "100'", status: 'available' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 1600,
      backgroundColor: '#ffffff',
      selection: false,
    });

    fabricCanvasRef.current = canvas;

    const roadWidth = 50;
    const startX = 0;
    const startY = 20;
    const parkWidth = 50;

    const plotWidth = 160;
    const plotHeight = 90;
    const largeDepth = 240;

    const leftRoadX = startX + roadWidth;
    const leftColX = leftRoadX;

    const midRoadX = leftColX + plotWidth;
    const midColX = midRoadX + roadWidth;

    const rightRoadX = midColX + plotWidth;
    const rightColX = rightRoadX + roadWidth;

    const row1Y = startY;
    const row2Y = row1Y + plotHeight;
    const row3Y = row2Y + plotHeight;
    const row4Y = row3Y + plotHeight;

    const hRoad1Y = row4Y + plotHeight;
    const row5Y = hRoad1Y + roadWidth;

    const hRoad2Y = row5Y + plotHeight;
    const row6Y = hRoad2Y + roadWidth;
    const row7Y = row6Y + plotHeight;
    const row8Y = row7Y + plotHeight;
    const row9Y = row8Y + plotHeight;

    const hRoad3Y = row9Y + plotHeight;
    const bottomRowY = hRoad3Y + roadWidth;
    const bottomPlotHeight = 100;
    const largeRowY = bottomRowY + bottomPlotHeight;

    const nhRoadY = largeRowY + largeDepth;

    const totalWidth = rightColX + plotWidth;
    const totalHeight = nhRoadY + 60 - startY;

    const createPlot = (
      id: number,
      x: number,
      y: number,
      width: number,
      height: number,
      dimensions: string
    ) => {
      const plotInfo = plotsInfo.find(p => p.id === id);
      const status = plotInfo?.status || 'available';

      let fillColor = '#10b981';
      if (status === 'sold') fillColor = '#6b7280';
      if (status === 'reserved') fillColor = '#f59e0b';

      const rect = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        fill: fillColor,
        stroke: '#1e293b',
        strokeWidth: 2,
        selectable: false,
        hoverCursor: 'pointer',
      });

      const text = new fabric.Text(`#${id}`, {
        left: x + width / 2,
        top: y + height / 2 - 12,
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#ffffff',
        originX: 'center',
        originY: 'center',
        selectable: false,
      });

      const dimText = new fabric.Text(dimensions, {
        left: x + width / 2,
        top: y + height / 2 + 12,
        fontSize: 12,
        fill: '#ffffff',
        originX: 'center',
        originY: 'center',
        selectable: false,
      });

      const group = new fabric.Group([rect, text, dimText], {
        selectable: false,
        hoverCursor: 'pointer',
      });

      group.on('mousedown', () => {
        setSelectedPlot(id);
      });

      canvas.add(group);
    };

    const createRoad = (x: number, y: number, width: number, height: number, label: string, vertical = false) => {
      const road = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        fill: '#cbd5e1',
        stroke: '#64748b',
        strokeWidth: 1,
        selectable: false,
      });

      const text = new fabric.Text(label, {
        left: x + width / 2,
        top: y + height / 2,
        fontSize: 14,
        fontWeight: 'bold',
        fill: '#1e293b',
        originX: 'center',
        originY: 'center',
        angle: vertical ? 90 : 0,
        selectable: false,
      });

      canvas.add(road, text);
    };

    const border = new fabric.Rect({
      left: startX,
      top: startY,
      width: totalWidth,
      height: totalHeight,
      fill: 'transparent',
      stroke: '#2563eb',
      strokeWidth: 3,
      selectable: false,
    });
    canvas.add(border);

    createRoad(startX, startY, roadWidth, hRoad1Y - startY, "25' ROAD", true);
    createRoad(midRoadX, startY, roadWidth, hRoad3Y - startY, "25' ROAD", true);
    createRoad(rightRoadX, startY, roadWidth, hRoad3Y - startY, "25' ROAD", true);
    createRoad(leftColX, hRoad1Y, plotWidth, roadWidth, "25' ROAD");
    createRoad(midColX, hRoad1Y, plotWidth, roadWidth, "25' ROAD");
    createRoad(leftColX, hRoad2Y, totalWidth - roadWidth, roadWidth, "25' ROAD");
    createRoad(leftColX, hRoad3Y, totalWidth - roadWidth, roadWidth, "25' ROAD");

    createPlot(1, midColX, row1Y, plotWidth, plotHeight, "50' × 34'");
    createPlot(2, midColX, row2Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(3, midColX, row3Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(4, midColX, row4Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(5, midColX, row6Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(6, midColX, row7Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(7, midColX, row8Y, plotWidth, plotHeight, "50' × 30'");
    createPlot(8, midColX, row9Y, plotWidth, plotHeight, "50' × 30'");

    createPlot(17, leftColX, row1Y, plotWidth, plotHeight, "44'6\" × 30'");
    createPlot(16, leftColX, row2Y, plotWidth, plotHeight, "46'9\" × 30'");
    createPlot(15, leftColX, row3Y, plotWidth, plotHeight, "49'6\" × 30'");
    createPlot(14, leftColX, row4Y, plotWidth, plotHeight, "53'3\" × 30'");
    createPlot(13, leftColX, row6Y, plotWidth, plotHeight, "57' × 30'");
    createPlot(12, leftColX, row7Y, plotWidth, plotHeight, "57'6\" × 30'");
    createPlot(11, leftColX, row8Y, plotWidth, plotHeight, "57'6\" × 30'");
    createPlot(10, leftColX, row9Y, plotWidth, plotHeight, "57'6\" × 30'");
    createPlot(9, leftColX + parkWidth, row5Y, plotWidth - parkWidth, plotHeight, "57'6\" × 30'");

    const park = new fabric.Rect({
      left: leftColX,
      top: row5Y,
      width: parkWidth,
      height: plotHeight,
      fill: '#22c55e',
      stroke: '#16a34a',
      strokeWidth: 2,
      selectable: false,
    });
    const parkText = new fabric.Text('PARK', {
      left: leftColX + parkWidth / 2,
      top: row5Y + plotHeight / 2,
      fontSize: 14,
      fontWeight: 'bold',
      fill: '#ffffff',
      originX: 'center',
      originY: 'center',
      angle: 90,
      selectable: false,
    });
    canvas.add(park, parkText);

    const plot18Width = plotWidth / 2;
    const plot19Width = plotWidth / 2;
    const plot20Width = plotWidth / 2;
    const plot21Width = plotWidth / 2;

    createPlot(21, leftColX, bottomRowY, plot21Width, bottomPlotHeight, "42' × 40'");
    createPlot(20, leftColX + plot21Width, bottomRowY, plot20Width, bottomPlotHeight, "40'6\" × 40'");
    createPlot(19, leftColX + plot21Width + plot20Width, bottomRowY, plot19Width, bottomPlotHeight, "35' × 40'");
    createPlot(18, leftColX + plot21Width + plot20Width + plot19Width, bottomRowY, plot18Width, bottomPlotHeight, "40' × 40'");

    const largePlotWidth = plotWidth / 2;
    createPlot(25, leftColX, largeRowY, largePlotWidth, largeDepth, "39'4\" × 100'");
    createPlot(24, leftColX + largePlotWidth, largeRowY, largePlotWidth, largeDepth, "39'4\" × 100'");
    createPlot(23, leftColX + largePlotWidth * 2, largeRowY, largePlotWidth, largeDepth, "39'4\" × 100'");
    createPlot(22, leftColX + largePlotWidth * 3, largeRowY, largePlotWidth, largeDepth, "39'4\" × 100'");

    const nhRoad = new fabric.Rect({
      left: startX,
      top: nhRoadY,
      width: totalWidth,
      height: 35,
      fill: '#475569',
      stroke: '#334155',
      strokeWidth: 2,
      selectable: false,
    });

    const nhText = new fabric.Text('NH-4 HIGHWAY', {
      left: startX + totalWidth / 2,
      top: nhRoadY + 12,
      fontSize: 16,
      fontWeight: 'bold',
      fill: '#ffffff',
      originX: 'center',
      selectable: false,
    });

    const bangaloreText = new fabric.Text('← BANGALORE', {
      left: startX + 80,
      top: nhRoadY + 32,
      fontSize: 12,
      fill: '#fbbf24',
      selectable: false,
    });

    const tirupathiText = new fabric.Text('TIRUPATHI →', {
      left: startX + totalWidth - 130,
      top: nhRoadY + 32,
      fontSize: 12,
      fill: '#fbbf24',
      selectable: false,
    });

    canvas.add(nhRoad, nhText, bangaloreText, tirupathiText);

    const compassX = rightColX + plotWidth + 80;
    const compassY = 150;
    const compassBarWidth = 80;
    const compassBarHeight = 8;

    const northBar = new fabric.Rect({
      left: compassX - compassBarWidth / 2,
      top: compassY - compassBarHeight / 2 - 15,
      width: compassBarWidth,
      height: compassBarHeight,
      fill: '#dc2626',
      selectable: false,
    });
    const northText = new fabric.Text('N', {
      left: compassX,
      top: compassY - 40,
      fontSize: 16,
      fontWeight: 'bold',
      fill: '#dc2626',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });

    const southBar = new fabric.Rect({
      left: compassX - compassBarWidth / 2,
      top: compassY - compassBarHeight / 2 + 15,
      width: compassBarWidth,
      height: compassBarHeight,
      fill: '#dc2626',
      selectable: false,
    });
    const southText = new fabric.Text('S', {
      left: compassX,
      top: compassY + 40,
      fontSize: 16,
      fontWeight: 'bold',
      fill: '#dc2626',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });

    const eastBar = new fabric.Rect({
      left: compassX - compassBarHeight / 2 + 15,
      top: compassY - compassBarWidth / 2,
      width: compassBarHeight,
      height: compassBarWidth,
      fill: '#dc2626',
      selectable: false,
    });
    const eastText = new fabric.Text('E', {
      left: compassX + 40,
      top: compassY,
      fontSize: 16,
      fontWeight: 'bold',
      fill: '#dc2626',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });

    const westBar = new fabric.Rect({
      left: compassX - compassBarHeight / 2 - 15,
      top: compassY - compassBarWidth / 2,
      width: compassBarHeight,
      height: compassBarWidth,
      fill: '#dc2626',
      selectable: false,
    });
    const westText = new fabric.Text('W', {
      left: compassX - 40,
      top: compassY,
      fontSize: 16,
      fontWeight: 'bold',
      fill: '#dc2626',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });

    canvas.add(northBar, northText, southBar, southText, eastBar, eastText, westBar, westText);

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, []);

  const selectedPlotInfo = selectedPlot ? plotsInfo.find(p => p.id === selectedPlot) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)
        `
      }} />

      <div className="relative z-10">
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-yellow-400/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Back to Home</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Krishnammagari Developers - Plot Layout
              </h1>
              <button
                onClick={() => setShowContactModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-yellow-400/50"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-2">Click on any plot to view details</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-sm text-gray-300">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  <span className="text-sm text-gray-300">Sold</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl p-6 border border-yellow-400/20 shadow-2xl">
              <div className="overflow-auto">
                <canvas ref={canvasRef} />
              </div>
            </div>

            <div className="w-80 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur rounded-2xl p-6 border border-yellow-400/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Plot Details
              </h2>

              {selectedPlot && selectedPlotInfo ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Plot Number</p>
                    <p className="text-3xl font-bold text-yellow-400">#{selectedPlot}</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-gray-400 text-sm mb-1">Dimensions</p>
                    <p className="text-xl font-semibold text-white">
                      {selectedPlotInfo.width} × {selectedPlotInfo.depth}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <p className={`text-lg font-semibold capitalize ${
                      selectedPlotInfo.status === 'available' ? 'text-emerald-400' :
                      selectedPlotInfo.status === 'reserved' ? 'text-amber-400' :
                      'text-gray-400'
                    }`}>
                      {selectedPlotInfo.status}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-yellow-400/50"
                  >
                    Inquire About Plot #{selectedPlot}
                  </button>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-6 mx-auto w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-yellow-400 animate-bounce" />
                  </div>
                  <p className="text-gray-300 text-lg font-medium mb-2">Select a Plot</p>
                  <p className="text-gray-500 text-sm">Click on any plot in the layout to view detailed information</p>
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
