import React, { useContext } from "react";
import {
  DragAndDropContext,
} from "../../contexts/DragAndDropContext";
import DragDropzone from "../DragDropzone";
import styles from "./style.module.css";

const DragList = () => {
  const { data } = useContext(DragAndDropContext);
  return (  
      <ul className={styles.columnList}>
        {data?.map((column: any, index: number) => (
          <DragDropzone key={column.id} index={index} dropzone={column} />
        ))}
      </ul>   
  );
};

export default DragList;
