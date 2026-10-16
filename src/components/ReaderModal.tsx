import React, { useState } from 'react';
import { X, BookOpen, Volume2, Type, Bookmark, ArrowRight, ArrowLeft } from 'lucide-react';
import { Book } from '../data/books';

interface ReaderModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToBag: (book: Book) => void;
  isInBag: boolean;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  book,
  onClose,
  onAddToBag,
  isInBag,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [paperTheme, setPaperTheme] = useState<'vellum' | 'parchment' | 'night'>('vellum');
  const [page, setPage] = useState(1);

  if (!book) return null;

  const themes = {
    vellum: 'bg-[#fff8f6] text-[#1f1b1a]',
    parchment: 'bg-[#f6ecea] text-[#2d2523]',
    night: 'bg-[#1f1b1a] text-[#fbf1ef]',
  };

  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base sm:text-lg leading-loose',
    lg: 'text-lg sm:text-xl leading-loose',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#1f1b1a]/70 backdrop-blur-xs overflow-hidden animate-in fade-in duration-200"
    >
      <div className={`w-full h-full sm:max-w-2xl sm:h-[88vh] sm:rounded-lg border border-[#eae0de] shadow-2xl flex flex-col overflow-hidden ${themes[paperTheme]}`}>
        {/* Top Reading Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#eae0de]/40 shrink-0">
          <div>
            <h2 className="font-serif text-sm font-bold truncate max-w-[200px] sm:max-w-xs">
              {book.title}
            </h2>
            <p className="text-[11px] opacity-70">
              Sample Chapter: {book.tableOfContents[0]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 border border-current/20 rounded-md px-1.5 py-0.5 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1 rounded cursor-pointer ${fontSize === 'sm' ? 'font-bold underline' : 'opacity-60'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1 rounded cursor-pointer ${fontSize === 'base' ? 'font-bold underline' : 'opacity-60'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1 rounded cursor-pointer ${fontSize === 'lg' ? 'font-bold underline' : 'opacity-60'}`}
              >
                A+
              </button>
            </div>

            {/* Paper Theme */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPaperTheme('vellum')}
                className={`w-5 h-5 rounded-full bg-[#fff8f6] border border-[#c0c9c1] cursor-pointer ${paperTheme === 'vellum' ? 'ring-2 ring-[#14422d]' : ''}`}
                title="Vellum Paper"
              />
              <button
                onClick={() => setPaperTheme('parchment')}
                className={`w-5 h-5 rounded-full bg-[#f6ecea] border border-[#c0c9c1] cursor-pointer ${paperTheme === 'parchment' ? 'ring-2 ring-[#14422d]' : ''}`}
                title="Soft Parchment"
              />
              <button
                onClick={() => setPaperTheme('night')}
                className={`w-5 h-5 rounded-full bg-[#1f1b1a] border border-[#717973] cursor-pointer ${paperTheme === 'night' ? 'ring-2 ring-[#ff996c]' : ''}`}
                title="Night Ink"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 max-w-xl mx-auto w-full">
          <div className="text-center mb-8 pb-4 border-b border-current/15">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#974722] block mb-1">
              Chapter I
            </span>
            <h1 className="font-serif text-2xl font-bold">
              {book.tableOfContents[0]}
            </h1>
          </div>

          {/* First letter drop cap effect */}
          <div className={`font-serif ${fontSizes[fontSize]} tracking-wide text-justify`}>
            <p className="mb-6 first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:font-bold first-letter:text-[#14422d]">
              {book.sampleExcerpt}
            </p>
            <p className="mb-6">
              When the afternoon shadows lengthen along the cedar floorboards, a quiet rhythm settles into the room. We notice the grain of the paper under thumb, the weight of the book spine resting against palm. There is an irreplaceable dignity in tangible words, arranged with care and held in quiet hands.
            </p>
            <p className="mb-6">
              "The craft of reading," as {book.author} notes in this edition, "is not the rapid ingestion of facts, but an unhurried pilgrimage of sensibility. We read to dwell in another perspective, to give shelter to contemplative thoughts."
            </p>
          </div>
        </div>

        {/* Bottom Navigation & Purchase Bar */}
        <div className="px-6 py-3 border-t border-current/15 flex items-center justify-between shrink-0 bg-black/5">
          <div className="flex items-center gap-3 text-xs opacity-75">
            <span>Sample Page {page} of 3</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Reading Time: ~3 min</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onAddToBag(book);
              }}
              className="px-3.5 py-1.5 rounded-[4px] text-xs font-bold bg-[#14422d] text-white hover:bg-[#2d5a43] transition-colors cursor-pointer"
            >
              {isInBag ? 'In Bag ($' + book.price.toFixed(2) + ')' : 'Acquire Book ($' + book.price.toFixed(2) + ')'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
