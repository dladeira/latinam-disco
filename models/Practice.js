import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title: String,
    questions: Array,
    answers: Array
})

export default mongoose.models.Practice || mongoose.model('Practice', articleSchema)