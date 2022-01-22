import { PracticePage } from '../components/pages/practicePage'

function Page({ problems }) {
    return (
        <PracticePage problems={problems} />
    )
}

Page.getInitialProps = async ({ req }) => {
    if (req) { // SERVER-SIDE
        const res = await fetch(process.env.ORIGIN + "/api/practice")
        const json = await res.json()
        return {
            problems: json
        }
    } else { // CLIENT-SIDE
        const res = await fetch("/api/practice")
        const json = await res.json()
        return {
            problems: json
        }
    }
}

export default Page