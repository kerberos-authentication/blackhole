// /src/components/sub/HeroContent
import {motion} from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../utils/motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import i18next from '../utils/i18n';
import Image from '../utils/Image';
const geistMono = {
    src: "/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  };

const HeroContent = () => {  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`container md:mr-[60%] -translate-x-1/6 translate-y-[10%] md:translate-y-[35%] pt-8 flex flex-row items-center justify-center py-12 lg:py-1 px-20  w-full z-[20] inset-0 pb-[25%] lg:pb-1`}
    >
      <div className="translate-x-[-%] translate-y-[7%] translate-y-10 h-full w-[50%] md:w-[80%] flex flex-col gap-5 justify-center m-auto text-start ">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#f8b5b5] mr-[6px] h-8 w-8 text-lg " />
          <h1 className="Welcome-text text-[14px]">
         {i18next.t('HeroContent.Fullstack')}<b> <i>{i18next.t('HeroContent.Under')}</i></b>&nbsp;{ i18next.t('HeroContent.Developing')}
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className={`flex flex-col gap-6 translate-y-6 translate-x-[-8%] text-2xl font-bold text-white max-w-[600px] w-auto h-auto mr-2 {t('font')}`}
        >
          <span>
           {i18next.t('HeroContent.Providing')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
             {i18next.t('HeroContent.best')} {" "}
            </span>
          {i18next.t('HeroContent.project')}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-18  lg:pb-6 lg:my-5 lg:max-w-[600px]"
        >
          We&apos;'re a Full Stack Software group with experience in Website,
          Mobile, and Software development. Check out our projects and skills.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-3 bg-lime-300 text-center font-bold text-slate-950 rounded-lg max-w-[200px] cursor-pointer"
        >
         {i18next.t('HeroContent.Learn')}
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className=" h-[90%]  w-full lg:h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
        />
      </motion.div>
      
    </motion.div>

  )
}

export default HeroContent;
