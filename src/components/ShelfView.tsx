import React from 'react';
import { Bookmark, BookOpen, Trash2, Library, Sparkles } from 'lucide-react';
import { Book, BOOKS } from '../data/books';

interface ShelfViewProps {
  bookmarkedIds: string[];
  onSelectBook: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  onOpenReader: (book: Book) => void;
  onExploreDiscover: () => void;
}

export const ShelfView: React.FC<ShelfViewProps> = ({
  bookmarkedIds,
  onSelectBook,
  onToggleBookmark,
  onOpenReader,
  onExploreDiscover,
}) => {
  const savedBooks = BOOKS.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#eae0de] pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#974722] block mb-1">
            Personal Collection
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b1a]">
            My Reading Shelf
          </h1>
        </div>
        <div className="text-right">
          <span className="font-sans text-xs text-[#717973] block">Saved Volumes</span>
          <span className="font-bold text-lg text-[#14422d] tabular-nums">
            {savedBooks.length}
          </span>
        </div>
      </div>

      {savedBooks.length === 0 ? (
        <div className="bg-[#fbf1ef] rounded-lg border border-[#eae0de] p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#f6ecea] text-[#717973] flex items-center justify-center mx-auto">
            <Bookmark className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#1f1b1a]">
            Your shelf is currently quiet
          </h2>
          <p className="text-xs text-[#717973] max-w-sm mx-auto leading-relaxed">
            As you explore our editions, tap the ribbon icon on any volume to bookmark it here for later reading or study.
          </p>
          <button
            onClick={onExploreDiscover}
            className="mt-2 py-2 px-5 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Explore Rare & First Editions
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#fbf1ef] p-4 rounded-lg border border-[#eae0de] flex gap-4 items-start"
            >
              <div
                onClick={() => onSelectBook(book)}
                className="w-20 aspect-[1/1.5] rounded-[3px] overflow-hidden bg-[#eae0de] shrink-0 book-cover-shadow book-spine-effect cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[9px] font-bold text-[#974722] uppercase tracking-wider block">
                    {book.format}
                  </span>
                  <h3
                    onClick={() => onSelectBook(book)}
                    className="font-serif text-sm font-bold text-[#1f1b1a] truncate hover:text-[#14422d] transition-colors cursor-pointer"
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#717973] truncate">
                    {book.author}
                  </p>
                  <p className="text-[11px] text-[#14422d] font-bold mt-1 tabular-nums">
                    ${book.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#eae0de]">
                  <button
                    onClick={() => onOpenReader(book)}
                    className="flex-1 py-1.5 px-2 bg-[#fff8f6] hover:bg-[#f6ecea] border border-[#c0c9c1] text-[11px] font-semibold text-[#1f1b1a] rounded-[3px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3 text-[#974722]" />
                    <span>Read Excerpt</span>
                  </button>
                  <button
                    onClick={() => onToggleBookmark(book.id)}
                    className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-[3px] transition-colors cursor-pointer"
                    title="Remove from shelf"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
