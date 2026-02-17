import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features, featureSequence } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef, memo } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const ModelScroll = memo(() => {
   const groupRef = useRef(null);
   const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
   const { setTexture } = useMacbookStore();

   // Optimized video preloading - only preload metadata
   useEffect(() => {
      const preloadVideo = (videoPath) => {
         const v = document.createElement('video');
         v.preload = 'metadata'; // Only load metadata, not full video
         v.src = videoPath;
      };

      featureSequence.forEach((feature) => {
         preloadVideo(feature.videoPath);
      });
   }, []);

   useGSAP(() => {
      const modelTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: '#f-canvas',
            start: 'top top',
            end: 'bottom  top',
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
         }
      });

      const timeline = gsap.timeline({
         scrollTrigger: {
            trigger: '#f-canvas',
            start: 'top center',
            end: 'bottom  top',
            scrub: 1,
            invalidateOnRefresh: true,
         }
      })

      if (groupRef.current) {
         modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' })
      }

      timeline
         .call(() => setTexture('/videos/feature-1.mp4'))
         .to('.box1', { opacity: 1, y: 0, delay: 1 })

         .call(() => setTexture('/videos/feature-2.mp4'))
         .to('.box2', { opacity: 1, y: 0 })

         .call(() => setTexture('/videos/feature-3.mp4'))
         .to('.box3', { opacity: 1, y: 0 })

         .call(() => setTexture('/videos/feature-4.mp4'))
         .to('.box4', { opacity: 1, y: 0 })

         .call(() => setTexture('/videos/feature-5.mp4'))
         .to('.box5', { opacity: 1, y: 0 })
   }, []);

   return (
      <group ref={groupRef}>
         <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1></Html>}>
            <MacbookModel scale={isMobile ? 0.05 : 0.1} position={[0, -1, 0]} />
         </Suspense>
      </group>
   )
})

const Features = () => {
   return (
      <section id="features">
         <h2>See it all in a new light.</h2>

         <Canvas 
            id="f-canvas" 
            camera={{}}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            frameloop="demand"
            flat
         >
            <StudioLights />
            <ambientLight intensity={0.5} />
            <ModelScroll />
         </Canvas>

         <div className="absolute inset-0">
            {features.map((feature, index) => (
               <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
                  <img src={feature.icon} alt={feature.highlight} />
                  <p>
                     <span className="text-white">{feature.highlight}</span>
                     {feature.text}
                  </p>
               </div>
            ))}
         </div>
      </section>
   )
}

export default Features
