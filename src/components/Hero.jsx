import React, { useEffect, useRef, memo } from 'react'

const Hero = memo(() => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = 2;

    // Pause video when not in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  },[])

  return (
    <section id = "hero">
      <div>
        <h1>Macbook Pro</h1>
        <img src="/title.png" alt="Macbook title" loading="eager" />
      </div>
      <video ref={videoRef} src="/videos/hero.mp4" muted playsInline></video>

      <button>Buy</button>
      <p>From $1599 or $133/mo for 12 months</p>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero