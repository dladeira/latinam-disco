import Article from "../../models/Article"
import dbConnect from '../../lib/dbConnect'

export default async function articles(req, res) {
    return new Promise(async (resolve, reject) => {
        await dbConnect()
        Article.find({}, (err, articles) => {
            if (err) {
                return reject()
            }
            res.status(200).send(articles);
            resolve()
        })
    })
}