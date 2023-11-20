import React, { ReactNode } from 'react'
import toast, { Toast } from 'react-hot-toast';

interface CustomToastProps {
    t: Toast;
    children: ReactNode;
    error: boolean
}

export const CustomToast: React.FC<CustomToastProps> = ({ t, children, error }) => {
    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${error ? "text-red-500 border-2 border-red-500" : null}`}
            onClick={() => toast.dismiss(t.id)}
        >
            <div className="flex justify-center p-4 w-full">
                <p className='text-center w-full'>
                    {children}
                </p>
            </div>

        </div>
    )
}
