import Card from "../_components/Card";

export default function List() {

    const characters : string[] = ["bebe","butters","clyde","craig","eric","kenny","kyle","nichole","stan","tolkien","wendy"];

    return (
        <div>
            <h3>Liste de personnages</h3>

            <div className="characters">

                {/* Intégrer le composant card ici ... plusieurs fois ! */}

                {characters.map(c => <Card key={c} characterName={c}/>)}

            </div>
        </div>

    );

} 