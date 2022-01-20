import { useUser } from '../lib/hooks'
import Practice from '../components/learn/practice.js'

export default function PracticePage({ practice }) {
    var user = useUser({ redirectTo: '/' })

    return (user ? (
        <>
            {practice.map((article) => <Practice title={article.title} questions={article.questions} id={article._id} answers={article.answers} />)}
        </>
    ) : (
        <>
        </>
    )
    )
}

PracticePage.getInitialProps = async () => {
    const res = await fetch("https://latin.ladeira.eu/api/practice")
    const json = await res.json()
    return {
        practice: json
    }
}
