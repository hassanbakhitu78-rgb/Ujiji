import { useState, useEffect } from 'react';
import { Calendar, User, Phone, Users, Home, FileText, CheckCircle2, MessageSquare, Smartphone, PhoneCall, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Room, ROOMS_DATA, LODGE_INFO, TRANSLATIONS } from '../data/lodgeData';
import { useAuth } from '../context/AuthContext';

interface BookingSectionProps {
  lang: 'en' | 'sw';
  preSelectedRoom?: Room | null;
}

export default function BookingSection({ lang, preSelectedRoom }: BookingSectionProps) {
  const t = TRANSLATIONS[lang];
  const { user } = useAuth();

  // Default dates: today and tomorrow
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState(getTodayString());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowString());
  const [guestCount, setGuestCount] = useState('1');
  const [preferredRoom, setPreferredRoom] = useState(preSelectedRoom ? preSelectedRoom.name : 'Any Available Room');
  const [specialRequest, setSpecialRequest] = useState('');

  const [submittedData, setSubmittedData] = useState<{
    guestName: string;
    phoneNumber: string;
    checkInDate: string;
    checkOutDate: string;
    guestCount: string;
    preferredRoom: string;
    specialRequest: string;
    nights: number;
    totalAmount: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Sync if preSelectedRoom changes
  useEffect(() => {
    if (preSelectedRoom) {
      setPreferredRoom(preSelectedRoom.name);
    }
  }, [preSelectedRoom]);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const totalAmount = nights * LODGE_INFO.pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert(lang === 'en' ? 'Please enter your name.' : 'Tafadhali weka jina lako.');
      return;
    }
    if (!phoneNumber.trim()) {
      alert(lang === 'en' ? 'Please enter your phone number.' : 'Tafadhali weka namba yako ya simu.');
      return;
    }

    const bookingPayload = {
      guestName: guestName.trim(),
      phoneNumber: phoneNumber.trim(),
      checkInDate,
      checkOutDate,
      guestCount,
      preferredRoom,
      specialRequest: specialRequest.trim(),
      nights,
      totalAmount,
    };

    setSubmittedData(bookingPayload);

    // Persist booking to Cloud SQL backend
    try {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingPayload,
          roomNumber: preferredRoom,
          userUid: user?.uid,
        }),
      }).catch((err) => {
        console.error('Non-critical: background booking sync to database failed:', err);
      });
    } catch (e) {
      // Ignored for frontend flow
    }
  };

  // Build formatted text message for WhatsApp and SMS
  const formatBookingSummary = (data: typeof submittedData) => {
    if (!data) return '';
    return [
      `🏨 *BOOKING REQUEST - UJIJI LODGE*`,
      `📍 Location: Sumbawanga, Kasema Street`,
      `---------------------------------`,
      `👤 Guest Name: ${data.guestName}`,
      `📞 Phone: ${data.phoneNumber}`,
      `📅 Check-in: ${data.checkInDate}`,
      `📅 Check-out: ${data.checkOutDate}`,
      `🌙 Duration: ${data.nights} Night(s)`,
      `👥 Guests: ${data.guestCount}`,
      `🛏️ Preferred Room: ${data.preferredRoom}`,
      `💰 Rate: TSh 25,000 / Night`,
      `💵 Estimated Total: TSh ${data.totalAmount.toLocaleString()}`,
      data.specialRequest ? `📝 Special Request: ${data.specialRequest}` : null,
      `---------------------------------`,
      `Please confirm availability. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(formatBookingSummary(submittedData));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-zinc-900/50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.bookingHeading}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {lang === 'en' ? 'Reserve Your Room in Sumbawanga' : 'Weka Nafasi ya Chumba Chako'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            {t.bookingSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Guest Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Guest Full Name *' : 'Jina Kamili la Mgeni *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. Hassan Bakari' : 'mf. Hassan Bakari'}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Phone Number *' : 'Namba ya Simu *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="07XX XXX XXX / +255..."
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Check-in & Check-out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Check-in Date *' : 'Tarehe ya Kuingia *'}
                  </label>
                  <input
                    type="date"
                    required
                    min={getTodayString()}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Check-out Date *' : 'Tarehe ya Kuondoka *'}
                  </label>
                  <input
                    type="date"
                    required
                    min={checkInDate || getTodayString()}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Row 3: Number of Guests & Preferred Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Number of Guests' : 'Idadi ya Wageni'}
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="1">1 {lang === 'en' ? 'Guest' : 'Mgeni'}</option>
                      <option value="2">2 {lang === 'en' ? 'Guests' : 'Wageni'}</option>
                      <option value="3+">3+ {lang === 'en' ? 'Guests (Multiple rooms requested)' : 'Wageni (Vyumba zaidi)'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    {lang === 'en' ? 'Preferred Room' : 'Chumba Unachopendelea'}
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <select
                      value={preferredRoom}
                      onChange={(e) => setPreferredRoom(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="Any Available Room">
                        ✨ {lang === 'en' ? 'Any Available Room (TSh 25,000)' : 'Chumba Chochote Kilicho Wazi'}
                      </option>
                      {ROOMS_DATA.map((room) => (
                        <option key={room.id} value={room.name}>
                          {room.name} — {room.floor} ({room.status === 'available' ? '🟢 Available' : room.status === 'reserved' ? '🟡 Reserved' : '🔴 Occupied'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 4: Special Request */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  {lang === 'en' ? 'Special Request (Optional)' : 'Maombi Maalumu (Hiari)'}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'e.g. Ground floor preference, quiet corner, estimated arrival at 7:00 PM...'
                        : 'mf. Napendelea chumba cha chini, ninafika saa 1:00 usiku...'
                    }
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Price Calculation Summary Strip */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-zinc-300 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Rate: TSh 25,000 / Night</span>
                    <span className="text-zinc-500">·</span>
                    <span className="tabular-nums font-mono text-amber-400 font-bold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    Pay cash or mobile money (M-Pesa / Airtel Money / Tigo Pesa) upon check-in.
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Estimated Total</div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400 tabular-nums">
                    TSh {totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>{lang === 'en' ? 'Submit & Choose Dispatch Method' : 'Kamilisha & Chagua Njia ya Kutuma'}</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

            </form>
          </div>

          {/* Right Column: Information & Direct Dispatch Assistance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                Instant Reservation
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Prefer to book immediately?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                You do not have to wait. You can call or WhatsApp our reception in Sumbawanga right now to lock in your room at the TSh 25,000 rate.
              </p>

              <div className="pt-2 space-y-3">
                <a
                  href={`tel:${LODGE_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 0785 863 245</span>
                </a>

                <a
                  href={`${LODGE_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ujiji Lodge, I would like to book a room for tonight/upcoming dates.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/80 rounded-xl transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lodge Policy Reminder */}
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-3 text-xs text-zinc-400">
              <h4 className="font-semibold text-zinc-200 text-sm">Key Booking Information</h4>
              <ul className="space-y-2 list-disc list-inside text-zinc-400">
                <li>Check-in: From <strong>11:00 AM</strong> onwards</li>
                <li>Check-out: By <strong>10:00 AM</strong></li>
                <li>Valid government ID required at registration</li>
                <li>Free Wi-Fi and secure on-premise parking included</li>
                <li><strong>No restaurant / bar:</strong> Quiet accommodation only</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Booking Submission Confirmation & Dispatch Modal */}
      {submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 p-6 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Booking Details Ready!</h3>
                    <p className="text-xs text-zinc-400">Choose how to send your booking to Ujiji Lodge</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmittedData(null)}
                  className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body: Reservation Summary */}
            <div className="p-6 space-y-5">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-400">Guest Name:</span>
                  <span className="font-semibold text-white">{submittedData.guestName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-400">Phone:</span>
                  <span className="font-semibold text-white">{submittedData.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-400">Dates:</span>
                  <span className="font-semibold text-white">{submittedData.checkInDate} → {submittedData.checkOutDate} ({submittedData.nights} night{submittedData.nights > 1 ? 's' : ''})</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-400">Room & Guests:</span>
                  <span className="font-semibold text-white">{submittedData.preferredRoom} · {submittedData.guestCount} guest(s)</span>
                </div>
                {submittedData.specialRequest && (
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-400">Request:</span>
                    <span className="text-zinc-300 italic">{submittedData.specialRequest}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 text-sm">
                  <span className="font-semibold text-amber-400">Estimated Total:</span>
                  <span className="font-bold text-amber-400 tabular-nums">TSh {submittedData.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Three Dispatch Options Required by Prompt */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Select Dispatch Method to Complete Booking:
                </span>

                {/* Option 1: WhatsApp */}
                <a
                  href={`${LODGE_INFO.whatsappUrl}?text=${encodeURIComponent(formatBookingSummary(submittedData))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-600/50 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-emerald-100 group-hover:text-white">
                        Send via WhatsApp
                      </div>
                      <div className="text-[11px] text-emerald-300/80">
                        Fastest confirmation with front desk
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Option 2: Normal SMS */}
                <a
                  href={`sms:${LODGE_INFO.phoneRaw}?body=${encodeURIComponent(formatBookingSummary(submittedData))}`}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-zinc-100">
                        Send via Normal SMS
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Sends direct text message to 0785 863 245
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Option 3: Phone Call */}
                <a
                  href={`tel:${LODGE_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-zinc-100">
                        Call Directly: 0785 863 245
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Speak with reception now to confirm
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Copy summary button */}
              <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Summary to Clipboard'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmittedData(null)}
                  className="hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
