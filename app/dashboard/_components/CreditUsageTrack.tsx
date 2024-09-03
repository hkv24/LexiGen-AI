"use client"
import { Button } from "@/components/ui/button"
import { db } from "@/utils/db"
import { AIOutput, UserSubscription } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import { HISTORY } from "../history/page"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { totalUsageAtom } from "@/app/(atom)/TotalUsageAtom"
import { userSubscriptionAtom } from "@/app/(atom)/UserSubscriptionAtom"
import { updateCredit } from "@/app/(atom)/UpdateCredit"



function CreditUsageTrack() {
  const {user}: any = useUser()
  const [totalUsage, setTotalUsage] = useRecoilState(totalUsageAtom)
  // Need to make totalUsage as recoil-atom so as to make sure that as soon as the user reaches
  // his/her word limit. Need to stop our service.
  const setIsUserSubscribed = useSetRecoilState(userSubscriptionAtom)
  const [maxWords, setMaxWords] = useState<number>(50000)

  const updateCreditUsage = useRecoilValue(updateCredit)


  // #Bug -> fixed: instantly refresh as soon as the user uses his/her credit.
  useEffect(() => {
    if(user) GetData();
  }, [updateCreditUsage, user])



  const GetData = async () => {
    {/* @ts-ignore */}
    const result: HISTORY[] = await db.select().from(AIOutput)
    .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

    GetTotalUsage(result)
  }

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element: any) => {
        if (element.aiResponse) total += Number(element.aiResponse.length)
    })
    setTotalUsage(total)
  }

  const IsUserSubscribed = async () => {
    const result = await db.select().from(UserSubscription)
    .where(eq(UserSubscription?.email, user?.primaryEmailAddress?.emailAddress))

    if(result) {
      setIsUserSubscribed(true);
      setMaxWords(500000);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await GetData();
        await IsUserSubscribed();
      }
    }
    fetchData()
  }, [user]);


  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage/maxWords)*100}%` }}
          >

          </div>
        </div>
        <h2 className="text-sm my-2">{totalUsage} / {maxWords} Credits Used</h2>
      </div>
      <Button variant={"link"} className="w-full my-3">Upgrade</Button>
    </div>
  )
}

export default CreditUsageTrack
