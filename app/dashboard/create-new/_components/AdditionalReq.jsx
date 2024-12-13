import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function AdditionalReq({AdditionalReqInput}) {
  return (
    <div className='mt-5'>
        <label className='text-gray-500'>Enter Additional Requirments(Optional)</label>
       <Textarea className="mt-3" onChange={(e)=>AdditionalReqInput(e.target.value)}/>
    </div>
  )
}

export default AdditionalReq
