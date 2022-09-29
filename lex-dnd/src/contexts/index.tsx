import React, { createContext, DragEvent, DragEventHandler, ReactEventHandler, SyntheticEvent, useState } from "react";

export const DragAndDropContext = createContext({});

interface iDragAndDropProviderProps {
  children: React.ReactNode;
}

export const DragAndDropProvider = ({
  children,
}: iDragAndDropProviderProps) => {
  const [draggingElement, setDraggingElement] = useState<any | null>(null);
  const [hoveringElement, setHoveringElement] = useState<any | null>(null);

  return (
    <DragAndDropContext.Provider value={{}}>
      {children}
    </DragAndDropContext.Provider>
  );
};
