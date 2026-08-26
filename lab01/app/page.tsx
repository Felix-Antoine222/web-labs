import Image from "next/image";

export default function Home() {
  return(
  <div className="m-auto w-3xl">
    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-pink-100">
        Gauche
      </div>
      <div className="flex-3 p-1 bg-blue-100">
        Droite
      </div>
    </div>
    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-color-1">
        Gauche
      </div>
      <div className="flex-3 p-1 bg-color-2">
        Droite
      </div>
    </div>
  </div>
  );
}
