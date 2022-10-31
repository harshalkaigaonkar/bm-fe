import { Fragment, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBill, updateBills, addBill, selectBills, BillState, selectCategories } from '../../slices/billSlice';
import SingleInputModal from './SingleInputModal';

export type ModalType = {
  open: boolean,
  setOpen: any,
  bill?: BillState|null,
  deleteModal?: boolean|null,
  budgetModal?: boolean|null,
  budget?: number|null
}

export default function Modal({open, setOpen, bill = null, deleteModal = null}: ModalType) {
  const bills = useSelector(selectBills);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const [id, setId] = useState<string>(bill ? bill.id : uuid())
  const [title, setTitle] = useState<string>(bill ? bill.title : '')
  const [description, setDescription] = useState<string>(bill ? bill.description : '')
  const [category, setCategory] = useState<string>(bill ? bill.category : '')
  const [amount, setAmount] = useState<string>(bill ? bill.amount : '0')
  const [date, setDate] = useState<string>(bill ? bill.date : new Date().toISOString().split("T")[0])
  const [paid, setPaid] = useState<number>(bill ? bill.paid : 0)
  const [catModalOpen, setCatModalOpen] = useState<boolean>(false)
  
  const cancelButtonRef = useRef(null)

  const onSave = () => {
    if(!bills) {
     return alert('No Bills to Update/Add');
    }
    const updateBill: BillState = {
      id,
      title,
      description,
      date,
      category,
      amount,
      paid,
    }
    dispatch(updateBills(updateBill));
    if(typeof window === 'object' && bill) localStorage.setItem("bills", JSON.stringify({
      bills: bills.map((bill:BillState) => {
        if(id === bill.id) 
        return {
          ...updateBill
        };
        return bill;
      }),
    }))
    setOpen(false);
  }
  const onAdd = () => {
    if(!bills) {
      return alert('No Bills to Update/Add');
    }
    if(!title || !description || !amount || !date || !category)
     return alert("Fill all fields!!")
    
     const createdBill: BillState = {
      id,
      title,
      description,
      date,
      category,
      amount,
      paid
    }
    dispatch(addBill(createdBill));
    if(typeof window === 'object') localStorage.setItem("bills", JSON.stringify({
      bills: [
        ...bills,
        createdBill,
      ]
    }))
    setOpen(false);
  }
  const onDelete = () => {
    if(!bills) {
      return alert('No Bills to Update/Add');
    }

    dispatch(deleteBill(id));
    if(typeof window === 'object') localStorage.setItem("bills", JSON.stringify({
      bills: bills.filter((bill: BillState) => bill.id !== id)
    }))
    setOpen(false);
  }
  const onAddNewCategory = () => {
    setCatModalOpen(true);
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {!deleteModal ? (
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 gap-3">
                  <h2 className='text-center font-bold text-xl'>{bill ? "Edit": "New"} Bill Details</h2>
                  <div>
                  <label htmlFor="id" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Id :</label>
                  <input required type="text" readOnly id={`id_${id}`} value={id} onChange={(e) => setId(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Id" />
                  </div>
                  <div>
                  <label htmlFor="title" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Title *</label>
                  <input required type="text" id={`title_${id}`} value={title} onChange={(e) => setTitle(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Title" />
                  </div>
                  <div>
                  <label htmlFor="description" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Description *</label>
                  <input required type="text" id={`description_${id}`} value={description} onChange={(e) => setDescription(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Description" />
                  </div>
                  <div>
                  <label htmlFor="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Amount *</label>
                  <div className='flex flex-row gap-3'>
                    <div className="mb-5 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-30 p-2.5 dark:text-white">$</div>
                    <input required type="number" id={`amount_${id}`} value={parseInt(amount, 10)} onChange={(e) => setAmount(e.target.value.toString())} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Amount" />
                  </div>
                  <div className="inline-flex gap-2 items-center mb-5">
                  {paid === 0 ? <input type="checkbox" id={`checkbox_${id}`} value={paid} onChange={(e) => setPaid(paid ? 0:1)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Paid" /> : <input type="checkbox" id={`checkbox_${id}`} value={paid} checked onChange={(e) => setPaid(paid ? 0:1)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Paid" />}
                  <label htmlFor="paid" className="block text-sm font-medium text-gray-900 dark:text-gray-300">Payed</label>
                  </div>
                  </div>
                  <div>
                  <label htmlFor="category" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Category *</label>
                  <div className='flex flex-row gap-3'>
                    <select id={`category_${id}`} onChange={(e) => setCategory(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {!bill && (
                      <option selected disabled hidden>Select a Category</option>
                    )}
                    {typeof window === 'object' 
                    && JSON.parse(window.localStorage.getItem('categories') || '{}')?.categories?.map((cat: {id: string, category: string}) => {
                      if(cat.category === category)
                      return <option key={cat.id} selected>{cat.category}</option>
                      else
                      return <option key={cat.id}>{cat.category}</option>
                      })}
                    </select>
                    <button
                      type="button"
                      className={`mb-5 w-[35%] inline-flex flex-row items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                      onClick={onAddNewCategory}
                    >
                      New
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-2 mr-1 w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" /></svg>
                    </button>
                  </div>
                  </div>
                  <div>
                  <label htmlFor="date" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Date *</label>
                  <input required type="date" id={`date_${id}`} value={date} onChange={(e) => setDate(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bill Description" />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                      onClick={bill ? onSave : onAdd}
                    >
                      {bill ? "Save": "Add"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                  </div>
                </Dialog.Panel>
                ): (
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Delete Bill
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your account? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {catModalOpen && <SingleInputModal open={catModalOpen} setOpen={setCatModalOpen} />}
    </>
  )
}

