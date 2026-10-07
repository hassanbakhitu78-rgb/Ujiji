import { X, ShieldCheck, FileText } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Stay'}
              </h3>
              <p className="text-xs text-zinc-400">{LODGE_INFO.name} · Kasema Street, Sumbawanga</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-sm text-zinc-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div>
                <h4 className="font-semibold text-white mb-1">1. Information Collection</h4>
                <p className="text-xs text-zinc-400">
                  When booking a room at Ujiji Lodge, we collect necessary guest information including your full name, phone number, check-in and check-out dates, and number of guests. Under Tanzanian hospitality regulations, a valid national identification (NIDA, Passport, or Voter's Card) will be verified at physical check-in.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">2. Use of Information</h4>
                <p className="text-xs text-zinc-400">
                  Your information is used solely to facilitate your room reservation, communicate directions, prepare your room, and contact you in case of forgotten personal belongings. We do not sell, rent, or share guest information with any third-party marketing companies.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">3. Direct Booking Communications</h4>
                <p className="text-xs text-zinc-400">
                  Reservations dispatched via WhatsApp, SMS, or phone calls go directly to our lodge management at 0785 863 245. We safeguard all phone numbers and reservation logs.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">4. Questions & Inquiries</h4>
                <p className="text-xs text-zinc-400">
                  For privacy queries, you can reach out directly to the lodge manager at Kasema Street, Sumbawanga, Tanzania or call 0785 863 245.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-white mb-1">1. Check-In & Check-Out Times</h4>
                <p className="text-xs text-zinc-400">
                  Check-in begins at <strong>11:00 AM</strong>. Check-out is by <strong>10:00 AM</strong> on the day of departure to allow our housekeeping team to sanitize rooms for incoming guests. Early check-in or late checkout is subject to room availability upon request.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">2. Room Rates & Payment</h4>
                <p className="text-xs text-zinc-400">
                  Standard room rate is <strong>TSh 25,000 per night</strong> for all 16 rooms. Payment is accepted in Tanzanian Shillings via Cash or verified Mobile Money (M-Pesa, Airtel Money, Tigo Pesa) upon arrival at reception.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">3. Quiet Atmosphere & Important Notice</h4>
                <p className="text-xs text-zinc-400">
                  Ujiji Lodge is strictly an accommodation lodge dedicated to quiet, peaceful sleep. <strong>We do not operate a restaurant, bar, or noisy entertainment venue.</strong> Guests are requested to respect quiet hours between 10:00 PM and 6:00 AM.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">4. Parking & Compound Security</h4>
                <p className="text-xs text-zinc-400">
                  Complimentary parking is provided inside the gated compound with 24/7 watchman monitoring. Guests are advised to keep valuables in their locked rooms or carry them with them.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">5. Cancellation Policy</h4>
                <p className="text-xs text-zinc-400">
                  If your travel plans change, please notify reception at least 12 hours before expected arrival via WhatsApp or phone call to 0785 863 245 so the room can be released for other travelers.
                </p>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
