import styled from 'styled-components';
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import avatar from "../assets/avatar.png";
import remove from "../assets/remove.svg";

const CommentWrapper = styled.li`
    .contact {
        display: flex;
        &__avatar {
            height: 37px;
            width: 37px;
            border-radius: 50%;
            object-fit: cover;
        }
        &__status {
            padding: 0px 10px;
            font-weight: 300;
            display: flex;
            align-items: center;
            h3 {
                padding-right: 10px;
            }
        }
    }
    .comment {
        display: flex;
        align-items: center;
        margin: 0px 0px 25px 45px; 
        &__text {
            width: 75%;
            background-color: #F6F6F6;
            padding: 8px 15px;
            border: solid 1px #C0C0C0;
            border-radius: 20px;
        }
        &__delete {
            height: 25px;
            width: 25px;
            margin-left: 7px;
            cursor: pointer;     
        }
    }
`

function Comment({ comment, renderPost, setRenderPost }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const commentDate = formatDistance(
        parseISO(comment.createdAt),
        new Date(), {
        addSuffix: true,
        locale: fr
    });

    async function deleteComment() {
        await fetch(`http://localhost:4000/api/comment/${comment.id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                "id": comment.id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setRenderPost(renderPost - 1);
            })
    }

    return (
        <CommentWrapper key={comment.id}>
            <div className="contact">
                <img className="contact__avatar"
                    src={comment.author.userImg ?
                        comment.author.userImg : avatar}
                    alt="avatar auteur"
                />
                <div className="contact__status">
                    <h3>{comment.author.firstname} {comment.author.lastname}</h3>
                    <p>{commentDate}</p>
                </div>
            </div>
            <div className='comment'>
                <p className="comment__text">{comment.content}</p>
                {(user.userId === comment.authorId)
                    && <img className="comment__delete"
                        src={remove}
                        alt="supprimer commentaire"
                        onClick={deleteComment}
                    />}
            </div>
        </CommentWrapper>
    )
}

export default Comment;