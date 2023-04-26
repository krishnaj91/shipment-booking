import React, { useState } from "react";
import "./help.css";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import ClearIcon from "@mui/icons-material/Clear";

const Help = () => {
  const [iconActive, setIconActive] = useState(false);
  
  return (
    <div>
      <div className="help-main">
        {iconActive === true ? (
          <CommentsDisabledIcon
            className="help-icon"
            fontSize="large"
            onClick={() => setIconActive(!iconActive)}
          />
        ) : (
          <CommentIcon
            className="help-icon"
            fontSize="large"
            onClick={() => setIconActive(!iconActive)}
          />
        )}
      </div>

      {iconActive === true && (
        <div className="help-view">
          <div className="help-cross">
            <h2>Hello...</h2>
            <ClearIcon fontSize="large" onClick={() => setIconActive(false)}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
