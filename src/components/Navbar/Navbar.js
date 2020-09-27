import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <div id={styles.navbar} className='w-full'>
            <div className='container py-4 flex'>
                <div id={styles.navbarTitle}>
                    Matrix calculator
                </div>

                <div id={styles.navbarLinkContainer}>
                    <Link to='/matrix' className={styles.navbarLink}>Matrix calculator</Link>
                    <Link to='/logic' className={styles.navbarLink}>Logic operations</Link>
                </div>
            </div>
        </div>
    )

}