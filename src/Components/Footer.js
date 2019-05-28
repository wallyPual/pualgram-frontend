import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const List = styled.ul`
    display: flex;
    align-items: center;
`;

const ListItem = styled.li`
    &:not(:last-child) {
        margin-right: 16px;
    }
`;

const Link = styled.a`
    font-size: 12px;
    font-weight: 600;
`;

const CopyRight = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.darkGreyColor};
`;


export default () => (
    <Footer>
        <List>
            <ListItem><Link>INSTAGRAM</Link></ListItem>
            <ListItem><Link>정보지원</Link></ListItem>
            <ListItem><Link>홍보 센터</Link></ListItem>
            <ListItem><Link>API</Link></ListItem>
            <ListItem><Link>채용 정보</Link></ListItem>
            <ListItem><Link>개인정보처리방침</Link></ListItem>
            <ListItem><Link>약관</Link></ListItem>
            <ListItem><Link>디렉터리</Link></ListItem>
            <ListItem><Link>프로필</Link></ListItem>
            <ListItem><Link>해시태그</Link></ListItem>
            <ListItem><Link>언어</Link></ListItem>
        </List>
        <CopyRight>
            © 2019 INSTAGRAM
        </CopyRight>
    </Footer>
)