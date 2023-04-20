const repository = require('../repository/user.repository')
const bcrypt = require('bcrypt')

const create = async(req, h) => {
    //fazer validações sobre ususarios ja existentes

    const hash = await encrypt(req.payload.password)

    const Nome = req.payload.name
    const Email = req.payload.email
    const Password = hash

    const res = await repository.register(Nome, Email, Password)
    return h.response({msg: 'Usuário cadastrado com sucesso'}).code(201)
}

const auth = async(req, h) => {
    //fazer validação de senha e login
}


function encrypt(password){
    const saltRounds = 10;

    const hash = bcrypt.hashSync(password, saltRounds, function(err, hash) {
        if(err){
            console.log(err);
        } return hash
    });

    return hash
}

function compare(password){
    // usar bcrypt para comparar as senhas
}


module.exports = {create}

