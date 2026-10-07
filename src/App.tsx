import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NoRestaurantNotice from './components/NoRestaurantNotice';
import RoomsSection from './components/RoomsSection';
import AmenitiesSection from './components/AmenitiesSection';
import LocationSection from './components/LocationSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import LegalModal from './components/LegalModal';
import { Room } from './data/lodgeData';

export default function App() {
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [preSelectedRoom, setPreSelectedRoom] = useState<Room | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToBooking = () => {
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRoomForBooking = (room: Room) => {
    setPreSelectedRoom(room);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans pb-16 sm:pb-0">
      {/* 3-Zone Clean Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onBookClick={scrollToBooking}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onBookNow={scrollToBooking}
        />

        {/* Honest Hospitality & Peaceful Lodging Notice (Transparent, No Restaurant) */}
        <NoRestaurantNotice lang={lang} />

        {/* 16 Rooms Section with Live Statuses */}
        <RoomsSection
          lang={lang}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* Verified Amenities Section */}
        <AmenitiesSection lang={lang} />

        {/* Location & Directions Section */}
        <LocationSection lang={lang} />

        {/* Interactive Booking Section with Multi-Channel Dispatch */}
        <BookingSection
          lang={lang}
          preSelectedRoom={preSelectedRoom}
        />

        {/* Contact Section */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Floating Action Bar for Mobile (<15% viewport height) */}
      <MobileStickyBar onBookClick={scrollToBooking} />

      {/* Legal & Policy Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
