const repository = require('../repository/user.repository')
const bcrypt = require('bcrypt')

// Criar Usuarios no banco de dados
const create = async(req, h) => {
    //verificar se usuario ja nao existe
    const user = await searchUser(req.payload.email)

    if(user.length === 0){
        //caso nao exista encryptar senha e capturar os dados necessarios
        const hash = await encrypt(req.payload.password)

        const Nome = req.payload.name
        const Email = req.payload.email
        const Password = hash
        
        //registra o usuario
        await repository.register(Nome, Email, Password)
        return h.response({msg: 'Usuário cadastrado com sucesso'}).code(201)
    }else{
        return h.response({msg:'Email ja cadastrado'}).code(400)
    }
}

//função encripta a senha
function encrypt(password){
    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds, function(err, hash) {
        if(err){
            console.log(err);
        } return hash
    });
}


module.exports = {create, auth,}

