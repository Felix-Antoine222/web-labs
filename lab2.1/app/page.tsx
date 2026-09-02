"use client";

import { useState } from "react";
import { Song } from "./_types/song";
import axios from 'axios';
import { TrackArtist } from "use-last-fm";

export default function Home() {
  const apiKey: string = "9a8a3facebbccaf363bb9fd68fa37abf";

  // Pour obtenir l'input de l'utilisateur
  const [artistName, setArtistName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  // Pour afficher les données
  const [similarArtists, setSimilarArtists] = useState<string[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  // Requête #1
  async function getSimilarArtists(){
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=" + apiKey + "&format=json")
    console.log(response.data);

    setSimilarArtists(response.data.similarartists?.artist.map((a: any) => a.name));
    console.log(similarArtists);
  }

  // Requête #2
  async function getTopSongs(){
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + genre + "&api_key=" + apiKey + "&format=json")
    console.log(response.data);

    setSongs(response.data.tracks.track.map((track: any) => {return new Song(track.name,track.artist.name,Number(track.duration))}));
    console.log(songs);
  }

  return (
    <div className="w-5xl m-auto mt-2">[object Object]
      <div className="bg-zinc-700 py-4 px-2 rounded-lg text-4xl">
        🎵 Laboratoire 3
      </div>
      <div className="flex gap-2 mt-2">

        {/* Colonne à gauche : Obtenir les artistes similaires */}
        <div className="flex-1 bg-zinc-700 p-2 rounded-lg">

          {/* Formulaire */}
          <div className="flex items-center">
            <span className="font-bold">Artiste :</span>
            <input type="text" className="px-1 py-0.5 bg-zinc-100 rounded-sm border-1 mx-2 text-zinc-900 text-sm border-zinc-500" placeholder="Nana Mouskouri" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
            <button className="bg-zinc-300 rounded-md border-zinc-500 border-1 cursor-pointer px-2 py-0 text-zinc-900 active:bg-zinc-400" onClick={getSimilarArtists}>Chercher</button>
          </div>
          <hr className="text-zinc-400 my-2" />

          {/* Données */}
          <div className="text-xl">Résultats :</div>
          {similarArtists.length === 0 ? (
            <h3 className="ml-4">Réessayez avec un artiste qui existe</h3>
          ) : (
          <ul className="list-disc ml-4 text-sm">
              {
                similarArtists.map((artist) =>
                  <li key={artist}>{artist}</li>
                )
              }
          </ul>)}
        </div>

        {/* Colonne pas à gauche : Obtenir les meilleurs chansons d'un genre */}
        <div className="flex-1 bg-zinc-700 p-2 rounded-lg">

          {/* Formulaire */}
          <div className="flex items-center">
            <span className="font-bold">Genre :</span>
            <input type="text" className="px-1 py-0.5 bg-zinc-100 rounded-sm border-1 mx-2 text-zinc-900 text-sm border-zinc-500" placeholder="pop" onChange={(e) => setGenre(e.target.value)} />
            <button className="bg-zinc-300 rounded-md border-zinc-500 border-1 cursor-pointer px-2 py-0 text-zinc-900 active:bg-zinc-400" onClick={getTopSongs}>Chercher</button>
          </div>

          <hr className="text-zinc-400 my-2" />

          {/* Données */}
          <div className="text-xl">Résultats :</div>
          {songs.length === 0 ? (
            <h3 className="ml-4">Réessayez avec un genre qui existe</h3>
          ) : (
          <ul className="list-disc ml-4 text-sm">
              {
                songs.map((song) =>
                  <li key={song.name}>{song.name} de {song.artist} ({song.duration} secondes)</li>
                )
              }
          </ul>)}
        </div>

      </div>
    </div>
  );
}
