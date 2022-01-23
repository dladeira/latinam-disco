import Article from '../../models/Article'
import User from '../../models/User'

export default async function articleUpdate(req, res) {
    var user = await User.findOne({ username: req.body.username, hash: req.body.hash })

    if (user) {
        return new Promise((resolve, reject) => {
            new Article({
                title: "New article",
                text: "New description",
                index: 0
            }).save(err => {
                console.log(err)
                resolve()
            })
        })
    }
}