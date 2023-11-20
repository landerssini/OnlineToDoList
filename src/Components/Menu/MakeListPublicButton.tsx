import React from 'react'

interface MakeListPublicButtonProps {
    handleConvertToPublic: () => void
}
export const MakeListPublicButton: React.FC<MakeListPublicButtonProps> = ({ handleConvertToPublic }) => {
    return (
        <>
            <button className={`text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center`} onClick={handleConvertToPublic}>
                Make this list public
            </button>
        </>
    )
}
