// /src/components/sub/SkillText
import React from 'react';
import {motion} from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../utils/motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import i18next from '../utils/i18n';

const SkillText = () => { 
  return (
    <div className={`w-full h-auto flex flex-col items-center justify-center translate-y-[2%] top-[2%] pt-[4%]`}>
<motion.div
          variants={slideInFromTop}
          className="Welcome-box text-xl md:text-base sm:text-base py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] translate-y-20 pb-6 lg:translate-y-8 lg:pb-1"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-base text-lime-400 animate-bounce">
            {i18next.t('skillText.generation')}
          </h1>
        </motion.div>
        <motion.div
        variants={slideInFromLeft(0.5)}
        className='text-[30px] text-white font-medium translate-y-1 text-center mb-[0.7em]'
        >
            {i18next.t('skillText.modern') }
        </motion.div>
        <motion.div
        variants={slideInFromRight(0.5)}
        className='cursive text-[20px] text-gray-200 mb-10 translate-y-1 text-center'
        >
            {i18next.t('skillText.task')}
        </motion.div>
    </div>
  )
}

export default SkillText