import React, { ReactNode } from 'react'
interface ListIdDisplayProps {
    children: ReactNode
}
export const ListIdDisplay: React.FC<ListIdDisplayProps> = ({ children }) => {
    return (
        <p className=' bg-white bg-opacity-60 p-3 text-2xl rounded-xl'>{children}</p>
    )
}
