import React from 'react'

interface ConnectToListProps {
    handleSubmitListCode: (event: React.FormEvent<HTMLFormElement>) => void
}

export const ConnectToList: React.FC<ConnectToListProps> = ({ handleSubmitListCode }) => {
    return (
        <form className='flex flex-col items-center  gap-3' onSubmit={handleSubmitListCode}>
            <input type="text" className=' rounded-xl p-1 border-2 border-black' name='listCode' placeholder='Insert list code' />
            <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full'>
                Connect to a public list
            </button>
        </form>
    )
}
