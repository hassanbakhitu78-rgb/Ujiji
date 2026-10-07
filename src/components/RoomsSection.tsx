import { useState } from 'react';
import { Bed, CheckCircle2, AlertCircle, Clock, Wrench, Sparkles, Eye, CalendarCheck, Shield, DoorClosed, Layers } from 'lucide-react';
import { Room, ROOMS_DATA, LODGE_INFO, TRANSLATIONS } from '../data/lodgeData';

interface RoomsSectionProps {
  lang: 'en' | 'sw';
  onSelectRoomForBooking: (room: Room) => void;
}

export default function RoomsSection({ lang, onSelectRoomForBooking }: RoomsSectionProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved' | 'occupied' | 'maintenance'>('all');
  const [floorFilter, setFloorFilter] = useState<'all' | 'Ground Floor' | 'Upper Floor'>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);

  const t = TRANSLATIONS[lang];

  const filteredRooms = ROOMS_DATA.filter((room) => {
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesFloor = floorFilter === 'all' || room.floor === floorFilter;
    return matchesStatus && matchesFloor;
  });

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 {lang === 'en' ? 'Available' : 'Kipo Wazi'}</span>
          </span>
        );
      case 'occupied':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>🔴 {lang === 'en' ? 'Occupied' : 'Kimejaa'}</span>
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>🟡 {lang === 'en' ? 'Reserved' : 'Kimehifadhiwa'}</span>
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span>⚪ {lang === 'en' ? 'Maintenance' : 'Matengenezo'}</span>
          </span>
        );
    }
  };

  const countByStatus = {
    all: ROOMS_DATA.length,
    available: ROOMS_DATA.filter((r) => r.status === 'available').length,
    reserved: ROOMS_DATA.filter((r) => r.status === 'reserved').length,
    occupied: ROOMS_DATA.filter((r) => r.status === 'occupied').length,
    maintenance: ROOMS_DATA.filter((r) => r.status === 'maintenance').length,
  };

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
              <Bed className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Accommodation' : 'Malazi'} · 16 Rooms</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              {t.roomsHeading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
              {t.roomsSub}
            </p>
          </div>

          {/* Prominent Price Banner */}
          <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-4 shrink-0 shadow-lg">
            <div className="text-xs text-zinc-400 font-medium">Standard Room Rate</div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 tabular-nums">
              TSh 25,000 <span className="text-sm font-sans font-normal text-zinc-400">/ Night</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Fixed rate · No hidden surcharges
            </div>
          </div>
        </div>

        {/* Filter Controls (Interactive Segmented Bar) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-zinc-900/70 border border-zinc-800 rounded-xl mb-8">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-amber-400 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {t.allRooms} ({countByStatus.all})
            </button>

            <button
              onClick={() => setStatusFilter('available')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === 'available'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>🟢 {t.available}</span>
              <span className="tabular-nums font-mono text-[11px]">({countByStatus.available})</span>
            </button>

            <button
              onClick={() => setStatusFilter('reserved')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === 'reserved'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>🟡 {t.reserved}</span>
              <span className="tabular-nums font-mono text-[11px]">({countByStatus.reserved})</span>
            </button>

            <button
              onClick={() => setStatusFilter('occupied')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === 'occupied'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>🔴 {t.occupied}</span>
              <span className="tabular-nums font-mono text-[11px]">({countByStatus.occupied})</span>
            </button>

            <button
              onClick={() => setStatusFilter('maintenance')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === 'maintenance'
                  ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>⚪ {t.maintenance}</span>
              <span className="tabular-nums font-mono text-[11px]">({countByStatus.maintenance})</span>
            </button>
          </div>

          {/* Floor Sub-Filter */}
          <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
            <span className="text-xs text-zinc-400 mr-1 hidden sm:inline">Floor:</span>
            <button
              onClick={() => setFloorFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${floorFilter === 'all' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFloorFilter('Ground Floor')}
              className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${floorFilter === 'Ground Floor' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Ground (1-8)
            </button>
            <button
              onClick={() => setFloorFilter('Upper Floor')}
              className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${floorFilter === 'Upper Floor' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Upper (9-16)
            </button>
          </div>
        </div>

        {/* 16 Rooms Grid (Picture-Free, Pure Architectural Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRooms.map((room) => {
            const isAvailable = room.status === 'available';
            const isReserved = room.status === 'reserved';

            return (
              <div
                key={room.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all p-5 flex flex-col justify-between group space-y-4"
              >
                {/* Room Header Strip */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                        <DoorClosed className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {room.name}
                        </span>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          {room.floor}
                        </div>
                      </div>
                    </div>

                    <div>
                      {getStatusBadge(room.status)}
                    </div>
                  </div>

                  {/* Room Details & Specs */}
                  <div className="pt-3 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-zinc-300">
                        {room.bedType}
                      </span>
                      <div className="text-amber-400 font-bold tabular-nums text-sm">
                        TSh 25,000 <span className="text-[10px] text-zinc-500 font-normal">/ night</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Unboxed key amenities */}
                    <div className="text-[11px] text-zinc-400 flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 border-t border-zinc-800/50">
                      <span>Private Bath</span>
                      <span aria-hidden="true">·</span>
                      <span>Free Wi-Fi</span>
                      <span aria-hidden="true">·</span>
                      <span>Fan & Desk</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRoomModal(room)}
                    className="flex-1 py-2 px-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    {lang === 'en' ? 'Details' : 'Maelezo'}
                  </button>

                  <button
                    onClick={() => onSelectRoomForBooking(room)}
                    disabled={room.status === 'occupied' || room.status === 'maintenance'}
                    className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                      isAvailable
                        ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-sm'
                        : isReserved
                        ? 'bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {isAvailable
                      ? lang === 'en' ? 'Book Room' : 'Weka Chumba'
                      : isReserved
                      ? lang === 'en' ? 'Inquire' : 'Ulizia'
                      : lang === 'en' ? 'Unavailable' : 'Haipatikani'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice underneath */}
        <div className="mt-8 text-center text-xs text-zinc-400">
          Need multiple rooms or assistance choosing? Call front desk directly at{' '}
          <a href={`tel:${LODGE_INFO.phoneRaw}`} className="text-amber-400 font-semibold underline underline-offset-4">
            0785 863 245
          </a>
        </div>
      </div>

      {/* Room Details Modal (Picture-Free) */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="bg-zinc-950 p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <DoorClosed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{selectedRoomModal.floor}</span>
                  <h3 className="font-serif text-2xl font-bold text-white">{selectedRoomModal.name}</h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedRoomModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-xs text-zinc-400">Current Status:</span>
                  <div className="mt-0.5">{getStatusBadge(selectedRoomModal.status)}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400">Room Rate:</span>
                  <div className="text-xl font-bold text-amber-400 tabular-nums">TSh 25,000 <span className="text-xs text-zinc-400 font-normal">/ night</span></div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedRoomModal.description}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                  {lang === 'en' ? 'Included In-Room Amenities' : 'Vitu Vilivyopo Chumbani'}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-200">
                  {selectedRoomModal.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <div>• Check-in time: <strong>{LODGE_INFO.checkInTime}</strong> · Check-out time: <strong>{LODGE_INFO.checkOutTime}</strong></div>
                <div>• Pure quiet accommodation · No restaurant or bar on premises</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedRoomModal(null)}
                  className="flex-1 py-3 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const room = selectedRoomModal;
                    setSelectedRoomModal(null);
                    onSelectRoomForBooking(room);
                  }}
                  disabled={selectedRoomModal.status === 'occupied' || selectedRoomModal.status === 'maintenance'}
                  className="flex-1 py-3 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl cursor-pointer"
                >
                  {selectedRoomModal.status === 'available' ? 'Select & Book' : 'Inquire Availability'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
