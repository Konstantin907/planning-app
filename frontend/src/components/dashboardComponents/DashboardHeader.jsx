import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const DashboardHeader = () => {
    const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4 justify-center py-8">

    <div className="flex gap bg-white rounded p-1">
        <img className='h-[20px] w-[30px]' src="/logo.svg" alt="" />
    </div>

    <h1 className="text-white text-xl md:text-2xl bold tracking-wider">
      Hello there, {user.name}
    </h1>
  </div>
  )
}
