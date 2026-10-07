import { Phone, Calendar, MessageSquare, BedDouble, Wifi, Car, ShieldCheck, Banknote, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { LODGE_INFO, TRANSLATIONS, ROOMS_DATA } from '../data/lodgeData';

interface HeroProps {
  lang: 'en' | 'sw';
  onBookNow: () => void;
}

export default function Hero({ lang, onBookNow }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const whatsAppMessage = encodeURIComponent(
    `Hello Ujiji Lodge, I would like to inquire about booking a room in Sumbawanga (Kasema Street).`
  );

  const availableRoomsCount = ROOMS_DATA.filter(r => r.status === 'available').length;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800">
      {/* Background Subtle Gradient & Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Location & Trust Marker */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sumbawanga, Kasema Street · Tanzania</span>
            </div>

            {/* Main Welcome Heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase text-balance leading-tight">
                {t.welcome}
              </h1>
              <p className="text-lg sm:text-xl text-amber-200/90 font-serif italic max-w-2xl leading-relaxed">
                {t.quote}
              </p>
            </div>

            {/* Price Highlight Banner */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-white">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                  {lang === 'en' ? 'Standard Lodge Rate' : 'Bei ya Chumba'}
                </span>
                <span className="font-semibold text-amber-400 text-lg tabular-nums">
                  💰 {t.priceFrom}
                </span>
              </div>
            </div>

            {/* Key Bullet Highlights (Zero-Pill Discipline, Clean Unboxed Structure) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl">
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xl" role="img" aria-label="bed">🛏️</span>
                <div>
                  <div className="text-sm font-semibold text-white">Comfortable Rooms</div>
                  <div className="text-xs text-zinc-400">16 tidy, peaceful rooms</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xl" role="img" aria-label="wifi">📶</span>
                <div>
                  <div className="text-sm font-semibold text-white">Free Wi-Fi</div>
                  <div className="text-xs text-zinc-400">Complimentary fast access</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xl" role="img" aria-label="car">🚗</span>
                <div>
                  <div className="text-sm font-semibold text-white">Parking Available</div>
                  <div className="text-xs text-zinc-400">Gated compound security</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xl" role="img" aria-label="lock">🔐</span>
                <div>
                  <div className="text-sm font-semibold text-white">Secure & Comfortable</div>
                  <div className="text-xs text-zinc-400">24/7 peace & safety</div>
                </div>
              </div>
            </div>

            {/* Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Button 1: Book Now */}
              <button
                onClick={onBookNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4 text-zinc-950" />
                <span>{t.bookNow}</span>
              </button>

              {/* Button 2: Call 0785 863 245 */}
              <a
                href={`tel:${LODGE_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all whitespace-nowrap active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t.callNumber}</span>
              </a>

              {/* Button 3: WhatsApp Booking */}
              <a
                href={`${LODGE_INFO.whatsappUrl}?text=${whatsAppMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-all whitespace-nowrap active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t.whatsAppBooking}</span>
              </a>
            </div>

            {/* Quiet transparency guarantee */}
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Direct front-desk reservation · No booking fees · Pay easily on arrival</span>
            </div>

          </div>

          {/* Right Column: Picture-Free Architecture & Live Lodge Matrix Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase block">
                    {LODGE_INFO.location}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                    {LODGE_INFO.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-zinc-400">Lodge Capacity</div>
                  <div className="text-lg font-mono font-bold text-amber-400 tabular-nums">
                    16 Rooms
                  </div>
                </div>
              </div>

              {/* Live Room Status Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-zinc-400 font-medium">Currently Available</span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                    {availableRoomsCount} Rooms Open
                  </div>
                  <span className="text-[11px] text-zinc-400">Ready for instant check-in</span>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-zinc-400 font-medium">Standard Rate</span>
                  </div>
                  <div className="text-xl font-bold text-amber-400 font-serif tabular-nums">
                    TSh 25,000
                  </div>
                  <span className="text-[11px] text-zinc-400">Per room / per night</span>
                </div>
              </div>

              {/* In-House Hospitality Essentials Checklist */}
              <div className="space-y-2.5 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/60">
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Lodge Essentials Included
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Private En-suite Bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Free Wi-Fi Internet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Enclosed Gated Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>24/7 Security Guard</span>
                  </div>
                </div>
              </div>

              {/* Operational Times & Direct Reception Contact */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check-in {LODGE_INFO.checkInTime} · Out {LODGE_INFO.checkOutTime}</span>
                </div>
                <button
                  onClick={onBookNow}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Reserve a Room →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
