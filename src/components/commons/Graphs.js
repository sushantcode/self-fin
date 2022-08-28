import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { mock_data } from "../../Mock_data";

const Graphs = props => {
  const { data } = props;

  const mapDataByDate = () => {
    let dateMappedData = {};
    data.forEach(elemeent => {
      if (dateMappedData.hasOwnProperty(elemeent.date)) {
        dateMappedData.elemeent.date += elemeent.amount;
      }
    });
  };
  function compareFn(a, b) {
    if (a.date > b.date) return 1;
    else if (a.date < b.date) return -1;
    return 0;
  }
  data.sort(compareFn);

  console.log(data);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} />{" "}
    </Box>
  );
};

export default Graphs;
