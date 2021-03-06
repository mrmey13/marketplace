import React, { Component, createContext } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from "react-toast-notifications";

import color from "../../theme/color";
import cs from "../../const";

import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link, withRouter, Route } from 'react-router-dom';

import { Tooltip } from '@material-ui/core';

import { Table } from '@devexpress/dx-react-grid-material-ui';

// import { DataGrid } from '@material-ui/data-grid';
import DataTable from '../shared/DataTable.jsx';
import ApproveProduct from './ApproveProduct';
import { getFunctionRoles, getRole, isSeller } from '../../service';
// import ShopProfile from './ApproveProduct';

const allProductStatusURL = cs.BaseURL + "/api/manager/common/all-product-status";
const productListURL = cs.BaseURL + "/api/seller/product/list";
const styles = (theme) => ({
    tabBtn: {
        color: color.casablanca,
        border: `1px solid ${color.casablanca}`,
        backgroundColor: "#FFFFFF",
        padding: "6px 16px",
        // "&:hover": {
        // 	backgroundColor: color.seabuckthorn,
        // 	boxShadow: `0 0px 10px ${color.seabuckthorn}`,
        // },
    },

    tabBtnSelected: {
        color: "#FFFFFF",
        backgroundColor: color.casablanca,
        padding: "6px 16px",
        "&:hover": {
            backgroundColor: color.seabuckthorn,
            boxShadow: `0 0px 10px ${color.seabuckthorn}`,
        },
    }
});

export const TabHoldContext = createContext("all");
class SellerProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openApproveModal: false,
            currentTab: this.props.match.params.type || "all", // all, active, soldout, banned, unlisted
            columns: [
                { name: "productName", title: 'T??n s???n ph???m' },
                { name: 'variationSKU', title: 'SKU ph??n lo???i' },
                { name: 'variationName', title: 'Ph??n lo???i h??ng' },
                { name: 'price', title: 'Gi??' },
                { name: 'stock', title: 'Kho h??ng' },

                { name: 'sales', title: '???? b??n' },
                { name: 'productStatusId', title: 'productStatusId' },
                // { name: 'totalNumberOfQuestions', title: 'S??? c??u h???i' },
                // { name: 'stock', title: 'stock' },
                { name: 'action', title: 'Thao t??c' }
            ],
            rows: [
                // {
                //     id: 0,
                //     productName: "TEST",
                //     variationSKU: "RFF2",
                //     variationName: "SDWD",
                //     price: "E23",
                //     stock: "EDEWFE",
                //     sales: "21"
                // },
                // {
                //     id: 1,
                //     productName: "TEST 2",
                //     variationSKU: "RFF2 2",
                //     variationName: "SDWDfafa",
                //     price: "E23",
                //     stock: "EDEWFE",
                //     sales: "21"
                // }
            ],
            // rows:[
            //     {"lectureOrderNumber":127,"courseId":6}
            // ],
            selection: [],
            tableColumnExtensions: [
                { columnName: 'productName', align: 'center', width: 200 },
                { columnName: 'variationSKU', align: 'center', width: 160 },
                { columnName: 'variationName', align: 'center', width: 160 },
                { columnName: 'price', align: 'center', width: 120 },
                { columnName: 'stock', align: 'center', width: 120 },
                { columnName: 'sales', align: 'center', width: 150 },
                { columnName: 'productStatusId', align: 'center', width: 150 },
                { columnName: 'totalNumberOfQuestions', align: 'center', width: 250 },
                { columnName: 'action', align: 'center', width: 200 }

            ],
            pageSizes: [5, 10],
            totalCount: 0,
            pageSize: 5,
            currentPage: 0,
            loading: true,
            sorting: [{ columnName: 'lead_created_at_unix', direction: 'desc' }],
            statusList: []
        };

        if (!isSeller()) {
            window.location.href = "/";
        }
        this.tmpData = [];

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleSelections = this.handleSelections.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    componentDidMount() {
        if (!isSeller()) {
            window.location.href = "/";
        }
        // this.loadStatus();
        this.loadData();
    }

    handleSelections(selection) {
        console.log(selection);
        this.setState({
            selection: selection
        })
    }

    loadStatus() {
        let queryString = `${allProductStatusURL}`;
        fetch(queryString, {
            method: "GET",
            // body: JSON.stringify({}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem(cs.System_Code + "-token"),
            },
        })
            .then((response) => response.json())
            .then((data) => {

                console.log("status", data.data);
                if (data && data.data) {
                    this.setState({
                        statusList: data.data
                    })
                }
            })
            .catch(() => {
                // sessionStorage.clear();
                // localStorage.clear();
                // window.location.reload();
            });
    }

    queryString() {
        const {
            pageSize,
            currentPage,
            sorting,
            currentTab
        } = this.state;

        let productStatus = null;

        switch (currentTab) {
            case 'new':
                productStatus = 1;
                break;
            case 'justChanged':
                productStatus = 2;
                break;
            case 'deleted':
                productStatus = 3;
                break;
            case 'contraband':
                productStatus = 4;
                break;
            case 'violatesRules':
                productStatus = 5;
                break;
            case 'accepted':
                productStatus = 10;
                break;
            case 'notAccepted':
                productStatus = 9;
                break;
            case 'soldout':
                productStatus = 20;
                break;
            default:
                break;
        }

        let queryString = `${productListURL}?size=${pageSize}&page=${currentPage + 1}`;
        if (productStatus) {
            queryString += `&status=${productStatus}`;
        }
        const columnSorting = sorting[0];
        return queryString;
    }

    loadData() {
        let queryString = this.queryString();
        fetch(queryString, {
            method: "GET",
            // body: JSON.stringify({}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem(cs.System_Code + "-token"),
            },
        })
            .then((response) => response.json())
            .then((data) => {

                console.log("data", data.data);
                if (data && data.data) {
                    this.setState({
                        rows: data.data,
                        totalCount: data.total_count,
                        loading: false
                    });
                }
            })
            .catch(() => {
                // sessionStorage.clear();
                // localStorage.clear();
                // window.location.reload();
            });
    }

    handleChangeTab(newValue) {
        // console.log(event, newValue);
        this.setState({ currentTab: newValue })
    }

    changeCurrentPage(currentPage) {
        this.setState(
            {
                loading: true,
                currentPage: currentPage
            },
            () => {
                this.loadData();
            }
        );
    }

    changePageSize(pageSize) {
        this.setState(
            {
                loading: true,
                pageSize: pageSize,
                currentPage: 0
            },
            () => {
                this.loadData();
            }
        );
    }

    handleClose() { }

    render() {
        const { classes, t, i18n } = this.props;
        if (
            this.props.history &&
            this.props.history.location &&
            this.props.history.location.state &&
            this.props.history.location.state.reload
        ) {
            this.props.history.location.state.reload = false;
            this.loadData();
        }
        const {
            rows,
            columns,
            tableColumnExtensions,
            pageSizes,
            pageSize,
            currentPage,
            totalCount,
            loading,
            sorting,
            course_id,
            selection
        } = this.state;

        return (
            <TabHoldContext.Provider value={this.state.currentTab}>
                <div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "500px" }}>
                        <Button
                            className={this.state.currentTab === 'all' ? classes.tabBtnSelected : classes.tabBtn}

                            variant={"contained"}
                            // component={Link} to="/product/all"
                            onClick={() => { window.location.href = "/seller-product-list/all"; }}
                        >
                            {t("all_products.tabs.all")}
                        </Button>
                        <Button
                            className={this.state.currentTab === 'violatesRules' ? classes.tabBtnSelected : classes.tabBtn}

                            variant={"contained"}
                            onClick={() => { window.location.href = "/seller-product-list/violatesRules"; }}
                        >
                            {t("all_products.tabs.violatesRules")}
                        </Button>
                        <Button
                            className={this.state.currentTab === 'accepted' ? classes.tabBtnSelected : classes.tabBtn}

                            variant={"contained"}
                            onClick={() => { window.location.href = "/seller-product-list/accepted"; }}
                        >
                            {t("all_products.tabs.accepted")}
                        </Button>
                        <Button
                            className={this.state.currentTab === 'soldout' ? classes.tabBtnSelected : classes.tabBtn}
                            // component={Link} to="/product/soldout"
                            onClick={() => { window.location.href = "/seller-product-list/soldout"; }}
                        >
                            {t("all_products.tabs.soldout")}
                        </Button>
                    </div>


                    <div>
                        <DataTable
                            rows={rows}
                            columns={columns}
                            columnWidths={tableColumnExtensions}
                            pageSizes={pageSizes}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            // loading={loading}
                            sorting={sorting}
                            totalCount={totalCount}
                            selection={selection}
                            changeCurrentPage={this.changeCurrentPage}
                            changePageSize={this.changePageSize}
                            changeSorting={this.changeSorting}
                            CellComponent={CellComponent}
                            autoLoadData={this.loadData}
                            handleSelections={this.handleSelections}
                        />
                    </div>
                </div>
            </TabHoldContext.Provider>
        )
    }
}

class CellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { column } = this.props;
        if (column.name === 'action') {
            return <ActionCell {...this.props} />;
        }

        return (
            <Table.Cell
                {...this.props}
                style={{
                    padding: 2,
                    color: '#81557a',
                    fontSize: '12px'
                }}
            />
        );
    }
}

class ActionCell extends React.Component {
    static contextType = TabHoldContext;
    render() {
        return (
            <Table.Cell style={{
                padding: 1,
                justifyContent: 'center',
                fontSize: '12px'
            }}>
                <span>
                    <Tooltip title="Edit">
                        <Button
                            color="primary"
                            style={{
                                margin: 0,
                                padding: 0
                            }}
                            component={Link}
                            // to={`/course_lectures/${this.props.row.courseId}/edit/${this.props.row.lectureOrderNumber}`}
                            to={{
                                pathname: `/product/edit/${this.props.row.productId}`,
                                state: { previous: `/seller-product-list/${this.context}` }
                            }}
                        >
                            <Icon>edit</Icon>
                        </Button>
                    </Tooltip>
                </span>
            </Table.Cell>
        );
    }
}

SellerProducts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(
    withStyles(styles)(withTranslation()(SellerProducts))
);
