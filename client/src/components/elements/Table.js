import React, {Fragment} from 'react';

import MuiTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

class Table extends React.PureComponent {
  render() {
    let {columns = [], rows = [], page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, rowsPerPageOptions = [10, 25, 100] } = this.props;

    return (
      <Fragment>
        <div className='operations-table-wrapper'>
          <MuiTable stickyHeader>
            <TableHead>
              <TableRow>
                {
                  columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {
                      columns.map(column => (
                        <TableCell key={column.id} align={column.align}>
                          { column.format ? column.format(row[column.id]) : row[column.id] }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </MuiTable>
        </div>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Fragment>
    )
  }
}

export default Table;