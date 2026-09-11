import { useState } from "react";

export function useFidgetBomb(startValue : any){
    const [state, setState] = useState<string>("💣")

    // Compte à rebours aléatoire (1 à 10) pour la bombe
    const [countdown, setCountdown] = useState(Math.floor(Math.random() * startValue) + 1);

    // Cliquer réduit le compte à rebours de 1
    function bombClick(){
        setCountdown(Math.max(0, countdown - 1));
    }

    const object = { 
        countdown : countdown,
        state : countdown > 0 ? '💣' : '💥',
        bombClick : bombClick
    };
    
    return object;

}