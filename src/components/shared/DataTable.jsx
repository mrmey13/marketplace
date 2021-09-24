import React, { useEffect, useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableColumnResizing,
    TableSelection,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import { PagingState, SortingState, CustomPaging, SelectionState, IntegratedSelection } from '@devexpress/dx-react-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import useInterval from './useInterval';

import { TableSettingContext } from '../contexts/TableSettingContext';
import color from '../../theme/color';

const styles = (theme) => ({
    grid_Container: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto'
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            // backgroundColor: 'rgb(186, 207, 255)'
            backgroundColor: 'rgb(255, 255, 255)'
        },
        '& tbody tr:nth-of-type(even)': {
            // backgroundColor: 'rgb(217, 226, 244)'
            backgroundColor: color.corvette
        }
    },
    cell_button: {
        width: 100,
        marginLeft: 2,
        marginRight: 2
    }
});

function DataTable({
    rows = [],
    columns = [],
    sorting = [],
    selection = [],
    currentPage = 0,
    pageSize = 15,
    pageSizes = [],
    loading = false,
    totalCount = 0,
    columnWidths = [],
    changeSorting = () => null,
    changeCurrentPage = () => null,
    changePageSize = () => null,
    handleSelections = () => null,
    ActionCell = null,
    CellComponent = null,
    autoLoadData = () => null
}) {
    const { tableheight, autoreload, intervaltime } = useContext(TableSettingContext);
    // const [selection, setSelection] = useState([]);

    useInterval(() => {
        if (autoreload) {
            autoLoadData();
            const dom = ReactDOM.findDOMNode(document.body).children || [];
            for (let item of dom)
                if (item.className === '' && item.style.pointerEvents === 'all')
                    item.style.pointerEvents = 'none';

            // for (let i = 0; i < dom.length; i++) {
            //     if (dom[i].className == '' && dom[i].style.pointerEvents == 'all') {
            //         dom[i].style.pointerEvents = 'none';
            //     }
            // }
        }
    }, intervaltime * 1000);

    const getRowId = (row) => row.id;

    const RowComponent = (props) => {
        return (
            <Table.Row
                {...props}
                style={{
                    margin: 1,
                    padding: 1,
                    height: 40
                }}
            />
        );
    };

    const HeaderRowComponent = (props) => {
        return (
            <TableHeaderRow.Row
                {...props}
                style={{
                    margin: 1,
                    padding: 1,
                    height: 46,
                    // backgroundColor: 'rgb(63, 109, 193)'
                    backgroundColor: color.rajah
                }}
            />
        );
    };

    const DefaultCellComponent = (props) => {
        const { column } = props;
        if (column.name === 'action') {
            return (
                <Table.Cell
                    {...props}
                    style={{
                        display: 'flex',
                        padding: 1,
                        justifyContent: 'center',
                        fontSize: '12px'
                    }}
                >
                    <ActionCell {...props} />
                </Table.Cell>
            );
        }

        return (
            <Table.Cell
                {...props}
                style={{
                    padding: 2
                }}
            />
        );
    };

    const HeaderCellComponent = (props) => {
        return (
            <TableHeaderRow.Cell
                {...props}
                style={{
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600',
                    margin: 1,
                    padding: 1,
                    paddingLeft: 40
                }}
            />
        );
    };

    const tableMessages = {
        noData: 'Không có dữ liệu'
    };

    const pagingPanelMessages = {
        showAll: 'Hiển thị tất cả',
        rowsPerPage: 'Số dòng mỗi trang',
        info: '{from} đến {to} / Tổng : {count}'
    };

    return (
        <>
            <Paper
                style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}
                className={styles.grid_Container}
            >
                {/* <span>
                    Total rows selected:
                    {' '}
                    {selection.length}
                </span> */}
                <Grid rows={rows} columns={columns} getRowId={getRowId}>
                    <SortingState sorting={sorting} onSortingChange={changeSorting} />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={changeCurrentPage}
                        onPageSizeChange={changePageSize}
                        pageSize={pageSize}
                    />
                    {/* <SelectionState
                        selection={selection}
                        onSelectionChange={handleSelections}
                    />
                    <IntegratedSelection /> */}
                    <CustomPaging totalCount={totalCount} />
                    <VirtualTable
                        columnExtensions={columnWidths}
                        tableComponent={TableComponent}
                        cellComponent={CellComponent ? CellComponent : DefaultCellComponent}
                        rowComponent={RowComponent}
                        messages={tableMessages}
                        height={`${tableheight}px`}
                    />
                    <TableColumnResizing defaultColumnWidths={columnWidths} />
                    <TableHeaderRow
                        showSortingControls
                        className={styles.grid_header}
                        rowComponent={HeaderRowComponent}
                        cellComponent={HeaderCellComponent}
                    />
                    {/* <TableSelection showSelectAll /> */}
                    <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
                    {loading && (
                        <CircularProgress
                            style={{
                                position: 'relative',
                                left: '50%',
                                top: '200px'
                            }}
                        />
                    )}
                </Grid>
            </Paper>
        </>
    );
}

export default DataTable;

const TableComponentBase = ({ classes, ...restProps }) => (
    <VirtualTable.Table {...restProps} className={classes.tableStriped} />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
