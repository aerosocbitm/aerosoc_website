import React from 'react';

const Heading = ({ onNavigate }) => {
  return (
    <section 
      id="heading" 
      // CHANGED: All md: classes changed to lg: so tablets keep the mobile view
      className="w-full min-h-[100svh] lg:min-h-screen flex flex-col justify-start lg:justify-between items-center lg:items-start text-center lg:text-left pointer-events-none px-6 sm:px-8 lg:px-24 2xl:px-32 pt-6 pb-6 relative overflow-hidden"
    >
      {/* MOBILE/TAB: Sponsor Us button — Pushed down to top-10 to clear browser UI */}
      <div className="absolute top-10 left-6 sm:left-8 z-30 lg:hidden pointer-events-auto">
        <button className="group relative overflow-hidden px-5 py-2.5 bg-white hover:bg-accent text-black font-sans font-semibold text-xs normal-case tracking-normal rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer min-w-[110px] h-[38px] flex items-center justify-center">
          <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
            Sponsor Us
          </span>
          <span className="absolute inline-block transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            Thanks!
          </span>
        </button>
      </div>

      {/* DESKTOP ONLY: Top Right Links */}
      <div className="hidden lg:flex w-full justify-end items-center gap-4 z-30 pointer-events-auto">
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('projects')}
            className="px-3 py-2 bg-transparent border-none text-white/90 hover:text-accent font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]"
          >
            Projects
          </button>
        </div>
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('workshops')}
            className="px-3 py-2 bg-transparent border-none text-white/90 hover:text-accent font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]"
          >
            Workshops
          </button>
        </div>
      </div>

      {/* Main Typography Block */}
      <div className="relative z-10 pointer-events-auto w-full max-w-7xl 2xl:max-w-[1600px] mx-auto mt-32 sm:mt-40 lg:my-auto text-center lg:text-left">
        <h1 className="font-azonix text-6xl sm:text-7xl lg:text-8xl 2xl:text-9xl text-white uppercase tracking-normal leading-none sm:leading-tight mb-4 mx-auto lg:ml-0 lg:pl-0 block w-full">
          AeroSpace <br />
          <span className="text-accent font-azonix inline-block mt-3 lg:mt-0 text-transparent [-webkit-text-stroke:2px_#48E4FF]">
            SOCIETY
          </span>
        </h1>
        
        <p className="text-gray-400 font-sans tracking-[4px] sm:tracking-[3px] uppercase text-base sm:text-lg lg:text-lg 2xl:text-xl mt-10 sm:mt-6 mx-auto lg:ml-2 pl-0 block w-full">
          Aerosoc | BIT MESRA
        </p>
      </div>

      {/* MOBILE/TAB: Projects & Workshops buttons */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex lg:hidden justify-center items-center gap-10 pointer-events-auto">
        <button 
          onClick={() => onNavigate && onNavigate('projects')}
          className="px-3 py-2 bg-transparent border-none text-white/60 hover:text-accent font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95"
        >
          Projects
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('workshops')}
          className="px-3 py-2 bg-transparent border-none text-white/60 hover:text-accent font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95"
        >
          Workshops
        </button>
      </div>

      {/* DESKTOP ONLY: Sponsor Us button at bottom-left */}
      <div className="hidden lg:flex relative z-10 pointer-events-auto w-full max-w-7xl 2xl:max-w-[1600px] mx-auto justify-start">
        <div className="heading-anim-btn">
          <button className="group relative overflow-hidden px-6 py-3 bg-white hover:bg-accent text-black font-sans font-semibold text-base normal-case tracking-normal rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer min-w-[140px] h-[46px] flex items-center justify-center">
            <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
              Sponsor Us
            </span>
            <span className="absolute inline-block transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              Thanks!
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Heading;