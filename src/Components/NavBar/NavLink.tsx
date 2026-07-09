'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  children: React.ReactNode;
  href:string
};

const NavLink = ({ children, href }: NavLinkProps) => {
    const pathName=usePathname()

  return <Link href={href} className={`${pathName===href && 'text-blue-700'} font-bold text-[15px]`}>
    {children}
    </Link>;
};

export default NavLink;