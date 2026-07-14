import NavBar from "@/Components/NavBar/NavBar";
import { ReactNode } from "react";
const layout = ({children}:{children: ReactNode}) => {
  return <>
    <NavBar/>
  {children}</>
};

export default layout;