'use strict'
const moment = require('moment');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const User = use("App/Models/User");
/**
 * Resourceful controller for interacting with users
 */
class SessionController {
    async create({ request, auth, response }) {
        try {
            const { login, password } = request.post();
            const isEmail = login.indexOf('@') >= 0;
            console.log(isEmail)
            if (!isEmail) {
                const user = await Database.select("*")
                .from("users")
                .where("cpf", login)
                .first();
                const access = await auth.authenticator("cpf").attempt(login, password);
                return response.status(200).send({ user, access });
            } else {
                const user = await Database.select("*")
                .from("users")
                .where("email", login)
                .first();
                const access = await auth.attempt(login, password);
                return response.status(200).send({ access, user });
            }

        } catch (error) {
            console.log("Erro", error)
            return response.status(400).send({error})
        }
    }
}

module.exports = SessionController
