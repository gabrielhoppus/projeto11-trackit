import Logo from "../assets/logo.png";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

function RegisterScreen() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disableInput, setDisableInput] = useState(false);
    const navigate = useNavigate();

    function userRegister(e) {
        setDisableInput(true);
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const body = { email, name, image, password };
        axios.post(URL, body)
            .then(() => {
                alert("Cadastro realizado com sucesso!");
                navigate("/");
            })
            .catch((err) => {
                alert(err.response.data.message);
                setDisableInput(false);
            });
    }

    return (
        <Container>
            <LogoContainer>
                <img src={Logo} alt="calendar_logo" />
            </LogoContainer>
            <LoginForm onSubmit={userRegister}>
                <label htmlFor="email">
                    <LoginInput
                        data-test="email-input"
                        disabled={disableInput}
                        id="email"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">
                    <LoginInput
                        data-test="password-input"
                        disabled={disableInput}
                        id="password"
                        type="password"
                        placeholder="senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autocomplete="chrome-off"
                        required
                    />
                </label>
                <label htmlFor="name">
                    <LoginInput
                        data-test="user-name-input"
                        disabled={disableInput}
                        id="name"
                        type="text"
                        placeholder="nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autocomplete="chrome-off"
                        required
                    />
                </label>
                <label htmlFor="image">
                    <LoginInput
                        data-test="user-image-input"
                        disabled={disableInput}
                        id="foto"
                        type="text"
                        placeholder="foto"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        autocomplete="chrome-off"
                        required
                    />
                </label>
                <LoginButton data-test="signup-btn" type="submit" disabled={disableInput}>
                    {disableInput ? <ThreeDots
                        height="13"
                        width="51"
                        color="#FFFFFF"
                    /> :
                    "Cadastrar"}
                </LoginButton>
            </LoginForm>
            <StyledLink data-test="login-link" to={`/`}>
                <div>
                    Já tem uma conta? Faça login!
                </div>
            </StyledLink>
        </Container>
    );
}

export default RegisterScreen;

const Container = styled.div`
    width: 100%;
    height: 600px;
`;

const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 68px auto 32.62px auto;
    img{
        margin: 0 auto 0 auto;
        width: 180px;
        height: 178.38px;
    }
`;

const LoginForm = styled.form`
    width: 100%;
`;

const LoginInput = styled.input`
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    margin: 0px auto 6px auto;
    ::placeholder{ 
        font-weight: 400;
        font-size: 19.976px;
        color: #DBDBDB;
        padding-left: 11px;
    }
    :focus{
        outline: none;
        border: 2px solid #CCCCCC;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
        font-weight: 500;
        font-size: 15px;
    }
    :disabled{
        background: #F2F2F2;
        color: #AFAFAF;
    }
`;

const LoginButton = styled.button`
    display: flex;
    margin: 0 auto 25px auto;
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    font-weight: 400;
    font-size: 20.976px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    :disabled{
        opacity: 0.7;
    }
`;

const StyledLink = styled(Link)`
    font-weight: 400;
    font-size: 13.976px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: underline;
}
`;