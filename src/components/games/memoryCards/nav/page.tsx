import  Image  from '../../../utils/Image';
import {NavLink} from "react-router";

//import { useTranslations } from "next-intl";

const Nav = () => {//const t = useTranslations('Navbar');
  return (
    <aside className="h-2/3 items-center mb-32">
      <nav className="relative flex flex-col border-r shadow-sm  shadow-[#2A0E61]/50">
        <div className="w-full sm:max-md:max-w-7xl h-[65px] absolute top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10  translate-y-6">
          <div id="scroller" className="p-1 float-right mb-11 py-2">

          </div >
          <div className="p-4 pb-2  items-center mx-auto">
            <a
              href="#about-me"
              className="flex-shrink-0 space-x-4 md:inline-block"
            >
              <Image
                src="/LogoTiger.png"
                alt="logo"
                width={60}
                height={60}
                className="-ml-3 translate-y-0 cursor-pointer md:block  hover:animate-slowspin rounded-2xl "
              />
              <span className=" ml-[1px]  text-gray-300 shadow-lg Mountlogo text-base font-extrabold">
                Mahshid Co.
              </span>
            </a>

          </div>
          <div className="flex mx-auto justify-center items-center">
            <div className="w-[600px] h-full flex flex-row items-center justify-between md:mr-20">
              <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                <NavLink to="#skills" className="max-[480px]:-mr-3 mx-auto  ">

                </NavLink>
                <NavLink to="/" className=" cursor-pointer mx-auto ml-3 px-2 text-xl">
                  Home
                </NavLink>

                <NavLink to="#skills" className="cursor-pointer mx-auto ml-2 p-1 text-xl">
                  Cooperation
                </NavLink>
                <NavLink to="/menu/entertainment" className="cursor-pointer mx-auto ml-1 p-1 text-xl animate-in">
                  Games
                </NavLink>
                <NavLink to="#projects" className=" cursor-pointer mx-auto ml-3 px-2 text-xl">
                  Events
                </NavLink>
              </div>



            </div>
          </div>


          <div className="w-full flex flex-row items-center justify-between mx-auto">

            <div className="flex w-auto  flex-row flex-shrink-0">
              <div className="flex flex-row  items-center">

              </div>
            </div>

            <div className="p-1 items-center mb-11 py-2">

            </div >

          </div>


        </div>
      </nav>
    </aside>
  );
}

export default Nav
