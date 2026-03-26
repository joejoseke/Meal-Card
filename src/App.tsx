/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  Utensils, 
  User as UserIcon, 
  LogOut, 
  ChevronRight, 
  History, 
  TrendingUp,
  MapPin,
  Wallet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Transaction, MenuItem } from './types';
import { BRANCHES, STAFF_MENU, INITIAL_POINTS } from './constants';

// Mock User Data
const MOCK_USER: User = {
  id: 'IT-JOE-01',
  name: 'Joe',
  role: 'staff',
  branch: 'Thika Road', // Default branch
  pointsBalance: 6000,
  clockedIn: false,
};

export default function App() {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'history'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [clockInStatus, setClockInStatus] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClockToggle = () => {
    setClockInStatus(!clockInStatus);
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || '',
      amount: 0,
      type: 'bonus', // Using bonus as a placeholder for system events
      description: clockInStatus ? 'Clocked Out' : 'Clocked In',
      timestamp: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handlePurchase = (item: MenuItem) => {
    if (user && user.pointsBalance >= item.points) {
      const newBalance = user.pointsBalance - item.points;
      setUser({ ...user, pointsBalance: newBalance });
      
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        amount: -item.points,
        type: item.category,
        description: `Purchased ${item.name}`,
        timestamp: new Date().toISOString(),
      };
      setTransactions([newTransaction, ...transactions]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#111] border-b border-[#222] p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#f27d26] rounded-lg flex items-center justify-center">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight">Quiver IT Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-mono uppercase">Joe</p>
            <p className="text-[10px] text-[#f27d26] font-bold">IT Dept</p>
          </div>
          <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
            <UserIcon size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-64 bg-[#111] border-r border-[#222] flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f27d26] rounded-lg flex items-center justify-center">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-lg">Quiver IT Portal</span>
        </div>

        <div className="flex-1 px-4 space-y-2 py-4">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Utensils size={20} />} 
            label="Staff Menu" 
            active={activeTab === 'menu'} 
            onClick={() => setActiveTab('menu')} 
          />
          <NavItem 
            icon={<History size={20} />} 
            label="History" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
        </div>

        <div className="p-4 border-t border-[#222]">
          <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl mb-4">
            <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center">
              <UserIcon size={20} className="text-gray-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Joe</p>
              <p className="text-[10px] text-[#f27d26] font-mono uppercase tracking-wider">IT Department</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] px-6 py-3 flex justify-between items-center z-50 backdrop-blur-lg bg-opacity-90">
        <MobileNavItem 
          icon={<LayoutDashboard size={24} />} 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <MobileNavItem 
          icon={<Utensils size={24} />} 
          active={activeTab === 'menu'} 
          onClick={() => setActiveTab('menu')} 
        />
        <MobileNavItem 
          icon={<History size={24} />} 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
        />
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto space-y-6 md:space-y-8"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">IT Dashboard: Joe</h2>
                  <p className="text-gray-500 flex items-center gap-2 mt-1 text-sm">
                    <MapPin size={14} />
                    <span>Quiver HQ - IT Department</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`flex-1 md:flex-none px-4 py-2 rounded-full flex items-center justify-center gap-2 border ${clockInStatus ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${clockInStatus ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{clockInStatus ? 'Shift Active' : 'Shift Inactive'}</span>
                  </div>
                  <button 
                    onClick={handleClockToggle}
                    className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold transition-all text-sm ${clockInStatus ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-[#f27d26] text-white hover:bg-[#e06d1d]'}`}
                  >
                    {clockInStatus ? 'Clock Out' : 'Clock In'}
                  </button>
                </div>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  label="Points Balance" 
                  value={`${user?.pointsBalance.toLocaleString()}`} 
                  subValue="KES Equivalent"
                  icon={<Wallet className="text-[#f27d26]" />}
                  accent
                />
                <StatCard 
                  label="Monthly Allowance" 
                  value="6,000" 
                  subValue="Points allocated monthly"
                  icon={<TrendingUp className="text-blue-400" />}
                />
                <StatCard 
                  label="Shift Status" 
                  value={clockInStatus ? "Active" : "Inactive"} 
                  subValue={clockInStatus ? "Started at 08:00 AM" : "Not started"}
                  icon={<Clock className="text-purple-400" />}
                />
              </div>

              {/* Quick Actions / Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Recent Activity</h3>
                    <button onClick={() => setActiveTab('history')} className="text-xs text-[#f27d26] font-bold hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {transactions.length > 0 ? (
                      transactions.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl border border-[#222]">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.amount < 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                              {tx.amount < 0 ? <Utensils size={18} /> : <TrendingUp size={18} />}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{tx.description}</p>
                              <p className="text-[10px] text-gray-500 font-mono">{new Date(tx.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                          <p className={`font-mono font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <History className="mx-auto text-gray-700 mb-2" size={32} />
                        <p className="text-gray-500 text-sm">No recent activity found.</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-6">Staff Benefits Info</h3>
                  <div className="space-y-4">
                    <BenefitItem 
                      title="Meal Allowance" 
                      desc="6,000 points per month for on-duty meals." 
                      icon={<CheckCircle2 className="text-green-500" size={18} />}
                    />
                    <BenefitItem 
                      title="Tax Implications" 
                      desc="Meal allowances are managed as non-cash internal credit." 
                      icon={<AlertCircle className="text-blue-500" size={18} />}
                    />
                    <BenefitItem 
                      title="Branch Access" 
                      desc="Points can be used across all 5 Quiver branches." 
                      icon={<MapPin className="text-purple-500" size={18} />}
                    />
                  </div>
                  <div className="mt-8 p-4 bg-[#f27d26]/5 border border-[#f27d26]/10 rounded-xl">
                    <p className="text-xs text-[#f27d26] font-medium leading-relaxed">
                      Need help? Contact HR at Thika Road flagship office or speak to your Branch Manager.
                    </p>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Staff Menu</h2>
                  <p className="text-gray-500">Spend your points on meals and drinks</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#222] px-4 py-2 rounded-xl flex items-center gap-3">
                  <Wallet size={18} className="text-[#f27d26]" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Balance</p>
                    <p className="font-bold text-[#f27d26]">{user?.pointsBalance.toLocaleString()} pts</p>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STAFF_MENU.map((item) => (
                  <div key={item.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden hover:border-[#f27d26]/50 transition-all group">
                    <div className="h-40 bg-[#1a1a1a] relative flex items-center justify-center">
                      <Utensils className="text-[#222] w-16 h-16 group-hover:scale-110 transition-transform" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-xs font-bold text-[#f27d26]">{item.points} pts</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{item.category}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-4">{item.name}</h4>
                      <button 
                        onClick={() => handlePurchase(item)}
                        disabled={!user || user.pointsBalance < item.points}
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                          user && user.pointsBalance >= item.points 
                          ? 'bg-[#f27d26] text-white hover:bg-[#e06d1d]' 
                          : 'bg-[#222] text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {user && user.pointsBalance >= item.points ? 'Order Now' : 'Insufficient Points'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <header>
                <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
                <p className="text-gray-500">Full record of your points usage and shift logs</p>
              </header>

              <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 p-4 border-b border-[#222] bg-[#1a1a1a]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Date & Time</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Description</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Type</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 text-right">Amount</span>
                </div>
                <div className="divide-y divide-[#222]">
                  {transactions.length > 0 ? (
                    transactions.map((tx) => (
                      <div key={tx.id} className="grid grid-cols-4 p-4 items-center hover:bg-[#1a1a1a] transition-colors">
                        <span className="text-xs font-mono text-gray-400">{new Date(tx.timestamp).toLocaleString()}</span>
                        <span className="text-sm font-medium">{tx.description}</span>
                        <span className="text-xs">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            tx.type === 'meal' ? 'bg-orange-500/10 text-orange-400' : 
                            tx.type === 'drink' ? 'bg-blue-500/10 text-blue-400' : 
                            'bg-gray-500/10 text-gray-400'
                          }`}>
                            {tx.type}
                          </span>
                        </span>
                        <span className={`text-sm font-mono font-bold text-right ${tx.amount < 0 ? 'text-red-400' : tx.amount > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-gray-500">No transactions recorded yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-xl transition-all ${active ? 'text-[#f27d26]' : 'text-gray-500'}`}
    >
      {icon}
    </button>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-[#f27d26] text-white shadow-lg shadow-[#f27d26]/20' : 'text-gray-500 hover:text-white hover:bg-[#1a1a1a]'}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {active && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );
}

function StatCard({ label, value, subValue, icon, accent }: { label: string, value: string, subValue: string, icon: React.ReactNode, accent?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${accent ? 'bg-[#f27d26]/5 border-[#f27d26]/20' : 'bg-[#111] border-[#222]'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h4 className={`text-3xl font-bold tracking-tight ${accent ? 'text-[#f27d26]' : 'text-white'}`}>{value}</h4>
        <p className="text-xs text-gray-500">{subValue}</p>
      </div>
    </div>
  );
}

function BenefitItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-[#222]">
      <div className="mt-1">{icon}</div>
      <div>
        <h5 className="text-sm font-bold">{title}</h5>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
