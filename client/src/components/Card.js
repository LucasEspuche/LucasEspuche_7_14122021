import { useState } from "react";
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import avatar from "../assets/avatar.png"
import Comment from '../components/Comment';

function Card({ post, renderComment, setRenderComment }) {
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));

    const postDate = formatDistance(
        parseISO(post.createdAt),
        new Date(), {
        addSuffix: true,
        locale: fr
    });

    async function handleComment(event) {
        event.preventDefault();

        await fetch('http://localhost:4000/api/comment/', {
            method: 'POST',
            body: JSON.stringify({
                "postId": post.id,
                "content": comment
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setRenderComment(renderComment + 1);
            })
        setComment('');
    }

    return (
        <li key={post.id}
            className="card">
            <div className="author">
                <img className="author__avatar"
                    src={post.author.userImg ?
                        post.author.userImg : avatar}
                    alt="avatar auteur"
                />
                <div className="author__status">
                    <h3>{post.author.firstname} {post.author.lastname}</h3>
                    <p>{postDate}</p>
                </div>
            </div>
            <p className="text-content">{post.textContent}</p>
            <img className="img-content"
                src={post.imgContent}
                alt="illustration du post"
            />
            <ul>
                {(post.comments.length > 0)
                    && post.comments.map((comment) => {
                        return (
                            <Comment comment={comment}
                                key={comment.id} />
                        )
                    })}
            </ul>
            <form action="" onSubmit={handleComment} id="comment-form">
                <img
                    src={user.userImg ?
                        user.userImg : avatar}
                    alt="avatar"
                />
                <input
                    className="comment-input"
                    type="text"
                    placeholder="Ecrire un commentaire..."
                    aria-label="commentaire"
                    name="commentaire"
                    id="comment"
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />
                <input
                    className="submit-input"
                    type="submit"
                    value="publier"
                    disabled={!comment}
                />
            </form>
        </li>
    )
}

export default Card;