import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header(props) {
  return (
    <>
    {/* <nav class="navbar navbar-dark bg-dark"> */}

      <header>
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
      </header>

      <div style={{ display: "flex" }}>
        <button
          onClick={() => props.deleteAll()}
          style={{ marginLeft: "auto" }}
          type="button"
          className="btn btn-danger"
          >
          Delete All
        </button>
      </div>
          {/* </nav> */}
    </>
  );
}

export default Header;
