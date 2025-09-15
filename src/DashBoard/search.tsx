import Particles from '../Components/Background/background-gradient-animation';
import {useState } from 'react';
import { useTheme } from "next-themes";
// import { BorderBeam } from '../Background/border';
// import WordRotate from '../Background/word';
import { FlipWords } from '../Components/Background/flipwords';
// import { HoverBorderGradient } from '../Background/shine';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const navigate = useNavigate()
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");
    const words = ['healthcare', 'lifestyle']

  return (
  <>
    <div className='mt-24 h-[83%] z-0 absolute ml-16 rounded-2xl bg-black overflow-hidden justify-center items-center w-[92%]'>
    <h1 className=" mt-10 h-72 bg-gradient-to-b from-gray-300/70 to-black bg-clip-text text-center text-7xl font-work-sans text-transparent dark:from-slate-900/10 dark:to-white">
    Transforming
    <br/><FlipWords className='text-gray-300/50' words={words}/><br/> through cutting-edge technology
    </h1>
    <h1 className=" h-28 bg-gradient-to-b from-gray-300/70 to-black bg-clip-text text-center text-2xl font-work-sans text-transparent dark:from-slate-900/10 dark:to-white">
    Our integrated approach ensures you stay ahead in both worlds,<br/>combining expert care with smart financial  management.
    </h1>
    <div className='flex flex-row z-10 font-work-sans text-black gap-16 mt-10 justify-center items-center'>
        <button onClick={()=>navigate('Reg')}  className='bg-black text-white border h-12 w-40 rounded-full z-10 '>Try Now</button>
        <button className='bg-white h-12 w-40 rounded-full z-10'>Learn More</button>
    </div>
    <Particles className='absolute inset-0'
      quantity={500}
      ease={80}
      color={color}
      refresh
    />

    </div>
    </>
  )
}