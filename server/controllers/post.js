const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'desjoxkzn',
    api_key: '217771482337439',
    api_secret: 'YIINCJ74-YMSVuC3aktAxs6zHjk'
});

exports.createPost = async (req, res, next) => {
    const { textContent, imgContent } = req.body;
    const authorId = req.auth.userId;

    if (!textContent) {
        return res.status(401).json({
            error: {
                type: "form",
                message: 'Veuillez écrire un message !'
            }
        });
    }
    else {
        try {
            const post = await prisma.post.create({
                data: {
                    authorId,
                    textContent,
                    imgContent
                }
            });
            res.status(201).json(post)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
};

exports.getAllPosts = async (req, res, next) => {
    const postId = req.body.postId;

    await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    firstname: true,
                    lastname: true,
                    userImg: true
                }
            },
            comments: {
                where: {
                    postId: postId
                },
                include: {
                    author: {
                        select: {
                            firstname: true,
                            lastname: true,
                            userImg: true
                        }
                    }
                }
            }
        }
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = async (req, res, next) => {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });

    const image = post.imgContent.split("/").pop().split(".")[0];

    cloudinary.uploader.destroy(`posts/${image}`,
        { resource_type: "image" },
        async function (error, result) {
            await prisma.post.delete({
                where: {
                    id: postId
                }
            })
                .then(res.status(200).json({
                    message: 'Le post à été supprimé !'
                }))
                .catch(error => res.status(500).json({ error }));
            console.log(result, error)
        });
};