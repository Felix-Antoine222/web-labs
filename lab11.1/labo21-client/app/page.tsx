"use client";

import { useEffect, useRef, useState } from "react";
import { usePictureAPI } from "./_hooks/use-picture-api";
import axios from "axios";

export default function Home() {

  const {
    // État
    pictureIds,
    // Requêtes
    postPicture, getPictureIds, deletePicture
  } = usePictureAPI();

  useEffect(() => {

    // Appeler la bonne fonction pour remplir l'état pictureIds dans le hook usePictureAPI.
    
    getPictureIds();

  }, []);

  async function prepareFormData() {

    // À compléter

    // Création du formdata
    const formData = new FormData();
    const myFileInput = useRef<HTMLInputElement>(null);

    if(myFileInput.current == null){
        console.log("Référence vide ou élément HTML non visible dans la page.");
        return;
    }

    if(myFileInput.current.files == null){
        console.log("L'input ne contient aucun fichier");
        return;
    }

  let i = 0;
  for(let f of myFileInput.current.files){

      // "image" + i, comme ça chaque clé est unique
      formData.append("image" + i, f); 
      i++;
      
  }

    postPicture(formData);

  }

  return (
    <div>
      <h3>Laboratoire 21</h3>

      <input type="file" multiple accept="images/*" />
      <button onClick={prepareFormData}>Ajouter l'image</button><br /><br />
      <button onClick={getPictureIds}>Mettre à jour les images affichées</button>

      <br /><br />

      {/* Affichage des images */}
      {
        pictureIds.map(i =>
          <div className="picture" key={i}>
            <div className="delete">X</div>
            <a href="" target="blank">
              <img src="placeholder" alt="Image" />
            </a>
          </div>
        )
      }

    </div>

  );
}
