import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleRes = () => {
    setCounter(counter - 1);
    //OTRA FORMA
    //setCounter(prevState => prevState - 1);
  };

  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    //Properties o Values
    //counter: counter
    //es lo mismo
    counter,

    //Metodos o Actions
    handleAdd,
    handleRes,
    handleReset,
  };
};
