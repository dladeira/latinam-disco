import { useUser } from '../lib/hooks'

export default function Practice() {
    var user = useUser({ redirectTo: '/' })

    return (
        <h1>Practice</h1>
    )
}