import Link from 'next/link'
import { useUser } from '../../lib/hooks'
import styles from './header.module.scss'

const Header = () => {
    const user = useUser()

    return (
        <nav className={styles.nav}>
            <Link href="/"><h1 className={styles.navItem + " " + styles.navBrand}>Disco Latinam</h1></Link>
            {user ? (
                <>
                <Link href="/learn"><h1 className={styles.navItem + " " + styles.navAuth}>Learn</h1></Link>
                <Link href="/practice"><h1 className={styles.navItem + " " + styles.navAuth}>Practice</h1></Link>
                <a href="/api/logout" className={styles.navItem + " " + styles.navAuth}>Logout</a>
                </>
            ) : (
                <Link href="/login">
                    <h1 className={styles.navItem + " " + styles.navAuth}>Login</h1>
                </Link>
            )}
        </nav>
    )
}

export default Header