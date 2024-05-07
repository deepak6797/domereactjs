import { TableStyles } from "react-data-table-component";

export const defaultCustomStyle: TableStyles = {
  rows: {
    style: {
      
      "&:nth-of-type(odd)": { // Apply background color to odd rows
        backgroundColor: "#E5E7EB",
      },
      "&:nth-of-type(even)": { // Apply background color to even rows
        backgroundColor: "#F3F4F6",
      },
    },
  },
  headCells: {
    style: {
      color: "#797979",
      display: "flex",
      justifyContent: "space-evenly",
      borderRadius: "5px",
      backgroundColor: "#F3F4F6",
      fontSize: "13px",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      display: "flex",
      justifyContent: "center",
      color: "#000000",
      fontSize: "12px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};
