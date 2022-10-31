import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BillState, selectBills, selectCategories } from '../slices/billSlice';
import Modal from './modals/Modal'

const MainDashBoard: React.FC<any> = ({showChart, setShowChart, setQuery, setSelected}) => {
  const allBills = useSelector(selectBills);
  const monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  useEffect(() => {
    let totalAmt: number = 0;
    allBills?.forEach((bill: BillState) => {
      const month = new Date(bill.date).getMonth();
      const currentMonth = new Date().getMonth();
      if(month === currentMonth)
      totalAmt += parseInt(bill.amount, 10);
    })
    const totalAmtInFormat: string = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(totalAmt)
    setAmt(totalAmtInFormat);
  },[allBills]);

  const [open, setOpen] = useState<boolean>(false);
  const [amt, setAmt] = useState<string>("0");
  const [bills, setBills] = useState<number>(0);
  
  return (
    <div className='m-3 p-5 bg-white h-60 flex flex-row gap-10 items-center justify-evenly border rounded-xl shadow-md'>
      <div className='h-full w-full px-2 pb-4 flex flex-col justify-center items-center font-bold'>
       <h2 className='text-2xl'>Hi,</h2>
       <h2 className='text-4xl'>Adithya</h2>
      </div>
      <div className='h-full w-full flex flex-col items-stretch justify-evenly'>
       <p className="font-light text-md w-full truncate">
         Monthly Billed Amt. for {monthNames[new Date().getMonth()]}
       </p>
        <p className="font-semibold text-2xl"> 
         $ {amt}
        </p>
       <hr />
        <p className="font-light text-md">
         Min. Bills to be Paid for {monthNames[new Date().getMonth()]}
        </p>
        <p className="font-semibold text-2xl"> 
         {bills}
        </p>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-evenly">
       <button 
       className='inline-flex text-lg border-2 rounded-md p-2 w-40 cursor-pointer hover:bg-gray-100 hover:shadow-lg'
       onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-3 my-[2px] w-6 h-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" /></svg>
        Add Bill
       </button>
       <button 
        className='inline-flex text-lg text-center border-2 rounded-md p-2 w-40 cursor-pointer hover:bg-gray-100 hover:shadow-lg'
        onClick={() => {
          setQuery("")
          setSelected({id: new Date().getMonth(), month: monthNames[new Date().getMonth()]});
          setShowChart(!showChart)
        }}>
        {showChart ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-3 my-[2px] w-6 h-6"><path fillRule="evenodd" d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 001.029.696l3.471-1.388 3.472 1.388a.75.75 0 00.556 0l3.472-1.388 3.471 1.388a.75.75 0 001.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0012 1.5zm-.97 6.53a.75.75 0 10-1.06-1.06L7.72 9.22a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06l-.97-.97h3.065a1.875 1.875 0 010 3.75H12a.75.75 0 000 1.5h1.125a3.375 3.375 0 100-6.75h-3.064l.97-.97z" clipRule="evenodd" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-3 my-[2px] w-6 h-6"><path fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.54 15h6.42l.5 1.5H8.29l.5-1.5zm8.085-8.995a.75.75 0 10-.75-1.299 12.81 12.81 0 00-3.558 3.05L11.03 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 001.146-.102 11.312 11.312 0 013.612-3.321z" clipRule="evenodd" /></svg>}
        {showChart ? "View Bills" : "View Chart"}
       </button>
      </div>
      {/* For auto Hydration for fields */}
      {open && <Modal open={open} setOpen={setOpen} />}
    </div>
  )
}

export default MainDashBoard