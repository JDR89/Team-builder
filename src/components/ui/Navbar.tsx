import Link from "next/link";

export const Navbar = () => {


  return (
    <div className="navbar bg-base-100">
      {/* <div className="navbar-start">
        <div className="dropdown"> */}
          {/* BOTON HAMBURGUESA */}
          {/* <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        </div> */}

        {/* FIN BOTON HAMBURGUESA */}
      {/* </div> */}

      {/* MENU RESPONSIVE PARA CUANDO AGREGUE PAGINAS */}

      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
         
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div> */}

      {/* <div className="navbar-end hidden md:flex sm:justify-end">
      
        <Link href={"/login"} className="btn">
          Log
        </Link>
      </div> */}
    </div>
  );
};
