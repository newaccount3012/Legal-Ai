import { div } from 'framer-motion/client'
import React from 'react'

export default function Feature() {
  return (
    <div className='mt-[2300px] flex flex-col absolute text-center justify-center items-center w-full'>
        <h1 className='text-5xl font-medium font-work-sans mb-6'>Robust Set Of Features</h1>
        <h1 className='text-xl font-medium text-gray-600 font-work-sans'>Explore how our platform can empower your team and<br/>elevate your business to new heights.</h1>
        <div className='flex flex-row items-center font-quicksand gap-10 mt-10 justify-center'>
            <div className='h-56 rounded-xl border-2 border-cyan-500 px-10 text-left flex flex-col  w-[27rem] bg-black'>
                <div className='rounded-full bg-gray-600 text-white mb-5 flex text-center text-xl justify-center items-center mt-5 w-48 h-10'>
                    <h1>Unified Dashboard</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
            <div className='h-56 rounded-xl px-10 text-left flex border-2 border-cyan-500 flex-col  w-[27rem] bg-black'>
            <div className='rounded-full bg-gray-600 mb-5 flex text-white text-center text-xl justify-center items-center mt-5 w-48 h-10'>
                    <h1>Data Management</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
            <div className='h-56 rounded-xl px-10 text-left flex flex-col border-2 border-cyan-500  w-[27rem] bg-black'>
            <div className='rounded-full bg-gray-600 mb-5 flex text-center text-white text-xl justify-center items-center mt-5 w-48 h-10'>
                    <h1>Predictive Analytics</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
        </div>
        <div className='flex flex-row font-quicksand items-center mb-10 gap-10 mt-10 justify-center'>
            <div className='h-56 rounded-xl px-10 text-left flex flex-col  w-[27rem] bg-black border-2 border-cyan-500'>
            <div className='rounded-full bg-gray-600 mb-5 flex text-center text-xl text-white justify-center items-center mt-5 w-48 h-10'>
                    <h1>Financial Managment</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
            <div className='h-56 rounded-xl px-10 text-left flex flex-col  w-[27rem] bg-black border-2 border-cyan-500'>
            <div className='rounded-full bg-gray-600 mb-5 flex text-center text-xl justify-center text-white items-center mt-5 w-48 h-10'>
                    <h1>Unified Dashboard</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
            <div className='h-56 rounded-xl px-10 text-left flex flex-col  w-[27rem] bg-black border-2 border-cyan-500'>
            <div className='rounded-full bg-gray-600 mb-5 flex text-center text-xl justify-center items-center text-white mt-5 w-48 h-10'>
                    <h1>Unified Dashboard</h1>
                </div>
                <h1 className='text-lg text-white'>Centerlized your data and insights in a single, intuitive interface.</h1>
            </div>
        </div>
        </div>
  )
}