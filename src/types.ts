export type Branch = 'Thika Road' | 'Kilimani' | 'Kitengela' | 'Kenol' | 'Eastlands';

export interface User {
  id: string;
  name: string;
  role: 'staff' | 'manager' | 'admin';
  branch: Branch;
  pointsBalance: number;
  clockedIn: boolean;
  clockInTime?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'meal' | 'drink' | 'bonus' | 'tip';
  description: string;
  timestamp: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'meal' | 'drink';
  points: number;
  image?: string;
}
