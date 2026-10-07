import { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe, User as UserIcon, LogOut } from 'lucide-react';
import { LODGE_INFO, TRANSLATIONS } from '../data/lodgeData';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  lang: 'en' | 'sw';
  setLang: (lang: 'en' | 'sw') => void;
  onBookClick: () => void;
}

export default function Navbar({ lang, setLang, onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              UJIJI LODGE
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#rooms" className="hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Rooms & Rates' : 'Vyumba & Bei'}
            </a>
            <a href="#amenities" className="hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Amenities' : 'Huduma'}
            </a>
            <a href="#location" className="hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Location' : 'Mahali Tulipo'}
            </a>
            <a href="#booking" className="hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Booking' : 'Kuhifadhi Chumba'}
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Contact' : 'Wasiliana Nasi'}
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'SW' : 'EN'}</span>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${LODGE_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg hover:border-amber-500/50 hover:text-amber-300 transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>0785 863 245</span>
            </a>

            {/* Google Authentication */}
            {user ? (
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5">
                <span className="text-xs text-zinc-300 font-medium max-w-[100px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={logout}
                  className="text-zinc-400 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Sign In' : 'Ingia'}</span>
              </button>
            )}

            {/* Book Now Button */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-zinc-950" />
              <span>{t.bookNow}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
              className="px-2.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md"
            >
              {lang === 'en' ? 'SW' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-200">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {lang === 'en' ? 'Rooms & Rates (TSh 25,000)' : 'Vyumba & Bei (TSh 25,000)'}
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {lang === 'en' ? 'Lodge Amenities' : 'Huduma za Lodge'}
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {lang === 'en' ? 'Location (Kasema Street)' : 'Mahali (Mtaa wa Kasema)'}
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {lang === 'en' ? 'Book a Room' : 'Weka Chumba'}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {lang === 'en' ? 'Contact Front Desk' : 'Mawasiliano ya Mapokezi'}
            </a>
          </nav>

          {/* User Sign In on Mobile */}
          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span>{user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="text-rose-400 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg"
              >
                <UserIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Sign In with Google' : 'Ingia kwa Google'}</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2">
            <a
              href={`tel:${LODGE_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-zinc-900 border border-zinc-800 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>0785 863 245</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg"
            >
              <Calendar className="w-3.5 h-3.5 text-zinc-950" />
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
