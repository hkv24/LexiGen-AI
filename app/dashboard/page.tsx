"use client"
import { useState } from "react"
import SearchSection from "./_components/SearchSection"
import TemplateList from "./_components/TemplateList"


function page() {
  const [userSearchInput, setUserSearchInput] = useState<string>()

  return (
    <div>
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      
      <TemplateList userSearchInput={userSearchInput} />
    </div>
  )
}

export default page