import React from 'react'

interface ChangeToPublicButtonProps {
    publicListCode: string
    handleChangePublic: () => void
}

export const ChangeToPublicButton: React.FC<ChangeToPublicButtonProps> = ({ publicListCode, handleChangePublic }) => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <button className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${publicListCode ? " bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-bl" : " bg-gradient-to-r from-red-400 via-red-500 to-red-600  cursor-not-allowed"}`} onClick={handleChangePublic} >
                Change to public list
            </button>
            <p >{publicListCode ? publicListCode : "No public code saved"}</p>
        </div>
    )
}
