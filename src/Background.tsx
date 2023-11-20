import React from 'react'

interface BackgroundProps {
    localList: boolean
}

export const Background:React.FC<BackgroundProps> = ({localList}) => {
    return (
        <div className='absolute top-0 left-0 z-0 h-full w-full'>
            <div className={`absolute top-0 left-0 bg-[url("./assets/bg-local.svg")] w-full h-full bg-cover bg-center z-10 transition-opacity duration-300 ${localList ? "opacity-100" : "opacity-0"}`}></div>
            <div className='absolute top-0 left-0 bg-[url("./assets/bg-public.svg")] w-full h-full bg-cover bg-center z-0'></div>
        </div>
    )
}
