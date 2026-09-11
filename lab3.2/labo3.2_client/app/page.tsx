"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { gamesPlayed } from "./layout";
import { useFidgetBomb } from "./_hooks/use-fidget-bomb";

export default function Home() {

  // Statistiques
  const [nbGames, setNbGames] = useContext(gamesPlayed);
  const [quizHighScore, setQuizHighScore] = useState(0);
  const [survivalHighScore, setSurvivalHighScore] = useState(0);

  const bomb = useFidgetBomb(10);

  function getFidgetBomb(){
      return <div className="bomb" onClick={bomb.bombClick}>{bomb.state}</div>
  }

  return (
    <div>
      {getFidgetBomb()}
      <div>Ce laboratoire utilise un projet ASP.Net Core exécuté localement pour proposer des questions quiz. Youpi !</div>
      <div className="options">
        <Link href="/play/5"><button>Quiz (5 questions)</button></Link>
        <Link href="/play/10"><button>Quiz (10 questions)</button></Link>
        <Link href="/play/survival"><button>Survie (max. 3 erreurs)</button></Link>
      </div>
      <hr/>
      <div className="score">Statistiques :</div>
      <div className="options">
        <div>Nombre de parties : {nbGames}</div>
        <div>Record (survie) : {survivalHighScore}</div>
        <div>Record (quiz) : {quizHighScore * 100}%</div>
      </div>
    </div>
  );
}
