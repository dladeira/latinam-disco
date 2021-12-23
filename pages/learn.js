import Article from '../components/learn/article'
import { useUser } from '../lib/hooks'

export default function Learn({ articles }) {
    var user = useUser({ redirectTo: '/' })

    return (
        <>
            {articles.map((article) => <Article title={article.title} text={article.text} id={article._id} />)}
        </>
    )
}

Learn.getInitialProps = async () => {
    const res = await fetch("http://localhost:3000/api/articles")
    const json = await res.json()
    return {
        articles: json
    }
}