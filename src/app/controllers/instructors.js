const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {

        Instructor.all(function(instructors){
            return res.render("instructors/index", { instructors })
        })
        
    },
    create(req, res) {

        return res.render('instructors/create')

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `  

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")

            return res.redirect(`/instructors/${results.row[0].id }`)
        })

    },
    post(req, res) {

        // req.query
        // req.body
        const keys = Object.keys(req.body) //constrói um objeto

        for (key of keys) {
            // req.body.avatar_url == ""
            if (req.body[key] == "")
                return res.send('please, fill al fields!')
        }
        //return res.send(req.body)

    },
    show(req, res) {

        return 
    },
    edit(req, res) {

        return

    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        return

    },
    delete(req, res) {

        return

    },
}
