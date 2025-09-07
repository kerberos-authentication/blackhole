import i18next from '../utils/i18n';
import { NavLink } from "react-router";;

const NavItems = () => {     
    

    
    // const memo = getCookie("token");
    
    //const PROTECTED_ROUTES = ["/menu-games", "/menu-games/:path*"];
  return (
   <div className=" w-[700px] h-full flex flex-row items-center justify-center bg-repeat-space  z-55 mx-auto">
                                         <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0b0725da] px-[20px] py-[10px] rounded-full text-red-200  hover:text-white">
                                         
                                           <NavLink to="/menu/entertainment"  
                                           
                                           className="cursor-pointer px-2 mx-auto sm:text-sm md:text-xl animate-in font-bold hover:text-white hover:text-lg hover:bg-black">
                                          {i18next.t('Navbar.cooperation')}
                                           </NavLink>
                                         <NavLink to="/menu/entertainment"
                                         //onClick={(e)=>{if(memo){router.push("/menu/entertainment")}else{toast.success(t('alert'),{duration:2000, position:"top-center", icon:"😍"}); setTimeout(()=>{router.push("/log-in")},2000)}}} 
                                           
                                           className="cursor-pointer px-2 mx-auto sm:text-sm md:text-xl animate-in font-bold hover:text-white hover:text-lg hover:bg-black">
                                            {i18next.t('Navbar.game')}
                                           </NavLink>
                                           <NavLink to="/menu/entertainment"
                                           
                                           className="cursor-pointer px-2 mx-auto sm:text-sm md:text-xl animate-in font-bold hover:text-white hover:text-lg hover:bg-black">
                                             {i18next.t('Navbar.events')}
                                           </NavLink>
                                         </div>
                                         
                               
   
                       </div>
  )
}

export default NavItems
