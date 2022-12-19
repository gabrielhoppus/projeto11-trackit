// import { UserContext } from "./UserContext";
// import { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";




function Today(){
    // const { token } = useContext(UserContext);
    const d = dayjs();
    dayjs.locale("pt-br")

    return(
        <Container>
            <p>{d.format('dddd, DD/MM')}</p>
            <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
        </Container>
    );
}

export default Today;

const Container = styled.div`
    width: 100%;
    height: 600px;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
    p{
        margin-top: 28px;
        margin-left: 17px;
        margin-bottom: 17px;
        width: 232px;
        height: 29px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;
        ::first-letter {
            text-transform:capitalize;
        }
    }
    span{
        margin-left: 17px;
        width: 338px;
        height: 74px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.976px;
        color: #666666;
    }
`;