import React, { useState } from 'react';
import { Coffee, MessageSquare, Sparkles, BookOpen, Send, CheckCircle2, Bookmark } from 'lucide-react';
import { Book, BOOKS } from '../data/books';

interface SalonCircleViewProps {
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
}

export const SalonCircleView: React.FC<SalonCircleViewProps> = ({
  onSelectBook,
  onOpenReader,
}) => {
  const featuredBook = BOOKS[0]; // The Art of Stillness
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      author: 'Margot Laurent',
      role: 'Salon Curator, Lyon',
      time: '2 hours ago',
      text: 'The physical weight of Reed’s clothbound edition anchors the text. The chapter on voluntary slowness changed my morning routine entirely.',
    },
    {
      author: 'Julian Vance',
      role: 'Architectural Historian',
      time: 'Yesterday',
      text: 'Page 142 on spatial contemplation reminded me of traditional tea house alcoves. In an age of rapid consumption, deliberate physical print is sanctuary.',
    },
    {
      author: 'Sora Tanaka',
      role: 'Kyoto Resident Reader',
      time: '3 days ago',
      text: 'Comparing this with Eliza Finch’s work creates an incredible dialogue between European interiority and Eastern nature philosophy.',
    },
  ]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      {
        author: 'You (Salon Member)',
        role: 'Verified Reader',
        time: 'Just now',
        text: commentInput.trim(),
      },
      ...comments,
    ]);
    setCommentInput('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Salon Banner */}
      <section className="bg-[#f6ecea] border-b border-[#eae0de] px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#ff996c]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#974722]">
            <Coffee className="w-3.5 h-3.5" />
            <span>October Literary Salon Gathering</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1f1b1a]">
            The Art of Attentive Reading
          </h1>

          <p className="font-sans text-sm text-[#414943] max-w-xl mx-auto leading-relaxed">
            Every fortnight, our private literary circle convenes to discuss exceptional bindings, philosophy of craft, and transformative literature.
          </p>

          {/* Reading Progress Tracker */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="flex justify-between text-xs mb-1.5 font-medium text-[#1f1b1a]">
              <span>Autumn Reading Goal</span>
              <span className="font-bold text-[#14422d] tabular-nums">18 / 24 Volumes</span>
            </div>
            <div className="w-full h-2 bg-[#eae0de] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#14422d] rounded-full transition-all duration-500"
                style={{ width: '75%' }}
              />
            </div>
            <p className="text-[11px] text-[#717973] mt-1 text-center">
              You are 75% towards achieving the Master Bibliophile Laurel.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Book Discussion Hub */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-[#fbf1ef] rounded-lg border border-[#eae0de] p-5 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
          {/* Cover */}
          <div
            onClick={() => onSelectBook(featuredBook)}
            className="w-36 sm:w-44 shrink-0 aspect-[1/1.5] rounded-[4px] overflow-hidden book-cover-shadow book-spine-effect cursor-pointer"
          >
            <img
              src={featuredBook.coverImage}
              alt={featuredBook.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Discussion Info */}
          <div className="flex-1 space-y-3 text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#974722] bg-[#ff996c]/20 px-2 py-0.5 rounded-full">
              Current Salon Selection
            </span>

            <h2
              onClick={() => onSelectBook(featuredBook)}
              className="font-serif text-2xl font-bold text-[#1f1b1a] hover:text-[#14422d] transition-colors cursor-pointer"
            >
              {featuredBook.title}
            </h2>
            <p className="text-xs text-[#414943] font-medium">
              By {featuredBook.author} · Discussion theme: "Sensory Stillness vs Information Overload"
            </p>

            <blockquote className="border-l-2 border-[#974722] pl-3 py-0.5 font-serif italic text-xs text-[#1f1b1a]">
              "{featuredBook.quote}"
            </blockquote>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => onSelectBook(featuredBook)}
                className="py-2 px-4 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Inspect Binding Details
              </button>
              <button
                onClick={() => onOpenReader(featuredBook)}
                className="py-2 px-4 rounded-[4px] bg-[#fff8f6] hover:bg-[#f6ecea] text-[#1f1b1a] border border-[#c0c9c1] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#974722]" />
                <span>Read Chapter Excerpt</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Community Discussion Threads */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[#eae0de] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#14422d]" />
            <h3 className="font-serif text-xl font-bold text-[#1f1b1a]">
              Member Discussion & Marginalia
            </h3>
          </div>
          <span className="text-xs text-[#717973] tabular-nums">
            {comments.length} Salon Entries
          </span>
        </div>

        {/* Comment Input */}
        <form onSubmit={handlePostComment} className="bg-[#f6ecea] p-4 rounded-lg border border-[#eae0de] space-y-3">
          <label className="text-xs font-bold text-[#1f1b1a] block">
            Add Your Reflection to the Circle:
          </label>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Share your thoughts on the sensory qualities of physical cloth, or reflections on the text..."
            rows={3}
            className="w-full bg-[#fff8f6] p-3 text-xs rounded-md border border-[#c0c9c1] focus:border-[#14422d] focus:outline-none text-[#1f1b1a] placeholder-[#717973]"
          />
          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-[#717973]">
              Formatting as verified literary salon participant
            </span>
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="py-2 px-4 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contribute</span>
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-3">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-[#fff8f6] p-4 rounded-lg border border-[#eae0de] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1f1b1a]">
                    {comment.author}
                  </span>
                  <span className="text-[10px] text-[#974722] bg-[#ff996c]/15 px-1.5 py-0.2 rounded-xs font-medium">
                    {comment.role}
                  </span>
                </div>
                <span className="text-[11px] text-[#717973]">{comment.time}</span>
              </div>
              <p className="text-xs text-[#414943] leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
