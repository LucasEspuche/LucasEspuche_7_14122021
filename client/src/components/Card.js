import { useState } from "react";
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import avatar from "../assets/avatar.png"

function Card({ post }) {
    const [comment, setComment] = useState('');
    
    const postDate = formatDistance(
        parseISO(post.createdAt),
        new Date(), {
        addSuffix: true,
        locale: fr
    });

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
                    <h3>{post.author.firstname} {post.author.lastname}</h3>
                    <p>{postDate}</p>
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