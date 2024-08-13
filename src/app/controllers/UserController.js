import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });

            const { name, email, password, admin } = request.body;

            // Verificar se o email já existe
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return response.status(400).json({ error: 'Email já cadastrado' });
            }

            const user = await User.create({
                id: v4(),
                name,
                email,
                password,
                admin,
            });

            return response.status(201).json({
                id: user.id,
                name,
                email,
                admin,
            });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
    }
}

export default new UserController();
