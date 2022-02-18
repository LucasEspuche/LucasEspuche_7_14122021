const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (req, res, next) => {
    const { postId, content } = req.body;
    const authorId = req.auth.userId;

    if (!content) {
        return res.status(401).json({
            error: {
                type: "form",
                message: 'Veuillez écrire un message !'
            }
        });
    }
    else {
        try {
            const comment = await prisma.comment.create({
                data: {
                    postId,
                    authorId,
                    content
                }
            });
            res.status(201).json(comment)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
};

exports.getAllComments = async (req, res, next) => {
    const postId = req.body.postId;

    await prisma.comment.findMany({
        where: {
            postId: {
                is: {
                    postId: postId
                }
            }
        },
        include: {
            author: {
                select: {
                    firstname: true,
                    lastname: true
                }
            }
        }
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};