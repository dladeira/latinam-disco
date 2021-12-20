import styles from './jumbotron.module.scss'
import Link from 'next/link'
import { useUser } from '../../lib/hooks'

export default function Jumbotron() {
    const user = useUser()
    return (user ? (
        <div className={styles.container}>
            <h1 className={styles.title}>Disco Latinam</h1>
            <h2 className={styles.subtitle}>Learn latin <i>with ease</i></h2>
            <Link href="/learn"><button className={styles.button}>intra</button></Link>
        </div>
    ) : (
        <div className={styles.container}>
            <h1 className={styles.title}>Disco Latinam</h1>
            <h2 className={styles.subtitle}>Learn latin <i>with ease</i></h2>
            <Link href="/signup"><button className={styles.button}>intra</button></Link>
        </div>
    ))
}