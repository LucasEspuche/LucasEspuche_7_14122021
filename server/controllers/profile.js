const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.STORAGE_NAME,
    api_key: process.env.STORAGE_KEY,
    api_secret: process.env.STORAGE_SECRET
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

    const user = await prisma.user.findUnique({
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
                .then(res.status(200).json({
                    message: 'Profil supprimé !'
                }))
                .catch(error => res.status(500).json({ error }))
            console.log(result, error)
        });
};

exports.updateProfile = async (req, res, next) => {
    const userId = req.auth.userId;
    const { userImg, firstname, lastname } = req.body;

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            userImg,
            firstname,
            lastname
        }
    })
        .then((user) => res.status(200).json({
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            userImg: user.userImg
        }))
        .catch(error => res.status(500).json({ error }))
};