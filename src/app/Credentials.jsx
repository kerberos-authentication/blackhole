import { NavLink } from "react-router";
import { formatDate } from "../components/utils/LocalizedDate";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDoubleDown } from "react-icons/fa";
//import { FaSpinner } from "react-icons/fa";
import i18next from '../components/utils/i18n';

export default function Credentials({ user }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  if (!user) {
    return (
      <NavLink to="/log-in" className="cursor-pointer translate-x-[-1]  translate-y-1 font-bold border border-slate-400 border-spacing-6 rounded-lg p-4 text-center text-slate-100 active:font-bold active:text-opacity-50 max-[480px]:text-lime-800 max-[480px]:from-neutral-700 max-[480px]:text-base min-[380px]:md:text-lime-500">
        <FaAngleDoubleDown className="text-2xl animate-bounce" />
        {i18next.t('Navbar.Signin')}
      </NavLink>
    );
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_PUBLIC_ROOT_URL + "/log-out");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to log out.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between">
      <div onClick={() => setToggleDropdown((prev) => !prev)} className="justify-center cursor-pointer sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm shadow-xl rounded-lg text-white shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm">
        <div className="text-center">
          <h2 className="font-semibold">{user?.username}</h2>
          <p className="text-gray-50">
            Joined:{" "}
          
  {formatDate('2025-08-06')} 

                                                      {/*     {new Date(user?.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                          })} */}
          </p>
        </div>
        <div className="border-t cursor-pointer">
          {toggleDropdown && (
            <button
              onClick={handleLogout}
              className="w-1/2 block rounded-full bg-[#04011427] hover:bg-[#f30f1417] hover:shadow-lg text-white px-10 py-4 text-base hover:text-lg shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}






/* 
import axios from "axios";
import { NavLink } from "react-router";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import i18next from '../../components/utils/i18n';
export default function Credentials() {
 
  const [user, setUser] = useState(null); // Default to null
  const [isFetchingUser, setIsFetchingUser] = useState(true); // Start fetching as true
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_PUBLIC_ROOT_URL + "/fetch-user")
      .then((response) => setUser(response.data.user))
      .catch((error) => console.error("Error fetching user:", error))
      .finally(() => setIsFetchingUser(false)); // Done fetching
  }, []);



  if (isFetchingUser) {
    return (<i className="translate-y-8 text-lg text-lime-400"><FaSpinner className=" fa fa-spinner fa-spin animate-spin" /><p className="translate-y-2  animate-bounce ">Loading...</p></i>); // Show loading while fetching user
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_PUBLIC_ROOT_URL + "/log-out");
      toast.success(response.data.message);

    } catch (error) {
      toast.error("Failed to log out.");
      console.error("Logout error:", error);
    }
  };

  return <div className="flex   justify-between ">

    {user ? (
      <div onClick={() => setToggleDropdown((prev) => !prev)} className="justify-center cursor-pointer  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm  shadow-xl rounded-lg text-white  shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm">

        <div className="text-center ">
          <h2 className="font-semibold">{user?.username}</h2>
          <p className="text-gray-50">
            Joined:{" "}
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="border-t cursor-pointer" >
          {toggleDropdown && (<button
            onClick={handleLogout}
            className="w-1/2 block  rounded-full bg-[#04011427] hover:bg-[#f30f1417]  hover:shadow-lg text-white px-10 py-4 text-base hover:text-lg shadow-lg shadow-[#2A0E61]/50  backdrop-blur-md"
          >
            Log Out
          </button>)}
        </div>
      </div>
    ) : (<NavLink to="/log-in" className="cursor-pointer ml-2 translate-y-1 font-bold border border-slate-400 border-spacing-6 rounded-lg p-4 text-center text-slate-100 active:font-bold active:text-opacity-50 max-[480px]:text-lime-800 max-[480px]:from-neutral-700 max-[480px]:text-base min-[380px]:md:text-lime-500"><FaAngleDoubleDown className="text-2xl animate-bounce" />{i18next.t('Navbar.Signin')}</NavLink>)
    }
  </div>
}
 */