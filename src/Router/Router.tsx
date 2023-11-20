import { Route, Routes } from 'react-router-dom'
import App from '../App'

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/:paramListCode' element={<App />} />
        </Routes>
    )
}