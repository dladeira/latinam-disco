import { useState } from 'react'
import { useUser } from '../../lib/hooks'

import Bubble from '../bubble'
import styles from './practicePage.module.scss'

export function PracticePage({ problems }) {
    const user = useUser({ redirectTo: '/login' })
    var problemRows = toRows(problems)

    return (user ? (
        <div>
            {problemRows.map((articleRow) => {
                return <PracticeRow articles={articleRow} />
            })}
        </div>
    ) : (<div />))
}

function PracticeRow({ articles: problems }) {
    return (
        <div className={styles.row} key={Math.random().toString(36)}>
            {problems.map((problem) =>
                <Bubble title={problem.title}>
                    <h1 className={styles.title}>{problem.title}</h1>
                    <PracticeContent questions={problem.questions} answers={problem.answers} />
                    <p className={styles.tip}>The question will reset when you type in the correct answer</p>
                </Bubble>
            )
            }
        </div>
    )
}

function PracticeContent({ questions, answers }) {
    const [qIndex, setQIndex] = useState(Math.floor(Math.random() * (questions.length)))
    const [qInput, setQInput] = useState("")
    const [hint, setHint] = useState("")

    function submitAnswer(input) {
        console.log(qInput)
        if (answers[qIndex] == input) {

            // Prevent the same question from showing up again
            var newQ = Math.floor(Math.random() * (questions.length))
            while (newQ == qIndex)
                newQ = Math.floor(Math.random() * (questions.length))

            setQIndex(newQ)
            setQInput("")
            setHint("")
        }
    }

    function handleInputChange(e) {
        setQInput(e.target.value)
        submitAnswer(e.target.value)
    }

    function giveUp() {
        setHint(answers[qIndex])
    }

    return (
        <div className={styles.content}>
            <p className={styles.question}>{questions[qIndex]}</p>
            <div className={styles.userControl}>
                <input className={styles.answer} type="text" value={qInput} placeholder={hint} onChange={handleInputChange} />
                <button className={styles.giveUp} onClick={giveUp}>GIVE UP</button>
            </div>
        </div>
    )
}

// HELPER FUNCTIONS

function toRows(articles) {
    var articleRows = [[]]

    for (var article of articles) {
        if (article.index) {
            if (!articleRows[article.index])
                articleRows[article.index] = []

            articleRows[article.index].push(article)
        } else {
            articleRows[0].push(article)
        }
    }

    return articleRows;
}