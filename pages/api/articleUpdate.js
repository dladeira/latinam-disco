import Article from '../../models/Article'
import User from '../../models/User'

export default async function articleUpdate(req, res) {
    var user = await User.findOne({ username: req.body.username, hash: req.body.hash })

    if (user) {
        return new Promise((resolve, reject) => {
            Article.findOne({ _id: req.body.id }, (err, article) => {
                if (err) {
                    return reject()
                }

                article.title = req.body.title
                article.text = req.body.text
                article.index = req.body.index
                article.save().then(() => {
                    res.status(200).send({ done: true })
                    resolve()
                })
            })
        })
    }
}