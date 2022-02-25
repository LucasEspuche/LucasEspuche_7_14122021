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

exports.deleteComment = async (req, res, next) => {
    const commentId = parseInt(req.params.id);

    await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
        .then((res) => res.status(200).json({
            message: 'Le commentaire à été supprimé !'
        }))
        .catch(error => res.status(500).json({ error }));
};