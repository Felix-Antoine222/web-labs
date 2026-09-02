'use client';

import { Towel } from "@/_types/towel";

import { useState } from "react";

export default function Home() {

  const [myWisdom] = useState("garfield");
  const [num] = useState(23);
  const [towel, setTowel] = useState(new Towel("red", 100, "next", false));

  function bruh() : string{
    return "Bruh.";
  }

  function equalToN(n: number) : string{
    return n == 1 ? "Identique" : "Différent";
  }

  return(
  <div className="m-auto w-3xl">
    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-pink-100">
        {num}
      </div>
      <div className="flex-3 p-1 bg-blue-100">
        {myWisdom}
      </div>
    </div>

    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-color-1">
        {bruh()}
      </div>
      <div className="flex-3 p-1 bg-color-2">
        {equalToN(1)} {equalToN(2)}
      </div>
    </div>

    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-color-1">
        Gauche
      </div>
      <div className="flex-3 p-1 bg-color-2">
        J'ai une belle serviette {towel.color} de {towel.length} mètres
        {towel.use()}
        <img src={towel.image}/>
      </div>
    </div>
  </div>
  );
}
