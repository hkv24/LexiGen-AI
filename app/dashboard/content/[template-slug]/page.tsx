"use client"
import Templates from "@/app/(data)/Templates"
import FormSection from "../_components/FormSection"
import OutputSection from "../_components/OutputSection"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { chatSession } from "@/utils/AiModel"
import { useState } from "react"
import { TEMPLATE } from "../../_components/TemplateList"
import { db } from "@/utils/db"
import { AIOutput } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { useRecoilState, useRecoilValue } from "recoil"
import { totalUsageAtom } from "@/app/(atom)/TotalUsageAtom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { userSubscriptionAtom } from "@/app/(atom)/UserSubscriptionAtom"
import { updateCredit } from "@/app/(atom)/UpdateCredit"



interface PROPS {
  params: {
    'template-slug': string
  }
}


function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates.find(item => item.slug === props.params['template-slug'])
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')

  const [updateCreditUsage, setUpadteCreditUsage] = useRecoilState(updateCredit)

  const isUserSubscribed = useRecoilValue(userSubscriptionAtom)

  const router = useRouter()

  const totalCreditUsed = useRecoilValue(totalUsageAtom)

  const {user} = useUser()

  const GenerateResponse = async (formData: any) => { // AI response
    if(totalCreditUsed >= 50000&&!isUserSubscribed) {
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          You are out of credit. Upgrade Now!
        </AlertDescription>
      </Alert>

      router.push('/dashboard/billing')
      
      return ;
    }
    setLoading(true)
    const SelectedPrompt = selectedTemplate?.aiPrompt

    const FinalAiPrompt = JSON.stringify(formData)+", "+SelectedPrompt;

    const result = await chatSession.sendMessage(FinalAiPrompt)

    setAiOutput(result?.response.text())
    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text())
    setLoading(false)

    setUpadteCreditUsage(Date.now())
  }

  const SaveInDb = async (formData: any, slug: any, aiResponse: string) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      throw new Error("User's email address is not available");
    }
    
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResponse,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD/MM/yyyy')
    })

    console.log(result)
  }

  return (
    <div className="p-10">
      <Link href={'/dashboard'}>
        <Button> <ArrowLeft /> Back </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* passing it from child to parent component (userFormInput) */}
        <FormSection loading={loading} selectedTemplate={selectedTemplate} userFormInput={(v: any) => GenerateResponse(v)} />

        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent