import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Zoom from "@mui/material/Zoom";
import { Notes } from "@mui/icons-material";

const getLocalItems=()=>{
  let list=localStorage.getItem("lists");
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem("lists"));
  }
  else return [];
}

function App() {
  const [notes, setNotes] = useState(getLocalItems);
  const [flag, setflag] = useState(false);

  const [editId, seteditId] = useState(0);

  const [isExpanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function addNote(newNote) {
    if (newNote.title === "" || newNote.content === "") {
      alert("Please Fill the data Before Adding");
    } else if (flag) {
      notes.map((value, index) => {
        if (index == editId) {
          value.title = note.title;
          value.content = note.content;
        }
      });

      setflag(false);
    } else
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  const editNote = (id) => {
    let data = {};
    seteditId(id);
    notes.map((noteItem, index) => {
      if (id === index) {
        data = noteItem;
      }
    });
    setNote({
      title: data.title,
      content: data.content,
    });

    setflag(true);
  };

  //create

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    addNote(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
  // create are

useEffect(()=>{
   localStorage.setItem("lists",JSON.stringify(notes))
},[notes])
  
  
const DeleteAll=()=>{
  setNotes([]);
  console.log(1);
}

  return (
    <div>
      <Header  deleteAll={DeleteAll} />

      <div>
        <form className="create-note">
          {isExpanded ? (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          ) : null}
          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>{flag ? <EditIcon /> : <AddIcon />}</Fab>
          </Zoom>
        </form>
      </div>

      {/* <CreateArea onAdd={addNote}  /> */}

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}

            />
            );
          })}
          
      <Footer />
    </div>
  );
}

export default App;
