"use client";

import { useState } from "react";
import { VideoGame } from "./_types/video-game";

export default function Home() {

  // Servira plus tard
  const [videoGames, setVideoGames] = useState<VideoGame[]>([]);

  const [loveList, setLoveList] = useState<String[]>(["Caesar King from ZZZ", "Video games", "Drawing"]);
  const [userAge, setUserAge] = useState(18);
  const [bombeClick, setBombeClick] = useState(10);
  const [bombeEmoji, setBombeEmoji] = useState<String>("💣");
  const [lightMode, setLightMode] = useState<Boolean>(true);
  const [nom, setNom] = useState<String>("");
  const [color, setColor] = useState<String>("cyan");

  function chatouillerBombe()
  {
    if (bombeClick > 1)
    {
      setBombeClick(bombeClick - 1);
    }
    else
    {
      setBombeClick(0);
      setBombeEmoji("💥");
    }
  }

  function setTheme()
  {
    setLightMode(!lightMode);
  }

  function salut()
  {
    alert("Salut " + nom + "!");
  }

  const bgColor = (event: any) => {
    setColor(event.target.value);
  };

  const [VGNom, setVGNom] = useState<string>("");
  const [VGJoueurs, setVGJoueurs] = useState(0);
  const [VGSortie, setVGSortie] = useState<boolean>(false);
  const [VGGenres, setVGGenres] = useState<string[]>([]);
  const [VGMode, setVGMode] = useState<string>("");

  function addVideoGame()
  {
    setVideoGames([...videoGames, new VideoGame(VGNom, VGJoueurs, VGSortie, VGGenres, VGMode)]);
  }

  function removeLastGame()
  {
    setVideoGames(videoGames.splice(0, videoGames.length - 1));
  }

  function addOnePlayer()
  {
    setVideoGames(videoGames => 
      videoGames.map(item => 
        item.nbPlayers == item.nbPlayers ? { ...item, nbPlayers: item.nbPlayers + 1 } : item)
    );
  }

  return (
    <div className="w-5xl m-auto mt-2">

      {/* Rangée du titre */}
      <div className="flex align-items-center bg-gray-100 rounded-lg p-3 py-6">
        <h1 className="text-2xl weight-bold">Le laboratoire 2 est dynamique 🗿</h1>
      </div>

      <div className="flex mt-2 gap-3">

        {/* Exercice 2 : liste */}
        <div className="bg-gray-100 rounded-lg p-2 flex-1">
          {
            <ul>
            {loveList.map((item, index) => (
              // Always provide a unique 'key' prop when rendering lists
              <li key={index}>{item}</li> 
            ))}
          </ul>
          }
        </div>

        {/* Exercice 3 : condition */}
        <div className="bg-gray-100 rounded-lg p-2 flex-1 flex items-center">
          <div>J'aime les <span>{userAge < 18 ? "LEGO" : "voitures"}</span>.</div>
        </div>

        {/* Exercice 4 : événement */}
        <div className="bg-gray-100 rounded-lg p-2 flex-1">
          <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={chatouillerBombe}>Chatouiller la bombe</button>
          <p>Clics restants : {bombeClick} {bombeEmoji}</p>
        </div>
      </div>

      <div className="flex mt-2 gap-3">

        {/* Exercice 5 : thème */}
        <div className={`${lightMode ? 'light' : 'dark'} rounded-lg p-2 flex-1`}>
          <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={setTheme}>Changer le fond</button>
        </div>

        {/* Exercice 6 : saluer */}
        <div className="bg-gray-100 rounded-lg p-2 flex-1">
          <input type="text" className="bg-white px-2 border-1 border-gray-500 rounded-sm mr-1" onChange={(e) => setNom(e.target.value)}/>
          <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={salut}>Saluer</button>
        </div>

        {/* Exercice 7 : couleur de fond */}
        <div className={"rounded-lg p-2 flex-1 " + color}>
          <select name="backgroundColor" className="border-gray-500 border-1 px-2 py-1 rounded-sm bg-gray-200 my-2 cursor-pointer" onChange={bgColor}>
            <option value="cyan">Bleu</option>
            <option value="red">Rouge</option>
            <option value="amber">Jaune</option>
          </select>
        </div>
      </div>

      <div className="flex mt-2 gap-3">

        {/* Exercice 8 : grand formulaire */}
        <div className="bg-gray-100 rounded-lg p-2 flex-3">
          <div className="">
            <div className="mb-1">
              Nom : <input type="text" name="vgName" className="bg-white px-2 border-1 border-gray-500 rounded-sm mr-1" onChange={(e) => setVGNom(e.target.value)}/>
            </div>
            <div className="mb-1">
              Nombre maximal de joueurs : <input type="number" name="vgNbPlayers" className="bg-white px-2 border-1 border-gray-500 rounded-sm mr-1" onChange={(e) => setVGJoueurs(Number.parseInt(e.target.value))}/>
            </div>
            <div className="mb-1">
              Jeu sorti <input type="checkbox" name="vgReleased" onChange={(e) => setVGSortie(e.target.value === "true")}/>
            </div>
            <div className="mb-1">
              Genres (séparés par des virgules, sans espaces) : <input type="text" name="vgGenre" className="bg-white px-2 border-1 border-gray-500 rounded-sm mr-1" />
            </div>
            <div>
              Mode de jeu :
            </div>
            <div>
              → Hors ligne <input type="radio" name="VGMode" value="hors ligne" checked={VGMode == 'hors ligne'} onChange={(e) => setVGMode(e.target.value)} />
            </div>
            <div>
              → En ligne <input type="radio" name="VGMode" value="en ligne" checked={VGMode == 'en ligne'} onChange={(e) => setVGMode(e.target.value)} />
            </div>
            <div className="mb-1">
              → En ligne et hors ligne <input type="radio" name="VGMode" value="en ligne et hors ligne" checked={VGMode == 'en ligne et hors ligne'} onChange={(e) => setVGMode(e.target.value)} />
            </div>
            <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={addVideoGame}>Créer le jeu</button>
          </div>
        </div>

        <div className="flex-2">

          {/* Exercice 9 : condition */}
          <div className="bg-gray-100 rounded-lg p-2 basis-full">
            {videoGames.map((v) =>
              <div key={v.name}>• {v.name} ({v.genre.map((g) => <span key={g}>{g} </span>)}) se joue jusqu'à {v.nbPlayers} joueur(s) {v.mode} et {v.released ? 'est déjà sorti' : "n'est pas encore sorti"}.</div>
            )}
          </div>

          <div className="flex mt-2 gap-3">

            {/* Exercice 10 : retirer dernier élément tableau */}
            <div className="bg-gray-100 rounded-lg p-2 flex-1">
              <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={removeLastGame}>Retirer dernier jeu</button>
            </div>

            {/* Exercice 11 : modifier tous les objets d'un tableau */}
            <div className="bg-gray-100 rounded-lg p-2 flex-1">
              <button className="border-gray-500 border-1 px-2 rounded-sm bg-gray-200 my-2 cursor-pointer active:bg-gray-300" onClick={addOnePlayer}>+1 joueur</button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
