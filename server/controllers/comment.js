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