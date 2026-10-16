/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DeviceFrameWrapper } from './components/DeviceFrameWrapper';
import { TopAppBar } from './components/TopAppBar';
import { MaterialNavBar, NavTab } from './components/MaterialNavBar';
import { MaterialNavRail } from './components/MaterialNavRail';
import { DiscoverView } from './components/DiscoverView';
import { SalonCircleView } from './components/SalonCircleView';
import { ShelfView } from './components/ShelfView';
import { BagDrawer, BagItem } from './components/BagDrawer';
import { BookDetailModal } from './components/BookDetailModal';
import { ReaderModal } from './components/ReaderModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { Book, BOOKS } from './data/books';
import { Check } from 'lucide-react';

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'android' | 'web'>('web');
  const [activeTab, setActiveTab] = useState<NavTab>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals and Drawers
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readerBook, setReaderBook] = useState<Book | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);

  // Bag State
  const [bagItems, setBagItems] = useState<BagItem[]>([
    { book: BOOKS[0], quantity: 1 },
  ]);

  // Bookmarks / Shelf State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    BOOKS[0].id,
    BOOKS[2].id,
  ]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const handleAddToBag = (book: Book, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBagItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`Added "${book.title}" to your literary bag.`);
  };

  const handleUpdateQuantity = (bookId: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const handleRemoveFromBag = (bookId: string) => {
    setBagItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const handleToggleBookmark = (bookId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(bookId);
      const next = exists ? prev.filter((id) => id !== bookId) : [...prev, bookId];
      const targetBook = BOOKS.find((b) => b.id === bookId);
      if (targetBook) {
        showToast(
          exists
            ? `Removed "${targetBook.title}" from your shelf.`
            : `Saved "${targetBook.title}" to your shelf.`
        );
      }
      return next;
    });
  };

  const handleCuratorPick = () => {
    const pick = BOOKS[Math.floor(Math.random() * BOOKS.length)];
    setSelectedBook(pick);
  };

  const totalBagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);
  const bagBookIds = bagItems.map((item) => item.book.id);

  // Tab Titles
  const getTabTitle = () => {
    switch (activeTab) {
      case 'discover':
        return 'The Literary Salon';
      case 'salon':
        return 'Reading Circle';
      case 'shelf':
        return 'My Shelf';
      case 'bag':
        return 'Shopping Bag';
    }
  };

  return (
    <DeviceFrameWrapper
      deviceMode={deviceMode}
      setDeviceMode={setDeviceMode}
      onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
    >
      <div className="w-full flex-1 flex flex-col md:flex-row bg-[#fff8f6] relative min-h-full">
        {/* Navigation Rail for Tablet/Desktop (rendered in Web mode) */}
        {deviceMode === 'web' && (
          <MaterialNavRail
            activeTab={activeTab}
            onTabChange={(tab) => {
              if (tab === 'bag') {
                setIsBagOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
            bagCount={totalBagCount}
            onCuratorPick={handleCuratorPick}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopAppBar
            title={getTabTitle()}
            subtitle="Material 3"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            bagCount={totalBagCount}
            onOpenBag={() => setIsBagOpen(true)}
          />

          {/* Dynamic View rendering based on activeTab */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'discover' && (
              <DiscoverView
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSelectBook={(book) => setSelectedBook(book)}
                onAddToBag={handleAddToBag}
                onToggleBookmark={handleToggleBookmark}
                bookmarkedIds={bookmarkedIds}
                bagBookIds={bagBookIds}
                onOpenReader={(book) => setReaderBook(book)}
                onGoToSalon={() => setActiveTab('salon')}
              />
            )}

            {activeTab === 'salon' && (
              <SalonCircleView
                onSelectBook={(book) => setSelectedBook(book)}
                onOpenReader={(book) => setReaderBook(book)}
              />
            )}

            {activeTab === 'shelf' && (
              <ShelfView
                bookmarkedIds={bookmarkedIds}
                onSelectBook={(book) => setSelectedBook(book)}
                onToggleBookmark={handleToggleBookmark}
                onOpenReader={(book) => setReaderBook(book)}
                onExploreDiscover={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'bag' && (
              <div className="max-w-2xl mx-auto p-6 text-center space-y-4">
                <h2 className="font-serif text-2xl font-bold">Shopping Bag View</h2>
                <button
                  onClick={() => setIsBagOpen(true)}
                  className="px-4 py-2 bg-[#14422d] text-white text-xs font-bold rounded-[4px]"
                >
                  Open Checkout Drawer
                </button>
              </div>
            )}
          </main>

          {/* Material 3 Bottom Navigation Bar (Rendered on Android phone mode or mobile viewports) */}
          <div className={deviceMode === 'android' ? 'block' : 'block md:hidden'}>
            <MaterialNavBar
              activeTab={activeTab}
              onTabChange={(tab) => {
                if (tab === 'bag') {
                  setIsBagOpen(true);
                } else {
                  setActiveTab(tab);
                }
              }}
              bagCount={totalBagCount}
            />
          </div>
        </div>
      </div>

      {/* Floating Material Toast / SnackBar */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-[#1f1b1a] text-[#fff8f6] px-4 py-2 rounded-lg text-xs font-medium shadow-lg z-50 flex items-center gap-2 border border-[#443833] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#ff996c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Detailed Book Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToBag={handleAddToBag}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={selectedBook ? bookmarkedIds.includes(selectedBook.id) : false}
        isInBag={selectedBook ? bagBookIds.includes(selectedBook.id) : false}
        onOpenReader={(book) => {
          setSelectedBook(null);
          setReaderBook(book);
        }}
      />

      {/* Interactive Reader Sample Modal */}
      <ReaderModal
        book={readerBook}
        onClose={() => setReaderBook(null)}
        onAddToBag={handleAddToBag}
        isInBag={readerBook ? bagBookIds.includes(readerBook.id) : false}
      />

      {/* Slide-out Bag & Checkout Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={handleClearBag}
      />

      {/* Flutter Material 3 Source Code Viewer */}
      <FlutterCodeModal
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />
    </DeviceFrameWrapper>
  );
}
