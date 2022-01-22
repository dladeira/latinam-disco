import Link from 'next/link'
import { useUser } from '../../lib/hooks'
import styles from './header.module.scss'

const Header = () => {
    const user = useUser()

    var svg = (
        <svg width="40mm" height="40mm" version="1.1" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
            <rect x="0" y="0" width="26" height="26" ry="5.4157" fill="#9f0807" strokeWidth=".21255" />
            <text transform="scale(.78 .87)" x="0" y="0" fill="#ffdd00" fontFamily="sans-serif" fontSize="33.872px" letterSpacing="0px" strokeWidth=".25404" style={ {"line-height": "1.25" } } xmlSpace="preserve"><tspan x="5" y="24.5" fill="#ffdd00" fontFamily="Z003" fontSize="33.872px" strokeWidth=".25404">L</tspan></text>
        </svg>
    )

    return (
        <nav className={styles.nav}>
            <Link href="/"><h1 className={styles.navItem + " " + styles.navBrand}>{svg}</h1></Link>
            {user ? (
                <>
                    <Link href="/articles"><div className={styles.navItem}>Learn</div></Link>
                    <Link href="/practice"><div className={styles.navItem}>Practice</div></Link>
                    <a href="/api/logout" className={styles.navItem}>Logout</a>
                </>
            ) : (
                <Link href="/login"><h1 className={styles.navItem}>Login</h1></Link>
            )}
        </nav>
    )
}

export default Header