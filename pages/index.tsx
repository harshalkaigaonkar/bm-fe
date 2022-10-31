import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux';
import { BillsState, CategoryState, selectBills, selectBudget, selectCategories } from '../slices/billSlice';
import MainDashBoard from '../components/MainDashBoard';
import Bills from '../components/bill/Bills';
import Filter from '../components/Filter';
import { useState } from 'react';
import Chart from '../components/chart/Chart';

const Home: NextPage = () => {
  const bills = useSelector(selectBills);
  const categories = useSelector(selectCategories);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<any>({id: "1", category: "All Categories"});
  const [showChart, setShowChart] = useState<boolean>(false)
  const [minUnpaidBills, setMinUnpaidBills] = useState<BillsState>([])
  const [showMinUnpaidBills, setShowMinUnpaidBills] = useState<boolean>(false);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="flex flex-col min-h-screen px-2 md:px-10 bg-slate-100">
      <Head>
        <title>Adithya's Bill Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col">
        <MainDashBoard showChart={showChart} setShowChart={setShowChart} setQuery={setQuery} setSelected={setSelected} setMinUnpaidBills={setMinUnpaidBills} minUnpaidBills={minUnpaidBills} showMinUnpaidBills={showMinUnpaidBills} setShowMinUnpaidBills ={setShowMinUnpaidBills} />
        <div className='inline-flex justify-between items-center w-full py-8 px-3'>
          <div className='inline-flex gap-4'>
            { showChart && <button onClick={() => {
              setQuery("");
              setSelected({id: "1", category: "All Categories"});
              setShowChart(false)
            }} className='p-2 rounded-full bg-gray-300 hover:bg-gray-400 hover:shadow'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg></button>}
            <p className='mb-3 w-fit text-left font-semibold text-2xl'>{showMinUnpaidBills ? "Min. Unpaid Bills Less than Budget" : showChart ? "Time-Series Chart for 2022": "All Bills"} :</p>
          </div>
          {!showMinUnpaidBills && <Filter query={query} setQuery={setQuery} selected={selected} setSelected={setSelected} showChart={showChart} monthNames={monthNames} />}
        </div>
        {showChart && <Chart bills={bills} selected={selected} monthNames={monthNames} />}
        {showMinUnpaidBills && <Bills query={query} selected={selected}  showMinUnpaidBills={showMinUnpaidBills} minUnpaidBills={minUnpaidBills} />}
        {!showChart && !showMinUnpaidBills && <Bills query={query} selected={selected} />}
      
      </main>

      <footer className="flex h-12 w-full items-center justify-center border-t border-t-gray-300 border-gray-400">
       Made with ⚛️
      </footer>
    </div>
  )
}

export default Home
