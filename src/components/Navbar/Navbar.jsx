//   src/components/Navbar.jsx
import Sidebar , {SidebarItem} from './Sidebar'
import { useTranslation } from 'react-i18next';

import {FaSearch, FaFacebook, FaInstagram, FaTwitter, FaBars} from 'react-icons/fa';
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = ({user}) => {  const { t } = useTranslation();
  return (  <Sidebar user={user}>
    {user && (<SidebarItem icon={<LayoutDashboard size={25}/>} text={t('Navbar.Dashboard')}  alert  />  )}
    <SidebarItem icon={<BarChart3 size={25}/>} text={t('Navbar.Statistics')}    /> 
    {user && <SidebarItem icon={<UserCircle size={25} />} text={t('Navbar.Users')}    /> }
    {user && <SidebarItem icon={<Boxes    size={25}/>}  text={t('Navbar.Games')}    /> }
   {user && (  <SidebarItem icon={<Package size={25}/>} text={t('Navbar.Orders')} alert  /> )}
    {user && ( <SidebarItem icon={<Receipt size={25} />} text={t('Navbar.Billings')} /> )}
    <hr className='before:border-fuchsia-500 after:border-lime-500 md:max-h-[0.15] md:max-w-[1%] md:translate-y-[4%]  opacity-20 md:animate-ping'    />
    {user && ( <SidebarItem icon={<Settings  size={25}/>} text={t('Navbar.Settings')}    /> )}
    <SidebarItem icon={<LifeBuoy size={25}/>} text={t('Navbar.Help')} /> 

  </Sidebar >  );
}

export default Navbar;
