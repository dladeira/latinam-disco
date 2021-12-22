import Article from "../../models/Article";

export default async function articles(req, res) {
    return new Promise((resolve, reject) => {
        Article.find({}, (err, articles) => {
            if (err) {
                return reject()
            }
            
            res.status(200).send(articles);
            resolve()
        })
    })
}