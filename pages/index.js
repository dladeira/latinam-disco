import Jumbotron from '../components/home/jumbotron'
import { useUser } from '../lib/hooks'

const Home = () => {
    const user = useUser()

    return (
        <>
            <Jumbotron />
            {user && (
                <>
                    <p>Currently logged in as:</p>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </>
            )}
        </>
    )
}

export default Home
