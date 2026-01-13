"use client"

import { Toaster as HotToaster } from 'react-hot-toast'

export default function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="z-[100]"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'white',
          color: '#374151',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '16px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  )
}
