export class Towel{

    constructor(
        public color : string,
        public length : number,
        public image : string,
        public wet : boolean
    )
    {   
        function use() : string{
            if (wet)
            {
                wet = false;
                return "La cible est maintenant sèche.";
            }
            
            return "Ça ne fonctionne pas...";
        }
    }
}