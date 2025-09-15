import React from 'react'
import about from '../../../src/assets/aboutt.png'
import { LampDemo } from '../Background/lamp'
import { useNavigate } from 'react-router-dom'
import CountUp from 'react-countup'
export default function About() {
  const navigate = useNavigate()
  return (
    <>
    <div className='absolute mt-[150px] flex flex-row-reverse ml-24'>
        {/* <img className='object-cover mr-14 h-96 rounded-2xl'  src={about}/> */}
        <div className='w-full mr-20'>
          <LampDemo/>
        </div>
        {/* <h1 className='text-3xl font-quicksand'>About Us</h1> */}
        <div className='flex flex-col pr-56 gap-6'>
            <h1 className='text-7xl text-[#283142f9] font-semibold font-Lato'>Connect, Learn and Thrive with<br/><h1 className="bg-gradient-to-r from-[#273755f9] via-cyan-500 to-[#30CFD0] inline-block text-transparent bg-clip-text">Academo</h1> at SRM</h1>
            <h1 className='text-[16px] text-gray-600 font-medium pr-10 font-work-sans'>Join the Academo community for SRM students, collaborate with peers, access exclusive resources, and achieve academic excellence together, to make the academic better.</h1>
            <div className='flex flex-row gap-10'>
            <button onClick={()=>navigate('Dash')} className="p-4 w-56 rounded-full text-[17px] bg-[#273755f9] text-white font-Lato">
            Explore Now
            </button>
            <button className="p-4 w-56 rounded-full text-[17px] bg-[#ffffff] text-black border-2 border-stone-400 font-Lato">
            Login
           </button>
            </div>
            <div className='flex flex-row gap-24'>
              <div className='flex flex-col'>
                <CountUp end={50} suffix="k+" className='text-5xl font-Lato font-extrabold text-[#283142f9]'/>
                <h1 className='text-gray-600 font-work-sans'>Student <br/> Registered</h1>
              </div>
              <div className='flex flex-col'>
                <CountUp end={500} suffix="+" className='text-5xl font-Lato font-extrabold text-[#283142f9]'/>
                <h1 className='text-gray-600 font-work-sans'>Faculty</h1>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}
