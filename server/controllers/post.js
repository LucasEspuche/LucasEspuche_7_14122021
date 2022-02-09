const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPost = async (req, res, next) => {
    const { authorId, textContent, imgContent } = req.body;
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
    await prisma.post.findMany()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};