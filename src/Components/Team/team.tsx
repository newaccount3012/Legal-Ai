import React from 'react'
import Marquee from 'react-fast-marquee'
import Priyansh from '../../assets/Priyansh.jpg'
import Gyanesh from '../../assets/Gyanesh.jpg'
import Altamash from '../../assets/Altamash.jpg'
import Vri from '../../assets/Vri.jpg'
import Yash from '../../assets/Yash.jpg'
import Rai from '../../assets/Rai.jpg'

export default function Team() {
    const teamMembers = [
        { name: 'Priyansh Neel', img: Priyansh, des: 'IoT & AI Specialist' },
        { name: 'Gyanesh Rai', img: Gyanesh, des: 'Lead Product Designer' },
        { name: 'Altamash Beg', img: Altamash, des: 'Front-End Developer' },
        { name: 'Yash Bhushan Pandey', img: Yash, des: 'Front-End Developer' },
        { name: 'Priyansh Kumar Rai', img: Rai, des: 'Back-End Developer' },        
      ];
  return (
    <div className='absolute flex flex-col text-center w-full mt-[3100px] '>
      <h1 className='text-3xl text-[#471ede] font-quicksand'>Meet The Team</h1>
      <h1 className='text-5xl font-medium font-work-sans mt-5'>Our Ortan Team Members</h1>
      <Marquee pauseOnHover>
        {teamMembers.map((member, index) => (
          <div key={index} className='relative h-[33rem] mb-10 w-[19rem] mt-10 ml-10 rounded-2xl bg-black overflow-hidden'>
            <img src={member.img} className='h-full w-full object-cover rounded-2xl'/>
            <div className='absolute bottom-0 left-0 w-full bg-opacity-75 bg-black text-white p-4 rounded-b-2xl'>
              <h2 className='text-2xl font-bold'>{member.name}</h2>
              <p className='text-sm'>{member.des}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}