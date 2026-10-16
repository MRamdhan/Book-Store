import React from 'react';
import { Smartphone, Monitor, Code2, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameWrapperProps {
  deviceMode: 'android' | 'web';
  setDeviceMode: (mode: 'android' | 'web') => void;
  onOpenFlutterCode: () => void;
  children: React.ReactNode;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  deviceMode,
  setDeviceMode,
  onOpenFlutterCode,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#ede6e3] flex flex-col items-center">
      {/* Control Switcher Bar for Android & Web */}
      <div className="w-full bg-[#1f1b1a] text-[#fff8f6] px-4 py-2.5 flex items-center justify-between text-xs font-sans border-b border-[#342f2e] sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-[11px] uppercase text-[#ff996c]">
            Warm Editorial
          </span>
          <span className="text-[#c0c9c1] hidden sm:inline">· Material Design 3</span>
        </div>

        {/* Device Switcher Segmented Control */}
        <div className="flex items-center gap-1.5 bg-[#342f2e] p-1 rounded-full border border-[#443833]">
          <button
            onClick={() => setDeviceMode('android')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-medium cursor-pointer ${
              deviceMode === 'android'
                ? 'bg-[#14422d] text-white shadow-sm'
                : 'text-[#d3c1ba] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android (M3)</span>
          </button>
          <button
            onClick={() => setDeviceMode('web')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-medium cursor-pointer ${
              deviceMode === 'web'
                ? 'bg-[#14422d] text-white shadow-sm'
                : 'text-[#d3c1ba] hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Web</span>
          </button>
        </div>

        {/* Flutter Source Code Modal Trigger */}
        <button
          onClick={onOpenFlutterCode}
          className="flex items-center gap-1.5 bg-[#2d5a43] hover:bg-[#14422d] text-[#fff8f6] px-3 py-1 rounded-full text-xs font-medium border border-[#3a674f] transition-colors cursor-pointer"
          title="View Flutter Material 3 Source Code"
        >
          <Code2 className="w-3.5 h-3.5 text-[#ff996c]" />
          <span className="hidden md:inline">Flutter Code</span>
          <span className="md:hidden">Flutter</span>
        </button>
      </div>

      {/* Main View Area */}
      <div className="w-full flex-1 flex justify-center items-start p-0 md:p-6 transition-all">
        {deviceMode === 'android' ? (
          /* Android Pixel Phone Shell */
          <div className="w-full max-w-[412px] my-0 md:my-4 bg-[#1f1b1a] rounded-none md:rounded-[44px] p-0 md:p-3 shadow-2xl border-0 md:border-[6px] border-[#342f2e] transition-all">
            <div className="w-full bg-[#fff8f6] rounded-none md:rounded-[36px] overflow-hidden flex flex-col h-screen md:h-[840px] relative">
              {/* Android Status Bar */}
              <div className="w-full h-8 bg-[#fff8f6] px-6 pt-1 flex items-center justify-between text-[#1f1b1a] text-[11px] font-sans font-medium select-none shrink-0 z-30">
                <span>09:41</span>
                {/* Punch Hole Camera */}
                <div className="w-3 h-3 rounded-full bg-[#1f1b1a] -translate-y-0.5" />
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3 h-3" />
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
                {children}
              </div>

              {/* Android Gesture Bar */}
              <div className="w-full h-4 bg-[#fbf1ef] flex justify-center items-center pb-1 shrink-0 z-20">
                <div className="w-28 h-1 bg-[#414943]/30 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Responsive Web / Desktop View */
          <div className="w-full max-w-[1440px] bg-[#fff8f6] min-h-screen rounded-none md:rounded-xl shadow-lg border border-[#eae0de] overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
