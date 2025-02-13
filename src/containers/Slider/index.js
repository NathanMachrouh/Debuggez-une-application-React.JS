import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    /* 
      Changement de l'opérateur logique pour trier dans le bon sens les images
      De la plus récente à la plus ancienne (ordre décroissant)
    */
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const nextCard = () => {
    setTimeout(
      /*
        Suppression de l'élément "undefined" en ajoutant +1 à index
        Ajout de "?" pour vérifier que byDateDesc existe
      */
      () => setIndex(index < (byDateDesc ? byDateDesc.length - 1 : 0) ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {/* Suppresion des <></> qui encapsulait 2 éléments différents */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            {/* Attribut alt modifié pour avoir les renseignements correspondants à l'image */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={`slider-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Remplacement de idx par index pour indiquer sur quelle image on se trouve
                  readOnly // Ajout de readOnly pour retirer erreur console, met les boutons radio en lecture seul
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
