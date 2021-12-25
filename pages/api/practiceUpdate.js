import Practice from '../../models/Practice'

export default async function articleUpdate(req, res) {
    return new Promise((resolve, reject) => {
        Practice.findOne({ _id: req.body.id }, (err, practice) => {
            if (err) {
                return reject()
            }

            practice.title = req.body.title
            practice.questions = req.body.questions
            practice.answers = req.body.answers
            practice.save().then(() => {
                res.status(200).send({ done: true })
                resolve()
            })
        })
    })
}