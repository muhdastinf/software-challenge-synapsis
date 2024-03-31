import React from 'react'
import TopNavigation from '@/components/topNavigation/topNavigation'

export default function AboutPage() {
  return (
    <>
      <div>
        <TopNavigation />
        <div
        className="flex flex-col justify-center items-center h-lvh text-center text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
        }}
      >
        <div className="font-bold text-[50px]">About News-X</div>
        <div className="font-medium text-[25px]">Est. 2024</div>
      </div>
      </div>
    </>
  )
}
