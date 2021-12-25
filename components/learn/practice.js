import { useState } from 'react'
import styles from './practice.module.scss'

export default function Practice({ title, questions, answers, id }) {
    var [display, setDisplay] = useState(styles.hidden);
    var [input, setInput] = useState([])
    

    function updateInput(index, e) {
        var newInput = [...input]
        newInput[index] = e.target.value
        setInput(newInput)
    }

    function toggleDisplay() {
        setDisplay(display == styles.hidden ? styles.enlarged : styles.hidden)
    }

    async function submit(e) {
        console.log(e.target)

        const res = await fetch('/api/practiceUpdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: e.target.title.value, text: e.target.text.value, id: e.target.id.value }),
        })

        e.preventDefault()
    }

    return (
            <>
                <div className={styles.container} onClick={toggleDisplay}>
                    <h1 className={styles.titleText}>{title}</h1>
                </div>
                <div className={display}>
                    <div className={styles.control}>
                        <button className={styles.editBtn} onClick={toggleDisplay}>CLOSE</button>
                    </div>
                    <h1 className={styles.enlargedTitle}>{title}</h1>
                    <div className={styles.textWrapper}>
                        {questions.map((question, questionIndex) => (
                            <div className={styles.questionContainer}>
                                <p className={styles.question}>{question}</p>
                                <input type="text" onChange={updateInput.bind(this, questionIndex)} className={styles.answer + " " + (input[questionIndex] == answers[questionIndex] ? styles.correct : styles.incorrect)} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
}