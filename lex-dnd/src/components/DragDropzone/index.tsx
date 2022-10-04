import React, { useContext } from "react";
import { DragAndDropContext } from "../../contexts/DragAndDropContext";
import { useDropZone } from "../../hooks/useDropZone";
import DragElement, { iDragElement } from "../DragElement";
import styles from "./style.module.css";

export interface iDropzone {
  id: string;
  name: string;
  itens: iDragElement[];
}

interface iDragDropZoneProps {
  dropzone: iDropzone;
  index: number;
}

const DragDropzone = ({ dropzone, index }: iDragDropZoneProps) => {
  const { draggingElement, dropAction, hoveringDropZone, setHoveringElement } =
    useContext(DragAndDropContext);

  const { dropZoneEvents } = useDropZone({
    dropType: "teste",
    draggingElement,
    callback: () => dropAction(draggingElement.dropZoneIndex, index),
    setHoveringElement,
  });

  return (
    <div {...dropZoneEvents} className={styles.dropzone}>
      <h2>{dropzone.name}</h2>
      <ul>
        {dropzone.id === hoveringDropZone && <h1>Em cima</h1>}
        {dropzone.itens.map((dragElement, dragElementIndex) => (
          <DragElement
            key={dragElementIndex}
            index={dragElementIndex}
            dropZoneIndex={index}
            dragElement={dragElement}
          />
        ))}
      </ul>
    </div>
  );
};

export default DragDropzone;
