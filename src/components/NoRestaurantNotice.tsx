import { Info, Coffee, UtensilsCrossed } from 'lucide-react';
import { TRANSLATIONS } from '../data/lodgeData';

interface NoRestaurantNoticeProps {
  lang: 'en' | 'sw';
}

export default function NoRestaurantNotice({ lang }: NoRestaurantNoticeProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="bg-zinc-900/60 border-y border-zinc-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/90 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-zinc-100">
                {t.noRestaurantNotice}
              </span>
              <span className="text-[11px] font-medium text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                {lang === 'en' ? 'Pure Accommodation' : 'Malazi Pekee'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {t.noRestaurantDetail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
