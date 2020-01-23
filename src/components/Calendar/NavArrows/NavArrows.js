import React from "react";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styling from "./style";

const NavArrows = props => {
    const { direction } = props;
    return (
        <div style={styling.navigationArrows} data-test={`${direction}-nav-arrow`}>
            <FontAwesomeIcon
      icon={direction === "left" ? faChevronLeft : faChevronRight}
    />
        </div>
    );
  };

export default NavArrows;