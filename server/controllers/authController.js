const users = require('../models/users')
let id = 1

module.exports = {
  login: (req, res) => {
    let{session} = req
    let { username, password } = req.body
    let found = false;
    users.forEach((current, index) => {
      if (username === current.username && password === current.password) {
        session.user.username = current.username
        found = true
      }
    })
    if (!found) {
      res.status(500).send('Unauthorized')
    } else {
      res.status(200).send(session.user)
    }
  },
  register: (req, res) => {
    let {session} = req
    let { username, password } = req.body
    users.push({id: id++, username: username, password: password})
    session.user.username = username
    res.status(200).send(session.user)
  },
  signout: (req, res) => {
    req.session.destroy()
    res.send(req.session)
  },
  getUser: (req, res) => {
    const { session } = req
    res.status(200).send(session.user)
  }
}