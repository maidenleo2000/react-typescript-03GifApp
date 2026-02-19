// import React from 'react'

import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

//?Las 2 formas { searches }: Props y : FC<Props> = ({ searches }) son similares
// export const PreviousSearches = ({ searches }: Props) => {
export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    <div className="previous-searches">
      <h2 style={{ marginBottom: "10px" }}>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term} onClick={() => onLabelClicked(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
