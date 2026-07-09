import Link from "next/link";
import NavLink from "./NavLink";

const NavBar = () => {

const NavData=(
  <>
  <NavLink href='/'>Home</NavLink>
  <NavLink href='/courses'>Courses</NavLink>
  <NavLink href='/about'>About</NavLink>
  </>
)


  return (
    <nav>
      <div className="navbar   w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 p-2 shadow"
            >
            {NavData}
            </ul>
          </div>
        <Link
  href="/"
  className=" text-2xl font-bold bg-linear-to-r  from-blue-500 to-blue-700 bg-clip-text text-transparent"
>
  CourseHub
</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 border rounded-full  px-4 py-2">
           {NavData}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
