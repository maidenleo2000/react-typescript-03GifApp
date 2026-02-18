//import React from "react";

interface Props {
  title: string;
  description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="content-center">
      <br />
      <h1>{title}</h1>
      {/* Esto es si existe description se muestra */}
      {description && <p>{description}</p>}
    </div>
  );
};
