import React, { Fragment } from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  max-width: 350px;
  width: 100%;
`;

const Link = styled.button`
  color: ${props => props.theme.blueColor};
  ${props => props.theme.resetButton};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`;

const Form = styled(Box)`
  padding: 40px 40px 30px;
  margin-bottom: 15px;
  width: 100%;
  form {
    input {
      width: 100%;
      &:not(:first-child) {
        margin-top: 7px;
      }
    }
    button {
      margin-top: 15px;
      font-weight: 600;
    }
  }
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Container = styled.h1`
  padding: 20px 0 40px;
  font-size: 60px;
  font-family: "Cookie", cursive;
  text-align: center;
`;

const Logo = ({ text }) => <Container>{text}</Container>;

export default ({
  action,
  username,
  email,
  firstName,
  lastName,
  setAction,
  onLogin
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" ? (
        <form onSubmit={onLogin}>
          <Logo text="Pualgram" />
          <Input placeholder="이메일" {...email} />
          <Button text={"로그인"} />
        </form>
      ) : (
        <form onSubmit={onLogin}>
          <Logo text="Pualgram" />
          <Input placeholder="이름" {...firstName} />
          <Input placeholder="성" {...lastName} />
          <Input placeholder="이메일" {...email} type="email" />
          <Input placeholder="사용자 이름" {...username} />
          <Button text={"가입하기"} />
        </form>
      )}
    </Form>
    <StateChanger>
      {action === "logIn" ? (
        <Fragment>
          계정이 없으신가요?
          <Link onClick={() => setAction("signUp")}>가입하기</Link>
        </Fragment>
      ) : (
        <Fragment>
          계정이 있으신가요?
          <Link onClick={() => setAction("logIn")}>로그인</Link>
        </Fragment>
      )}
    </StateChanger>
  </Wrapper>
);
