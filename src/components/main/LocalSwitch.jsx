                                                              
//   return (
//     <span className="absolute m-auto  right-[68%] z-56 border-1 rounded text-white text-sm lg:text-lg lg:-top-2 lg:-translate-y-1">
     
//           <select className="bg-green-900 hover:bg-black text-white" onChange={toggleLanguage}>
//               <option value="en" className="text-sm lg:text-lg ">English</option>
//               <option value="fa" className="text-sm lg:text-lg ">Persian</option>
//           </select>

//     </span>


// components/utility/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng) => {
    const parts = location.pathname.split('/').filter(Boolean); // remove empty strings
    if (parts.length === 0) {
      // if on root path "/", just go to /lng
      navigate(`/${lng}`);
    } else {
      // Replace the first part (old lang) with new one
      if (['en', 'fa'].includes(parts[0])) {
        parts[0] = lng;
      } else {
        parts.unshift(lng);
      }
      const newPath = `/${parts.join('/')}`;                      // // ${rest.join('/')}`;
      i18n.changeLanguage(lng);
      navigate(newPath);
    }
  };

  return (
    <div className="absolute right-[68%] z-56 rounded text-white text-sm flex gap-6 p-2">
      <button className="px-2 border" onClick={() => changeLanguage('en')}>EN</button>
      <button className="px-2 border" onClick={() => changeLanguage('fa')}>FA</button>
    </div>
  );
};

export default LanguageSwitcher;