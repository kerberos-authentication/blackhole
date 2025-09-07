// src/app/Layout.jsx
import '../index.css';
    import logo from '../assets/logo.svg';
     import LocalSwitch  from '../components/main/LocalSwitch';
    // import Credentials from './Credentials';
    import ToastProvider from '../components/utils/ToastProvider';
    const Layout = ({ children }) => {
        return (
            <div className='bg-[#030014] overflow-y-scroll overflow-x-hidden'>
               {/* Header content goes here */}
                          <div className='App-header -translate-y-[8%] -translate-y-[8%] inset-0  mx-auto '>
        <img src={logo} className="App-logo  -translate-y-[25%] opacity-50" alt="" />
             </div>
               <div className='relative z-[58] pl-2 translate-x-[-5%] md:translate-x-[-10%] translate-y-[80%] '>
                     <div className='translate-y-[10%] cursor-pointer'> <LocalSwitch />
                     
                     </div>
                </div>
                   <main className='space-y-2'>  <ToastProvider />
                     
                    {children}</main>
            </div>
        );
    };
    export default Layout;