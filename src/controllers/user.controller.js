const repository = require('../repository/user.repository')
const bcrypt = require('bcrypt')

const create = async(req, h) => {
    const hash = await encrypt(req.payload.password)

    const Nome = req.payload.name
    const Email = req.payload.email
    const Password = hash

    const res = await repository.register(Nome, Email, Password)
    console.log(res, 'resposta banco');
    return h.response(res).code(201)
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



module.exports = {create}

