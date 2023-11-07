import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <div>
      <h1>{props.title}</h1>
      </div>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button  onClick={()=>props.onEdit(props.id)}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
