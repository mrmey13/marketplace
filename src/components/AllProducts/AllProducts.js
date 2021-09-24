import React, { Component } from 'react'
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

import { Link, withRouter, Route } from 'react-router-dom';

import { Tooltip } from '@material-ui/core';

import { Table } from '@devexpress/dx-react-grid-material-ui';

// import { DataGrid } from '@material-ui/data-grid';
import DataTable from '../shared/DataTable.jsx';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

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



class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.match.params.type || "all", // all, active, soldout, banned, unlisted
            columns: [
                { name: "productName", title: 'Tên sản phẩm' },
                { name: 'variationSKU', title: 'SKU phân loại' },
                { name: 'variationName', title: 'Phân loại hàng' },
                { name: 'price', title: 'Giá' },
                { name: 'stock', title: 'Kho hàng' },

                { name: 'sales', title: 'Đã bán' },
                // { name: 'totalNumberOfQuestions', title: 'Số câu hỏi' },
                // { name: 'stock', title: 'stock' },
                { name: 'action', title: 'Thao tác' }
            ],
            rows: [
                {
                    id:0,
                    productName: "TEST",
                    variationSKU:"RFF2",
                    variationName:"SDWD",
                    price:"E23",
                    stock:"EDEWFE",
                    sales:"21"
                },
                {
                    id:1,
                    productName: "TEST 2",
                    variationSKU:"RFF2 2",
                    variationName:"SDWDfafa",
                    price:"E23",
                    stock:"EDEWFE",
                    sales:"21"
                }
            ],
            // rows:[
            //     {"lectureOrderNumber":127,"courseId":6}
            // ],
            selection: [],
            tableColumnExtensions: [
                { columnName: 'productName', align: 'center', width: 200 },
                { columnName: 'variationSKU', align: 'center', width: 200 },
                { columnName: 'variationName', align: 'center', width: 200 },
                { columnName: 'price', align: 'center', width: 200 },
                { columnName: 'stock', align: 'center', width: 200 },
                { columnName: 'sales', align: 'center', width: 150 },
                { columnName: 'totalNumberOfQuestions', align: 'center', width: 250 },
                { columnName: 'action', align: 'center', width: 400 }

            ],
            pageSizes: [5, 10, 20, 30, 60],
            totalCount: 0,
            pageSize: 15,
            currentPage: 0,
            loading: true,
            sorting: [{ columnName: 'lead_created_at_unix', direction: 'desc' }],
        };
        this.tmpData = [];

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleSelections = this.handleSelections.bind(this);
    }

    handleSelections(selection) {
        console.log(selection);
        this.setState({
            selection: selection
        })
    }

    loadData() {

    }

    handleChangeTab(newValue) {
        // console.log(event, newValue);
        this.setState({ currentTab: newValue })
    }

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
            <div>
                <div className={"card"}>
                    <div className="card-body shadow">
                        <div className="d-flex align-items-baseline">
                            <h4 className="card-title mb-4 text-uppercase">
                                {/* {t("product_category.title")} */}
                                PRODUCT LIST
                            </h4>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "600px" }}>
                            <Button
                                className={this.state.currentTab === 'all' ? classes.tabBtnSelected : classes.tabBtn}

                                variant={"contained"}
                                // component={Link} to="/product/all"
                                onClick={() => {window.location.href="/product-list/all";}}
                                >
                                Tất cả
                            </Button>
                            <Button
                                className={this.state.currentTab === 'active' ? classes.tabBtnSelected : classes.tabBtn}
                                // component={Link} to="/product/active"
                                onClick={() => {window.location.href="/product-list/active";}}
                                >
                                Đang hoạt động
                            </Button>
                            <Button
                                className={this.state.currentTab === 'soldout' ? classes.tabBtnSelected : classes.tabBtn}
                                // component={Link} to="/product/soldout"
                                onClick={() => {window.location.href="/product-list/soldout";}}
                                >
                                Hết hàng
                            </Button>
                            <Button
                                className={this.state.currentTab === 'banned' ? classes.tabBtnSelected : classes.tabBtn}
                                // component={Link} to="/product/banned"
                                onClick={() => {window.location.href="/product-list/banned";}}
                                >
                                Vi phạm
                            </Button>
                            <Button
                                className={this.state.currentTab === 'unlisted' ? classes.tabBtnSelected : classes.tabBtn}
                                // component={Link} to="/product/unlisted"
                                onClick={() => {window.location.href="/product-list/unlisted";}}
                                >
                                Đã ẩn
                            </Button>
                        </div>

                        {
                            this.state.currentTab === 'all' &&
                            <div>
                                <div className=" card card-body">
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-start"
                                        spacing={4}
                                    >
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="url"
                                                required={true}
                                                value={this.state.url}
                                                // onChange={this.handleChange('url')}
                                                label="Tên sản phẩm"
                                                type="text"
                                                InputProps={{ inputProps: { min: 0, max: 128 } }}
                                            />

                                        </Grid>

                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="url"
                                                required={true}
                                                value={this.state.url}
                                                // onChange={this.handleChange('url')}
                                                label="SKU sản phẩm"
                                                type="text"
                                                InputProps={{ inputProps: { min: 0, max: 128 } }}
                                            />

                                        </Grid>

                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="url"
                                                required={true}
                                                value={this.state.url}
                                                // onChange={this.handleChange('url')}
                                                label="SKU phân loại"
                                                type="text"
                                                InputProps={{ inputProps: { min: 0, max: 128 } }}
                                            />

                                        </Grid>

                                    </Grid>

                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-start"
                                        spacing={4}
                                    >
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="url"
                                                required={true}
                                                value={this.state.url}
                                                // onChange={this.handleChange('url')}
                                                label="Phân loại hàng"
                                                type="text"
                                                InputProps={{ inputProps: { min: 0, max: 128 } }}
                                            />

                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="url"
                                                required={true}
                                                value={this.state.url}
                                                // onChange={this.handleChange('url')}
                                                label="Mã sản phẩm"
                                                type="text"
                                                InputProps={{ inputProps: { min: 0, max: 128 } }}
                                            />

                                        </Grid>
                                    </Grid>

                                    <Button
                                        style={{ width: "120px", borderStyle: "solid", backgroundColor: color.casablanca }}>
                                        Search
                                    </Button>

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
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const CellComponent = props => {
    const { column } = props;
    if (column.name === 'action') {
        return <ActionCell {...props} />;
    }

    return (
        <Table.Cell
            {...props}
            style={{
                padding: 2,
                color: '#81557a',
                fontSize: '12px'
            }}
        />
    );

    // var t1 = moment.unix(props.tableRow.row.submitted_at);
    // var t2 = moment();

    // var diff = t2.diff(t1, 'minutes');

    // if (diff <= 30)
    //     return (
    //         <Table.Cell
    //             {...props}
    //             style={{
    //                 padding: 2,
    //                 color: '#81557a',
    //                 fontSize: '12px'
    //             }}
    //         />
    //     );
    // else
    //     return (
    //         <Table.Cell
    //             {...props}
    //             style={{
    //                 padding: 2,
    //                 color: '#d34c3e',
    //                 fontSize: '12px'
    //             }}
    //         />
    //     );
};

class ActionCell extends React.Component {
    render() {
        return (
            <Table.Cell style={{
                padding: 1,
                justifyContent: 'center',
                fontSize: '12px'
            }}>
                <span>
                    {/* <Button
                        color="primary"
                        component={Link}
                        to={{ pathname: '/detail/' + this.props.row.order_code, state: { previous: '/waiting' } }}
                    >
                        Chi tiết
                    </Button> */}


                    {/* <Button
                        color="primary"
                        component={Link}
                        to={{ 
                            pathname: `/course_materials/${this.props.row.courseId}/${this.props.row.lectureOrderNumber}`, 
                            state: { previous: `/course_lectures/${this.props.row.courseId}` } 
                        }}
                    >
                        Materials
                    </Button> */}

                    {/* <Button
                        color="primary"
                        style={{
                            margin: 0,
                            padding: 0
                        }}
                        component={Link}
                        to={{
                            pathname: `/course_exams/${this.props.row.courseId}/start/${this.props.row.testOrderNumber}`,
                            state: { previous: `/course_exams/${this.props.row.courseId}` }
                        }}
                    >
                        start
                    </Button> */}

                    <Button
                        color="primary"
                        style={{
                            margin: 0,
                            padding: 0
                        }}
                        component={Link}
                        // to={`/course_lectures/${this.props.row.courseId}/delete/${this.props.row.lectureOrderNumber}`}
                        to={{
                            pathname: `/mock_exam/${this.props.row.courseId}/${this.props.row.testOrderNumber}`,
                            state: { previous: `/course_exams/${this.props.row.courseId}` }
                        }}
                    >
                        {/* <Icon>remove_circle</Icon> */}preview
                    </Button>

                    {/* <Button
                        color="primary"
                        component={Link}
                        to={{
                            pathname: `/answer_list/${this.props.row.courseId}/${this.props.row.testOrderNumber}`,
                            state: { previous: `/course_lectures/${this.props.row.courseId}` }
                        }}
                    >
                        Answers
                    </Button> */}

                    <Tooltip title="Change Settings">
                        <Button
                            color="primary"
                            style={{
                                margin: 0,
                                padding: 0
                            }}
                            component={Link}
                            // to={`/course_lectures/${this.props.row.courseId}/edit/${this.props.row.lectureOrderNumber}`}
                            to={{
                                pathname: `/course_exams/${this.props.row.courseId}/edit/${this.props.row.testOrderNumber}`,
                                state: { previous: `/course_exams/${this.props.row.courseId}` }
                            }}
                        >
                            <Icon>settings</Icon>
                        </Button>
                    </Tooltip>


                    {this.props.row.examType === 2 &&
                        <Tooltip title="Change question">
                            <Button
                                color="primary"
                                style={{
                                    margin: 0,
                                    padding: 0
                                }}
                                component={Link}
                                // to={`/course_lectures/${this.props.row.courseId}/edit/${this.props.row.lectureOrderNumber}`}
                                to={{
                                    pathname: `/course_exams/${this.props.row.courseId}/customize/${this.props.row.testOrderNumber}`,
                                    state: { previous: `/course_exams/${this.props.row.courseId}` }
                                }}
                                onClick={() => {
                                    console.log(this.props.row);
                                }}
                            >
                                <Icon>edit</Icon>
                                {/* Customize */}
                            </Button>
                        </Tooltip>
                    }

                    <Button
                        color="secondary"
                        style={{
                            margin: 0,
                            padding: 0
                        }}
                        component={Link}
                        // to={`/course_lectures/${this.props.row.courseId}/delete/${this.props.row.lectureOrderNumber}`}
                        to={{
                            pathname: `/course_exams/${this.props.row.courseId}/delete/${this.props.row.testOrderNumber}`,
                            state: { previous: `/course_exams/${this.props.row.courseId}` }
                        }}
                    >
                        <Icon>remove_circle</Icon>
                    </Button>

                </span>
            </Table.Cell>
        );
    }
}

AllProducts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withToastManager(
    withStyles(styles)(withTranslation()(AllProducts))
));
