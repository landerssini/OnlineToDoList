import React from 'react'

interface AddTaskFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export const AddTaskForm: React.FC<AddTaskFormProps> = ({handleSubmit}) => {
    return (
        <form className=' flex flex-col p-3 md:p-7 gap-3 w-3/4 items-center bg-white bg-opacity-60 rounded-xl' onSubmit={handleSubmit}>
            <input type="text" className=' rounded-xl w-full p-1 border-2 border-black' name='addItem' placeholder='Insert list task' required />
            <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br   font-medium rounded-lg text-sm w-fit text-center p-2'>
                Add task to list
            </button>
        </form>
    )
}
