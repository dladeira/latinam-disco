import { useState } from 'react'
import styles from './practice.module.scss'

export default function PracticeComponent({ title, questions, answers, id }) {
    var [panelVisible, setPanelVisible] = useState(false);
    var [answersArray, setAnswersArray] = useState([])

    function updateAnswerArray(e) {
        var newInput = [...answersArray]
        for (var i = 0; i < questions.length; i++) {
            newInput[i] = e.target[`question${i}`].value
        }
        setAnswersArray(newInput)
        e.preventDefault()
    }

    function getClassForQuestion(questionIndex) {
        if (answersArray[questionIndex] == null) {
            return ""
        }

        if (answersArray[questionIndex] == answers[questionIndex]) {
            return styles.correct
        }

        return styles.incorrect
    }

    function togglePanel() {
        setPanelVisible(!panelVisible)
        setAnswersArray([]) // Reset questions
    }

    return (
        <>
            {/* Button */}
            <div className={styles.button} onClick={togglePanel}>
                <h1 className={styles.buttonText}>{title}</h1>
            </div>

            {/* Panel */}
            {panelVisible ? (
                <div className={styles.panel}>

                    {/* Control Bar */}
                    <div className={styles.controlBar}>
                        <button className={styles.controlButton} onClick={togglePanel}>CLOSE</button>
                    </div>
                    <h1 className={styles.panelTitle}>{title}</h1>
                    <form id="questionnaire" onSubmit={updateAnswerArray} className={styles.questionsWrapper}>
                        {questions.map((question, questionIndex) => (
                            <div className={styles.questionContainer}>
                                <p className={styles.question}>{question}</p>
                                <input name={"question" + questionIndex} type="text" className={styles.input + " " + getClassForQuestion(questionIndex)} />
                            </div>
                        ))}
                    </form>
                    <button type="submit" form="questionnaire" value="submit" className={styles.checkButton}>Check</button>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}