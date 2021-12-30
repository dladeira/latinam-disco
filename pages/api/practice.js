import Practice from "../../models/Practice"
import dbConnect from '../../lib/dbConnect'

export default async function articles(req, res) {
    return new Promise(async (resolve, reject) => {
        await dbConnect()
        Practice.find({}, (err, practices) => {
            if (err) {
                return reject()
            }
            
            res.status(200).send(practices);
            resolve()
        })
    })
}