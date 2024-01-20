import React, {useState, useRef} from "react";
import styled from "styled-components";
const Wrapper = styled.div`
    background-color: ${(props) => props.color};
`;


function WordReplay(props){
    const generateRandomString = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
      }
      
    const intitFirstValue =  generateRandomString(5);
    const [word, setWord] = useState(intitFirstValue);
    const [value, setValue] = useState('');
    const valueRef = useRef(null);
    const [answer, setAnswer] = useState('');
    const [back, setBack] = useState('white');

    React.useEffect(() =>{
        console.log(word);
    }, [word]);
    
    //무엇을 하든 return 한게 화면
  
    const typeChange = (e) =>{
        e.preventDefault();
        //setValue(e.target.value);
        setValue(valueRef.current.value); 
        
    }
    const AnswerChange = (e)=>{
        e.preventDefault();
        let Valuearr = value.split("");
        let Wordarr = word.split("");
        console.log(Valuearr[0]);
        console.log(Wordarr[Wordarr.length]);
        if(value === ""){
            setAnswer('');
            setBack('red');
            
            valueRef.current.focus();
        }
        else if(Valuearr[0] === Wordarr[Wordarr.length-1]){
            setBack('pink');
            setAnswer('정답!');
            setValue("");
            setWord(value);
            valueRef.current.focus();
            
        }
        else{
            setAnswer("오답!");
            setBack('red');
            setValue("");

            valueRef.current.focus();
        }
        

    }
    const problemChange = (e) =>{
        e.preventDefault();
        setWord(generateRandomString(5));
        setAnswer("");
        setValue("");
       

    }

    return ( 
    <React.Fragment>
        <Wrapper color ={back}>
        <form> 
            {word}
            <p/>
            <label>다음 단어</label>
                <input id="Submit" ref ={valueRef} value ={value} onChange = {typeChange}></input>
            
            <button onClick ={AnswerChange} >입력</button>
            <button onClick ={problemChange}>다음 문제</button>
            <p/>
            <div>{answer}</div>
            </form></Wrapper >
        </React.Fragment>
    );
}

export default WordReplay;