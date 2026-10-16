import React from 'react';
import { BookOpen, Coffee, Bookmark, ShoppingBag } from 'lucide-react';

export type NavTab = 'discover' | 'salon' | 'shelf' | 'bag';

interface MaterialNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bagCount: number;
}

export const MaterialNavBar: React.FC<MaterialNavBarProps> = ({
  activeTab,
  onTabChange,
  bagCount,
}) => {
  const tabs = [
    { id: 'discover' as NavTab, label: 'Discover', icon: BookOpen },
    { id: 'salon' as NavTab, label: 'Salon', icon: Coffee },
    { id: 'shelf' as NavTab, label: 'My Shelf', icon: Bookmark },
    { id: 'bag' as NavTab, label: 'Bag', icon: ShoppingBag, badge: bagCount },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="w-full bg-[#fbf1ef] border-t border-[#eae0de] px-3 pt-2 pb-1.5 flex items-center justify-around shrink-0 z-30 select-none"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none flex-1 py-1"
          >
            {/* M3 Active Indicator Pill */}
            <div
              className={`relative px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? 'bg-[#2d5a43] text-white shadow-xs'
                  : 'text-[#414943] hover:bg-[#f0e6e4]/60'
              }`}
            >
              <IconComponent className="w-5 h-5 stroke-[1.8]" />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#974722] text-[#ffffff] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {tab.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#14422d] font-semibold' : 'text-[#414943]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
