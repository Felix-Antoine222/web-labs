"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTwoWayBinding } from "../../_hooks/use-two-way-binding";
import { usePowerQuery } from "@/app/_hooks/use-power-query";

export default function Superpowers() {

    const powerInput = useTwoWayBinding(""); // Hook pour le two-way binding
    const powers = usePowerQuery().characters;

    return (
        <div>
            <h2 className="text-xl font-bold my-1">Recherche de personnages par pouvoir</h2>

            <p className="my-1">Exemples : Vol, Invulnérabilité, Régénération, Vitesse surhumaine, Force surhumaine, etc.</p>

            <Input type="text" {...powerInput} placeholder="Pouvoir du personnage" className="bg-white w-xs" />
            <Button variant="outline" className="ml-1 cursor-pointer" onClick={usePowerQuery().getCharacters(powerInput.value)}>Rechercher</Button>

            <p className="my-2">1 résultat(s)</p>

            <div className="row">
                {powers.map((a) => {
                    <div>
                        <img src={a.imageUrl} alt={a.name} />
                        <p>Nom : {a.name}</p>
                        <p>Âge : {a.age == null ? ("inconnue") : (a.age)}</p>
                        <p>Statut : {a.isAlive ? ("En vie") : ("Mort")}</p>
                        <hr className="my-1" />
                    </div>
                })
                }
            </div>

        </div>
    );

}