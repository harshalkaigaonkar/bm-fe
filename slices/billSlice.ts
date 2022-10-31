import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export type BillState = {
 id: string,
 title: string,
 description: string,
 category: string,
 amount: string,
 date: string,
}

export type CategoryState= {
  id: string,
  category: string,
}

export type BillsState = [
 BillState
] | [];

export type CategoriesState = [
 CategoryState
] | [];

export type InitialStateType = {
  bills: BillsState,
  categories: CategoriesState
}

// Define the initial state using that type

const initialState : InitialStateType = {
 bills : [],
 categories: []
}

export const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    getBills: (state): void => {
     const allBills: string = localStorage.getItem('bills') || '{}';
     const allCategories: string = localStorage.getItem('categories') || '{}';
     if(JSON.parse(allBills).bills) 
     state.bills = JSON.parse(allBills).bills;
     else
     state.bills = [];
     if(JSON.parse(allCategories).categories)
     state.categories = JSON.parse(allCategories).categories;
     else
     state.categories = []
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
    }
  }
})

export const { deleteBill, updateBills, addBill, getBills, addNewCategory } = billSlice.actions

export const selectBills = (state: RootState) => state.bills.bills;
export const selectCategories = (state: RootState) => state.bills.categories;

export default billSlice.reducer