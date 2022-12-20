import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/pt-br";
import axios from "axios";
import Check from "../assets/check.png";


function Today() {
    const [habits, setHabits] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const doneHabits = habits.filter((habit) => habit.done);
    const completion = (doneHabits.length / habits.length);
    const percentage = 100;
    const { token, setDone } = useContext(UserContext);
    dayjs.extend(localeData);
    const d = dayjs();
    dayjs.locale("pt-br");
    setDone(completion);
    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
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

    function toggleCheck(habit) {
        setRefresh(!refresh);
        const checkURL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit}/check`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const body = {};

        axios.post(checkURL, body, config)
            .then(() => {
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setRefresh(!refresh);
            });
    }

    function toggleUncheck(habit) {
        setRefresh(!refresh);
        const uncheckURL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit}/uncheck`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const body = {};

        axios.post(uncheckURL, body, config)
            .then(() => {
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setRefresh(!refresh);
            });
    }

    return (
        <Container>
            <p data-test="today">{d.format('dddd, DD/MM')}</p>
            {doneHabits.length === 0 ?
                <SubTitle data-test="today-counter" color={"#BABABA"}>Nenhum hábito concluído ainda</SubTitle>
                :
                <SubTitle data-test="today-counter" color={"#8FC549"}>{(completion*percentage).toFixed(1)}% dos hábitos concluídos</SubTitle>
            }
            <div>
                {habits.map((habit) =>
                    <HabitContainer data-test="today-habit-container" key={habit.id}>
                        <StyledContainer>
                            <div>
                                <HabitTitle data-test="today-habit-name">
                                    {habit.name}
                                </HabitTitle>
                                <SequenceContainer data-test="today-habit-sequence" color={habit.currentSequence !== 0 ? "#8FC549" : "#666666"}>
                                    <SequenceTitle>Sequência atual:</SequenceTitle> {habit.currentSequence} dias
                                </SequenceContainer>
                                <SequenceContainer
                                    data-test="today-habit-record"
                                    color={habit.currentSequence === habit.highestSequence
                                        && habit.highestSequence !== 0 ? "#8FC549" : "#666666"}
                                        >
                                    <SequenceTitle>Seu recorde:</SequenceTitle> {habit.highestSequence} dias
                                </SequenceContainer>
                            </div>
                            <CheckmarkContainer
                                data-test="today-habit-check-btn"
                                onClick={() => !habit.done ? toggleCheck(habit.id) : toggleUncheck(habit.id)}
                                background={habit.done ? "#8FC549" : "#EBEBEB"}
                            >
                                <Checkmark src={Check} alt="checkmark" />
                            </CheckmarkContainer>
                        </StyledContainer>
                    </HabitContainer>
                )}
            </div>
        </Container>
    );
}

export default Today;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CheckmarkContainer = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    border: none;
    background: ${props => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 13px;
    margin-right: 13px;
`;

const Checkmark = styled.img`
    width: 35.09px;
    height: 28px;
`;

const HabitContainer = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 340px;
    height: 94px;
    margin-bottom: 10px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    color: #666666;
`;

const HabitTitle = styled.div`
    width: 208px;
    height: 25px;
    font-size: 19.976px;
    margin: 13px 0px 7px 15px;
`;

const SequenceContainer = styled.div`
    display: flex;
    margin-left: 15px;
    font-size: 12.976px;
    width: 150px;
    color: ${props => props.color}
`;

const SequenceTitle = styled.div`
    color: #666666;
    margin-right: 3px;
`;

const Container = styled.div`
    width: 100%;
    min-height: 900px;
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
`;

const SubTitle = styled.span`
    margin-left: 17px;
    width: 338px;
    height: 74px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 17.976px;
    color: ${props => props.color};
`;