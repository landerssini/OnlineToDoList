import React, { ReactNode } from 'react'

interface ListProps {
    children: ReactNode
}

export const List: React.FC<ListProps> = ({children}) => {
    return (
        <ul className=' h-1/2 w-3/4 overflow-auto p-3 bg-white bg-opacity-60 rounded-xl gap-3 flex flex-col transition-all'>
            {children}
        </ul>
    )
}
