import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"
import { useRef, useEffect, memo } from 'react'

const Showcase = memo(() => {
   const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
   const sectionRef = useRef(null)
   const videoRef = useRef(null)

   // Pause video when not in viewport
   useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  video.play().catch(() => {})
               } else {
                  video.pause()
               }
            })
         },
         { threshold: 0.25 }
      )

      observer.observe(video)
      return () => observer.disconnect()
   }, [])

   useGSAP(() => {
      if (!isTablet) {
         if (!sectionRef.current) return;

         const img = sectionRef.current.querySelector('.mask img');
         const content = sectionRef.current.querySelector('.content');
         if (!img || !content) return;

         const timeline = gsap.timeline({
            defaults: { ease: 'power1.inOut' },
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top top',
               end: 'bottom top',
               scrub: true,
               pin: true,
               invalidateOnRefresh: true,
            }
         })
         timeline.to(img, {
            scale: 1.1,
         }).to(content, { opacity: 1, y: 0, ease: 'power1.in' })
      }
   }, [isTablet])

   return (
      <section id="showcase" ref={sectionRef}>
         <div className="media">
            <video ref={videoRef} src="/videos/game.mp4" loop muted playsInline />
            <div className="mask">
               <img src="/mask-logo.svg" alt="" />
            </div>
         </div>

         <div className="content">
            <div className="wrapper">
               <div className="lg:max-w-md">
                  <h2>Rocket Chip</h2>
                  <div className="space-y-5 mt-7 pe-10">
                     <p>
                        Introducing {" "}
                        <span className="text-white">
                           M4, the next generation of Apple silicon
                        </span>
                        .M4 powers
                     </p>
                     <p>
                        It drives Apple Intelligence on iPad Pro, so you can
                        write, create, and accomplish more with ease. All in a
                        design that's unbelievably thin, light, and powerful.
                     </p>
                     <p>
                        A brand-new display engine delivers breathtaking
                        precision, color accuracy, and brightness. And a
                        next-gen GPU with hardware-accelerated ray tracing
                        brings console-level graphics to your fingertips.
                     </p>
                     <p className="text-primary">
                        Learn more about Apple Intelligence
                     </p>
                  </div>
               </div>
               <div className="max-w-3xs space-y-14">
                  <div className="space-y-2">
                     <p>Up to</p>
                     <h3>4x faster</h3>
                     <p>Pro rendering performance than M2</p>
                  </div>
                  <div className="space-y-2">
                     <p>Up to</p>
                     <h3>1.5x faster</h3>
                     <p>CPU performance performance than M2</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
})

Showcase.displayName = 'Showcase'

export default Showcase
