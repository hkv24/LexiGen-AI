import { UserButton } from "@clerk/nextjs"
import { Search } from "lucide-react"



function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm border-b-2 bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-xl">
        <Search className="text-primary" />
        <input className="outline-none w-full" type="text" placeholder="Search..." />
      </div>


      <div className="flex gap-5 items-center">
        <h2 className="bg-primary p-2 rounded-full text-xs text-white px-2">
            👉 Join Membership just for $4.99/moonth
        </h2>
        <UserButton />
      </div>
    </div>
  )
}

export default Header