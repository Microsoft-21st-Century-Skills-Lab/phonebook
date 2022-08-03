import express from 'express'
import isEmpty from 'lodash/isEmpty.js'
import auth from './src/middleware/auth.js'
import contacts from './src/registry/contacts.js'
import login from './src/registry/login.js'
import signup from './src/registry/signup.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// use our auth middleware
app.use(auth)

app.get('/contacts', async (_, res) => {
  const data = await contacts()

  res.json(data)
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body

  // our signup function is a binary: successful write | unsuccessful write
  const data = await signup(email, password)

  // if the write was unsuccessful
  if (!data) {
    res.statusCode = 400
    res.json({ message: 'There is an error in your signup data' })

    return res
  }

  res.json({ ok: true })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const data = await login(email, password)

  if (isEmpty(data)) {
    res.statusCode = 400
    res.json({ message: 'Your login data is invalid' })

    return res
  }

  res.json(data)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
