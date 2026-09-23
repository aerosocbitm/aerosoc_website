import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onFlash, onWipeComplete, onComplete }) => {
  const containerRef = useRef(null);
  const actionBoxRef = useRef(null);
  const contentRef = useRef(null);
  const darkBgRef = useRef(null);
  const counterRef = useRef(null);

  const flashRef = useRef(onFlash);
  const wipeCompleteRef = useRef(onWipeComplete);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    flashRef.current = onFlash;
    wipeCompleteRef.current = onWipeComplete;
    completeRef.current = onComplete;
  }, [onFlash, onWipeComplete, onComplete]);

  useEffect(() => {
    let ctx;
    
    const frameId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const progress = { val: 0 };
        
        gsap.to(progress, {
          val: 100,
          duration: 4.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) counterRef.current.innerText = Math.floor(progress.val) + "%";
          }
        });

        gsap.to(actionBoxRef.current, {
          height: "100%",
          duration: 4.5,
          ease: "power2.inOut",
          onComplete: () => {
            const tl = gsap.timeline();

            tl.to(contentRef.current, { opacity: 0, duration: 0.1 })
              .to(actionBoxRef.current, {
                width: "100%",
                duration: 0.6,
                ease: "expo.inOut",
                onComplete: () => {
                  gsap.set(darkBgRef.current, { opacity: 0 });
                  if (flashRef.current) flashRef.current(); 
                  gsap.set(actionBoxRef.current, { left: "auto", right: 0 });
                }
              })
              .to({}, { duration: 0.3 })
              .to(actionBoxRef.current, {
                width: "4rem", 
                duration: 1.5,
                ease: "power4.inOut",
                onComplete: () => {
                  if (wipeCompleteRef.current) wipeCompleteRef.current();
                }
              })
              .to(actionBoxRef.current, {
                backgroundColor: "rgba(0, 0, 0, 0.2)", 
                borderLeft: "1px solid rgba(255, 255, 255, 0.05)", 
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                  if (completeRef.current) completeRef.current();
                }
              });
          }
        });
      }, containerRef);
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-[100svh] z-[9999] pointer-events-none overflow-hidden">
      
      <div 
        ref={darkBgRef} 
        className="absolute inset-0 w-full h-full z-20 pointer-events-auto bg-gradient-to-br from-[#1a1a24] via-[#0a0a0a] to-[#050505]"
      >
        <svg 
          className="w-full h-full object-cover opacity-80" 
          viewBox="0 0 1920 1080" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path d="M-100 200 C 400 100, 1000 600, 2020 300" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
          <path d="M-100 800 C 500 900, 1200 400, 2020 800" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
          <path d="M-100 1000 C 300 800, 800 1100, 1500 900" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />

          <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-50 450 H 300 L 400 550 H 800" />
            <circle cx="800" cy="550" r="8" fill="transparent" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="3" />

            <path d="M-50 520 H 200 L 300 620 H 700" />
            <circle cx="700" cy="620" r="8" fill="transparent" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="3" />

            <path d="M-50 590 H 400 L 450 640 H 600 L 650 690 H 850" />
            <circle cx="850" cy="690" r="9" fill="#00d2ff" stroke="none" filter="url(#cyanGlow)" />
            <circle cx="850" cy="690" r="4" fill="#ffffff" stroke="none" />
          </g>

          <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 100 950 L 250 880 L 300 1050 Z" />
            <path d="M 250 880 L 400 920 L 300 1050" />
            <path d="M 400 920 L 520 1050 L 300 1050" />
            <circle cx="250" cy="880" r="3" fill="#00d2ff" stroke="none" filter="url(#cyanGlow)" />
            <circle cx="400" cy="920" r="2" fill="rgba(255,255,255,0.3)" stroke="none" />
          </g>
        </svg>
      </div>

      <div ref={contentRef} className="absolute inset-0 flex flex-col justify-between pr-6 pl-16 sm:pr-8 sm:pl-20 md:pr-12 md:pl-28 py-[6vh] md:py-[8vh] z-30 pointer-events-auto">
        
        <div className="flex-1 flex flex-col items-end justify-center md:justify-start md:pt-[10vh] pr-0 sm:pr-4 md:pr-8 w-full">
          <div className="flex flex-col items-start w-full max-w-sm md:max-w-md lg:max-w-lg">
            
            <div className="h-28 sm:h-36 md:h-52 lg:h-64 mb-0 overflow-hidden flex items-end justify-start w-full">
              <img src="/aerocon26-logo.png" alt="Flagship Event" className="w-full h-full object-contain object-bottom opacity-100" />
            </div>

            <div className="w-full flex flex-col items-start gap-2 -mt-2 md:-mt-6 pl-4 sm:pl-6 md:pl-0">
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#ffe600] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.83L19.13 19H4.87L12 5.83zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
                </svg>
                <div className="grid grid-cols-6 gap-0.5">
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/20 my-1"></div>

              <p className="text-white/90 font-sans font-semibold text-[8px] sm:text-[10px] md:text-xs tracking-[0.25em] uppercase">
                COMING SOON
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-end">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-[#00d2ff]"></div>
            <span ref={counterRef} className="text-[#00d2ff] text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tighter leading-none">
              0%
            </span>
          </div>
          <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] uppercase opacity-60 font-mono mt-4">
            Initializing...
          </span>
        </div>
      </div>

      <div ref={actionBoxRef} className="absolute bottom-0 left-0 w-12 md:w-16 bg-[#00d2ff] z-40" style={{ height: "0%" }}></div>
    </div>
  );
};

export default Loader;