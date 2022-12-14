import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BillsState, BillState, CategoryState, getBills, selectBills } from '../../slices/billSlice';
import NoMoreBills from '../ViewComponents/NoMoreBills';
import Bill from './Bill';

type BillsProps = {
  query: string,
  selected: CategoryState|any,
  minUnpaidBills?: BillsState,
  showMinUnpaidBills?: boolean 
}

const Bills: React.FC<BillsProps> = ({query, selected, showMinUnpaidBills, minUnpaidBills}) => {
 const bills = useSelector(selectBills)
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getBills());
 }, [])

 const allBills = bills.filter(bill => {
  if (selected.category === "All Categories") {
    return true;
  }
  else if(selected.category) {
    return bill.category.includes(selected.category);
  }
  else if (query !== "") {
    return bill.category.includes(selected.category);
  }
  else {
    return parseInt(bill.date.split("-")[1], 10) === new Date().getMonth() + 1;
  }
  })
  return (
    <div className="flex flex-row flex-wrap rounded-md shadow font-semibold text-gray-400">
    {
      showMinUnpaidBills && typeof minUnpaidBills !== 'undefined' ? 
      minUnpaidBills.length > 0 ?  
      minUnpaidBills.map((bill) => (
        <Bill bill={bill} key={bill.id} />
      ))
        :
        (
          <NoMoreBills />
        )
        :
       allBills.length > 0 ?
       allBills.map((bill) => (
        <Bill bill={bill} key={bill.id} />
      ))
      :
      (
        <NoMoreBills />
      )
    }
    </div>
  )
}

export default Bills