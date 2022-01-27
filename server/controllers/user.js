const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const result = await prisma.user.create({
        data: {
            firstname,
            lastname,
            email,
            password
        }
    });
    res.json(result)
};