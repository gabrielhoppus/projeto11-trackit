import styled from "styled-components";

function History(){
    return(
        <Container>
            <p>Histórico</p>
            <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
        </Container>
    );
}

export default History;

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
        width: 100px;
        height: 29px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;
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