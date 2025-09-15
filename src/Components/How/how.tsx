import React from 'react'

export default function How() {
  return (
    <div className='absolute flex flex-col items-center justify-center mt-[1300px] w-full'>
        <h1 className='text-3xl text-[#471ede] font-quicksand'>How It Works</h1>
    <div className='absolute flex flex-row items-center justify-center gap-16 mt-[500px] w-full'>
        <div className='h-96 py-5 font-quicksand w-96  px-14 text-3xl text-white flex flex-col rounded-2xl bg-black'>
            <h1>Captures Your Vitals</h1>
            <h1 className='text-xl font-work-sans text-gray-400 mt-10'>A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</h1>
        </div>
        <div className='h-96 w-96 py-5 ml-14 font-quicksand px-14 rounded-2xl text-3xl  text-white bg-black'>
            <h1>Analizing Data by AI</h1>
            <h1 className='text-xl font-work-sans text-gray-400 mt-10'>A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</h1>
        </div>
        <div className='h-96 w-96 py-5 ml-14 px-14 rounded-2xl font-quicksand text-3xl  text-white bg-black'>
            <h1>Suggestion & Predection </h1>
            <h1 className='text-xl font-work-sans text-gray-400 mt-10'>A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</h1>
        </div>
    </div>
    </div>
  )
}