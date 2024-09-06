"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const {user} = useUser()

  const card = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/16603/16603836.png',
      name: '15+ Templates',
      desc: 'Responsive, and mobile-first project on the web'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/3110/3110076.png',
      name: 'Customizable',
      desc: 'Components are easily customised and extendable'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/2702/2702134.png',
      name: 'Free to Use',
      desc: 'Every component and plugin is well documented'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/9368/9368849.png',
      name: '24/7 Support',
      desc: 'Contact us 24 hours a day, 7 days a week'
    }
  ]

  return (
    <div>
      <div>
        <div className="flex justify-between items-center m-5 mx-20">
          <Image src={'/logo.svg'} height={60} width={60} alt="logo" />
          <div className="flex items-center gap-2 text-primary">
            <h2 className="mx-10 text-xl text-gray-500">|</h2>
            {user ? <UserButton /> : <User />}
            <p className="cursor-pointer" onClick={() => router.push('/dashboard')}>Get Started</p>
          </div>
        </div>
        <hr className="border" />
      </div>


      <div className="flex justify-center mt-64">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl">LexiGen <span className="text-primary">AI</span></h1>
            <p className="text-gray-500">Revolutionize your content creation with our AI-powered app, delivering engaging and high quality text in seconds.</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-br from-purple-800 via-purple-500 to-blue-800">Get Started <ChevronRight /></Button>
        </div>
      </div>


      <div></div>
    </div>
  )
}