import React, {useState} from "react";


function Chance(props){
    const [chance, setChance] = useState(10);
    const chanceDecrease = () =>{
        setChance((chance) =>chance-=1)
     }
    const chanceClear = () =>setChance((chance) =>chance =10);
    
    return [chance, setChance, chanceDecrease, chanceClear];

    
}

export default Chance;