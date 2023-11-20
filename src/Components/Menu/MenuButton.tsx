import React from 'react'
import closeButtonIcon from "../../assets/closeButton.svg"
import menuButtonIcon from "../../assets/menuButton.svg"

interface MenuButtonProps {
    menuOpened: boolean
    handleClickMenu: () => void
}
export const MenuButton:React.FC<MenuButtonProps> = ({ menuOpened, handleClickMenu }) => {
    return (
        <img src={menuOpened ? closeButtonIcon : menuButtonIcon} alt="" className={` w-[5vh] transition-all duration-300 bg-white ${menuOpened ? "absolute top-2 left-2 rotate-180 bg-opacity-0" : "absolute top-2 left-2 rotate-0  rounded-2xl"} md:hidden z-30`} onClick={handleClickMenu} />
    )
}
