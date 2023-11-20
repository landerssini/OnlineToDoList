import React from 'react'

interface ChangeToLocalButtonProps {
    handleChangeLocal: () => void
}

export const ChangeToLocalButton: React.FC<ChangeToLocalButtonProps> = ({ handleChangeLocal }) => {
    return (
        <div>
            <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={handleChangeLocal} >
                Change to local list
            </button>
        </div>
    )
}
