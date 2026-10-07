import { BedDouble, Wifi, Car, ShieldCheck, Clock, Droplets, CheckCircle } from 'lucide-react';
import { TRANSLATIONS } from '../data/lodgeData';

interface AmenitiesSectionProps {
  lang: 'en' | 'sw';
}

export default function AmenitiesSection({ lang }: AmenitiesSectionProps) {
  const t = TRANSLATIONS[lang];

  const amenities = [
    {
      icon: <BedDouble className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Comfortable Rooms' : 'Vyumba Vyenye Starehe',
      description:
        lang === 'en'
          ? '16 thoughtfully arranged guest rooms with comfortable mattresses, fresh clean linens, private en-suite bathrooms, and quiet relaxation.'
          : 'Vyumba 16 safi na nadhifu vyenye vitanda vizuri, mashuka masafi, bafu binafsi na mazingira tulivu kwa ajili ya mapumziko mema.',
      badge: lang === 'en' ? '16 Total Rooms' : 'Vyumba 16 Jumla',
    },
    {
      icon: <Wifi className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Free High-Speed Wi-Fi' : 'Wi-Fi ya Bure',
      description:
        lang === 'en'
          ? 'Reliable wireless internet access throughout all guest rooms and compound areas, perfect for business or keeping in touch.'
          : 'Mtandao wa intaneti wa kasi na bure kwa wageni wote chumbani na eneo lote la lodge.',
      badge: lang === 'en' ? 'Complimentary' : 'Bure Kabisa',
    },
    {
      icon: <Car className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Parking Available' : 'Maegesho Salama',
      description:
        lang === 'en'
          ? 'Spacious, secure, and paved compound parking for cars, safari vehicles, and motorcycles, monitored 24/7 inside gated premises.'
          : 'Maegesho mapana na salama ndani ya uzio kwa magari na pikipiki, yanayolindwa saa 24 na mlinzi.',
      badge: lang === 'en' ? 'Gated & Guarded' : 'Ndani ya Uzio',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Secure & Comfortable Stay' : 'Ulinzi na Usalama Saa 24',
      description:
        lang === 'en'
          ? 'Gated perimeter fence, night-time security watchman, solid room locks, and peaceful neighborhood setting on Kasema Street.'
          : 'Ulinzi thabiti wa uzio, mlinzi wa zamu, milango imara na eneo lenye utulivu mkubwa kwenye Mtaa wa Kasema.',
      badge: lang === 'en' ? '24/7 Security' : 'Ulinzi wa Uhakika',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? '24-Hour Front Desk' : 'Mapokezi Saa 24',
      description:
        lang === 'en'
          ? 'Welcoming reception staff on duty day and night to assist with seamless check-ins, early departures, and travel guidance.'
          : 'Wahudumu wa mapokezi wapo muda wote mchana na usiku kukupokea, kukuhudumia na kukupa maelekezo ya mji.',
      badge: lang === 'en' ? 'Day & Night' : 'Muda Wote',
    },
    {
      icon: <Droplets className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Reliable Water & Power' : 'Maji Safi na Umeme wa Uhakika',
      description:
        lang === 'en'
          ? 'Clean water supply and backup lighting power systems so your stay in Sumbawanga is seamless and comfortable.'
          : 'Maji safi ya uhakika na mifumo ya umeme wa dharura kuhakikisha unalala kwa amani bila usumbufu.',
      badge: lang === 'en' ? 'Essential Comfort' : 'Huduma Muhimu',
    },
  ];

  return (
    <section id="amenities" className="py-16 sm:py-24 bg-zinc-900/40 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
            {lang === 'en' ? 'Genuine Lodge Amenities' : 'Huduma Zetu Rasmi'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {lang === 'en' ? 'Everything You Need for a Restful Stay' : 'Kila Kitu Unachohitaji kwa Mapumziko Mazuri'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            {lang === 'en'
              ? 'Honest, reliable hospitality in Sumbawanga. Pristine cleanliness, peaceful nights, and guaranteed security.'
              : 'Ukarimu wa kweli na wa kuaminika mjini Sumbawanga. Usafi wa hali ya juu, utulivu wa usiku, na ulinzi madhubuti.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800/90 rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-amber-400/90 bg-amber-950/30 px-2.5 py-1 rounded-md border border-amber-900/30">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Included with every room booking</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
