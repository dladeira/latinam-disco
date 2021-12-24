import Jumbotron from '../components/home/jumbotron'
import { useUser } from '../lib/hooks'

const Home = () => {
    const user = useUser()

    return (
        <>
            <Jumbotron />
        </>
    )
}

export default Home
