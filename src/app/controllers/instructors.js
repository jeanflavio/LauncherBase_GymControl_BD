const { age, date } = require('../utils')

const index = function(req, res) {

}
module.exports = {
    index(req, res){
        
        return res.render("instructors/index", { instructors : data.instructors })
    },
    create(req, res){

        return res.render('instructors/create')

    },
    post(req, res){

    // req.query
    // req.body
    const keys = Object.keys(req.body) //constrói um objeto

    for (key of keys) {
            // req.body.avatar_url == ""
       if (req.body[key] == "")
            return res.send('please, fill al fields!')
    }

    let {avatar_url, birth, name, services, gender} = req.body 

    birth = Date.parse(birth) // retorna data de nascimento em timestamp
    const created_at = Date.now() //retorna quando foi criado o cadastro
    const id = Number(data.instructors.length + 1) // cria um id e transforma em numero

    
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) // [{...}] //inserindo dados no array

    //Função para escrever os dados em um arquivo JSON
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })

    //return res.send(req.body)

    },
    show(req, res){
          // req.query.id
    // req.body - pega os dados do corpo do formulário
    // re.params.id = /:id/:member
    const { id } = req.params // retirando do req.params fazendo que ele seja uma variavel

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","), //separa por virgula os dados do json
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at), //formata a data para o padrão brasileiro
    }

    return res.render("instructors/show", { instructor })
    },
    edit(req, res){
         // req.query.id
    // req.body - pega os dados do corpo do formulário
    // re.params.id = /:id/:member
    const { id } = req.params // retirando do req.params fazendo que ele seja uma variavel

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })

    },
    put(req, res){

    },
    delete(req, res){

    },
}


exports.index = function(req, res) {
}

exports.create = function(req, res) {
    
}

// CREATE

exports.post = function(req, res) {
  
}

//SHOW
exports.show = function(req, res) {
  
}

// EDIT
exports.edit = function(req, res) {
    
   
}

//PUT 

exports.put = function(req, res) {

    const { id } = req.body // retirando do req.body fazendo que ele seja uma variavel
    let index = 0


    const foundInstructor = data.instructors.find(function(instructor, foundIndex){ //index para saber em qual posição vai estar
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/instructors/${id}`)
    })

}

// DELETE
exports.delete = function(req, res) {
    const { id }  = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){

        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return res.send("write file error") 
      
      return res.redirect("/instructors")
    })
    //("data.json", JSON.stringify(data, null, 2))
}