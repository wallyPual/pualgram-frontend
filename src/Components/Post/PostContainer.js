import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import "moment/locale/ko"; // i18n 한국
import moment from "moment";
import { TOGGLE_LIKE, ADD_COMMENT, REMOVE_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState(comments);
  const [commentLoader, setCommentLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [triggerState, setTriggerState] = useState(new Date());
  const comment = useInput("");

  // use Mutation & Queries
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const removeCommentMutation = useMutation(REMOVE_COMMENT);

  // Slide
  const slide = useCallback(() => {
    const totalFiles = files.length;

    if (currentItem === totalFiles - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  }, [currentItem, files.length]);

  const toggleLike = () => {
    if (isLikedS) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }

    try {
      toggleLikeMutation();
    } catch {
      setIsLiked(!isLikedS);
      toast.error("Can't register like");
    }
  };

  const onKeyPress = async e => {
    const { keyCode, which } = e;

    if (keyCode === 13 || which === 13) {
      e.preventDefault();
      setCommentLoader(true);
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
        setTriggerState(new Date().getTime());
      } catch {
        toast.error("Can't send comment");
      }
    }

    return;
  };

  const deleteComments = async (e, commentId) => {
    setDeleteLoader(true);
    const {
      data: { removeComment }
    } = await removeCommentMutation({
      variables: {
        commentId
      }
    });

    setSelfComments(
      selfComments.filter(
        removeCommentObj => removeCommentObj.id !== removeComment.id
      )
    );
    setTriggerState(new Date().getTime());
  };

  // useEffect
  useEffect(() => {
    const slides = setTimeout(slide, 3000);

    return () => {
      clearTimeout(slides);
    };
  }, [slide]);

  useEffect(() => {
    setCommentLoader(false);
    setDeleteLoader(false);
  }, [triggerState]);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      createdAt={moment(createdAt).fromNow()}
      newComment={comment}
      caption={caption}
      location={location}
      setLikeCount={setLikeCount}
      setIsLiked={setIsLiked}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      deleteComments={deleteComments}
      commentLoader={commentLoader}
      deleteLoader={deleteLoader}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ),
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
