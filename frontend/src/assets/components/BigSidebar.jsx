import React from 'react'
import Wrapper from '../wrappers/BigSidebar'
import { useDashboardContext } from '../../pages/DashboardLayout'
import Logo from './Logo'
import NavLinks from './NavLinks'

const BigSidebar = () => {
    const data = useDashboardContext()

    return (
        <Wrapper>
            <div className={data.showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
