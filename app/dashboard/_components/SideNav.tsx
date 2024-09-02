"use client"
import { FileClock, Home, Settings, WalletCards } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import CreditUsageTrack from "./CreditUsageTrack"
import Link from "next/link"


function SideNav() {
    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        }
    ]

    const path = usePathname()

  return (
    <div className="h-screen relative border p-5 shadow-md bg-white">
        <div className="flex justify-center">
            <Image src={'/logo.svg'} alt="Brand-Logo" width={60} height={60} />
        </div>


        <center>
            <hr className='w-[50%] my-5 border-t-[5px] border-dotted border-t-[#5b7ff4] border-b-0 border-l-0 border-r-0' />
        </center>


        <div className="mt-5">
            {MenuList.map((menu, index) => (
                <Link key={index} href={menu.path}>
                    <div className={`flex gap-2 p-3 mb-2 cursor-pointer
                    hover:bg-primary hover:text-white rounded-lg items-center
                    ${path == menu.path && 'bg-primary text-white'}`}>
                        <menu.icon className="h-6 w-6" />
                        <h2 className="text-lg" >{menu.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
        <div className="absolute bottom-10 left-0 w-full">
            <CreditUsageTrack />
        </div>
    </div>
  )
}

export default SideNav