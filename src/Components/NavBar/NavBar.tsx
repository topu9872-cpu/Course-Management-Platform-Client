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
    {
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
    </>
  );

  const Private = (
    <>
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
    return null; // অথবা Skeleton
  }


  return (
    <nav>
      <div className="navbar right-0 left-0  fixed z-50 top-0 w-11/12 mx-auto">
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
          <ul className="menu menu-horizontal bg-base-100 gap-8 border border-zinc-400 rounded-full  px-4 py-2">
            {NavData}
          </ul>
        </div>
        <div className="navbar-end">
          {isPending? <div className="h-10 w-10 rounded-full bg-gray-20 animate-pulse" />:(
            <div>
              {user ? (
                <div className="flex items-center gap-7">
                  <h1 className="max-w-19 text-[15px] font-bold text-blue-500 hover:max-w-xs truncate transition-all duration-2000 ease-in-out cursor-pointer">
                    {user?.name}
                  </h1>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} className=" cursor-pointer avatar">
                      <div className="w-18 border-2  border-accent-soft-foreground rounded-full">
                        <Image
                          src={user?.image ?? ""}
                          alt="Profile"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={1}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                      <li>{Private}</li>

                      <button
                        onClick={handleLogout}
                        className="btn btn-primary shrink-0"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-x-5">
                  <Link className="btn btn-primary" href="/login">
                    Login
                  </Link>
                  <Link className="btn btn-primary" href="/registration">
                    Registration
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
