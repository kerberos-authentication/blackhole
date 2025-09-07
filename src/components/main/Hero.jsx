
import { isServer } from '../utils/isSSR';
import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
const HeroContent = lazy(() => import('../sub/HeroContent'));

const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <svg
      className="animate-spin h-5 w-5 text-indigo-500"
        fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);
const Hero = () => {
  if (!isServer) return (
        <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
      className="relative flex flex-col h-full w-full z-[1] -translate-y-[2%]  py-14 pb-16 lg:pb-2 rounded-full">
      <video
      autoPlay
      muted
      loop
      preload="metadata"
      poster="/blackhole.webm"
      className="rotate-180 absolute -translate-y-[29%] md:-translate-y-[68%] z-[1] object-bottom md:object-cover w-[99%] h-5/6 opacity-40 mask-fade-bottom"
      >
             <source src="/blackholeHr.webm" type="video/webm"   />
      </video>
       
         {/* Foreground Content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-white text-center p-10"><Spinner /> </div>}>
          <HeroContent />
        </Suspense>
      </div>
    </motion.div>);
  
  else return(  <div className="relative flex flex-col h-full w-full z-[1]  -translate-y-[2%]  pointer-events-none py-14 pb-16 lg:pb-2 rounded-full">
      <video
      autoPlay
      muted
      loop
      preload="metadata"
      poster="/blackhole.webm"
      className="rotate-180 absolute -translate-y-[29%] md:-translate-y-[68%] z-[1] object-bottom md:object-cover w-[99%] h-5/6 opacity-40 mask-fade-bottom"
      >
             <source src="/blackholeHr.webm" type="video/webm"   />
      </video>
       
         {/* Foreground Content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
          <HeroContent />
        </Suspense>
      </div>
    </div>);
}

export default Hero;
