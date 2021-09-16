import crypto from 'crypto'
import dbConnect from './dbConnect'
import User from '../models/User'
import { v4 as uuidv4 } from 'uuid'

export async function createUser({ username, password }) {
    await dbConnect();

    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    const userData = {
        id: uuidv4(),
        createdAt: Date.now(),
        username,
        hash,
        salt,
    }

    var user = await new User(userData).save()

    return user
}

export async function findUser(data) {
    await dbConnect();
    const userFound = await User.findOne(data)
    return userFound
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex')
    const passwordsMatch = user.hash === inputHash
    return passwordsMatch
}
