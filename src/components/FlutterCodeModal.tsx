import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Smartphone, Globe, Layers, Download } from 'lucide-react';
import { FLUTTER_M3_CODE } from '../data/flutterCode';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FLUTTER_M3_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([FLUTTER_M3_CODE], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warm_bookstore_main.dart';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#1f1b1a]/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#1f1b1a] text-[#fff8f6] rounded-xl border border-[#443833] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#342f2e] bg-[#1a1615] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#14422d] flex items-center justify-center text-[#ff996c]">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base font-bold text-white">
                  Flutter Material 3 Source Code
                </h2>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#9fcfb2] bg-[#2d5a43] px-2 py-0.5 rounded-full">
                  Android & Web
                </span>
              </div>
              <p className="text-[11px] text-[#c0c9c1] font-sans mt-0.5">
                Target: Flutter 3.x / Dart · Material Design 3 · Responsive LayoutBuilder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-md bg-[#342f2e] hover:bg-[#443833] text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download main.dart"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .dart</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-md bg-[#14422d] hover:bg-[#2d5a43] text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Copy all Flutter code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#9fcfb2]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-[#342f2e] text-[#c0c9c1] hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Highlights Strip */}
        <div className="bg-[#2d2523] px-5 py-2.5 border-b border-[#342f2e] flex flex-wrap items-center gap-4 text-xs text-[#d3c1ba] shrink-0">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#ff996c]" />
            <span>Android: NavigationBar & CenterAligned AppBar</span>
          </div>
          <span className="text-[#5c4f4a]">·</span>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#9fcfb2]" />
            <span>Web: NavigationRail & Multi-Column Grid</span>
          </div>
          <span className="text-[#5c4f4a]">·</span>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#ff996c]" />
            <span>Material 3 ColorScheme & GoogleFonts Typography</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-[#141211] font-mono text-xs text-[#e1d8d6] leading-relaxed">
          <pre className="select-text whitespace-pre overflow-x-auto p-2">
            <code>{FLUTTER_M3_CODE}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#1a1615] border-t border-[#342f2e] flex items-center justify-between text-[11px] text-[#717973] shrink-0">
          <span>Warm Editorial Bookstore · Material Design 3</span>
          <span className="text-[#ff996c]">Ready to paste into lib/main.dart</span>
        </div>
      </div>
    </div>
  );
};
