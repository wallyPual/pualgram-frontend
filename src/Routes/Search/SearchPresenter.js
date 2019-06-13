import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
`;

const PostSection = styled(Section)`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
`;

const SearchPresenter = ({ searchTerm, data, loading }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text={"Search for something"} />
      </Wrapper>
    );
  } else if (loading) {
    return (
      <Wrapper>
        <Loader size={50} />
      </Wrapper>
    );
  } else if (data) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No users found" />
          ) : (
            data.searchUser.map((user, index) => (
              <UserCard
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
                key={index}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No photos found" />
          ) : (
            data.searchPost.map((post, index) => (
              <SquarePost
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
                key={index}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    searchPost: PropTypes.arrayOf(
      PropTypes.shape({
        files: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired
          })
        ),
        likeCount: PropTypes.number.isRequired
      })
    ),
    searchUser: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
        isFollowing: PropTypes.bool.isRequired,
        isSelf: PropTypes.bool.isRequired
      })
    )
  })
};

export default SearchPresenter;
