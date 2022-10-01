import React, { DragEventHandler, useCallback, useEffect, useState } from "react";

interface iUseDropZoneParams<E = any> {
  draggingElement: E;
  dropType: string;
  callback: () => void;
}

interface iDropZoneEvents {
  onDragOver: DragEventHandler<any>; 
  onDrop: DragEventHandler<any>;
}

interface iUseDropZoneReturn {
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
  const onDragOver: DragEventHandler<any> = (event) => {
    event.preventDefault();
  }

  const onDrop = () => {
    if (draggingElement.dropType === dropType) {
      callback();
    }
  };

  return {
    dropZoneEvents: {
      onDrop,
      onDragOver,
    },
  };
};
