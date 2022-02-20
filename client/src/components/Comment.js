import styled from 'styled-components';
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import avatar from "../assets/avatar.png";

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
    .content {
        max-width: 67%;
        background-color: #F6F6F6;
        padding: 8px 15px;
        margin: 0px 45px 25px 45px; 
        border: solid 1px #C0C0C0;
        border-radius: 20px;
        }
`

function Comment({ comment }) {

    const commentDate = formatDistance(
        parseISO(comment.createdAt),
        new Date(), {
        addSuffix: true,
        locale: fr
    });

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
            <p className="content">{comment.content}</p>
        </CommentWrapper>
    )
}

export default Comment;