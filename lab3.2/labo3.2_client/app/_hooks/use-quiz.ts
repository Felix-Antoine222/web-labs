import { useState } from "react";
import { Question } from "../_types/question";
import axios from "axios";

export function useQuiz(){
    
    // États pour le jeu
    const [questions, setQuestions] = useState<Question[]>([]);
    const [nbErrors, setNbErrors] = useState(0);
    const [score, setScore] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    
    
    // Remplir la liste de questions
    async function fillQuestions(length : number){

        setQuestions(await getQuestions(length));

    }
    

    // Requête pour obtenir les questions
    async function getQuestions(length : number){

        if(isNaN(length) || length <= 0) length = 5; // Longueur invalide ? Utilisons 5

        const response = await axios.get(`http://localhost:5064/api/questions/getquestions/${length}`);
        console.log(response.data);

        let q : Question[] = [];

        for(let r of response.data){
            q.push(new Question(r.text, r.correct, r.answers, -1));
        }

        return q;

    }
    
    // Retourne la classe appropriée pour les choix de réponses (vert, rouge ou rien)
    function getAnswerClass(question : Question, index : number){

        if(question.selected < 0) return "";
        if(question.correct == index) return "right";
        if(question.selected == index && question.correct != index) return "wrong";
        return "";

    }

    const object = { 
        questions : questions,
        nbErrors : nbErrors,
        score : score,
        questionIndex : questionIndex,
        fillQuestions : fillQuestions,
        getQuestions : getQuestions,
        getAnswerClass : getAnswerClass
    };
    
    return object;

}