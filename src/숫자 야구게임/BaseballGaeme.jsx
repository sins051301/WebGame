import React, {useState, useRef, useCallback, memo} from "react";
import styled from "styled-components";
import Chance from "./Chance";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 100;
    border: solid 1px grey;
    justify-content: "center";
    text-align: center;
    margin: 0;
    padding: 8;
    width : 15rem;
    height: 20rem;
    font-size: 10px;
   
  
`;
const WrapperContent = styled.div`
    background-color: ${(props) => props.color};
    border: solid 1px grey ;
    
`;
const WrapperList = styled.div`
    border-top: solid 1px grey ;
    font-size: 1rem;
    width: 10;
    font-size: 10px;
`;
const WrapperButton = styled.button`
    font-size: 10px;
`;
const WrapperInput = styled.input`
    width: 5rem;
    height: 0.8rem;
`;

const generateRandomString = (num) => {
    const result = [];
    let number = Math.floor(Math.random() *9);
   
    for (let i = 0; i < num; i++) {
        while(true){
            number = Math.floor(Math.random() *9);
            if(!result.includes(number)){
                break;
            }
            
        }
        result.push(number);
    }
    return result;
  }

const intitFirstValue =  generateRandomString(4);

function BaseballGame(props){
    const [chance, setChance, chanceDecrease, chanceClear] = Chance(); 
    const [baseball, setBaseball] = useState(intitFirstValue); //함수만 넣으면 lazy init 한번만 실행

    // const [hint, setHint] = useState("");
    const [value, setValue] = useState('');
    const valueRef = useRef(null);
    const [answer, setAnswer] = useState('');
    const [back, setBack] = useState('white');
    
    // const [chance, setChance] = useState(10);
    const [list, setList] = useState([]);

    const AnswerConfirm = (answer, sub) =>{ // useCallback이 별 의미가 없음
        let str = 0;
        let ball = 0;
        for (let i = 0; i< answer.length; i++){
            for(let j=0; j<answer.length; j++){
                if(sub[i] === answer[j] && i===j){  
                    str++;
                }
                else if(sub[i] === answer[j] && i!==j){
                    ball++;
                }
    
            }
    
        }
        // setHint(`${str}스트라이크 ${ball}볼`);
        listAppend(`${value}: ${str}스트라이크 ${ball}볼`);
        
        if(str === answer.length){
            return true;
        }
        else{
            return false;
        }
        
    } 
    // const chanceDecrease = () =>{
    //    setChance((chance) =>chance-=1)
    // }
    // const chanceClear = () =>setChance((chance) =>chance =10);
    const listAppend = (item) => setList(list.concat(item)); //불변성 유지를 위해 concat함수 사용
    const listClear = () =>setList(() => []);

    React.useEffect(() =>{
        console.log(baseball);
    }, [baseball]);
    
    //무엇을 하든 return 한게 화면
  
    const typeChange = useCallback((e) =>{
        e.preventDefault();
        setValue(e.target.value);
        //setValue(valueRef.current.value);
    }, []);
   
    const AnswerChange = useCallback((e)=>{
        e.preventDefault();
        if(value === ""){
            setAnswer('입력하세요!');
            setBack('#FF7493');
            valueRef.current.focus();
            return;
        }
        const Valuearr = value.split('').map((v) => parseInt(v));
        let set = new Set(Valuearr);
        
        if(Valuearr.length !==set.size || Valuearr.length !==baseball.length){
            setAnswer('중복 및 자리수 초과 안됩니다!');
            setValue("");
            setBack("#CD0000");
            return;
            
        }
        
      
        else if(AnswerConfirm(baseball, Valuearr) && chance >0){
            setBack('#FFC300');
            setAnswer(`홈런! ${value}`);
            setValue("");
            setChance(0);
            listClear();
            valueRef.current.focus();
            
        }
        else if(chance >0 && !AnswerConfirm(baseball, Valuearr)){
            setAnswer("오답!");
            setBack('#FF7493');
            setValue("");
            chanceDecrease(chance);
            valueRef.current.focus();
            
        }
        else if(chance <=0){
            setAnswer(`실패! 다시 시작하세요 ${baseball}`);
            setBack('#505050');
            setValue("");
            setChance(0);
            valueRef.current.focus();
        }
        

    },[value]); //여기서 value 빼면 실행이 안됨 
    const problemChange = useCallback((e) =>{
        e.preventDefault();
        setBaseball(generateRandomString(4));
        // setHint("");
        setAnswer("");
        setValue("");
        chanceClear();
        listClear();
        setBack("white");

    },[])

    return ( 
    <React.Fragment>
        <Wrapper>
        <WrapperContent color ={back}>
        <form onSubmit={AnswerChange}> 
        <label>숫자 야구</label>
            <p/>
            
            <WrapperInput id="Submit" ref ={valueRef} value ={value} onChange = {typeChange}></WrapperInput>
            
            <WrapperButton onClick ={AnswerChange} >입력</WrapperButton>
            <WrapperButton onClick ={problemChange}>다음 문제</WrapperButton>
            </form>
            <p/>
            
            <div>{answer}</div>
            </WrapperContent >
            <div>{`남은 기회: ${chance}번`}</div>
            {list.map((lst, index) =>{
                return <WrapperList key = {index}>
                    {lst}
                </WrapperList>

            })}
            
            </Wrapper>
        </React.Fragment>
    );
}

export default BaseballGame;