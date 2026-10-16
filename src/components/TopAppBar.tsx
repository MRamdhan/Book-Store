import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowLeft, X, BookOpenCheck } from 'lucide-react';

interface TopAppBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  bagCount: number;
  onOpenBag: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  searchQuery,
  onSearchChange,
  bagCount,
  onOpenBag,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#eae0de] px-4 py-3 z-30 transition-all">
      {isSearchOpen ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 text-[#717973] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, author, or philosophy..."
              autoFocus
              className="w-full bg-[#f6ecea] text-[#1f1b1a] text-xs font-sans pl-9 pr-8 py-2 rounded-lg border border-[#c0c9c1] focus:border-[#14422d] focus:outline-none placeholder-[#717973]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-[#717973] hover:text-[#1f1b1a] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              onSearchChange('');
            }}
            className="text-xs font-medium text-[#14422d] hover:underline px-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {showBack && (
              <button
                onClick={onBack}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-[#f6ecea] text-[#1f1b1a] cursor-pointer transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-[#1f1b1a] tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#974722] bg-[#ff996c]/15 px-2 py-0.5 rounded-full hidden sm:inline-block">
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-[#f6ecea] text-[#414943] transition-colors cursor-pointer"
              aria-label="Search bookstore"
              title="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              onClick={onOpenBag}
              className="p-2 rounded-full hover:bg-[#f6ecea] text-[#14422d] relative transition-colors cursor-pointer"
              aria-label="View shopping bag"
              title="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {bagCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#974722] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
