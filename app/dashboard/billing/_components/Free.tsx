"use client"
import { userSubscriptionAtom } from "@/app/(atom)/UserSubscriptionAtom"
import { Button } from "@/components/ui/button"
import { useRecoilValue } from "recoil"



function Free() {
  const isUserSubscribed = useRecoilValue(userSubscriptionAtom)

  return (
    <div className="bg-white rounded-xl flex flex-col items-center justify-center border p-10 hover:border-primary">
      <h3 className="font-bold text-xl my-4">Free</h3>
      <h1 className=""> <span className="text-4xl font-bold">0$</span> /month</h1>
      <ul className="my-4 gap-5 text-xl">
        <li>✓ 50K Words/Month</li>
        <li>✓ 15+ Content Templates</li>
        <li>✓ Unlimited Download & Copy</li>
        <li>✓ 1 Month of History</li>
        <li>❌ 1 Year of History</li>
      </ul>
      <Button disabled={isUserSubscribed} className="bg-gray-500 w-full p-5 rounded-full mt-5">
        {isUserSubscribed ? '---' : "Currently Active Plan"}
      </Button>
    </div>
  )
}

export default Free
