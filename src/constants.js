import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const PHONEBOOK = `${__dirname}/../registry/phonebook.json`

export const USERS = `${__dirname}/../registry/users.json`

export const JWT_SECRET = '3ca749d50e731b64542d'
