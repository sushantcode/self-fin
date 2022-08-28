import * as React from "react";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import "./Style.css";
import { Checkbox, Toolbar, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { update, order, orderBy, onRequestSort, tableHeaders } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {update && <TableCell padding="checkbox" />}
        {tableHeaders.map(headCell =>
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                : null}
            </TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = props => {
  const { numSelected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>

      <Tooltip title="Delete">
        <FontAwesomeIcon
          onClick={onDelete}
          className="me-2 text-danger fs-5"
          icon={faTrash}
        />
      </Tooltip>
    </Toolbar>
  );
};

const SmartTable = props => {
  const { tableHeaders, data, update, subject } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  React.useEffect(
    () => {
      setRows(data);
    },
    [data]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, ind) => {
    const selectedIndex = selected.indexOf(ind);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ind);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const onDelete = () => {
    let currRows = [...rows];
    selected.sort();
    selected.forEach((element, index) => {
      currRows.splice(element - index, 1);
    });
    setRows(currRows);
    setSelected([]);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {rows &&
        <Paper sx={{ width: "100%", mb: 2 }}>
          {selected.length > 0 &&
            <EnhancedTableToolbar
              numSelected={selected.length}
              onDelete={onDelete}
            />}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                update={update}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                tableHeaders={tableHeaders}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(index);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return subject !== "investments"
                      ? <TableRow
                          onClick={event => handleClick(event, index)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          hover
                          tabIndex={-1}
                          key={index}
                        >
                          {update &&
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId
                                }}
                              />
                            </TableCell>}
                          {tableHeaders.map(item => {
                            return (
                              <TableCell key={item.id}>
                                {row[item.id]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      : <TableRow hover tabIndex={-1} key={index}>
                          <TableCell>
                            {row.broker}
                          </TableCell>
                          <TableCell>
                            {row.stock +
                              (row.company.length !== 0
                                ? " (" + row.company + ")"
                                : "")}
                          </TableCell>
                          <TableCell>
                            {row.amount}
                          </TableCell>
                          <TableCell>
                            {row.units}
                          </TableCell>
                          <TableCell>
                            {row.date}
                          </TableCell>
                          <TableCell>
                            {row.vested}
                          </TableCell>
                          <TableCell>
                            {row.remarks}
                          </TableCell>
                        </TableRow>;
                  })}
                {emptyRows > 0 &&
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>}
    </Box>
  );
};

export default SmartTable;
