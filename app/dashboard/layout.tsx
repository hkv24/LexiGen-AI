"use client"
import { RecoilRoot } from "recoil"
import Header from "./_components/Header"
import SideNav from "./_components/SideNav"


function layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <RecoilRoot>
      <div className="bg-slate-100 h-screen">
        <div className="md:w-64 hidden md:block fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">
          <Header />
          {children}
        </div>
      </div>
    </RecoilRoot>
  )
}

export default layout