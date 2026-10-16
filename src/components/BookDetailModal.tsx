import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Bookmark,
  BookOpen,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { Book } from '../data/books';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToBag: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  isBookmarked: boolean;
  isInBag: boolean;
  onOpenReader: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToBag,
  onToggleBookmark,
  isBookmarked,
  isInBag,
  onOpenReader,
}) => {
  const [copiedQuote, setCopiedQuote] = useState(false);

  if (!book) return null;

  const handleShareQuote = () => {
    navigator.clipboard.writeText(`"${book.quote}" — ${book.author}, ${book.title}`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1f1b1a]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-lg border border-[#eae0de] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        {/* Sticky Top Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#eae0de] bg-[#fbf1ef]/90 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#974722] bg-[#ff996c]/20 px-2 py-0.5 rounded-full">
              {book.category}
            </span>
            <span className="text-xs text-[#717973]">·</span>
            <span className="text-xs text-[#414943] font-medium">{book.format}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleBookmark(book.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#974722] text-white'
                  : 'hover:bg-[#f6ecea] text-[#414943]'
              }`}
              title={isBookmarked ? 'Saved in My Shelf' : 'Save to My Shelf'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShareQuote}
              className="p-1.5 rounded-full hover:bg-[#f6ecea] text-[#414943] transition-colors cursor-pointer"
              title="Copy quote excerpt"
            >
              {copiedQuote ? <Check className="w-4 h-4 text-[#14422d]" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f6ecea] text-[#414943] transition-colors cursor-pointer ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto px-5 py-6 space-y-6 flex-1">
          {/* Main Book Presentation: Cover + Summary */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Book Cover with Spine & Shadow */}
            <div className="w-40 sm:w-48 mx-auto sm:mx-0 shrink-0 aspect-[1/1.5] rounded-[4px] overflow-hidden bg-[#eae0de] book-cover-shadow book-spine-effect border border-[#eae0de]">
              <img
                src={book.coverImage}
                alt={book.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title, Author, Price, Rating */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-[#ff996c]/20 px-2 py-0.5 rounded-full text-[#974722] text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#974722] stroke-none" />
                    <span>{book.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-[#717973]">
                    ({book.reviewsCount} salon reviews)
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b1a] leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm font-medium text-[#443833] mt-1">
                  By {book.author}
                </p>
                <p className="text-xs text-[#717973] mt-0.5">
                  Published by {book.publisher} ({book.year})
                </p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-sans font-bold text-2xl text-[#14422d] tabular-nums">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-sm text-[#717973] line-through tabular-nums">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-[#2d5a43] font-medium ml-2 bg-[#bceecf]/40 px-2 py-0.5 rounded-xs">
                    In Stock · Ships with archival sleeve
                  </span>
                </div>
              </div>

              {/* Action buttons inside presentation */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button
                  onClick={() => onAddToBag(book)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] text-xs font-bold transition-all cursor-pointer ${
                    isInBag
                      ? 'bg-[#2d5a43] text-white hover:bg-[#14422d]'
                      : 'bg-[#14422d] hover:bg-[#2d5a43] text-[#fff8f6] shadow-sm'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isInBag ? 'Added to Bag (Add Another)' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => onOpenReader(book)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] text-xs font-semibold bg-[#fbf1ef] hover:bg-[#f6ecea] text-[#1f1b1a] border border-[#c0c9c1] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#974722]" />
                  <span>Read Sample Chapter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Literary Quote Callout */}
          <div className="bg-[#f6ecea] p-4 rounded-md border border-[#eae0de] relative">
            <span className="text-3xl text-[#974722] font-serif absolute top-1 left-3 select-none opacity-40">
              “
            </span>
            <p className="font-serif italic text-sm text-[#1f1b1a] pl-5 leading-relaxed">
              {book.quote}
            </p>
            <p className="text-[11px] text-[#717973] text-right mt-1 font-sans">
              — Excerpt from {book.title}
            </p>
          </div>

          {/* Editorial Synopsis */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1f1b1a] mb-2">
              Curator’s Overview
            </h2>
            <p className="font-sans text-sm text-[#414943] leading-relaxed">
              {book.synopsis}
            </p>
          </div>

          {/* Edition Specifications Grid */}
          <div className="bg-[#fbf1ef] rounded-md border border-[#eae0de] p-4">
            <h3 className="font-serif text-sm font-bold text-[#1f1b1a] mb-3">
              Edition & Binding Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#717973] uppercase tracking-wider block">Format</span>
                <span className="font-semibold text-[#1f1b1a]">{book.format}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#717973] uppercase tracking-wider block">Pages</span>
                <span className="font-semibold text-[#1f1b1a] tabular-nums">{book.pages} pages</span>
              </div>
              <div>
                <span className="text-[10px] text-[#717973] uppercase tracking-wider block">ISBN</span>
                <span className="font-mono text-[11px] text-[#1f1b1a]">{book.isbn}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#717973] uppercase tracking-wider block">Provenance</span>
                <span className="font-semibold text-[#1f1b1a]">{book.year} Press</span>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-lg font-bold text-[#1f1b1a]">
                Table of Contents
              </h2>
              <span className="text-[11px] text-[#717973]">
                {book.tableOfContents.length} Chapters
              </span>
            </div>
            <div className="divide-y divide-[#eae0de] border-t border-b border-[#eae0de]">
              {book.tableOfContents.map((chapter, index) => (
                <div
                  key={index}
                  className="py-2.5 flex items-center justify-between text-xs hover:bg-[#fbf1ef] px-2 rounded-xs transition-colors"
                >
                  <span className="font-sans font-medium text-[#1f1b1a]">
                    {chapter}
                  </span>
                  <span className="text-[#717973] tabular-nums text-[11px]">
                    p. {(index + 1) * 38}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Bar */}
        <div className="px-5 py-3 bg-[#fbf1ef] border-t border-[#eae0de] flex items-center justify-between shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#717973]">Total:</span>
            <span className="font-bold text-base text-[#14422d] tabular-nums">
              ${book.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenReader(book)}
              className="px-3 py-1.5 rounded-[4px] text-xs font-semibold text-[#14422d] hover:bg-[#f0e6e4] transition-colors cursor-pointer"
            >
              Preview
            </button>
            <button
              onClick={() => {
                onAddToBag(book);
                onClose();
              }}
              className="px-4 py-1.5 rounded-[4px] text-xs font-bold bg-[#14422d] hover:bg-[#2d5a43] text-white shadow-xs transition-colors cursor-pointer"
            >
              Add to Bag & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
