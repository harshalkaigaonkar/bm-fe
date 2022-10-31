import React, { useState } from 'react'
import type { BillState } from '../../slices/billSlice'
import Modal from '../modals/Modal'

const Bill: React.FC<{bill: BillState}> = ({bill}) => {
 const [openUpdate, setOpenUpdate] = useState(false)
 const [openDelete, setOpenDelete] = useState(false)

 let date: string | any = new Date(bill.date);
 if(date) {
    date = date.toString().split(" ").slice(1, 4).join(" ");
 }
 let amount : string = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(bill.amount);
  return (
   <div className='m-2 w-80'>
    <div className='shadow-md rounded-t-md h-4 bg-blue-900'></div>
    <div key={bill.id} className="p-6  md:max-w-sm bg-white rounded-b-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 border w-fit px-1 py-1 rounded-md">$ {amount}</p>
     <div className="w-full inline-flex justify-between items-center">
     <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bill.title}</h5>
      <h6 className="border px-4 py-1 text-gray-800 rounded-md">{bill.category}</h6>
     </div>
      <p className="mb-3 font-semibold text-gray-500 text-sm">{date}</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bill.description}</p>
      <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenUpdate(true)}>
          Update bill
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 -mr-1 w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      </button>
      <button className="ml-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => setOpenDelete(true)}>
          Delete bill
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 -mr-1 w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      </button>
      {/* For auto Hydration for fields */}
      {
        openUpdate && 
        <Modal open={openUpdate} setOpen={setOpenUpdate} bill={bill} />
      }
      {
        openDelete &&
        <Modal open={openDelete} setOpen={setOpenDelete} bill={bill} deleteModal />
      }
  </div>
  </div>
  )
}

export default Bill