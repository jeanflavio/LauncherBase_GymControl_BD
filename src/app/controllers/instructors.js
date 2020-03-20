const { age, date } = require('../../lib/utils')


module.exports = {
    index(req, res) {

        return res.render("instructors/index")
    },
    create(req, res) {

        return res.render('instructors/create')

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

        let { avatar_url, birth, name, services, gender } = req.body

            return 
    

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
