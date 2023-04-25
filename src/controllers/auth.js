
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const repository = require('../repository/user.repository')

const auth = async(req, h) => {
    //verifica se usuario existe e e tras dados do banco
    const user = await searchUser(req.payload.email)
    if(user.length > 0){
        //valida senhas caso usuario existir
        const isValidUser = await compare(req.payload.password, user[0].Senha)
        if(isValidUser){
            //gerar Token
            const token = jwt.sign({ username: user[0].Email }, process.env.SECRET);

            const payload = {
                user: user[0].Email,
                name: user[0].Nome,
                token: token
            }
            //retona com sucesso o payload acima
            return h.response(payload).code(200)
        }
        if(!isValidUser){
           return h.response({msg: 'Login ou senha inválidos'}).code(404)
        }
    }if(user.length === 0){
        return h.response({msg: 'Usuário não encontrado'}).code(404)
    }
}

//função para buscar usuario
async function searchUser(Login){
    const userSearch = await repository.searchUser(Login)
    return userSearch
}

async function compare(password, passwordHash){

    const isValidPassword = await bcrypt.compareSync(password, passwordHash, (err, result) => {
    if (result) {
        return result
    } else {
        return false
    }
    });

    return isValidPassword
}

module.exports = {auth}