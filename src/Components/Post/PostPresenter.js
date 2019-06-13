import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Bubble, CloseLight } from "../Icons";
import Loader from "../Loader";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  text-align: center;
  padding-bottom: 100%;
`;

const File = styled.img`
  max-width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Button = styled.button`
  cursor: pointer;
  ${props => props.theme.resetButton}
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  ${props => props.theme.resetButton}
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.lightGreyColor};
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  outline: none;
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFatText = styled(FatText)`
  margin-right: 5px;
`;

const TextareaBox = styled.div`
  position: relative;
  height: 21px;
`;
const TextareaDimd = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-right: 10px;
  display: flex;
  justify-content: center;
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  selfComments,
  deleteComments,
  commentLoader,
  deleteLoader
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username} />
            <Location>{location}</Location>
          </Link>
        </UserColumn>
      </Header>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              id={file.id}
              src={file.url}
              key={file.id}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <Bubble />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        {selfComments && (
          <Comments>
            {selfComments.map(comment => (
              <Comment key={comment.id}>
                <span>
                  <StyledFatText text={comment.user.username} />
                  {comment.text}
                </span>
                {deleteLoader ? (
                  <Loader size={10} />
                ) : (
                  <DeleteButton onClick={e => deleteComments(e, comment.id)}>
                    <CloseLight size={10} />
                  </DeleteButton>
                )}
              </Comment>
            ))}
          </Comments>
        )}
        <Timestamp>{createdAt}</Timestamp>
        <TextareaBox>
          <Textarea
            value={newComment.value}
            onChange={newComment.onChange}
            placeholder={"Add a comment"}
            onKeyPress={onKeyPress}
          />
          {commentLoader && (
            <TextareaDimd>
              <Loader size={25} />
            </TextareaDimd>
          )}
        </TextareaBox>
      </Meta>
    </Post>
  );
};
