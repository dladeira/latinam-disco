import Practice from "../../models/Practice";

export default async function articles(req, res) {
    return new Promise((resolve, reject) => {
        Practice.find({}, (err, practices) => {
            if (err) {
                return reject()
            }
            
            res.status(200).send(practices);
            resolve()
        })
    })
}