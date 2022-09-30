import React, {
  createContext,
  useState,
} from "react";

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
    dropType: "teste",
    id: "column1",
    name: "Todo",
    itens: [
      {
        dropType: "teste",
        id: "item1",
        title: "Lavar a loça",
      },
      {
        dropType: "teste",
        id: "item2",
        title: "Fazer o almoço",
      },
    ],
  },
  {
    dropType: "teste",
    id: "column2",
    name: "Doing",
    itens: [
      {
        dropType: "teste",
        id: "item3",
        title: "Programar",
      },
    ],
  },
  {
    dropType: "teste",
    id: "column2",
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
    if (currentDropZoneIndex === newDropZoneIndex) {
      const newData = [...data];
      const newDropzoneData = [...newData[newDropZoneIndex]];

      if (hoveringElement) {
        newDropzoneData.splice(
          hoveringElement.index,
          0,
          newDropzoneData[draggingElement.index]
        );
        newDropzoneData.splice(draggingElement.index, 1);
        newData[newDropZoneIndex] = newDropzoneData;
        setData(newData);
      } else {
        newDropzoneData.push(newDropzoneData[draggingElement.index]);
        newDropzoneData.splice(draggingElement.index, 1);
        newData[newDropZoneIndex] = newDropzoneData;
        setData(newData);
      }
    } else {
      const newData = [...data];
      const newCurrentDropzoneData = [...newData[currentDropZoneIndex]];
      const newNewDropzoneData = [...newData[newDropZoneIndex]];

      if (hoveringElement) {
        newNewDropzoneData.splice(
          hoveringElement.index,
          0,
          newCurrentDropzoneData[draggingElement.index]
        );
        newCurrentDropzoneData.splice(draggingElement.index, 1);

        newData[currentDropZoneIndex] = newCurrentDropzoneData;
        newData[newDropZoneIndex] = newNewDropzoneData;
        setData(newData);
      } else {
        newNewDropzoneData.push(newCurrentDropzoneData[draggingElement.index]);
        newCurrentDropzoneData.splice(draggingElement.index, 1);

        newData[currentDropZoneIndex] = newCurrentDropzoneData;
        newData[newDropZoneIndex] = newNewDropzoneData;
        setData(newData);
      }
    }
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
