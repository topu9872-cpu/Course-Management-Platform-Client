"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  type User =
    | {
        id: string;
        name: string;
        email: string;
        role?: string | null;
        image?: string | null;
      }
    | undefined;

  const { data: session, isPending } = authClient.useSession();
  const user: User = session?.user;

  const NavData = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/courses">Courses</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/privacy">Privacy</NavLink>
    </>
  );

  const Private = (
    <>
      <li>
        <NavLink
          href={
            user?.role === "admin"
              ? "/dashboard/admin"
              : user?.role === "instructor"
              ? "/dashboard/instructor"
              : "/dashboard/student"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          href={
            user?.role === "admin"
              ? "/dashboard/admin/profile"
              : user?.role === "instructor"
              ? "/dashboard/instructor/profile"
              : "/dashboard/student/profile"
          }
        >
          Profile
        </NavLink>
      </li>
    </>
  );

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className=" z-50 fixed  top-0 right-0 left-0 bg-base-100/90 backdrop-blur-md shadow-sm rounded-b-box ">
      <div className="navbar w-[95%]  sm:w-11/12   mx-auto ">
       
        <div className="navbar-start w-auto lg:w-1/2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-1 sm:px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow border border-zinc-200"
            >
              {NavData}
            </ul>
          </div>
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent truncate max-w-30 sm:max-w-none"
          >
            CourseHub
          </Link>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal bg-base-100 gap-4 border border-zinc-300 rounded-full px-6 py-1.5 shadow-xs">
            {NavData}
          </ul>
        </div>

        {/* Navbar End: Auth States & Profile */}
        <div className="navbar-end flex-1 lg:w-1/2">
          {isPending ? (
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <div>
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <h1 className="hidden md:block max-w-25 lg:max-w-38 text-sm font-bold text-blue-500 truncate">
                    {user?.name}
                  </h1>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="cursor-pointer avatar">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-primary rounded-full overflow-hidden">
                        <Image
                          src={user?.image ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 sm:w-52 p-2 shadow border border-zinc-200 gap-1"
                    >
                      <div className="px-2 py-1 font-semibold text-xs text-blue-600 truncate md:hidden">
                        {user?.name}
                      </div>
                      {Private}
                      <div className="divider my-1"></div>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="btn btn-sm btn-error text-white w-full"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <Link className="btn btn-xs sm:btn-sm md:btn-md btn-primary px-2 sm:px-4" href="/login">
                    Login
                  </Link>
                  <Link className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary px-2 sm:px-4 text-[11px] sm:text-sm" href="/registration">
                    <span className="hidden min-[360px]:inline">Registration</span>
                    <span className="min-[360px]:hidden">Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;