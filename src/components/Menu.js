import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Menu() {
    const { userImage } = useContext(UserContext);  

    return (
        <Container>
            <Header>
                <p>Trackit</p>
                <img src={userImage} alt="user-avatar" />
            </Header>
            <Footer>
                <StyledHabitsLink to={"/habitos"}>Hábitos</StyledHabitsLink>
                <Link to={"/hoje"}>
                    <BarContainer>
                        <StyledBar value={0.66} maxValue={1} text={`Hoje`} />
                    </BarContainer>
                </Link>
                <StyledHistoryLink to={"/historico"}>Histórico</StyledHistoryLink>
            </Footer>
        </Container>

    );
}

export default Menu

const Container = styled.div`
    width: 100%;
`;

const Header = styled.header`
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    img{
        margin-right: 18px;
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
    p{
        font-family: 'Playball', cursive;
        font-weight: 400;
        font-size: 38.982px;
        color: #FFFFFF;
        margin-left: 18px;
    }
`;

const Footer = styled.footer`
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledHabitsLink = styled(Link)`
    width: 68px;
    height: 22px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 17.976px;
    text-align: center;
    color: #52B6FF;
    margin-left: 36px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const StyledHistoryLink = styled(Link)`
    width: 68px;
    height: 22px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 17.976px;
    text-align: center;
    color: #52B6FF;
    margin-right: 36px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const BarContainer = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    background-color: #52B6FF;
`;

const StyledBar = styled(CircularProgressbar)`
    width: 79px;
    height: 79px;
    margin: 6px 6px 6px 6px;
    .CircularProgressbar-text {
        fill: #FFFFFF;
        font-weight: 400;
        font-size: 17.976px;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
    .CircularProgressbar-path {
        stroke: #FFFFFF;
    }
    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }
`
