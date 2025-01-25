export interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  password: string;
  gender: 'male' | 'female';
}

export interface TimeSlot {
  id: number;
  start: string;
  end: string;
  capacity: number;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
  description: string;
  images: string[];
  features: string[];
  rules: string[];
}

export interface Branches {
  pool: Branch[];
  gym: Branch[];
  salon: Branch[];
}

export interface Reservation {
  id: number;
  userId: number;
  facilityType: 'pool' | 'gym' | 'salon';
  branchId: number;
  date: string;
  timeSlotId: number;
}

export interface Facility {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (userData: Omit<User, 'id' | 'balance'>) => void;
  logout: () => void;
  updateUser: (data: { email?: string; password?: string }) => void;
}

export interface DataContextType {
  branches: Branches;
  timeSlots: TimeSlot[];
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  getAvailableCapacity: (facilityType: string, branchId: number, date: string, timeSlotId: number) => number;
  hasConflictingReservation: (userId: number, date: string, timeSlotId: number) => boolean;
  getUserReservations: (userId: number) => Reservation[];
  getFacilities: () => Facility[];
}