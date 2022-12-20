import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import axios from "axios";
import DAYS from "./Days";
import { ThreeDots } from "react-loader-spinner";
import Trash from "../assets/trash.png";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

function Habits() {
    const { token } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [day, setDay] = useState([]);
    const [name, setName] = useState("");
    const [color] = useState("#FFFFFF");
    const [background] = useState("#CFCFCF");
    const [menuSwitch, setSwitch] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [disableInput, setDisableInput] = useState(false);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(URL, config)
            .then((res) => {
                setHabits(res.data);
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [refresh, token]);

    function toggleAdd() {
        setSwitch(true);
    }

    function toggleCancel() {
        setSwitch(false);
    }

    function selectDay(weekday) {
        if (!day.includes(weekday.day)) {
            const dayId = [...day, weekday.day];
            setDay(dayId);
        } else {
            setDay(day.filter(clicked => clicked !== weekday.day));
        }
    }

    function deleteHabit(habit) {
        setRefresh(!refresh);
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <AlertBox>
                        <AlertTitle>
                            Você quer excluir esse hábito?
                        </AlertTitle>
                        <AlertContainer>
                            <CloseButton onClick={onClose}>No</CloseButton>
                            <ConfirmButton
                                onClick={() => {
                                    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit}`;
                                    const config = {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    };
                                    axios.delete(URL, config)
                                        .then(() => {
                                            setRefresh(!refresh);
                                        })
                                        .catch((err) => {
                                            setRefresh(!refresh);
                                            alert(err.response.data.message);
                                        });
                                    onClose();
                                }}
                            >
                                Yes
                            </ConfirmButton>
                        </AlertContainer>
                    </AlertBox>
                );
            }
        });
    }

    function addHabit(e) {
        setDisableInput(true);
        setRefresh(true);
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const days = [...day];
        const body = {
            name,
            days
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if (name === "") {
            alert("Insira um nome para seu hábito!")
            setDisableInput(false);
        } else {
            axios.post(URL, body, config)
                .then(() => {
                    setRefresh(!refresh);
                    setSwitch(false);
                    setDisableInput(false);
                })
                .catch((err) => {
                    alert(err.response.data);
                    setRefresh(!refresh);
                    setDisableInput(false);
                });
        }
        setDay([]);
        setName("");
        e.preventDefault();
    }

    return (
        <Container>
            <HabitContainer>
                <p>Meus hábitos</p>
                <AddButton data-test="habit-create-btn" onClick={toggleAdd}>+</AddButton>
            </HabitContainer>
            {menuSwitch && (
                <>
                    <CreatHabitContainer data-test="habit-create-container" onSubmit={addHabit}>
                        <HabitInput data-test="habit-name-input" disabled={disableInput}
                            id="habit"
                            type="text"
                            placeholder="nome do hábito"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <DaysContainer>
                            {DAYS.map((weekday) =>
                                <Days
                                    disabled={disableInput}
                                    data-test="habit-day"
                                    key={weekday.day}
                                    onClick={() => selectDay(weekday)}
                                    color={day.includes(weekday.day) ? color : "#DBDBDB"}
                                    background={day.includes(weekday.day) ? background : "transparent"}
                                >
                                    {weekday.weekday}
                                </Days>
                            )}
                        </DaysContainer>
                        <ButtonContainer>
                            <CancelButton
                                data-test="habit-create-cancel-btn"
                                type="button"
                                onClick={toggleCancel}
                                disabled={disableInput}
                            >
                                Cancelar
                            </CancelButton>
                            <SaveButton
                                data-test="habit-create-save-btn"
                                type="submit"
                                disabled={disableInput}
                            >
                                {disableInput ? <ThreeDots
                                    height="13"
                                    width="51"
                                    color="#FFFFFF"
                                /> :
                                    "Cadastrar"}
                            </SaveButton>
                        </ButtonContainer>
                    </CreatHabitContainer>
                </>
            )}
            {habits.length !== 0 ? (
                <>
                    {habits.map((habit) =>
                        <RegisteredHabitsContainer data-test="habit-container" key={habit.id}>
                            <SubContainer>
                                <HabitTitle data-test="habit-name">{habit.name}</HabitTitle>
                                <StyledIcon data-test="habit-delete-btn" onClick={() => deleteHabit(habit.id)} src={Trash} />
                            </SubContainer>
                            <DaysContainer>
                                {DAYS.map((weekday) =>
                                    <Days
                                        data-test="habit-day"
                                        key={weekday.day}
                                        color={habit.days.includes(weekday.day) ? "#FFFFFF" : "#DBDBDB"}
                                        background={habit.days.includes(weekday.day) ? "#CFCFCF" : "transparent"}
                                    >
                                        {weekday.weekday}
                                    </Days>
                                )}
                            </DaysContainer>
                        </RegisteredHabitsContainer>
                    )}
                </>
            ) : (
                <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
            )}
        </Container>
    );
}

export default Habits;

const AlertBox = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
`;

const AlertTitle = styled.h1`
    margin: 28px auto 60px auto;
    width: 250px;
    height: 29px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 22.976px;
    color: #126BA5;
    text-align: center;
`;

const AlertContainer = styled.div`
    witdh: 200px;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
`;

const CloseButton = styled.button`
    font-weight: 400;
    font-size: 15.976px;
    text-align: center;
    color: #52B6FF;
    background: transparent;
    border: none;
    margin-right: 20px;
`;

const ConfirmButton = styled.button`
    width: 84px;
    height: 35px;
    font-family: 'Lexend Deca';
    background: #52B6FF;
    font-weight: 400;
    font-size: 15.976px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #FFFFFF;
    border: none;
    border-radius: 4.64px;
`;

const StyledIcon = styled.img`
    width: 13px;
    height: 15px;
    margin-right: 10px;
`;

const SubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RegisteredHabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 91px;
    margin-left: auto;
    margin-right: auto;
    background: #FFFFFF;
    margin-bottom: 10px;
`;

const HabitTitle = styled.div`
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 19.976px;
    color: #666666;
    margin: 13px 0px 8px 15px;
`;

const ButtonContainer = styled.div`
    margin-top: 29px;
    margin-right: 16px;
    display: flex;
    justify-content: flex-end;

`;

const CancelButton = styled.button`
    font-weight: 400;
    font-size: 15.976px;
    text-align: center;
    color: #52B6FF;
    background: transparent;
    border: none;
    margin-right: 7px;
    :disabled{
        opacity: 0.7;
    }
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    font-family: 'Lexend Deca';
    background: #52B6FF;
    font-weight: 400;
    font-size: 15.976px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #FFFFFF;
    border: none;
    border-radius: 4.64px;
    :disabled{
        opacity: 0.7;
    }
`;

const CreatHabitContainer = styled.form`
    width: 340px;
    height: 180px;
    display: flex;
    flex-direction: column;
    margin: 0px auto 29px auto;
    background: #FFFFFF;
    border-radius: 5px;
    border: none;
`;

const HabitInput = styled.input`
    width: 303px;
    height: 45px;
    margin: 18px auto 8px auto;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    color: #666666;
    padding-left: 11px;
    box-sizing: border-box;
    ::placeholder{
        color: #DBDBDB;
    }
    :disabled{
        background: #F2F2F2;
        color: #AFAFAF;
    }
`;

const DaysContainer = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: flex-start;
    margin-left: 19px;

`;

const Days = styled.div`
    margin-right: 4px;
    font-family: 'Lexend Deca';
    display: flex;
    height: 30px;
    width: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    color: ${props => props.color};
    background ${props => props.background};
`;

const Container = styled.div`
    width: 100%;
    min-height: 800px;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
    p{
        margin-top: 28px;
        margin-left: 17px;
        margin-bottom: 17px;
        width: 148px;
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

const HabitContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

const AddButton = styled.button`
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    margin-left: 152px;
    font-weight: 400;
    font-size: 26.976px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    color: #FFFFFF;
`;
