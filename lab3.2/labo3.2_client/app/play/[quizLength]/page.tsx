"use client";

import { useFidgetBomb } from "@/app/_hooks/use-fidget-bomb";
import { useQuiz } from "@/app/_hooks/use-quiz";
import { Question } from "@/app/_types/question";
import { gamesPlayed } from "@/app/layout";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Play(){

    // Paramètre de route
    const params = useParams<{ quizLength : string }>();

    // Statistiques
    const [nbGames, setNbGames] = useContext(gamesPlayed);
    const [quizHighScore, setQuizHighScore] = useState(0);

    // Compte à rebours aléatoire (1 à 10) pour la bombe
    const [countdown, setCountdown] = useState(Math.floor(Math.random() * 10) + 1);
    
    const bomb = useFidgetBomb(10);
    
    const quiz = useQuiz();

    // Vérifier le nombre de questions avec le paramètre de route et obtenir les questions
    useEffect(() => {

        const length = +params.quizLength;
        quiz.fillQuestions(length);

    }, []);

    function getFidgetBomb(){
        return <div className="bomb" onClick={bomb.bombClick}>{bomb.state}</div>
    }

    // Gérer le choix d'une réponse, potentiellement valide ou erroné
    function chooseAnswer(question : Question, answer : string){
        if(question.selected >= 0) return;
        let updatedQuestions = [...quiz.questions];
        let quizDone = true;
        let currentScore = 0;
        for(let q of updatedQuestions){
            if(q.text == question.text){
                q.selected = q.answers.indexOf(answer);
            }
            if(q.selected == -1) quizDone = false;
            if(q.selected == q.correct) currentScore += 1;
        }
        quiz.questions = updatedQuestions;

        // Fin partie ?
        if(quizDone){

            quiz.score = currentScore;

            // Nouveau record ?
            setQuizHighScore(Math.max(currentScore / quiz.questions.length, quizHighScore));

            // +1 partie jouée
            setNbGames(nbGames + 1);
        }
    }

    return(
        <div>
            {getFidgetBomb()}
            <div className="options">
                <div>Nombre de parties : {nbGames}</div>
                <div>Record (quiz) : {quizHighScore * 100}%</div>
            </div>
            <h3>Quiz ({params.quizLength} questions)</h3>
            <div>
                {quiz.questions.map((q, index) => 
                <div key={index} className="question">
                    <div>{q.text}</div>
                    <div className="answers">
                        {q.answers.map((a, index) => 
                        <div key={index} onClick={() => chooseAnswer(q, a)} className={quiz.getAnswerClass(q, index)}>{a}</div>
                        )}
                    </div>
                </div>
                )}
                { quiz.score >= 0 &&
                  <div className="result">Votre score est de {quiz.score} / {quiz.questions.length} ({quiz.score/quiz.questions.length * 100} %)</div> 
                }
            </div>
        </div>
    );

}