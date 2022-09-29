import React, { useCallback, useState } from "react";

interface iUseDropZoneParams<E = any> {
  draggingElement: E;
  hoveringElement: E;
  dropType: string;
  callback: () => void;
}

interface iDropZoneEvents {
  onDragOver: (event: DragEvent) => void;
  onDrop: () => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
}

interface iUseDropZoneReturn {
  hover: boolean;
  dropZoneEvents: iDropZoneEvents;
}

export type tUseDropZone<E = any> = (
  params: iUseDropZoneParams<E>
) => iUseDropZoneReturn;

export const useDropZone: tUseDropZone = ({
  draggingElement,
  dropType,
  callback,
}) => {
  const [hover, setHover] = useState(false);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDragEnter = useCallback(() => {
    if (draggingElement.dropType === dropType) {
      setHover(true);
    }
  }, [draggingElement, dropType]);

  const onDragLeave = useCallback(() => {
    if (draggingElement.dropType === dropType) {
      setHover(false);
    }
  }, [draggingElement, dropType]);

  const onDrop = () => {
    if (draggingElement.dropType === dropType) {
      callback();
    }
    setHover(false);
  };

  return {
    hover,
    dropZoneEvents: {
      onDragOver,
      onDrop,
      onDragEnter,
      onDragLeave,
    },
  };
};
