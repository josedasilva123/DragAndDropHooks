import React, { createContext, useEffect, useState } from "react";
import produce from "immer";

interface iDragAndDropProviderProps {
  children: React.ReactNode;
}

interface iDragAndDropContext {
  data: any;
  dropAction: (currentDropZoneIndex: number, newDropZoneIndex: number) => void;
  draggingElement: any | null;
  setDraggingElement: React.Dispatch<any>;
  hoveringElement: any | null; 
  setHoveringElement: React.Dispatch<any>;
}

export const DragAndDropContext = createContext({} as iDragAndDropContext);

const mockData = [
  {
    id: "column1",
    name: "Todo",
    itens: [
      {
        id: "item1",
        title: "Lavar a loça",
      },
      {
        id: "item2",
        title: "Fazer o almoço",
      },
    ],
  },
  {
    id: "column2",
    name: "Doing",
    itens: [
      {
        id: "item3",
        title: "Programar",
      },
    ],
  },
  {
    id: "column3",
    name: "Done",
    itens: [],
  },
];

export const DragAndDropProvider = ({
  children,
}: iDragAndDropProviderProps) => {
  const [data, setData] = useState<any>(mockData);
  const [draggingElement, setDraggingElement] = useState<any | null>(null);
  const [hoveringElement, setHoveringElement] = useState<any | null>(null);

  const dropAction = (
    currentDropZoneIndex: number,
    newDropZoneIndex: number
  ) => {
    const currentElement = {
      ...data[currentDropZoneIndex].itens[draggingElement.index],
    };
    
    const newData = produce(data, (draft: any) => {
      draft[currentDropZoneIndex].itens.splice(draggingElement.index, 1);
      hoveringElement
        ? draft[newDropZoneIndex].itens.splice(
            hoveringElement.index,
            0,
            currentElement
          )
        : draft[newDropZoneIndex].itens.push(currentElement);
    }); 
    

    setData(newData);
  };

  return (
    <DragAndDropContext.Provider
      value={{
        data,
        dropAction,
        draggingElement,
        setDraggingElement,
        hoveringElement,
        setHoveringElement,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};
