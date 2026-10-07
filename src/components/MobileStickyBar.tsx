import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';

interface MobileStickyBarProps {
  onBookClick: () => void;
}

export default function MobileStickyBar({ onBookClick }: MobileStickyBarProps) {
  const whatsAppMessage = encodeURIComponent(
    'Hello Ujiji Lodge, I would like to book a room in Sumbawanga (TSh 25,000/night).'
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${LODGE_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-semibold text-xs active:scale-[0.98] transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`${LODGE_INFO.whatsappUrl}?text=${whatsAppMessage}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-emerald-300 font-semibold text-xs active:scale-[0.98] transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Book Now Button */}
        <button
          onClick={onBookClick}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-amber-400 rounded-xl text-zinc-950 font-bold text-xs active:scale-[0.98] transition-transform cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
          <span className="truncate">Book Room</span>
        </button>
      </div>
    </div>
  );
}
