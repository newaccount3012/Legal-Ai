import { ReactTyped } from 'react-typed'
import Particles from '../Background/background-gradient-animation'
import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { BorderBeam } from '../Background/border';
import WordRotate from '../Background/word';
import { FlipWords } from '../Background/flipwords';
import { HoverBorderGradient } from '../Background/shine';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate()
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");
    const words = ['healthcare', 'lifestyle']

  return (
  <>
    <div className='mt-16 min-h-screen z-0 absolute mx-auto rounded-3xl bg-black overflow-hidden justify-center items-center w-full max-w-6xl left-1/2 transform -translate-x-1/2 px-6 py-8'>
    <h1 className="mt-8 mb-6 text-primary-gradient text-center text-hero font-work-sans font-bold leading-relaxed">
    Transforming
    <br/><FlipWords className='text-slate-500' words={words}/><br/> through cutting-edge technology
    </h1>
    <p className="mb-8 text-center text-body font-work-sans text-slate-600 max-w-3xl mx-auto px-6 leading-relaxed">
    Our integrated approach ensures you stay ahead in both worlds,<br/>combining expert care with smart financial management.
    </p>
    <div className='flex flex-row z-10 font-work-sans gap-8 mt-6 mb-8 justify-center items-center'>
        <button onClick={()=>navigate('Reg')} className='relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 w-44 rounded-full z-10 font-medium hover:shadow-xl hover:scale-110 transition-all duration-300 group overflow-hidden'>
          <span className='relative z-10'>Try Now</span>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
        </button>
        <button className='relative bg-white/90 backdrop-blur-sm text-slate-700 border-2 border-slate-200/50 hover:border-blue-400 h-14 w-44 rounded-full z-10 font-medium hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'>
          <span className='relative z-10'>Learn More</span>
        </button>
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