"use client"
import { userSubscriptionAtom } from "@/app/(atom)/UserSubscriptionAtom"
import { Button } from "@/components/ui/button"
import { db } from "@/utils/db"
import { UserSubscription } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { Description } from "@radix-ui/react-alert-dialog"
import axios from 'axios'
import { Loader2Icon } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { useRecoilValue } from "recoil"


function Paid() {
  const [loading, setLoading] = useState<boolean>(false)
  const {user} = useUser()

  const isUserSubscribed = useRecoilValue(userSubscriptionAtom)

  const CreateSubscription = () => {
    setLoading(true)
    axios.post('/api/create-subscription', {})
    .then(response => {
        console.log(response?.data)
        onPayment(response?.data?.id)
    }, (error) => {setLoading(false)})
  }

  const onPayment = (subId: string) => {
    const options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        "subscription_id": subId,
        "name": 'LexiGen AI',
        description: "Monthly Subscription",
        handler: async(resp: any) => {
            console.log(resp)
            if(resp) SaveSubscription(resp?.razorpay_payment_id)
            setLoading(false)
        }
    }

    // @ts-ignore
    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  // After npm run db:push
  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
        email: user?.primaryEmailAddress?.emailAddress || "",
        userName: user?.fullName || "",
        active: true,
        paymentId: paymentId,
        joinDate: moment().format('DD/MM/yyyy')
    })
    console.log(result)
    if(result) window.location.reload();
  }


  return (
    <div className="bg-white rounded-xl flex flex-col items-center justify-center border p-10 hover:border-primary">
      <script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h3 className="font-bold text-xl my-4">Monthly</h3>
      <h1 className=""> <span className="text-4xl font-bold">4.99$</span> /month</h1>
      <ul className="my-4 gap-5 text-xl">
        <li>✓ 500k Words/Month</li>
        <li>✓ 15+ Content Templates</li>
        <li>✓ Unlimited Download & Copy</li>
        <li>✓ 1 Year of History</li>
      </ul>
      <Button disabled={loading} onClick={() => CreateSubscription()} className="flex gap-2 p-5 w-full items-center rounded-full my-5">
        {loading&&<Loader2Icon className="animate-spin" />}
        {isUserSubscribed ? 'Active Plan' : 'Get Started'}
      </Button>
    </div>
  )
}

export default Paid
