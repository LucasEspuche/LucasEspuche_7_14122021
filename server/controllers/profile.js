const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'desjoxkzn',
    api_key: '217771482337439',
    api_secret: 'YIINCJ74-YMSVuC3aktAxs6zHjk'
});

exports.getProfile = async (req, res, next) => {
    const userId = req.auth.userId;

    await prisma.user.findUnique({
        where: {
            id: userId
        }
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
};

exports.deleteProfile = async (req, res, next) => {
    const userId = req.auth.userId;

    const user = await prisma.post.findUnique({
        where: {
            id: userId
        }
    });

    const photo = user.userImg.split("/").pop().split(".")[0];

    cloudinary.uploader.destroy(`users/${photo}`,
        { resource_type: "image" },
        async function (error, result) {
            await prisma.user.delete({
                where: {
                    id: userId
                }
            })
                .then(() => res.status(200).json({
                    message: 'Profil supprimé !'
                }))
                .catch(error => res.status(500).json({ error }))
            console.log(result, error)
        });
};

exports.updateProfile = async (req, res, next) => {
    const userId = req.auth.userId;

    await prisma.user.update({
        where: {
            id: userId
        },
        data: profileData
    })
        .then(() => res.status(200).json({
            message: 'Profil modifié !'
        }))
        .catch(error => res.status(500).json({ error }))
};