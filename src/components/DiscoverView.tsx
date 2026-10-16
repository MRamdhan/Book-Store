import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Star, Filter } from 'lucide-react';
import { Book, BOOKS, GENRES } from '../data/books';
import { BookCard } from './BookCard';

interface DiscoverViewProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSelectBook: (book: Book) => void;
  onAddToBag: (book: Book, e?: React.MouseEvent) => void;
  onToggleBookmark: (bookId: string, e?: React.MouseEvent) => void;
  bookmarkedIds: string[];
  bagBookIds: string[];
  onOpenReader: (book: Book) => void;
  onGoToSalon: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSelectBook,
  onAddToBag,
  onToggleBookmark,
  bookmarkedIds,
  bagBookIds,
  onOpenReader,
  onGoToSalon,
}) => {
  // Filter by category and search
  const filteredBooks = BOOKS.filter((book) => {
    const matchesCategory =
      selectedCategory === 'All Collections' || book.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const heroBook = BOOKS[0]; // The Art of Stillness

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Campaign Hero (when not actively searching) */}
      {!searchQuery && selectedCategory === 'All Collections' && (
        <section className="bg-[#fbf1ef] border-b border-[#eae0de] px-4 sm:px-8 py-8 sm:py-10 transition-all">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Left Hero Book Presentation */}
            <div
              onClick={() => onSelectBook(heroBook)}
              className="w-48 sm:w-56 shrink-0 aspect-[1/1.5] rounded-[4px] overflow-hidden bg-[#eae0de] book-cover-shadow book-spine-effect cursor-pointer group"
            >
              <img
                src={heroBook.coverImage}
                alt={heroBook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Right Hero Editorial Copy */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#ff996c]/20 px-3 py-1 rounded-full text-[11px] font-bold text-[#974722] tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autumn Curator’s Highlight · Clothbound</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f1b1a] tracking-tight leading-tight">
                {heroBook.title}
              </h1>

              <p className="font-serif italic text-sm text-[#443833]">
                By {heroBook.author} · Kinsfolk & Press
              </p>

              <p className="font-sans text-xs sm:text-sm text-[#414943] leading-relaxed max-w-xl">
                {heroBook.synopsis}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => onAddToBag(heroBook)}
                  className="py-2.5 px-5 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  Acquire Clothbound Edition · ${heroBook.price.toFixed(2)}
                </button>
                <button
                  onClick={() => onOpenReader(heroBook)}
                  className="py-2.5 px-4 rounded-[4px] bg-[#fff8f6] hover:bg-[#f6ecea] text-[#1f1b1a] border border-[#c0c9c1] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#974722]" />
                  <span>Read Chapter Sample</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Browse Collection Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eae0de] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1f1b1a]">
              The Rare & Fine Press Collection
            </h2>
            <p className="text-xs text-[#717973] mt-0.5">
              Hand-bound hardcovers, deckled edges, and numbered first printings
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#414943]">
            <span className="tabular-nums font-semibold text-[#14422d]">
              {filteredBooks.length}
            </span>
            <span>volumes available</span>
          </div>
        </div>

        {/* Interactive Material 3 Filter Chips (Filter Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GENRES.map((genre) => {
            const isSelected = selectedCategory === genre;
            return (
              <button
                key={genre}
                onClick={() => onSelectCategory(genre)}
                className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#14422d] text-white border-[#14422d] shadow-xs'
                    : 'bg-[#fbf1ef] hover:bg-[#f6ecea] text-[#414943] border-[#eae0de]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center bg-[#fbf1ef] rounded-lg border border-[#eae0de] space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#1f1b1a]">
              No volumes found
            </h3>
            <p className="text-xs text-[#717973] max-w-sm mx-auto">
              We couldn't find any editions matching "{searchQuery}". Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => onSelectCategory('All Collections')}
              className="mt-3 py-1.5 px-4 rounded-[4px] bg-[#14422d] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onAddToBag={onAddToBag}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={bookmarkedIds.includes(book.id)}
                isInBag={bagBookIds.includes(book.id)}
              />
            ))}
          </div>
        )}

        {/* Salon Invitation Callout Strip */}
        <div className="bg-[#f6ecea] rounded-lg border border-[#eae0de] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#974722]">
              Literary Gathering
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1f1b1a]">
              Join the October Reading Salon Circle
            </h3>
            <p className="text-xs text-[#414943]">
              Discuss essays, philosophy, and botanical observations with fellow bibliophiles.
            </p>
          </div>
          <button
            onClick={onGoToSalon}
            className="whitespace-nowrap px-4 py-2 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Enter Reading Salon</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
