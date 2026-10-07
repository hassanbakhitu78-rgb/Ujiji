import { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Copy, Check, Phone, Car, Bus } from 'lucide-react';
import { LODGE_INFO, TRANSLATIONS } from '../data/lodgeData';

interface LocationSectionProps {
  lang: 'en' | 'sw';
}

export default function LocationSection({ lang }: LocationSectionProps) {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Ujiji Lodge, Kasema Street, Sumbawanga, Tanzania');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.locationHeading}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {lang === 'en' ? 'Finding Ujiji Lodge in Sumbawanga' : 'Kufika Ujiji Lodge Mjini Sumbawanga'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            {t.locationSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address Card & Visitor Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Address Box */}
            <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                    Official Location
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Ujiji Lodge
                  </h3>
                  <p className="text-base font-medium text-zinc-200">
                    Sumbawanga, Kasema Street, Tanzania
                  </p>
                  <p className="text-xs text-zinc-400">
                    Rukwa Region · East Africa
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap gap-2.5">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
                </button>

                <a
                  href={LODGE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Clear Directions Guide for Visitors */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Visitor Arrival Guide' : 'Mwongozo wa Kufika kwa Wageni'}</span>
              </h4>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400 font-bold">
                    <Bus className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">
                      {lang === 'en' ? 'From Sumbawanga Central Bus Terminal (Mkoani Stand):' : 'Kutoka Kituo Kikuu cha Mabasi (Stand ya Mkoani):'}
                    </strong>
                    <p className="text-zinc-400 leading-relaxed">
                      {lang === 'en'
                        ? 'Take a 5 to 8-minute bajaji (rickshaw) or taxi ride directly to Kasema Street. Tell the driver "Ujiji Lodge, Kasema Street" — it is a well-known, quiet accommodation spot.'
                        : 'Panda bajaji au teksi kwa safari ya dakika 5 hadi 8 kuelekea Mtaa wa Kasema. Mwambie dereva "Ujiji Lodge, Mtaa wa Kasema" — inafahamika vyema.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400 font-bold">
                    <Car className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">
                      {lang === 'en' ? 'Driving by Personal or Commercial Vehicle:' : 'Kwa Gari Binafsi au la Safari:'}
                    </strong>
                    <p className="text-zinc-400 leading-relaxed">
                      {lang === 'en'
                        ? 'Kasema Street provides wide, accessible road connection suitable for saloon cars, SUVs, and safari 4WDs. Drive directly through the secure front gate into our private enclosed parking lot.'
                        : 'Mtaa wa Kasema una barabara nzuri na pana inayopitika kwa gari lolote, ikiwemo magari ya safari. Unaingia moja kwa moja ndani ya geti kwenye maegesho yetu salama.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400 font-bold">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">
                      {lang === 'en' ? 'Lost on the way? Call us:' : 'Umepotea njia? Tupigie:'}
                    </strong>
                    <p className="text-zinc-400 leading-relaxed">
                      Call our 24/7 reception desk at{' '}
                      <a href={`tel:${LODGE_INFO.phoneRaw}`} className="text-amber-400 font-semibold underline underline-offset-2">
                        0785 863 245
                      </a>{' '}
                      and our staff will give your driver immediate turn-by-turn guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Stylized Interactive Map Canvas & Landmark Navigator */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Map Canvas Header */}
              <div className="p-4 bg-zinc-950/90 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-zinc-200">
                    Sumbawanga Town Map · Kasema Street
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  GPS: -7.9667° S, 31.6167° E
                </span>
              </div>

              {/* Visual Map Representation */}
              <div className="relative aspect-[16/10] bg-[#161a22] overflow-hidden p-6 flex flex-col justify-between select-none">
                
                {/* SVG Road Network & Landmarks Schematic */}
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Main Road Line */}
                  <line x1="0" y1="70%" x2="100%" y2="25%" stroke="#384353" strokeWidth="14" strokeLinecap="round" />
                  <line x1="0" y1="70%" x2="100%" y2="25%" stroke="#eab308" strokeWidth="2" strokeDasharray="8 6" />

                  {/* Kasema Street Branch */}
                  <path d="M 42% 52% Q 55% 48% 68% 42% T 88% 30%" fill="none" stroke="#2a3340" strokeWidth="12" />
                  <path d="M 42% 52% L 46% 85%" fill="none" stroke="#384353" strokeWidth="10" />

                  {/* Secondary Streets */}
                  <line x1="20%" y1="10%" x2="25%" y2="90%" stroke="#232a35" strokeWidth="6" />
                  <line x1="75%" y1="10%" x2="78%" y2="90%" stroke="#232a35" strokeWidth="6" />
                </svg>

                {/* Simulated Map Markers & Labels */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-2.5 backdrop-blur-sm text-[11px] text-zinc-300 shadow-md">
                    <span className="text-zinc-500 block text-[10px]">Reference</span>
                    <strong>Sumbawanga Central Stand</strong>
                    <span className="block text-zinc-400">~6 mins away</span>
                  </div>

                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-2.5 backdrop-blur-sm text-[11px] text-zinc-300 shadow-md">
                    <span className="text-zinc-500 block text-[10px]">Corridor</span>
                    <strong>Kasema Street Road</strong>
                    <span className="block text-amber-400">Quiet residential lodge zone</span>
                  </div>
                </div>

                {/* Center Lodge Pin Marker */}
                <div className="relative z-10 self-center my-auto flex flex-col items-center animate-bounce">
                  <div className="bg-amber-400 text-zinc-950 px-3.5 py-1.5 rounded-full font-serif font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 ring-4 ring-amber-400/20">
                    <MapPin className="w-4 h-4 fill-zinc-950" />
                    <span>UJIJI LODGE</span>
                  </div>
                  <div className="w-2 h-2 bg-amber-400 rotate-45 -mt-1 shadow-md" />
                  <div className="w-8 h-2 bg-black/40 rounded-full blur-xs mt-1" />
                </div>

                {/* Map Bottom Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-zinc-950/90 border border-zinc-800 rounded-xl p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">Kasema Street, Sumbawanga</span>
                    <span className="text-[11px] text-zinc-400 hidden sm:inline">· Free Secure Parking on Premise</span>
                  </div>
                  <a
                    href={LODGE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View Live Map</span>
                    <ExternalLink className="w-3 h-3 text-zinc-950" />
                  </a>
                </div>

              </div>

              {/* Map Footer Information */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800/80 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓ Easy Access:</span>
                  <span>Accessible all weather by standard car, bajaji, and buses.</span>
                </div>
                <div>
                  <a
                    href={`tel:${LODGE_INFO.phoneRaw}`}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Call 0785 863 245 for live directions
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
