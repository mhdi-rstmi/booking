import React, { createContext, useContext, useState } from 'react';
import { Branches, TimeSlot, Reservation, DataContextType } from '../types';
import data from '../data/data.json';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branches] = useState<Branches>(data.branches);
  const [timeSlots] = useState<TimeSlot[]>(data.timeSlots);
  const [reservations, setReservations] = useState<Reservation[]>(data.reservations);

  const addReservation = (reservation: Omit<Reservation, 'id'>) => {
    const newReservation = {
      ...reservation,
      id: Math.max(0, ...reservations.map(r => r.id)) + 1
    };
    setReservations([...reservations, newReservation]);
  };

  const getAvailableCapacity = (facilityType: string, branchId: number, date: string, timeSlotId: number) => {
    const timeSlot = timeSlots.find(ts => ts.id === timeSlotId);
    if (!timeSlot) return 0;

    const existingReservations = reservations.filter(
      r => r.facilityType === facilityType && r.branchId === branchId && r.date === date && r.timeSlotId === timeSlotId
    );

    return timeSlot.capacity - existingReservations.length;
  };

  const hasConflictingReservation = (userId: number, date: string, timeSlotId: number) => {
    return reservations.some(
      r => r.userId === userId && r.date === date && r.timeSlotId === timeSlotId
    );
  };

  const getUserReservations = (userId: number) => {
    return reservations.filter(r => r.userId === userId);
  };

  const getFacilities = () => {
    return [
      {
        id: 1,
        type: 'pool',
        name: 'استخر',
        description: 'استخر مجهز با امکانات کامل',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200',
        price: 150000
      },
      {
        id: 2,
        type: 'gym',
        name: 'باشگاه بدنسازی',
        description: 'باشگاه با تجهیزات مدرن',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
        price: 100000
      },
      {
        id: 3,
        type: 'salon',
        name: 'سالن ورزشی',
        description: 'سالن چند منظوره برای ورزش‌های گروهی',
        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=1200',
        price: 180000
      }
    ];
  };

  return (
    <DataContext.Provider value={{
      branches,
      timeSlots,
      reservations,
      addReservation,
      getAvailableCapacity,
      hasConflictingReservation,
      getUserReservations,
      getFacilities
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};