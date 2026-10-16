import React from 'react';
import { BookOpen, Coffee, Bookmark, ShoppingBag, Sparkles, Library } from 'lucide-react';
import { NavTab } from './MaterialNavBar';

interface MaterialNavRailProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bagCount: number;
  onCuratorPick: () => void;
}

export const MaterialNavRail: React.FC<MaterialNavRailProps> = ({
  activeTab,
  onTabChange,
  bagCount,
  onCuratorPick,
}) => {
  const destinations = [
    { id: 'discover' as NavTab, label: 'Discover', icon: BookOpen },
    { id: 'salon' as NavTab, label: 'Salon', icon: Coffee },
    { id: 'shelf' as NavTab, label: 'My Shelf', icon: Bookmark },
    { id: 'bag' as NavTab, label: 'Shopping Bag', icon: ShoppingBag, badge: bagCount },
  ];

  return (
    <aside
      aria-label="Navigation Rail"
      className="hidden md:flex flex-col items-center w-20 lg:w-60 bg-[#fbf1ef] border-r border-[#eae0de] py-6 shrink-0 z-20 select-none justify-between h-full"
    >
      <div className="w-full flex flex-col items-center lg:items-start lg:px-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-md bg-[#14422d] text-[#fff8f6] flex items-center justify-center shadow-xs">
            <Library className="w-5 h-5 text-[#ff996c]" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-serif text-lg font-bold text-[#1f1b1a] tracking-tight leading-none">
              The Salon
            </h1>
            <p className="text-[11px] font-sans text-[#717973] uppercase tracking-wider mt-1">
              Fine Press & Rare
            </p>
          </div>
        </div>

        {/* Curator Quick Pick Extended FAB (Material 3) */}
        <button
          onClick={onCuratorPick}
          className="w-10 h-10 lg:w-full lg:h-auto lg:py-2.5 lg:px-4 rounded-xl bg-[#2d5a43] hover:bg-[#14422d] text-white flex items-center justify-center lg:justify-start gap-2.5 mb-8 shadow-sm transition-colors cursor-pointer"
          title="Curator's Autumn Pick"
        >
          <Sparkles className="w-4 h-4 text-[#ff996c] shrink-0" />
          <span className="hidden lg:inline text-xs font-semibold tracking-wide">
            Curator's Pick
          </span>
        </button>

        {/* Navigation Rail Destinations */}
        <nav className="w-full space-y-1">
          {destinations.map((dest) => {
            const isActive = activeTab === dest.id;
            const Icon = dest.icon;

            return (
              <button
                key={dest.id}
                onClick={() => onTabChange(dest.id)}
                className={`w-full flex items-center justify-center lg:justify-start gap-3.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#f0e6e4] text-[#14422d] font-semibold'
                    : 'text-[#414943] hover:bg-[#f6ecea]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-full transition-colors relative ${
                    isActive ? 'bg-[#2d5a43] text-white' : 'text-[#414943]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {dest.badge !== undefined && dest.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#974722] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {dest.badge}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline">{dest.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Salon Reading Membership info */}
      <div className="w-full px-4 hidden lg:block">
        <div className="p-3 bg-[#f6ecea] rounded-lg border border-[#eae0de]">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#14422d] mb-1">
            <span>Autumn Salon</span>
            <span className="text-[#974722]">Member #418</span>
          </div>
          <p className="text-[11px] text-[#414943] leading-relaxed">
            Exclusive access to first print run bindings and private author salons.
          </p>
        </div>
      </div>
    </aside>
  );
};
