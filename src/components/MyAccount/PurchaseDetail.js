import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogWrapper from '../shared/DialogWrapper.jsx';
import DataTable from '../shared/DataTable.jsx';

import cs from '../../const';

const BUYER_PRODUCT_DETAIL_URL = `${cs.BaseURL}/api/buyer/order/detail`;

export default function PurchaseDetail(props) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { name: 'productName', title: 'Sản phẩm' },
    { name: 'variationName', title: 'Phân loại' },
    { name: 'price', title: 'Giá' },
    { name: 'amount', title: 'Số lượng' },
    { name: 'maDonHang', title: 'Mã đơn hàng' },
    { name: 'maVanDon', title: 'Mã vận đơn' },
  ]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'productName', align: 'center', width: 350 },
    { columnName: 'variationName', align: 'center', width: 200 },
    { columnName: 'price', align: 'center', width: 150 },
    { columnName: 'amount', align: 'center', width: 150 },
    { columnName: 'maDonHang', align: 'center', width: 200 },
    { columnName: 'maVanDon', align: 'center', width: 200 },
  ]);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  // const { maDonHang } = useParams();

  const loadData = async () => {
    const response = await fetch(
      `${BUYER_PRODUCT_DETAIL_URL}?maDonHang=${props.match.params.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      }
    );
    const data = await response.json();
    if (data && data.data && data.data.orderItems) {
      if (data.data.orderItems.length > 0) {
        setRows(data.data.orderItems);
      }
    }
  };

  const changeCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const changePageSize = (pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <DialogWrapper title={'Chi tiết đơn hàng'} width={'md'} {...props}>
      <DialogContent>
        <DataTable
          rows={rows}
          columns={columns}
          columnWidths={tableColumnExtensions}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={changeCurrentPage}
          changePageSize={changePageSize}
          autoLoadData={loadData}
        />
      </DialogContent>
      <DialogActions></DialogActions>
    </DialogWrapper>
  );
}
