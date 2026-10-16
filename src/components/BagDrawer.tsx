import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, ArrowRight, ShieldCheck, Gift, PackageCheck } from 'lucide-react';
import { Book } from '../data/books';

export interface BagItem {
  book: Book;
  quantity: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearBag: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}) => {
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('Helena Vance');
  const [customerAddress, setCustomerAddress] = useState('742 Rosewood Avenue, Apt 4B');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const shipping = subtotal > 50 || items.length === 0 ? 0 : 4.50;
  const giftFee = giftWrapping ? 0 : 0; // Complimentary artisanal wrap
  const total = subtotal + shipping + giftFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const handleReset = () => {
    onClearBag();
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#1f1b1a]/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#fff8f6] h-full shadow-2xl flex flex-col z-10 border-l border-[#eae0de]">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eae0de] bg-[#fbf1ef] shrink-0">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1f1b1a]">
              The Literary Bag
            </h2>
            <p className="text-[11px] font-sans text-[#717973]">
              {items.length} {items.length === 1 ? 'selected volume' : 'selected volumes'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f6ecea] text-[#414943] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Order Confirmation View */
          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center text-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#14422d] text-white flex items-center justify-center shadow-md">
              <PackageCheck className="w-7 h-7 text-[#ff996c]" />
            </div>

            <span className="text-[10px] font-bold tracking-widest uppercase text-[#974722] bg-[#ff996c]/20 px-3 py-1 rounded-full">
              Order Confirmed #SALON-8924
            </span>

            <h3 className="font-serif text-2xl font-bold text-[#1f1b1a]">
              Your Volumes are Being Prepared
            </h3>

            <p className="text-xs text-[#414943] leading-relaxed max-w-xs">
              Thank you, {customerName}. Your hardcover editions are carefully inspected, wrapped in archival tissue paper, and bound with botanical twine.
            </p>

            <div className="w-full bg-[#f6ecea] p-4 rounded-md border border-[#eae0de] text-left text-xs space-y-2 mt-2">
              <div className="flex justify-between text-[#717973]">
                <span>Shipping To:</span>
                <span className="font-medium text-[#1f1b1a]">{customerAddress}</span>
              </div>
              <div className="flex justify-between text-[#717973]">
                <span>Payment Terms:</span>
                <span className="font-medium text-[#1f1b1a]">
                  {paymentMethod === 'cod' ? 'Cash on Delivery (Verified)' : 'Card Secured'}
                </span>
              </div>
              <div className="flex justify-between text-[#717973] pt-2 border-t border-[#eae0de]">
                <span>Total Amount:</span>
                <span className="font-bold text-[#14422d] text-sm tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-4 py-2.5 px-4 rounded-[4px] bg-[#14422d] text-white text-xs font-bold hover:bg-[#2d5a43] transition-colors cursor-pointer"
            >
              Continue Browsing Collection
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag State */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#f6ecea] flex items-center justify-center text-[#717973] mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1f1b1a] mb-1">
              Your bag is empty
            </h3>
            <p className="text-xs text-[#717973] max-w-xs leading-relaxed mb-6">
              Browse our salon recommendations, philosophy treatises, and botanical editions to add to your reading collection.
            </p>
            <button
              onClick={onClose}
              className="py-2 px-5 rounded-[4px] bg-[#14422d] text-white text-xs font-semibold hover:bg-[#2d5a43] transition-colors cursor-pointer"
            >
              Discover Books
            </button>
          </div>
        ) : (
          /* Active Bag List & Checkout */
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 divide-y divide-[#eae0de]">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                  {/* Thumbnail Cover */}
                  <div className="w-16 h-24 rounded-[3px] overflow-hidden bg-[#eae0de] shrink-0 book-cover-shadow">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-[#974722] uppercase tracking-wider block">
                      {book.format}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#1f1b1a] truncate">
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#717973] truncate">
                      {book.author}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#c0c9c1] rounded-[3px] bg-[#fbf1ef]">
                        <button
                          onClick={() => onUpdateQuantity(book.id, -1)}
                          className="p-1 hover:bg-[#f6ecea] text-[#414943] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1f1b1a] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(book.id, 1)}
                          className="p-1 hover:bg-[#f6ecea] text-[#414943] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#14422d] tabular-nums">
                          ${(book.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(book.id)}
                          className="text-[#ba1a1a] hover:opacity-80 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift Wrap Toggle */}
              <div className="pt-4">
                <label className="flex items-center gap-2.5 p-3 rounded-md bg-[#f6ecea] border border-[#eae0de] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="accent-[#14422d] w-4 h-4 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-[#1f1b1a] block">
                      Complimentary Linen Gift Wrap
                    </span>
                    <span className="text-[11px] text-[#717973]">
                      Wrapped in craft vellum with pressed wax seal & bookmark.
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#2d5a43]">Free</span>
                </label>
              </div>

              {/* Payment Option */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold text-[#1f1b1a] block">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-[4px] border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#14422d] bg-[#fbf1ef] font-semibold text-[#14422d]'
                        : 'border-[#eae0de] text-[#414943]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-[4px] border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#14422d] bg-[#fbf1ef] font-semibold text-[#14422d]'
                        : 'border-[#eae0de] text-[#414943]'
                    }`}
                  >
                    Card Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Summary */}
            <div className="p-5 bg-[#fbf1ef] border-t border-[#eae0de] space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#414943]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1f1b1a]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#414943]">
                  <span>Tracked Courier Shipping</span>
                  <span className="tabular-nums font-medium text-[#1f1b1a]">
                    {shipping === 0 ? <span className="text-[#2d5a43] font-bold">Complimentary</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1f1b1a] pt-2 border-t border-[#eae0de]">
                  <span>Total Amount</span>
                  <span className="text-[#14422d] text-base tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 rounded-[4px] bg-[#14422d] hover:bg-[#2d5a43] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Confirm Literary Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#717973]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2d5a43]" />
                <span>Protected archival delivery · Hassle-free returns</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
