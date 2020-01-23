const styling = {
  outerWrapper: {
    width: 600
  },
  calendarWrapper: {
    width: "100%",
    border: "1px solid black"
  },
  calendarHeader: {
    background: "blue",
    height: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#f9f9f9",
    fontSize: 30
  },
  navigationArrows: {
    width: 36,
    justifyContent: "center",
    display: "flex"
  },
  daysHeader: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: "70%",
    borderBottom: "1px solid red"
  },
  dayHeaderCell: {
    textAlign: "center",
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: "100%"
  },
  row: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  cell: {
    maxWidth: "100%",
    flexGrow: 0,
    flexBasis: "calc(100% / 7)",
    width: "calc(100% / 7)",
    position: "relative",
    height: "5em"
  }
};

export default styling;
