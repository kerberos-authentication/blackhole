import {Link, useLocation} from "react-router";

const NavLink = (props) => {  const location = useLocation();
  return (
    <Link 
    to={props.href}
     data-active={location.pathname === props.href}
     className="inline-block rounded px-6 py-2 hover:bg-slate-700 data-[active-true]:bg-slate-600">
        {props.children}      
    </Link>
  )
}

export default NavLink
