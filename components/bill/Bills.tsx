import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CategoryState, getBills, selectBills } from '../../slices/billSlice';
import NoMoreBills from '../ViewComponents/NoMoreBills';
import Bill from './Bill';

type BillsProps = {
  query: string,
  selected: CategoryState|any
}

const Bills: React.FC<BillsProps> = ({query, selected}) => {
 const bills = useSelector(selectBills)
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getBills());
 }, [])

 const allBills = bills.filter(bill => {
  if(selected.category) {
    return bill.category.includes(selected.category);
  }
  else if (query !== "") {
    return bill.category.includes(selected.category);
  }
  else {
    return true;
  }
  })

  return (
    <div className=" flex flex-row flex-wrap rounded-md shadow font-semibold text-gray-400">
      {
      allBills.length > 0 ?
       allBills.map(bill => (
        <Bill bill={bill} key={bill.id} />
      )):(
        <NoMoreBills />
      )
    }
    </div>
  )
}

export default Bills