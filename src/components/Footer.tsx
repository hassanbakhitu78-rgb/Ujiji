import { Phone, MapPin, Heart } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Details */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              {LODGE_INFO.name}
            </h3>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              {LODGE_INFO.tagline}
            </p>
            <div className="space-y-2 text-zinc-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{LODGE_INFO.location}, Tanzania</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${LODGE_INFO.phoneRaw}`}
                  className="hover:text-amber-400 transition-colors tabular-nums font-medium"
                >
                  {LODGE_INFO.phone}
                </a>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 pt-2">
              Rate: <span className="text-amber-400 font-semibold">TSh 25,000 / Night</span> · 16 Comfortable Rooms · Free Wi-Fi · Parking
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#rooms" className="hover:text-amber-400 transition-colors">
                  Rooms
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-400 transition-colors">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-400 transition-colors">
                  Booking
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Lodge Guidelines */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Policies & Information
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-2 text-[11px] text-zinc-500 leading-normal">
                Notice: Pure accommodation lodge in Sumbawanga. No restaurant or bar services provided on premises.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {LODGE_INFO.name}. All rights reserved. Sumbawanga, Kasema Street, Tanzania.
          </div>
          <div className="flex items-center gap-1">
            <span>Warm Tanzanian Hospitality · Rukwa Region</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
