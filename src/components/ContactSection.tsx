import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Mail, HelpCircle } from 'lucide-react';
import { LODGE_INFO, TRANSLATIONS } from '../data/lodgeData';

interface ContactSectionProps {
  lang: 'en' | 'sw';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
            {lang === 'en' ? 'Direct Communication' : 'Mawasiliano ya Moja kwa Moja'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {t.contactHeading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            {t.contactSub}
          </p>
        </div>

        {/* Prominent Contact Showcase Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-6 relative z-10">
            
            {/* Lodge Title */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                Hospitality in Sumbawanga
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {LODGE_INFO.name}
              </h3>
            </div>

            {/* Core Prominent Details required by prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-6 border-y border-zinc-800">
              
              {/* Phone Display */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">Direct Hotline</div>
                  <a
                    href={`tel:${LODGE_INFO.phoneRaw}`}
                    className="font-serif text-2xl sm:text-3xl font-bold text-white hover:text-amber-400 transition-colors tabular-nums"
                  >
                    📞 0785 863 245
                  </a>
                </div>
              </div>

              {/* Location Display */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">Physical Address</div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                    📍 Sumbawanga, Kasema Street
                  </div>
                </div>
              </div>

            </div>

            {/* Prominent Clickable Action Buttons for Mobile and Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
              <a
                href={`tel:${LODGE_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-zinc-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/10 transition-all active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 text-zinc-950" />
                <span>Call 0785 863 245</span>
              </a>

              <a
                href={`${LODGE_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ujiji Lodge, I am contacting you regarding a room reservation on Kasema Street.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Additional Practical Info Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Front Desk Open 24/7</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Gated Security Watchman</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-1.5">
                <span>Kiswahili & English Spoken</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
