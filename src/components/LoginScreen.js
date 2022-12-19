import Logo from "../assets/logo.png";
import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { UserContext } from "./UserContext";

function LoginScreen() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [disableInput, setDisableInput] = useState(false)
    const navigate = useNavigate();
    const { token, setToken, setImage } = useContext(UserContext);

    function userLogin(e) {
        setDisableInput(true);
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const body = { email, password };
        axios.post(URL, body)
            .then((res) => {
                alert("Login efetuado com sucesso!")
                navigate("/hoje");
                setToken(res.data.token)
                setImage(res.data.image)
                console.log(token)
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
            <LoginForm onSubmit={userLogin}>
                <label htmlFor="email">
                    <LoginInput
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
                        disabled={disableInput}
                        id="password"
                        type="password"
                        placeholder="senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <LoginButton type="submit" disabled={disableInput}>
                    {disableInput ? <ThreeDots
                        height="13"
                        width="51"
                        color="#FFFFFF"
                    /> :
                        "Entrar"}
                </LoginButton>
            </LoginForm>
            <StyledLink to={`/cadastro`}>
                <div>
                    Não tem uma conta? Cadastre-se!
                </div>
            </StyledLink>
        </Container>

    );
}

export default LoginScreen;

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
`