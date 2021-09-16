import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    createdAt: Date,
    username: String,
    hash: String,
    salt: String
})

export default mongoose.models.User || mongoose.model('User', UserSchema)