'use strict'
const User = use("App/Models/User");
const Database = use('Database')


class UserController {
    async index({ request, response, view }) {
        try {
            const users = await Database.select("*").from("users");
            return response.json({ users });
        } catch (error) {
            console.log('Erro index: ', error);
            return response.status(400).json({ error });
        }

    }
    async store({ request, response }) {
        try {
            const { nome, email, pais, estado, cep, rua, numero, complemento, cpf, pis, password } = request.post();
           
            const isEmail = await User.find('email', email);
            const isCPF = await User.find('cpf', cpf);
            if (isCPF) {
              return response.status(400).send('CPF ja existe');
            }
            if (isEmail) {
              return response.status(400).send('Email já existe');
            }
            const user = await User.create({
                nome, email, pais, estado, cep, rua, numero, complemento, cpf, pis, password
            })
            return response.json({user})
        } catch (e) {
            console.log(e);
            return response.send({ error: 'Verifique os Campos' })
        }
    }
    async show({ params, request, response, view }) {
        try {
            if (params.id) {
                const user = await Database.table("users")
                    .where({ id: params.id })
                    .first();
                return response.json({ user });
            } else {
                const user = await Database.table("users")
                    .where({ id: auth.user.id })
                    .first();
                return response.json({ user });
            }
        } catch (error) {
            console.log('Erro show: ', error);
            return response.status(400).json({ error });
        }
    }

    async update({ params, request, response }) {
        try {
            const {
                nome, email, pais,
                estado, cep, rua, numero,
                complemento, cpf,
                pis, password
            } = request.post();
            const user = await User.find(params.id);
            const isEmail = await User.findBy('email', email);
            const isCPF = await User.findBy('cpf', cpf);
            if (isCPF || isEmail) {
                return response.status(400).send({ error: 'Email ou CPF já existe' });
            }
            user.merge({
                nome, email, pais,
                estado, cep, rua, numero,
                complemento, cpf,
                pis, password
            });
            await user.save();
            return response.json({ user })
        } catch (error) {
            console.log('Erro update: ', error);
            return response.status(400).json({ error });
        }
    }

}

module.exports = UserController
