import React from "react";

interface iUseDropZoneParams<E = any> {
  draggingElement: E;
  hoveringElement: E;
  dropType: string;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

interface iDropZoneEvents{
    onDragOver: (event: DragEvent) => void,
    onDrop: () => void,
}

interface iUseDropZoneReturn{
    dropZoneEvents: iDropZoneEvents,
}

export const useDropZone = ({
  draggingElement,
  hoveringElement,
  dropType,
  data,
  setData,
}: iUseDropZoneParams): iUseDropZoneReturn => {
  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = () => {
    if (draggingElement.dropType === dropType) {
      const newData = [...data];

      if (hoveringElement) {
        newData.splice(draggingElement.index, 1);
        newData.splice(hoveringElement.index, 0, data[draggingElement.index]);
        setData(newData);
      } else {
        newData.splice(draggingElement.index, 1);
        newData.push(data[draggingElement.index]);
        setData(newData);
      }
    }
  };

  return {
    dropZoneEvents: {
        onDragOver,
        onDrop,
    }
  }
};
