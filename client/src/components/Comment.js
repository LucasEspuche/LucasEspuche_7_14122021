import styled from 'styled-components';
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import avatar from "../assets/avatar.png";
import trash from "../assets/trash.svg";

const CommentWrapper = styled.li`
    .author {
        &__status {
            display: flex;
            align-items: center;
            h3 {
                padding-right: 10px;
            }
        }
    }
    .comment {
        display: flex;
        &__text {
            min-width: 67%;
            background-color: #F6F6F6;
            padding: 8px 15px;
            margin: 0px 0px 25px 45px; 
            border: solid 1px #C0C0C0;
            border-radius: 20px;
        }
        &__delete {
            height: 20px;
            width: 20px;
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
            <div className="author">
                <img className="author__avatar"
                    src={comment.author.userImg ?
                        comment.author.userImg : avatar}
                    alt="avatar auteur"
                />
                <div className="author__status">
                    <h3>{comment.author.firstname} {comment.author.lastname}</h3>
                    <p>{commentDate}</p>
                </div>
            </div>
            <div className='comment'>
                <p className="comment__text">{comment.content}</p>
                {(user.userId === comment.authorId)
                    && <img className="comment__delete"
                        src={trash}
                        alt="supprimer commentaire"
                        onClick={deleteComment}
                    />}
            </div>
        </CommentWrapper>
    )
}

export default Comment;