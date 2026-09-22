# OFFFICIAL AEROSPACE SOCIETY WEBSITE
Birla Institute of Technology, Mesra


## Key Features

* **Real-Time 3D Holograms:** Custom WebGL integration dynamically loads `.glb` aerospace models (drones, gliders) and converts them into glowing, mathematically centered point-cloud wireframes.
* **Cinematic Scroll Physics:** Replaces native browser scrolling with Lenis for buttery-smooth, friction-based scroll physics.
* **Scroll-Linked Animations:** Utilizes GSAP ScrollTrigger to tie typography reveals, component mounting, and SVG path animations directly to the user's scroll position.
* **Dynamic Data Visualization:** Features a custom-built, responsive SVG footfall graph with a 2D airplane traversing the data points on scroll.
* **Infallible Responsive Design:** Built with a Tailwind CSS utility-first approach, utilizing mathematical scaling wrappers to ensure 3D canvases and 2D UI elements remain perfectly synchronized across 4K monitors and mobile devices.
* **Client-Side Routing:** Custom window history state management for seamless, zero-refresh transitions between primary views and subpages.


## Technology Stack

### Core Framework

* **[React 18](https://react.dev/?utm_source=gemini):** UI component architecture and state management.
* **[Vite](https://vitejs.dev/?utm_source=gemini):** Lightning-fast build tool and development server.

### 3D Engine & Graphics

* **[Three.js](https://threejs.org/?utm_source=gemini):** Core WebGL engine for 3D scene creation, camera math, and rendering.
* **GLTFLoader:** Extension used to parse and inject compressed 3D models into the scene.

### Animation & Physics

* **[GSAP (GreenSock)](https://greensock.com/gsap/?utm_source=gemini):** Industry-standard animation library for timeline sequencing and spatial transitions.
* **[Lenis](https://lenis.studiofreight.com/?utm_source=gemini):** Lightweight smooth-scroll API.

### Styling

* **[Tailwind CSS](https://tailwindcss.com/?utm_source=gemini):** Utility-first CSS framework for rapid, responsive UI development.

---

## 🧩 Core Architecture & Components

The application is heavily modularized. Here are the primary structural components:

* `App.jsx`: The command center. Handles global state, seamless client-side routing, and orchestrates the mounting of all premium sections.
* `Loader.jsx`: The cinematic pre-loader. Utilizes SVG path animation and GSAP timelines to mask the initial DOM paint and model loading phase.
* `ProjectsPage.jsx`: The Web3D masterpiece. Houses the unified `500x500` WebGL canvas and SVG ring wrappers. It dynamically traverses loaded meshes, calculates absolute geometric bounding boxes for infallible origin centering, and applies the `EdgesGeometry` point-cloud shader.
* `FootfallGraph.jsx`: A data-driven component that maps array values to an SVG coordinate system, utilizing GSAP's MotionPathPlugin for interactive data traversal.
* `SpaceMorphBackground.jsx`: A global, persistent background component providing ambient particle effects and seamless transitions across different URL states.
* `Heading.jsx`: The responsive hero section featuring dynamic linking to society forms and external deployments (e.g., Aerocon).

---

## 📐 3D Asset Pipeline & Specifications

If you are adding new prototypes to the `projectsData` array, ensure the 3D assets follow these strict specifications:

1. **Format:** Models must be exported in the `.glb` format (binary GLTF) for optimal web compression and single-file bundling.
2. **Directory:** Place all new `.glb` files directly into the `/public` directory.
3. **Geometry Constraints:** Ensure the models do not have massive hidden origin offsets in the native 3D software (Blender, Maya). While the `ProjectsPage` algorithm includes a bounding-box scanner to force mathematical centering, pre-centered objects load significantly faster.
4. **Polygons:** Keep models decimated. Target **5,000 to 15,000 faces**. Excessive polygon counts will cause the `EdgesGeometry` array to overflow, leading to mobile browser crashes.

---

## 🤝 Contributing

When contributing to this repository, please ensure that any new UI components adhere strictly to the Tailwind utility pipeline. Do not introduce raw `.css` files unless absolutely necessary for complex keyframe animations that GSAP cannot handle efficiently.

For 3D integrations, avoid instantiating multiple `THREE.WebGLRenderer` contexts on a single page, as this will violate standard GPU memory limits. Always reuse the existing canvas or implement a global rendering loop.


## Developers
Anikait Sen Gupta
Renikson Yash Ekka
