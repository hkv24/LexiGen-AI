"use client"
import Image from "next/image"
import { TEMPLATE } from "../../_components/TemplateList"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"

interface PROPS {
    selectedTemplate?: TEMPLATE,
    userFormInput: any,
    loading: boolean
}

function FormSection({loading, selectedTemplate, userFormInput}: PROPS) {
    const [formData, setFormData] = useState<any>()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        userFormInput(formData) // passing it from child to parent component
    }

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
        <Image src={String(selectedTemplate?.icon)} alt="icon" height={70} width={70} />
        <h2 className="font-bold text-2xl mb-2 text-primary">{selectedTemplate?.name}</h2>
        <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

        <form className="mt-6" onSubmit={onSubmit}>
            {selectedTemplate?.form?.map((item, index) => (
                <div key={index} className="my-2 flex flex-col gap-2 mb-7">
                    <label className="font-bold">{item.label}</label>
                    {item.field == 'input' ?
                        <Input name={String(item.name)} required={item?.required} onChange={handleInputChange} />
                        : item.field == 'textarea' ?
                        <Textarea name={String(item.name)} required={item?.required} onChange={handleInputChange} />
                    : null }
                </div>
            ))}
            <Button
                disabled={loading}
                type="submit"
                className="w-full py-6"
            >
                {loading ? <Loader2Icon className="animate-spin" /> : null}
                Whip Up
            </Button>
        </form>
    </div>
  )
}

export default FormSection