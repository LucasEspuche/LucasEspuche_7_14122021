import { useState } from "react";
import avatar from "../assets/avatar.png"

function Card({ post }) {
    const [comment, setComment] = useState('');

    function handleComment(event) {
        event.preventDefault();
    }

    return (
        <li key={post.id}>
            <div className="contact">
                <img className="contact__avatar"
                    src={avatar}
                    alt="avatar contact"
                />
                <div className="contact__status">
                    <h3>{post.authorId}</h3>
                    <p>{post.createdAt}</p>
                </div>
            </div>
            <p>{post.textContent}</p>
            <img src={post.imgContent} alt="illustration du post" />
            <form action="" onSubmit={handleComment} id="comment-form">
                <img src={avatar} alt="avatar" />
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
                />
            </form>
        </li>
    )
}

export default Card;