'use client'
import { useSession, signIn, signOut } from "next-auth/react"


const Header = () => {
      const { data: session } = useSession()

    return (
       <div className="flex justify-between w-11/12 mx-auto mt-2">
        <p>RankRythm</p>
        {
            session?.user?.email && 
        <button className="p-1.5 px-3.5 rounded-md cursor-pointer bg-amber-200" onClick={() => signOut()}>Signin</button>
        }
        <button className="p-1.5 px-3.5 rounded-md cursor-pointer bg-amber-200" onClick={() => signIn()}>Signin</button>
       </div>
    );
};

export default Header;