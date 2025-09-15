import React from 'react'
import { InfiniteMovingCards } from '../Background/manq'
import logo1 from '../../assets/logo1-modified.png'
import logo2 from '../../assets/logo2-modified.png'
import logo3 from '../../assets/logo3-modified.png'
import Marquee from 'react-fast-marquee';

export default function Partners () {
  return (
    <div className='absolute mt-[1870px] h-auto rounded-md flex flex-col w-[87rem] antialiased bg-transparent ml-16 items-center justify-center overflow-hidden'>
        <h1 className='text-3xl text-[#471ede] font-quicksand mb-10'>Our Partnered Hosptials</h1>
        <Marquee pauseOnHover>
          <img src={logo1}/>
          <img src={logo2}/>
          <img src={logo3}/>
          <img src={logo1}/>
        </Marquee>
    </div>
    
  )
  
}