const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();
server.use(express.json());

// Sanity check, first check to see if we are hitting the API CORRECTLY
server.get("/accounts", (req, res) => {
    db.select('*').from('accounts')
    .then(people => {res.status(200).json({data:people})})
    .catch(err => {res.status(500).json({error:err})})
})

// How to check IDs of accounts
server.get("/:id", (req, res) => {
    db.select('*').from('accounts').where({id: req.params.id})
    .then(people => {res.status(200).json({data:people})})
    .catch(err => {res.status(500).json({error:err})})
})

server.delete("/:id", (req, res) => {
    db.select('*').from('accounts')
    .where({id: req.params.id}).del()
    .then(account => {res.status(200).json({data:account})})
    .catch(err => {res.status(500).json({error:err})})
})


// server.delete('/:id', (req, res) => {
//   knex
//     .select('*')
//     .from('accounts')
//     .where({ id: req.params.id })
//     .del()
//     .then((count) => {
//       if (count > 0) {
//         res.status(200).json({ message: `${count} account(s) deleted` })
//       } else {
//         res.status(404).json({
//           message: 'There was no account with that id in our database',
//         })
//       }
//     })
//     .catch((error) => {
//       console.log(error.message)
//       res.status(500).json(error.message)
//     })
// })

module.exports = server;
