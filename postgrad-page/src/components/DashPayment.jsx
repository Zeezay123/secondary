import { ChevronLeftIcon, ChevronRightIcon } from 'flowbite-react'
import React from 'react'
import { useEffect, useState } from 'react'

 const DashPayment = () => {
  const [tableData, setTableData] = useState([])
//   const [index, setIndex] = useState(0)
  const [limit, setLimit] = useState(10)
  const [pagenum, setPageNum] = useState(1)
  const [tRows, setTRows] = useState('') 
  


  const startIndex = (pagenum - 1) * limit 
 useEffect(()=>{
    const fetchAll = async()=>{
        const res = await fetch(`/api/payment?startIndex=${startIndex}&limit=${limit}`)
        if (!res.ok){
            return res.body
        }

        const data = await res.json()
        setTableData(data.data)
        setTRows(data.total)
     
    } 
    
   fetchAll()
   
   
 },[limit,pagenum])
 console.log(tableData) 
 console.log(limit)

const totalPage = Math.ceil( tRows / limit )

// const handleDownload=()=>{

// }



const tableBody = Array.isArray(tableData) && tableData.length > 0 ? ( tableData.map((data,index)=>{
    return(
               <tr key={index}>
    <td>10</td>
    <td>{data.name}</td>
    <td>{data.email}</td>
    <td>{data.reference}</td>
    <td>₦{data.amount}</td>
    <td>{data.children}</td>
    <td>{new Date(data.created_at).toLocaleDateString( )}</td>
 </tr>
    )
})) : (<div className='grid items-center justify-center p-5 font-[inter] text-xs'> No Data Available yet </div>)



  return (
    <section className=' md:h-fit md:w-fit border-[1px]  mt-10 mx-auto rounded-lg border-slate-200 flex flex-col py-5 px-10 '>
        
        <div className='flex mb-5  gap-2 items-center justify-end'>  <a href='/api/payment/downloadpdf'>
         <div className=' font-[inter] justify-center  text-white text-xs font-bold p-2 rounded bg-blue-700'> Download pdf </div></a> <a href="/api/payment/downloadxl">
         <div className=' font-[inter] justify-center  text-white text-xs font-bold p-2 rounded bg-blue-700' > downlaod excel </div>     </a>  </div>
   <div className='mx-auto'>
            <thead>
            <tr>
                
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Children</th>
                <th>Date</th>
                

            </tr>
            </thead>

            <tbody>
    {tableBody}
            </tbody>
        </div>
     
        <div className='flex  justify-between mt-5 items-center'> 
          
            <div className='text-sm text-gray-600 font-[inter]' >Total number of Payment is {tRows} </div>

           <div className='flex gap-10 items-center'>
           

            <select className='border-[1px] border-slate-600 rounded w-fit px-1 focus:outline-0' value={limit} onChange={(e)=>{setLimit(e.target.value)
                setPageNum(1)}
            }>
             <option value={5}> 5 </option>
             <option value={10}> 10 </option>
             <option value={15}> 15 </option>
             <option value={20}> 20</option>
             <option value={50}> 50</option>
             <option value={75}> 75</option>
             <option value={100}> 100</option>
            </select>
 <div className='font-[inter] text-black text-sm font-semibold'> Page {pagenum} of {totalPage}</div>
          <div className=' flex items-center justify-center gap-2'> 
      <button className={`flex items-center justify-center p-1 border-2 ${pagenum === 1 ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === 1} onClick={()=>setPageNum((p)=> Math.max(p-1,1))}> <ChevronLeftIcon /> </button> 
      <button className={`flex items-center justify-center p-1 border-2 ${pagenum === totalPage ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === totalPage} onClick={()=>setPageNum((p)=>Math.min(p+1,totalPage))}><ChevronRightIcon/> </button>
    </div>     </div>   
          </div>    
        </section>
  )
}

export default DashPayment