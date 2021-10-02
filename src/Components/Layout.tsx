import React, { Fragment, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { ReactComponent as IconMenu } from '../Assets/menu.svg'
import { ReactComponent as IconMenuOpen } from '../Assets/menu-open.svg'

import { WindowDimensions } from '../Lib'

export default function Layout({ children }: { children: JSX.Element }) {
    let { width } = WindowDimensions()
    const [isMobileNavShow, setIsMobileNavShow] = useState<Boolean | null>(null)

    useEffect(() => {
        setIsMobileNavShow(width >= 768)
    }, [width])

    return (
        <div className='layout'>
            <nav className='layout__header'>{renderMenu()}</nav>
            <main>{children}</main>
        </div>
    )

    function renderMenu() {
        return (
            <Fragment>
                <div className='layout__header__menu-btn'>
                    <i onClick={() => setIsMobileNavShow(!isMobileNavShow)}>{isMobileNavShow ? <IconMenuOpen /> : <IconMenu />}</i>
                </div>
                <div className='layout__header__navigations' style={isMobileNavShow === true ? { display: 'flex' } : { display: 'none' }}>
                    <NavLink to='/' exact className='layout__header__navigation'>
                        <img className='layout__header__navigation--logo' src={require('../Assets/logo.jpg').default} alt='' />
                    </NavLink>
                    <NavLink to='/' exact className='layout__header__navigation' activeClassName='layout__header__navigation--active'>
                        Home
                    </NavLink>
                    <NavLink to='/about' className='layout__header__navigation' activeClassName='layout__header__navigation--active'>
                        About
                    </NavLink>
                </div>
            </Fragment>
        )
    }
}
