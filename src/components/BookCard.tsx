import React from 'react';
import { Star, Plus, Bookmark, BookOpen, Check } from 'lucide-react';
import { Book } from '../data/books';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToBag: (book: Book, e: React.MouseEvent) => void;
  onToggleBookmark: (bookId: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  isInBag: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  onAddToBag,
  onToggleBookmark,
  isBookmarked,
  isInBag,
}) => {
  return (
    <article
      onClick={() => onSelect(book)}
      className="group flex flex-col bg-[#fbf1ef] rounded-md p-3 border border-[#eae0de] hover:border-[#c0c9c1] transition-all duration-200 cursor-pointer text-left relative"
    >
      {/* Cover Image Container (1:1.5 Aspect Ratio) */}
      <div className="relative aspect-[1/1.5] w-full rounded-[4px] overflow-hidden bg-[#eae0de] mb-3 book-cover-shadow book-spine-effect">
        <img
          src={book.coverImage}
          alt={`Book cover of ${book.title} by ${book.author}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Format Badge (Uppercase Metadata) */}
        <div className="absolute top-2 left-2 z-20">
          <span className="bg-[#1f1b1a]/85 backdrop-blur-xs text-[#fff8f6] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[2px] shadow-xs">
            {book.format}
          </span>
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => onToggleBookmark(book.id, e)}
          className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer ${
            isBookmarked
              ? 'bg-[#974722] text-white shadow-sm'
              : 'bg-[#fff8f6]/80 text-[#1f1b1a] hover:bg-white'
          }`}
          aria-label={isBookmarked ? 'Remove from shelf' : 'Save to shelf'}
          title={isBookmarked ? 'In your shelf' : 'Save to shelf'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Read Sample Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-[#1f1b1a]/80 via-[#1f1b1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
          <span className="text-[11px] text-[#fff8f6] font-medium flex items-center gap-1.5 bg-[#14422d]/90 px-2.5 py-1 rounded-sm shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Read Excerpt
          </span>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow: Genre & Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-[#974722] font-semibold uppercase tracking-wider text-[10px]">
              {book.category}
            </span>
            <div className="flex items-center gap-1 bg-[#ff996c]/15 px-1.5 py-0.5 rounded-full text-[#974722] font-semibold text-[10px]">
              <Star className="w-3 h-3 fill-[#974722] stroke-none" />
              <span>{book.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title in Playfair Display */}
          <h2 className="font-serif text-base font-bold text-[#1f1b1a] leading-snug line-clamp-2 group-hover:text-[#14422d] transition-colors">
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-xs text-[#414943] font-normal mt-0.5 line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Pricing & Add to Bag CTA */}
        <div className="mt-3 pt-2.5 border-t border-[#eae0de] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-sm text-[#14422d] tabular-nums">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice && (
              <span className="text-[11px] text-[#717973] line-through tabular-nums">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => onAddToBag(book, e)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
              isInBag
                ? 'bg-[#f0e6e4] text-[#14422d] border border-[#c0c9c1]'
                : 'bg-[#14422d] hover:bg-[#2d5a43] text-[#fff8f6] shadow-xs active:scale-95'
            }`}
            title="Add to Bag"
          >
            {isInBag ? (
              <>
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span className="text-[11px]">In Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span className="text-[11px]">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
