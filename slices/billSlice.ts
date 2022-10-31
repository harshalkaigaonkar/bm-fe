import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {v4 as uuid} from 'uuid';

// Define a type for the slice state
export type BillState = {
 id: string,
 title: string,
 description: string,
 category: string,
 amount: string,
 date: string,
 paid: number
}

export type CategoryState= {
  id: string,
  category: string,
}

export type BillsState = BillState[] | [];

export type CategoriesState = CategoryState[] | [];

export type InitialStateType = {
  bills: BillsState,
  categories: CategoriesState
  budget: number
}

// Define the initial state using that type

const initialState : InitialStateType = {
 bills : [],
 categories: [],
 budget: 0,
}

export const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    getBills: (state): void => {
     const allBills: string|null = localStorage.getItem('bills') || '{}';
     const allCategories: string|null = localStorage.getItem('categories') || '{}';
     const budget: string|null = localStorage.getItem('budget');
     if(JSON.parse(allBills).bills) 
     state.bills = JSON.parse(allBills).bills;
     else
     state.bills = [];
     if(JSON.parse(allCategories).categories)
     state.categories = JSON.parse(allCategories).categories;
     else {
      const categories = [{
        id: uuid(),
        category: "All Categories"
      }]
      localStorage.setItem("categories", JSON.stringify({categories}))
      state.categories = categories
     }
     if(budget && parseInt(budget, 10)) {
      state.budget = parseInt(budget, 10);
     } else {
      localStorage.setItem('budget', '0')
      state.budget = 0;
     }
    },
    addBill: (state, action: PayloadAction<BillState>): void => {
      state.bills = [
        ...state.bills,
        action.payload
      ];
    },
    updateBills: (state, action: PayloadAction<BillState>): void => {
      const updatedBills = state.bills.map((bill: BillState) => {
        if(bill.id === action.payload.id) {
          return {
            ...bill, 
            title: action.payload.title,
            category: action.payload.category,
            date: action.payload.date,
            description: action.payload.description,
            amount: action.payload.amount,
            paid: action.payload.paid
          }
        }
        return bill;
      });
      state.bills = updatedBills;
    },
    deleteBill: (state, action: PayloadAction<string>) :void => {
      const updatedBills = state.bills.filter((bill: BillState) => bill.id !== action.payload)
      state.bills = updatedBills;
    },
    addNewCategory: (state, action: PayloadAction<CategoryState>): void => {
      state.categories = [
        ...state.categories,
        action.payload
      ]
    },
    updateBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload
    }
  }
})

export const { updateBudget, deleteBill, updateBills, addBill, getBills, addNewCategory } = billSlice.actions

export const selectBills = (state: RootState) => state.bills.bills;
export const selectCategories = (state: RootState) => state.bills.categories;
export const selectBudget = (state: RootState) => state.bills.budget;

export default billSlice.reducer