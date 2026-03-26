import { MenuItem, Branch } from './types';

export const BRANCHES: Branch[] = [
  'Thika Road',
  'Kilimani',
  'Kitengela',
  'Kenol',
  'Eastlands'
];

export const STAFF_MENU: MenuItem[] = [
  { id: 'm1', name: 'Grilled Chicken & Chips', category: 'meal', points: 450 },
  { id: 'm2', name: 'Beef Burger', category: 'meal', points: 500 },
  { id: 'm3', name: 'Ugali & Nyama Choma', category: 'meal', points: 600 },
  { id: 'm4', name: 'Vegetable Stir Fry', category: 'meal', points: 350 },
  { id: 'd1', name: 'Fresh Juice', category: 'drink', points: 150 },
  { id: 'd2', name: 'Soda (300ml)', category: 'drink', points: 100 },
  { id: 'd3', name: 'Coffee/Tea', category: 'drink', points: 120 },
  { id: 'd4', name: 'Mineral Water', category: 'drink', points: 80 },
];

export const INITIAL_POINTS = 6000;
