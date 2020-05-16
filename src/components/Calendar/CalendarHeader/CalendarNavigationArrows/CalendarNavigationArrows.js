/*
Responsible for rendering the arrows that navigate
to other months
Still in the process of being migrated to other modules
*/
import React from "react";

import { css } from "emotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const buttonStyle = css`
  width: 100px;
  padding: 0;
  border: none;
  background: none;
`;

const NavArrows = (props) => {
  const { direction, onClick } = props;
  return (
    <button
      id={`${direction}-nav-arrow`}
      className={buttonStyle}
      data-test={`${direction}-nav-arrow`}
      onClick={(e) => onClick(e, direction)}
    >
      <FontAwesomeIcon
        icon={direction === "left" ? faChevronLeft : faChevronRight}
        size="3x"
        style={{ color: "white" }}
      />
    </button>
  );
};

export default NavArrows;
