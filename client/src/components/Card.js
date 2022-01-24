import { useState } from "react";
import avatar from "../assets/avatar.png"

function Card({post}) {
    const [comment, setComment] = useState('');

    function handleComment(event) {
        event.preventDefault();
    }

    return (
        <li key={post._id}>
            <div className="contact">
                <img className="contact__avatar"
                    src={post.userImg}
                    alt="avatar contact"
                />
                <div className="contact__status">
                    <h3>{post.userName}</h3>
                    <p>Il y a 1h</p>
                </div>
            </div>
            <p>{post.userText}</p>
            <img src={post.userFile} alt="illustration du post" />
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