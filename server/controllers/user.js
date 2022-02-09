const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    if (firstname && lastname && email && password) {
        bcrypt.hash(password, 10)
            .then(async hash => {
                const result = await prisma.user.create({
                    data: {
                        firstname,
                        lastname,
                        email,
                        password: hash
                    }
                });
                res.status(201).json(result)
            })
            .catch(res.status(401).json({
                error: {
                    type: "email",
                    message: 'Email déjà enregistré !'
                }
            }));
    }
    else {
        res.status(400).json({
            error: {
                type: "form",
                message: 'Formulaire incomplet !'
            }
        })
    }
};

exports.login = async (req, res, next) => {
    await prisma.user.findUnique({
        where: { email: req.body.email }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: {
                        type: "email",
                        message: 'Utilisateur non trouvé !'
                    }
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: {
                                type: "password",
                                message: 'Mot de passe incorrect !'
                            }
                        });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};