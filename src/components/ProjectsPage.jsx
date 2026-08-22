import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, SquareMenu, AlertTriangle } from 'lucide-react';

const projectsData = [
  {
    id: '01',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION.',
    modelType: 'drone'
  },
  {
    id: '02',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION',
    modelType: 'glider'
  },
  {
    id: '03',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION'
  }
];

const ProjectsPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const mountRef = useRef(null);
  const textContainerRef = useRef(null);
  
  useEffect(() => {
    if (!mountRef.current) return;

    // SHRUNK CANVAS: Scaled down from 600 to 500 for better breathing room
    const W = 500;
    const H = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 7); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // CRISPER POINTS: Reduced size from 0.04 to 0.015 so it looks like fine wireframe dust
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    let currentModelGroup = new THREE.Group();
    scene.add(currentModelGroup);

    const loadHologram = (type) => {
      while(currentModelGroup.children.length > 0){ 
        const child = currentModelGroup.children[0];
        if (child.geometry) child.geometry.dispose();
        currentModelGroup.remove(child); 
      }

      if (type === 'drone') {
        const loader = new GLTFLoader();
        loader.load('/drone.glb', (gltf) => {
          const model = gltf.scene;
          
          model.traverse((child) => {
            if (child.isMesh) {
              // OUTLINES ONLY: Scans for geometric edges (15-degree threshold) to recreate the hologram blueprint
              let edgeGeom = new THREE.EdgesGeometry(child.geometry, 15);
              
              // Fallback just in case the drone is perfectly smooth
              if (edgeGeom.attributes.position.count === 0) {
                edgeGeom = new THREE.WireframeGeometry(child.geometry);
              }

              const points = new THREE.Points(edgeGeom, material);
              child.add(points);
              child.material.visible = false; 
            }
          });

          // Absolute Centering
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center); 

          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          
          // Scaled to 2.0 to fit perfectly inside the new smaller 500px rings
          const targetScale = maxDim > 0 ? 6.75 / maxDim : 1;

          const wrapper = new THREE.Group();
          wrapper.add(model);
          currentModelGroup.add(wrapper);

          wrapper.scale.set(0.001, 0.001, 0.001);
          gsap.to(wrapper.scale, {
            x: targetScale, y: targetScale, z: targetScale,
            duration: 1.5,
            ease: "expo.out"
          });
        });

      } else {
        let geometry;
        if (type === 'glider') {
          geometry = new THREE.ConeGeometry(0.8, 2, 64, 64, false, 0, Math.PI * 2);
          geometry.rotateX(Math.PI / 2);
        } else {
          geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 10, 10, 10);
        }

        geometry.center(); 
        const edges = new THREE.EdgesGeometry(geometry, 15);
        const points = new THREE.Points(edges, material);
        
        currentModelGroup.add(points);
        
        points.scale.set(0.01, 0.01, 0.01);
        gsap.to(points.scale, {
          x: 1, y: 1, z: 1,
          duration: 1.5,
          ease: "expo.out"
        });
      }
    };

    loadHologram(projectsData[activeIdx].modelType);

    let animationFrameId;
    const animate = () => {
      currentModelGroup.rotation.y += 0.002;
      currentModelGroup.rotation.x += 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, [activeIdx]); 

  const changeProject = (direction) => {
    gsap.to(textContainerRef.current, {
      opacity: 0,
      x: direction === 'next' ? -20 : 20,
      duration: 0.3,
      onComplete: () => {
        if (direction === 'next') {
          setActiveIdx((prev) => (prev + 1) % projectsData.length);
        } else {
          setActiveIdx((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
        }
        
        gsap.fromTo(textContainerRef.current,
          { opacity: 0, x: direction === 'next' ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const activeProject = projectsData[activeIdx];

  return (
    <section id="projects-page" className="relative w-full h-screen bg-[#050505] overflow-hidden border-t border-white/5 pointer-events-auto">
      
      <div className="absolute top-0 left-0 right-0 z-50 bg-[#eaff00]/10 border-b border-[#eaff00]/30 py-2.5 px-6 flex items-center justify-center gap-2.5 backdrop-blur-md pointer-events-none">
        <AlertTriangle className="w-4 h-4 text-[#eaff00] animate-pulse" />
        <p className="text-[#eaff00] text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase">
          PAGE UNDER CONSTRUCTION 
        </p>
        <AlertTriangle className="w-4 h-4 text-[#eaff00] animate-pulse" />
      </div>

      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* PUSHED LEFT: Adjusted crosshair math from 45% to 35% */}
      <div className="absolute top-[40%] md:top-1/2 left-0 w-full h-[1px] bg-white/10 z-0 pointer-events-none" />
      <div className="absolute top-0 left-1/2 md:left-[35%] w-[1px] h-full bg-white/10 z-0 pointer-events-none" />

      {/* 
        PUSHED LEFT & SCALED DOWN:
        Changed left-[45%] to left-[35%]. 
        Reduced container size to 500x500.
        On mobile (before md:), it stays perfectly centered at top-[40%] to avoid the text block.
      */}
      <div className="absolute top-[40%] md:top-1/2 left-1/2 md:left-[35%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] scale-[0.6] sm:scale-75 lg:scale-90 z-20 pointer-events-none flex items-center justify-center">
        
        <div ref={mountRef} className="absolute inset-0 w-[500px] h-[500px] z-10" />

        <svg width="500" height="500" className="absolute inset-0 z-20 opacity-40 animate-[spin_40s_linear_infinite]">
          <circle cx="250" cy="250" r="230" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10 30" />
          <circle cx="250" cy="250" r="210" stroke="white" strokeWidth="4" fill="none" strokeDasharray="100 800" strokeLinecap="round" />
        </svg>

        <svg width="340" height="340" className="absolute z-20 opacity-20 animate-[spin_20s_linear_infinite_reverse]">
          <circle cx="170" cy="170" r="150" stroke="#00d2ff" strokeWidth="1" fill="none" strokeDasharray="5 15" />
        </svg>

      </div>

      {/* LEFT UI PANEL */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 z-30 flex flex-col gap-6 pointer-events-none">
        <div>
          <div className="flex items-center gap-2 text-white/50 mb-2">
             <div className="w-2 h-2 bg-white/50" />
             <div className="text-[10px] tracking-[0.3em]">DATABASE</div>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-widest uppercase">PROTOTYPES</h2>
        </div>
        
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative mt-2 md:mt-4 pointer-events-auto">
          <SquareMenu className="text-white w-8 h-8 opacity-80" />
          <div className="absolute -left-3 top-2 flex flex-col gap-1">
             <div className="w-1 h-3 bg-[#00d2ff]" />
             <div className="w-1 h-2 bg-[#eaff00]" />
          </div>
        </div>
      </div>

      {/* RIGHT UI PANEL: Adjusted max-width and typography to prevent overlapping circles */}
      <div className="absolute top-[80%] md:top-1/2 -translate-y-1/2 right-6 md:right-12 lg:right-24 z-30 w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm">
        
        <div ref={textContainerRef}>
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-1.5 h-1.5 bg-white" />
            <p className="text-[9px] md:text-[10px] lg:text-xs font-sans tracking-[0.3em] text-white/70 uppercase">
              {activeProject.subtitle}
            </p>
          </div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-none uppercase tracking-tighter mb-4 md:mb-6">
            {activeProject.title}
          </h3>
          
          <p className="text-xs sm:text-sm md:text-base font-sans text-white/60 leading-relaxed tracking-wide mb-8 md:mb-12">
            {activeProject.description}
          </p>
        </div>

        <div className="flex items-end justify-between border-b border-white/20 pb-4">
          <div className="flex flex-col gap-2 w-28 md:w-32">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/20" />
              <div className="w-6 h-2 bg-white/20" />
              <div className="w-12 h-2 bg-white/20" />
            </div>
            <div className="w-full h-[2px] bg-white/20 relative">
               <div 
                 className="absolute top-0 left-0 h-full bg-[#eaff00] transition-all duration-500 ease-out" 
                 style={{ width: `${((activeIdx + 1) / projectsData.length) * 100}%` }}
               />
            </div>
            <p className="text-[9px] md:text-[10px] text-[#eaff00] font-sans tracking-widest text-right mt-1">
              0{activeIdx + 1} / 0{projectsData.length}
            </p>
          </div>

          <div className="flex gap-3 md:gap-4">
            <button 
              onClick={() => changeProject('prev')}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00d2ff] transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 ml-[-2px]" />
            </button>
            <button 
              onClick={() => changeProject('next')}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00d2ff] transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mr-[-2px]" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProjectsPage;