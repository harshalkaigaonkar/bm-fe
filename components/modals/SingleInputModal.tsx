import { Fragment, useRef, useState } from 'react'
import {v4 as uuid} from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {selectCategories, addNewCategory, CategoryState, updateBudget } from '../../slices/billSlice';
import {ModalType} from './Modal';

export default function SingleInputModal ({open, setOpen, budgetModal, budget}: ModalType) {
 
 const categories = useSelector(selectCategories);
 const dispatch = useDispatch();
 
 const [newCategory, setNewCategory] = useState<string>("")
 const [updatedBudget, setUpdatedBudget] = useState<any>(budget)
 
 const cancelButtonRef = useRef(null)
 
 const onAddCategory = () => {
  if(!newCategory) return alert('Category cannot be empty string.');
  if(categories.find((category: CategoryState) => category.category === newCategory)) return alert('Category Already Present!');
  const newCategoryAdded = {id: uuid(), category: newCategory};
  dispatch(addNewCategory(newCategoryAdded))
  if(typeof window === 'object') {
   localStorage.setItem('categories', JSON.stringify({
    categories: [
     ...categories,
     newCategoryAdded
    ]
   }))
  }
  setOpen(false)
 }

 const onUpdateBudget = () => {
  dispatch(updateBudget(parseInt(updatedBudget, 10)))
  if(typeof window === 'object')
  localStorage.setItem('budget', updatedBudget.toString())
  setOpen(false)
}
 return (
   <Transition.Root show={open}>
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
   <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
               <h2 className='text-center font-bold text-xl'>{budgetModal ? "Update Budget" : "Add New Category"}</h2>
               <div>
                <label htmlFor="newCategory" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">{budgetModal ? "Budget :" : "Category :"}</label>
                {!budgetModal ? 
                  <input type="text" id={`new_category`} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="mb-5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Category" required /> :
                  <div className='flex flex-row gap-3'>
                      <div className="mb-5 bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-30 p-2.5 dark:text-white">$</div>
                      <input required type="number" id='budget' value={updatedBudget} onChange={(e) => setUpdatedBudget(parseInt(e.target.value, 10))} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Budget" />
                  </div>
                }
               </div>
               </div>
               <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                 <button
                   type="button"
                   className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                   onClick={budgetModal ? onUpdateBudget : onAddCategory}
                 >
                   {budgetModal ? "Update" : "Add"}
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
            </Transition.Child>
           </div>
          </div>
         </Dialog>
       </Transition.Root>
 )
}
