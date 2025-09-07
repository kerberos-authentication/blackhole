// /src/components/main/Skills
import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "../constants/Constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden  lg:pb-60 lg:py-15 z-19"
      style={{ transform: "scale(0.9)" }}
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap translate-y-4 gap-5 items-center">
        {Skill_data.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>

      <div className="flex flex-row justify-around flex-wrap translate-y-4 gap-5 items-center">
        {Frontend_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap translate-y-4 gap-5 items-center">
        {Backend_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap translate-y-4 gap-5 items-center">
        {Full_stack.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap translate-y-4 gap-5 items-center">
        {Other_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
              <div className="w-[45%] h-[55%] rounded-full absolute top-[3%] lg:top-[5%]">
                  <div className="rounded-full z-[-10] opacity-30 absolute flex items-center justify-center bg-top translate-y-[5%]">
                    <video
                      className="w-full h-auto rounded-full opacity-30 animate-spin"
                      preload="false"
                      playsInline
                      loop
                      muted
                      autoPlay
                      src="/cards-video-opt.webm"
                    />
                  </div>
                               
              </div>
      

      <div className=" w-[80%] h-[55%] absolute top-[30%] rounded-full bg-blend-overlay z-[-11] ">
            <video
            className="w-full min-h-[70%] z-[-11] absolute -translate-y-[3%] -top-[3%] items-center justify-center rounded-b-full bg-local opacity-40"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video-opt.webm"
          />                           
        <div className="bg-[#030014] w-auto h-auto z-[-10] bg-repeat-round flex absolute translate-y-[5%] top-[5%] items-center justify-center">
          </div>
          
      </div>

    </section>
  );
};

export default Skills;
