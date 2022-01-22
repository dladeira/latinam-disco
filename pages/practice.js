import { useUser } from '../lib/hooks'
import Practice from '../components/learn/practice.js'

export default function PracticePage({ practice }) {
    var user = useUser({ redirectTo: '/' })

    return (user ? (
        <div className="container">
            {practice.map((article) => <Practice key={article.title} title={article.title} questions={article.questions} id={article._id} answers={article.answers} />)}

            <style jsx>{`
        .container {
          margin: 50px;
        }
      `}</style>
        </div>
    ) : (
        <>
        </>
    )
    )
}

PracticePage.getInitialProps = async ({ req }) => {
    if (req) { // SERVER-SIDE
        const res = await fetch(process.env.ORIGIN + "/api/practice")
        const json = await res.json()
        return {
            practice: json
        }
    } else { // CLIENT-SIDE
        const res = await fetch("/api/practice")
        const json = await res.json()
        return {
            practice: json
        }
    }
}
