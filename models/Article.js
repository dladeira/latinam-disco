import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title: String,
    text: String,
    index: Number
})

export default mongoose.models.Article || mongoose.model('Article', articleSchema)