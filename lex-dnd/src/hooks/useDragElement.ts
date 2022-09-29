import React, { useState } from "react";

interface iUseDragParams<E = any> {
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

interface iUseDragReturn {
    dragging: boolean,
    hover: boolean,
    dragElementEvents: iDragElementEvents;
}

export const useDragElement = ({
  currentElement,
  draggingElement,
  setDraggingElement,
  setHoveringElement,
  dropType,
}: iUseDragParams): iUseDragReturn => {
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);

  const onDragStart = () => {
    setDraggingElement(currentElement);
    setDragging(true);
  };

  const onDragEnd = () => {
    setDraggingElement(null);
    setDragging(false);
  };

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
