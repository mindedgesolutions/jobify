import React from 'react'
import Wrapper from '../wrappers/LogoutContainer'
import { useState } from 'react'
import { useDashboardContext } from '../../pages/DashboardLayout'
import { FaCaretDown, FaUserCircle } from 'react-icons/fa'

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false)
    const data = useDashboardContext()

    const toggleShowLogout = () => {
        setShowLogout(!showLogout)
    }

    return (
        <Wrapper>
            <button type="button" className='btn logout-btn' onClick={toggleShowLogout}>
                <FaUserCircle />
                {data.user ? data.user.name : 'Unknown'}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type="button" className='dropdown-btn' onClick={data.logoutUser}>Logout</button>
            </div>
        </Wrapper>
    )
}

export default LogoutContainer
