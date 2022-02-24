const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUser = async (req, res, next) => {
    const userId = req.auth.userId;

    await prisma.user.findUnique({
        where: { id: userId }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: {
                        message: 'Utilisateur non trouvé !'
                    }
                });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json({ error }))
}