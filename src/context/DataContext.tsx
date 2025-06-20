'use client'
 
import { RequestHistory } from '@/entities/RequestHistory'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'  

type DataContextType = {
   setRefreshHistory: Dispatch<SetStateAction<boolean>>   
   HistoryData: Array<RequestHistory>
   loading: boolean
   setLoading: (val: boolean)=> void
   page: number,
   setPage: (val: number)=> void
}
 
export const userDataContext = createContext<DataContextType | undefined>(undefined);

const DataContext = ({children}: {children: ReactNode}) => {
  const [HistoryData, setHistoryData] = useState<Array<RequestHistory>>([])
  const [refreshHistory, setRefreshHistory] = useState<boolean>(false)
  const [authorizationToken, setAuthorizationToken] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<number>(1)


  useEffect(()=> {
    try {
      async function getData() {
        setLoading(true);
        const res = await fetch(`/api/history?page=${page}`, {
          method: "GET"
        })
        setLoading(false); 
        const data = await res.json();   
        setHistoryData(Array.isArray(data) ? data : [])
      } 

      getData();
    } catch(error) {
      console.log(error)
    }
  }, [refreshHistory])

  return (
    <userDataContext.Provider value={{setRefreshHistory, HistoryData, loading, setLoading, setPage, page}}>
         {children}
    </userDataContext.Provider>
  )
}
export const useContextData = ()=> {
    const context = useContext(userDataContext)
    if(context === undefined) {
        throw new Error("Context is undefined")
    }
    return context;
}

export default DataContext

