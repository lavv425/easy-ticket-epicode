import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Radio, Paper } from '@mui/material';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { memo } from 'react';

const Table = forwardRef(({ headers, body, selectable = false, paginated = true, onRowSelect = () => { } }, ref) => {
    const [selected, setSelected] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useImperativeHandle(ref, () => ({
        resetSelection: () => setSelected(undefined),
        getSelected: () => selected
    }));

    const handleClick = useCallback((id) => {
        setSelected(id);
        onRowSelect(id);
    }, [onRowSelect]);

    const visibleRows = useMemo(() => body.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [body, page, rowsPerPage]);

    return (
        <>
            <Paper variant="outlined">
                <TableContainer>
                    <MuiTable>
                        <TableHead>
                            <TableRow>
                                {selectable ? <TableCell /> : null}
                                {headers.map((head) => (
                                    <TableCell key={head.id}>{head.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row) => {
                                const rowId = row.uuid ?? row.id ?? JSON.stringify(row);
                                const isItemSelected = selected === rowId;

                                return (
                                    <TableRow
                                        key={rowId}
                                        hover
                                        role="checkbox"
                                        selected={isItemSelected}
                                        sx={{ cursor: selectable ? 'pointer' : 'default' }}
                                        onClick={selectable ? () => handleClick(rowId) : undefined}
                                    >
                                        {selectable && (
                                            <TableCell padding="checkbox">
                                                <Radio
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                        )}
                                        {headers.map((head) => (
                                            <TableCell key={head.id}>{row[head.id]}</TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </MuiTable>
                </TableContainer>
            </Paper>
            {paginated &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={body.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            }
        </>
    );
});

export default memo(Table);
