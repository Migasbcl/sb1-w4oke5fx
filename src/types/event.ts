export interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  organizerId: string;
  capacity: number;
  guestCount: number;
  status: 'draft' | 'published' | 'completed';
  createdAt: Date;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  promoterId: string;
  status: 'pending' | 'confirmed' | 'checked-in';
  createdAt: Date;
}