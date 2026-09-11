"use client";

import { useFidgetBomb } from "@/app/_hooks/use-fidget-bomb";
import { useQuiz } from "@/app/_hooks/use-quiz";
import { Question } from "@/app/_types/question";
import { gamesPlayed } from "@/app/layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Survival(){

    // Statistiques
    const [nbGames, setNbGames] = useContext(gamesPlayed);
    const [survivalHighScore, setSurvivalHighScore] = useState(0);

    const quiz = useQuiz();

    const bomb = useFidgetBomb(10);

    // Obtenir les 5 premières questions du jeu
    useEffect(() => {

        quiz.fillQuestions(5);

    }, []);

    function getFidgetBomb(){
        return <div className="bomb" onClick={bomb.bombClick}>{bomb.state}</div>
    }

    // Gérer le choix d'une réponse, potentiellement valide ou erroné
    async function chooseAnswer(question : Question, answer : string){
        if(question.selected >= 0) return;
        let updatedQuestions = [...quiz.questions];
        let currentIndex = 0;
        let mistakeMade = false;
        for(let q of updatedQuestions){
            if(q.text == question.text){
                q.selected = q.answers.indexOf(answer);
                currentIndex = updatedQuestions.indexOf(q);
                if(q.selected == q.correct) quiz.score = quiz.score + 1;
                else{
                    quiz.nbErrors = quiz.nbErrors + 1;
                    mistakeMade = true;

                    // Fin de la partie
                    if(quiz.nbErrors + 1 == 3){

                        // Retirer les questions suivantes
                        updatedQuestions.splice(currentIndex + 1, updatedQuestions.length - currentIndex - 1);
                        
                        // +1 partie jouée
                        setNbGames(nbGames + 1);

                        // Nouveau record ?
                        setSurvivalHighScore(Math.max(survivalHighScore, updatedQuestions.length - 3));
                    }
                }
            }
        }

        if(quiz.nbErrors + (mistakeMade ? 1 : 0) < 3 && currentIndex == updatedQuestions.length - 1){
            updatedQuestions.push(...(await quiz.getQuestions(5)));
        }

        quiz.questionIndex = quiz.questionIndex + 1;
        quiz.questions = updatedQuestions;
    }

    return(
        <div>
            {getFidgetBomb()}
            <div className="options">
                <div>Nombre de parties : {nbGames}</div>
                <div>Record (survie) : {survivalHighScore}</div>
            </div>
            <h3>Mode survie (3 erreurs max.)</h3>
            <div>
                {quiz.questions.map((q, index) => quiz.questionIndex >= index &&
                <div key={index} className="question">
                    <div>{q.text}</div>
                    <div className="answers">
                        {q.answers.map((a, index) => 
                        <div key={index} onClick={() => chooseAnswer(q, a)} className={quiz.getAnswerClass(q, index)}>{a}</div>
                        )}
                    </div>
                </div>
                )}
                { quiz.nbErrors >= 3 &&
                  <div className="result">Votre score est de {quiz.score} !</div> 
                }
            </div>
        </div>
    );

}