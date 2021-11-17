import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Icon } from '@material-ui/core';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Link } from 'react-router-dom';

import cs from '../../const';
import DataTable from '../shared/DataTable.jsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BUYER_PRODUCT_LIST_URL = `${cs.BaseURL}/api/buyer/order/list`;

const ActionCell = (props) => {
  return (
    <>
      <Button
        color="primary"
        style={{
          margin: 0,
          padding: 0,
        }}
        component={Link}
        to={'/user/purchase/detail/' + props.row.maDonHang}
      >
        <Icon>edit</Icon>
        Chi tiết
      </Button>
    </>
  );
};

const CellComponent = (props) => {
  if (props.column.name === 'action')
    return (
      <Table.Cell
        {...props}
        style={{
          padding: 2,
          fontSize: '11px',
        }}
      >
        <ActionCell {...props} />
      </Table.Cell>
    );
  return (
    <Table.Cell
      {...props}
      style={{
        padding: 2,
        fontSize: '11px',
      }}
    />
  );
};

export default function Purchase() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { name: 'action', title: 'Thao tác' },
    { name: 'maDonHang', title: 'Mã đơn hàng' },
  ]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'action', align: 'center', width: 200 },
    { columnName: 'maDonHang', align: 'center', width: 200 },
  ]);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadData();
  }, [value, currentPage]);

  const loadData = async () => {
    console.log(value);
    const body = {
      maDonHang: [],
      statusId: 0,
      page: currentPage,
      size: 10,
      groupStatusId: value,
    };
    const response = await fetch(BUYER_PRODUCT_LIST_URL, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + '-token'),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data && data.data) {
      if (data.data.length > 0) {
        setRows(data.data);
        setTotalCount(data.total_count);
      } else {
        setRows([{ maDonHang: 0 }]);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const changePageSize = (pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ xác nhận" {...a11yProps(1)} />
          <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
          <Tab label="Đang giao" {...a11yProps(3)} />
          <Tab label="Đã giao" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Tất cả
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          CellComponent={CellComponent}
          autoLoadData={loadData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Chờ xác nhận
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          CellComponent={CellComponent}
          autoLoadData={loadData}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Chờ lấy hàng
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          CellComponent={CellComponent}
          autoLoadData={loadData}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Đang giao
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          CellComponent={CellComponent}
          autoLoadData={loadData}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Đã giao
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          CellComponent={CellComponent}
          autoLoadData={loadData}
        />
      </TabPanel>
    </Box>
  );
}
