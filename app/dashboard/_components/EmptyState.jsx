import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
     <Image src={'/placeholder.png'} width={300} height={300}/>
     <h2 className='font-medium text-xl text-gray-500'>Create New AI Interior Design for your Room</h2>
   <Button>+ Redesign Room</Button>
    </div>
  )
}

export default EmptyState
