'use client'
import { useContextData } from '@/context/DataContext'
import React from 'react'

const page = () => {
  const { HistoryData, page, setPage } = useContextData();

  return (
    <div>
        <h2 className="mt-6 text-lg font-semibold">📜 Request History</h2>
        {
            HistoryData?.map((h, i) => (
                <div key={i} className="border p-2 mt-2 bg-white rounded">
                <strong>{h.method}</strong> {h.url}
                <pre className="text-sm mt-1">{JSON.stringify(h.response, null, 2)}</pre>
                </div>
            ))
        }
        <div className="mt-4 flex items-center gap-3">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-200 px-3 py-1">Prev</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)} className="bg-gray-200 px-3 py-1">Next</button>
        </div>
    </div>
  )
}

export default page