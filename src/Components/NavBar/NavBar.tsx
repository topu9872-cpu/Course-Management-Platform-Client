import Link from "next/link";
import NavLink from "./NavLink";

const NavBar = () => {
  const NavData = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/courses">Courses</NavLink>
      <NavLink href="/about">About</NavLink>
    </>
  );
  type User = {
    name: string;
  };
  const user: User = { name: "mahedi hasan topu" };

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
          <ul className="menu menu-horizontal gap-8 border border-zinc-400 rounded-full  px-4 py-2">
            {NavData}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-7">
                  <h1 className="max-w-19 text-[15px] font-bold text-blue-500 hover:max-w-xs truncate transition-all duration-2000 ease-in-out cursor-pointer">
    {user?.name}
  </h1>

  <button className="btn btn-primary shrink-0">
    Logout
  </button>
</div>
          ) : (
            <div>
              <Link href="/login">Login</Link>
              <Link href="/registration">Registration</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
