
import { userDet } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
const layout = async({children}:{children: ReactNode}) => {
    const user=await userDet()
    if(user?.role !=='student'){
        redirect('/')
    }
  return <>{children}</>
};

export default layout;