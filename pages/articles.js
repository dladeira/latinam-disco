import { ArticlePage } from '../components/pages/articlePage'

function Page({ articles }) {
    return (
        <ArticlePage articles={articles} />
    )
}

Page.getInitialProps = async ({ req }) => {
    if (req) { // SERVER-SIDE
        const res = await fetch(process.env.ORIGIN + "/api/articles")
        const json = await res.json()
        return {
            articles: json
        }
    } else { // CLIENT-SIDE
        const res = await fetch("/api/articles")
        const json = await res.json()
        return {
            articles: json
        }
    }

}

export default Page