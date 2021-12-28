import styles from './jumbotron.module.scss'
import Link from 'next/link'
import { useUser } from '../../lib/hooks'

export default function Jumbotron() {
    const user = useUser()
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Latinam Disco</h1>
            <h2 className={styles.subtitle}>Learn latin <i>with ease</i></h2>
            <Link href="/learn"><button className={styles.button}>intra</button></Link>
        </div>
    )
}