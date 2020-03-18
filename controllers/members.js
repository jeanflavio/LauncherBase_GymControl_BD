const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.index = function(req, res) {
    return res.render("members/index", { members : data.members })
}




exports.create = function(req, res) {
    return res.render('members/create')
}


// POST

exports.post = function(req, res) {
    // req.query
    // req.body
    const keys = Object.keys(req.body) //constrói um objeto

    for (key of keys) {
            // req.body.avatar_url == ""
       if (req.body[key] == "")
            return res.send('please, fill al fields!')
    }

    birth = Date.parse(req.body.birth) // retorna data de nascimento em timestamp

    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }
    
    data.members.push({
        ...req.body,
         id,
         birth
    }) // [{...}] //inserindo dados no array

    //Função para escrever os dados em um arquivo JSON
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect(`/members/${id}`)
    })

    //return res.send(req.body)
}

//SHOW
exports.show = function(req, res) {
    // req.query.id
    // req.body - pega os dados do corpo do formulário
    // re.params.id = /:id/:member
    const { id } = req.params // retirando do req.params fazendo que ele seja uma variavel

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")


    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member })
}

// EDIT
exports.edit = function(req, res) {
    
    // req.query.id
    // req.body - pega os dados do corpo do formulário
    // re.params.id = /:id/:member
    const { id } = req.params // retirando do req.params fazendo que ele seja uma variavel

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

//PUT 

exports.put = function(req, res) {

    const { id } = req.body // retirando do req.body fazendo que ele seja uma variavel
    let index = 0


    const foundMember = data.members.find(function(member, foundIndex){ //index para saber em qual posição vai estar
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })

}

// DELETE
exports.delete = function(req, res) {
    const { id }  = req.body

    const filteredMembers = data.members.filter(function(member){

        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return res.send("write file error") 
      
      return res.redirect("/members")
    })
    //("data.json", JSON.stringify(data, null, 2))
}