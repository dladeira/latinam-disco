import Link from 'next/link'

import styles from './indexPage.module.scss'

export default () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Latinam Disco</h1>
            <h2 className={styles.subtitle}>Learn latin <i>with ease</i></h2>
            <div className={styles.buttonWrapper}>
                <Link href="/articles"><button className={styles.button}>intra</button></Link>
            </div>
        </div>
    )
}