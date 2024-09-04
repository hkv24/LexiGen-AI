"use client"
import { db } from '@/utils/db'
import React, { useEffect, useState } from 'react'
import { AIOutput } from '@/utils/schema'
import { Button } from '@/components/ui/button';
// import TemplateList from '../../_components/TemplateList';

// #Bug -> not able to figure out a way to render the history of that particular user.
// Now the thing being rendered is everything in my database created by any user.


function Body() {
  const [userHistory, setUserHistory] = useState<any[]>([])
  
  const getHistory = async () => {
    try {
        const history = await db.select().from(AIOutput)
        setUserHistory(history)
    } catch (error) {
        console.error('Error fetching history:', error)
    }
  }


  useEffect(() => {
    getHistory()
  }, [])


  const copyToClipboard = (aiResponse: string) => {
    navigator.clipboard.writeText(aiResponse)
  }
  

  return (
    <div>
        {userHistory?.map((item: any, index: number) => {
            return (
                <div key={index} className='flex flex-col gap-2 my-2'>
                    <div className='grid grid-cols-8 p-2'>
                        <p className='col-span-3 flex items-center'>{item.templateSlug}</p>
                        <p className='col-span-3 line-clamp-3'>{item.aiResponse}</p>
                        <p className='flex items-center'>{item.createdAt}</p>
                        <div className='flex items-center'>
                            <Button onClick={() => copyToClipboard(item.aiResponse)} className='bg-transparent text-black'>Copy</Button>
                        </div>
                    </div>
                    <center>
                      <hr className='w-[10%] my-2 border-t-[5px] border-dotted border-t-[#5b7ff4] border-b-0 border-l-0 border-r-0' />
                    </center>
                </div>
                
            )
        })}
    </div>
  )
}

export default Body