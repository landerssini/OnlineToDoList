import React from 'react'
import deleteIcon from "../../assets/delete.svg"
import checkBoxEmpty from "../../assets/checkBoxEmpty.svg"
import checkBoxFilled from "../../assets/checkBoxFilled.svg"
import { Item } from '../../App';

interface ListItemProps {
    item: Item;
    handleDeleteListItem: (id: Item["id"]) => void
    handleChangeCompletedTask: (id: Item["id"]) => void
    index: number
}
export const ListItem: React.FC<ListItemProps> = ({ item, handleDeleteListItem, handleChangeCompletedTask }) => {
    return (
        <li className={`flex p-3 h-14 items-center bg-white rounded-xl gap-3 ${item.completed ? 'bg-opacity-60 transition-opacity duration-300 ease-in-out ' : 'bg-opacity-100 transition-opacity duration-300 ease-in-out'}`}>
            <p className='truncate flex-1 p-2'>{item.title}</p>
            <button className='' onClick={() => handleChangeCompletedTask(item.id)}>
                <img src={item.completed ? checkBoxFilled : checkBoxEmpty} alt="" className='' />
            </button>
            <button className='ml-auto text-white hover:bg-red-500 rounded-xl focus:ring-red-300 font-medium  text-sm text-center ' onClick={() => handleDeleteListItem(item.id)}>
                <img src={deleteIcon} alt="" className=' p-1 hover:invert' />
            </button>
        </li>
    )
}
