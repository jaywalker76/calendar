/*
Responsible for rendering the arrows that navigate
to other months
Still in the process of being migrated to other modules
*/
import React from "react";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styling from "./style";

const NavArrows = props => {
    const { direction, onClick } = props;
    return (
        <div style={styling.navigationArrows} data-test={`${direction}-nav-arrow`}
        onClick={onClick}>
            <FontAwesomeIcon
      icon={direction === "left" ? faChevronLeft : faChevronRight}
    />
        </div>
    );
  };

export default NavArrows;
