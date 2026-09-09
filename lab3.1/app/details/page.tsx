"use client";

import { useState } from "react";
import { Character } from "../_types/character";
import axios from "axios";

export default function Details() {

  const [characterName, setCharacterName] = useState<string>("kenny");
  const [characterDetails, setCharacterDetails] = useState<Character>();

  async function useEffect()
  {
    const response = await axios.get("https://spapi.dev/api/characters?search=" + characterName)
    console.log(response.data);

    setCharacterDetails(new Character(response.data[0].name, response.data[0].age, response.data[0].occupation, response.data[0].grade, response.data[0].episodes.length));
  }

  useEffect();

  return (
    <div>
      <h3>Détails sur {characterName}</h3>
      <img src={"/images/" + characterName + ".png"} alt={characterName} />

      <div>
          <table>
              <tbody>
                  <tr><td><b>Nom complet</b> : </td><td>{characterDetails?.name}</td></tr>
                  <tr><td><b>Âge</b> : </td><td>{characterDetails?.age}</td></tr>
                  <tr><td><b>Occupation</b> : </td><td>{characterDetails?.occupation}</td></tr>
                  <tr><td><b>Grade</b> : </td><td>{characterDetails?.grade}</td></tr>
                  <tr><td><b>Nombre d'épisodes</b> : </td><td>{characterDetails?.nbEpisodes}</td></tr>
              </tbody>
          </table>
      </div>
    </div>
  );
}