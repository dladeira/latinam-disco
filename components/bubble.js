import { useState } from 'react'

import styles from './bubble.module.scss'

export default ({ children, title }) => {
    var [display, setDisplay] = useState(false);

    function toggleDisplay() {
        setDisplay(!display)
    }

    return (
        <>
            <div className={styles.bubble} onClick={toggleDisplay}>
                <div className={styles.bubbleTitle}>{title}</div>
            </div>

            {!display ? <div /> : (
                <div className={styles.content}>
                    <div className={styles.close} onClick={toggleDisplay}>X</div>
                    {children}
                </div>
            )}
        </>
    )
}