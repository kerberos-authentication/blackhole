//   src/components/Sidebar.jsx
//import { format } from 'date-fns-jalali';
import { formatDate } from '../utils/LocalizedDate';
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import i18next from '../utils/i18n';
import i18n from "i18next";
//import { useTranslation } from 'react-i18next';
import React, { createContext, useContext, useState } from 'react';
import Image from "../utils/Image";
import { NavLink } from 'react-router';
const SidebarContext = createContext();
                                                /* 
                                                const FormattedDate = ({ date = new Date() }) => {
                                                  //const { i18n } = useTranslation();

                                                  const isPersian = i18n.language === 'fa';

                                                  const formatted = isPersian
                                                    ? format(date, 'yyyy/MM/dd') // Persian (Jalali)
                                                    : date.toLocaleDateString('en-US'); // Gregorian

                                                  return <>{formatted}</>;
                                                };

                                                */
export default function Sidebar ( {user, children} ) {
    const [expanded, setExpanded] = useState(true);

  return (
    <aside className='relative tanslate-y-[2%] h-[69%] z-[52] w-[98%]  mr-[1%] md-between:translate-y-[36%] md:translate-y-[38%] lg:translate-y-[40%] object-bottom md-between:gap-[3%] md:gap-[3%]'>
        <nav className='absolute flex flex-col w-[97%] translate-y-[3%] h-full md-between:translate-y-[38%] md:translate-y-[38%] lg:translate-y-[40%] shadow-lg bg-[#030014] bg-transparent text-gray-100 backdrop-blur-sm lg:pl-3 lg:mr-2'>
            <div className='pb-1 flex justify-between items-center'>                
                       <Image
                         src="/LogoTiger.png"
                         alt="logo"
                         width={50}
                         height={50}
                         className={`overflow-hidden transition-all ${expanded ? "w-8" : 'w-0'}`}
                       />
                                   
                    <button onClick={()=> setExpanded(curr => !curr)} className='p-1 mr-1 shadow-lg text-white bg-[#030014] translate-x-1/2 hover:bg-gray-100 hover:text-black rounded-full'>{expanded ? <ChevronFirst className='scale-x-175  mr-0' size={25}/> : <ChevronLast className='scale-x-175  mr-0' size={25}/> }</button>

            </div>
    <SidebarContext.Provider value={{expanded}}>
            <ul className='flex flex-col items-end ml-[50%] mr-5
                           md:flex-row md:justify-center md:items-center
                       md:gap-4 text-sm md:text-lg font-bold md:translate-y-[2%]'>{ children }</ul>
    </SidebarContext.Provider>  
           <div className="border-t flex p-2 ml-auto">
              <img 
                      src='/missileCartoon.PNG'
                      alt=''
                      className='w-8 h-8 rounded-md hidden md:visible' />

              <div className={`
                           md:translate-y-[2%] flex justify-between items-stretch
                              overflow-hidden transition-all ${expanded ? "w-auto ml-3" : 'w-0'} `} >
        
                  {user ? (
                                    <div className='leading-4'>
                                     <h2 className='text-sm'>{user.name || i18next.t('Navbar.Guest')}</h2>
                                     <span className='text-xs text-gray-600'>{user.email || ''}</span>
                                     {formatDate('2025-08-06')}
                                    </div>
                                  ) : (
                                    <div className='leading-4'>
                                      <NavLink to={`/login`} 
                                      className={({ isActive }) =>
                       `text-[#bbfc9d] text-sm inline-block ${isActive ? 'font-bold' : ''}
                                       cursor-pointer hover:underline`  }> 
                                      {i18next.t('Navbar.Login')} </NavLink>
                                      <br/>
                                    {formatDate('2025-08-06')}
                                    </div>
                                  )}
               <MoreVertical size={20}/>
             </div>
           </div>
        </nav>
      
    </aside >
  )
}


export function SidebarItem( {user, icon, text, active, alert} ){  
  const {expanded} = useContext(SidebarContext);
    return (<>
        <li className={`flex items-center gap-2 py-2 px-3 
    rounded-md font-medium text-sm transition-colors group
    text-red-900 cursor-pointer
    ${expanded ? "justify-start" : "justify-end"}
        ${active ? "bg-gradient-to-tr from-indigo-300 to-indigo-100 text-indigo-950" : "hover:bg-indigo-50 hover:text-black"}
  `}>
            {icon}
            <span className={`transition-all ${expanded ? "w-auto ml-px" : 'hidden'} text-purple-400`}>{text}</span>
            {/* {alert && (<div className={`absolute right-2 rounded bg-indigo-400 ${ expanded ? "" : 'top-2 '}`} /> ) } */}
              {alert && ( <div className="ml-auto h-2 w-2 rounded-full bg-indigo-400" />
  )}
              {!expanded && (
    <div className="absolute left-full ml-3 px-2 py-1 text-sm text-indigo-800 bg-indigo-100 rounded opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition">
      {text}
    </div>
  )}
        </li>
        
        </>
    );
}
