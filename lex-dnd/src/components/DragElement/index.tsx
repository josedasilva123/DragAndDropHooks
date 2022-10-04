import React, { useContext } from "react";
import { DragAndDropContext } from "../../contexts/DragAndDropContext";
import { useDragElement } from "../../hooks/useDragElement";
import styles from "./style.module.css";

export interface iDragElement {
  id: string;
  title: string;
}

export interface iDragElementProps {
  dragElement: iDragElement;
  index: number;
  dropZoneIndex: number;
}

const DragElement = ({
  dragElement,
  index,
  dropZoneIndex,
}: iDragElementProps) => {
  const { draggingElement, setDraggingElement, hoveringElement, setHoveringElement } =
    useContext(DragAndDropContext);
  const { dragElementEvents, hover } = useDragElement({
    currentElement: {
      dropType: "teste",
      index,
      dropZoneIndex,
      ...dragElement,
    },
    dropType: "teste",
    draggingElement,
    setDraggingElement,
    hoveringElement,
    setHoveringElement,
  });
  
  return (
    <div draggable={true} {...dragElementEvents} className={`${styles.taskCard} ${hover ? styles.hover : ""}`}>
      <li>
        <h3>{dragElement.title}</h3>
      </li>
    </div>
  );
};

export default DragElement;
