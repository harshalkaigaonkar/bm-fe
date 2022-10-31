import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux'
import { CategoryState, selectCategories } from '../slices/billSlice'

export default function CategoryFilter({query, setQuery, selected, setSelected}: {query: string, setQuery: any, selected: object, setSelected: any}) {
 const categories = useSelector(selectCategories);

 const filteredCategories =
   query === ''
     ? categories
     : categories.filter((category) =>
         category.category
           .toLowerCase()
           .replace(/\s+/g, '')
           .includes(query.toLowerCase().replace(/\s+/g, ''))
       )

 return (
   <div className="top-16 w-72">
     <Combobox value={selected} onChange={setSelected}>
       <div className="relative mt-1">
         <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-lg sm:text-sm">
         <Combobox.Button className="inset-y-0 right-0 flex items-center pr-2 w-full cur">
           <Combobox.Input
             className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
             displayValue={(person: CategoryState) => person.category}
             onChange={(event) => setQuery(event.target.value)}
             placeholder={"Filter by Category"}
           />
             <ChevronUpDownIcon
               className="h-8 w-8 m-2 p-1 text-white bg-gray-600 rounded-md cursor-pointer"
               aria-hidden="true"
             />
           </Combobox.Button>
         </div>
         <Transition
           as={Fragment}
           leave="transition ease-in duration-300"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
           afterLeave={() => setQuery('')}
         >
           <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
             {filteredCategories.length === 0 && query !== '' ? (
               <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                 Nothing found.
               </div>
             ) : (
               filteredCategories?.map((category) => (
                 <Combobox.Option
                   key={category.id}
                   className={({ active }) =>
                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
                       active ? 'bg-blue-600 text-white' : 'text-gray-900'
                     }`
                   }
                   value={category}
                 >
                   {({ selected, active }) => (
                     <>
                       <span
                         className={`block truncate ${
                           selected ? 'font-medium' : 'font-normal'
                         }`}
                       >
                         {category.category}
                       </span>
                       {selected ? (
                         <span
                           className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                             active ? 'text-white' : 'text-blue-600'
                           }`}
                         >
                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
                         </span>
                       ) : null}
                     </>
                   )}
                 </Combobox.Option>
               ))
             )}
           </Combobox.Options>
         </Transition>
       </div>
     </Combobox>
   </div>
 )
}