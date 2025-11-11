import { Plot } from '../lib/supabase';

interface PlotItemProps {
  plot?: Plot;
  isSelected: boolean;
  onClick: (plotNumber: number) => void;
  vertical?: boolean;
}

export default function PlotItem({ plot, isSelected, onClick, vertical }: PlotItemProps) {
  if (!plot) return null;

  const getStatusColor = () => {
    switch (plot.status) {
      case 'available':
        return 'bg-emerald-500 hover:bg-emerald-600';
      case 'reserved':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'sold':
        return 'bg-slate-600 hover:bg-slate-700 cursor-not-allowed';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <button
      onClick={() => plot.status !== 'sold' && onClick(plot.plot_number)}
      disabled={plot.status === 'sold'}
      className={`
        relative border-2 border-slate-600 rounded transition-all duration-300
        ${getStatusColor()}
        ${isSelected ? 'ring-4 ring-white scale-105 shadow-xl z-10' : 'hover:scale-105'}
        ${vertical ? 'h-48' : 'h-24'}
        w-full flex flex-col items-center justify-center text-white
      `}
    >
      <div className="font-bold text-lg mb-1">
        {plot.plot_number}
      </div>
      <div className="text-xs opacity-90 text-center px-2">
        {plot.width}
      </div>
      <div className="text-xs opacity-90 text-center px-2">
        × {plot.height}
      </div>
      {isSelected && (
        <div className="absolute inset-0 border-4 border-white rounded animate-pulse pointer-events-none"></div>
      )}
    </button>
  );
}
