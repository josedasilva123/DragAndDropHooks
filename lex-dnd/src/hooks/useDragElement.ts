import React, { useState, useCallback } from "react";

interface iUseDragElementParams<E = any> {
  currentElement: E;
  draggingElement: E;
  setDraggingElement: React.Dispatch<React.SetStateAction<E>>;
  setHoveringElement: React.Dispatch<React.SetStateAction<E>>;
  dropType: string;
}

interface iDragElementEvents {
    onDragStart: () => void;
    onDragEnd: () => void;
    onDragOver: (event: DragEvent) => void;
}

interface iUseDragElementReturn {
    dragging: boolean,
    hover: boolean,
    dragElementEvents: iDragElementEvents;
}

export type tUseDragElement<E = any> = (params: iUseDragElementParams<E>) => iUseDragElementReturn;

export const useDragElement: tUseDragElement = ({
  currentElement,
  draggingElement,
  setDraggingElement,
  setHoveringElement,
  dropType,
}) => {
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);

  const onDragStart = useCallback(() => {
    setDraggingElement(currentElement);
    setDragging(true);
  }, [currentElement, setDraggingElement]);;

  const onDragEnd = useCallback(() => {
    setDraggingElement(null);
    setDragging(false);
  }, [setDraggingElement]);

  const onDragOver = (
    event: DragEvent,
  ) => {
    if (draggingElement.dropType === dropType && dragging) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offset = event.clientY - rect.top - rect.height / 2;

      if (offset < 0) {
        setHoveringElement(currentElement);
        setHover(true);
      } else {
        setHoveringElement(null);
        setHover(false);
      }

    }
  };

  return {
    dragging,
    hover,
    dragElementEvents: {
        onDragStart,
        onDragEnd,
        onDragOver
    }
  }
};
