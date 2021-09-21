import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from "react-toast-notifications";

import color from "../../theme/color";
import cs from "../../const";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const styles = (theme) => ({
    categorySelectorWrap: {
        marginBottom: "36px",
        padding: "24px",
        backgroundColor: "#fafafa"
    },
    categoryList: {
        left: "0%",
        // width: "1500px",
        position: "relative",
        display: "flex",
        marginTop: "16px",
        padding: "10px 0",
        backgroundColor: "#ffffff",
        transition: "left .5s ease"
    },
    scrollItem: {
        flex: "1",
        height: "320px",
        borderLeft: "1px solid #fff",
        overflowY: "scroll",
        listStyle: "none",
        paddingLeft: "0"
    },
    categoryItem: {
        display: "flex",
        padding: "0 16px",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": {
            cursor: "pointer",
            background: "#f6f6f6"
        },
        "&.selected": {
            color: color.seabuckthorn,
        },
    },
    categoryItemRight: {
        flexShrink: 0,
        display: "-webkit-box",
        "-webkit-box-align": "center",
    },

    SelectedCategoryItem: {
        color: color.seabuckthorn,
    },
    textOverflow: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        marginTop: "revert"
    },

    textOverflowSelected: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        marginTop: "revert",
        color: color.seabuckthorn,
    },
    notAllowedTag: {
        padding: "3px 4px",
        borderRadius: "2px",
        background: "#f6f6f6",
        color: "#b7b7b7",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "12px",
    }
})

const CHARACTER_LIMIT = 20;

const tmpData = [
    { name: "TEST 1", value: "1" },
    { name: "TEST 2", value: "2", notAllowed: "true" },
    { name: "TEST 3", value: "3" },
    {
        name: "TEST 4", value: "4", children: [
            { name: "TEST 4.1", value: "4.1", notAllowed: "true" },
            { name: "TEST 4.2", value: "4.2" },
            { name: "TEST 4.3", value: "4.3" },
            {
                name: "TEST 4.4", value: "4.4", notAllowed: "true", children: [
                    { name: "TEST 4.4.1", value: "4.4.1", notAllowed: "true" },
                    { name: "TEST 4.4.2", value: "4.4.2" }
                ]
            },
            {
                name: "TEST 4.5", value: "4.5", children: [
                    { name: "TEST 4.5.1", value: "4.5.1" },
                    { name: "TEST 4.5.2", value: "4.5.2",notAllowed: "true" },
                    {
                        name: "TEST 4.5.3", value: "4.5.3",
                        children: [
                            { name: "TEST 4.5.3.1", value: "4.5.3.1" },
                            {
                                name: "TEST 4.5.3.2", value: "4.5.3.2",
                                children: [
                                    { name: "TEST 4.5.3.2.1", value: "4.5.3.2.1" },
                                    { name: "TEST 4.5.3.2.2", value: "4.5.3.2.2",notAllowed: "true" }
                                ]
                            },
                            { name: "TEST 4.5.3.3", value: "4.5.3.3",notAllowed: "true" },
                        ]
                    }
                ]
            },


        ]
    }
]

class ProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            categoryName: "",
            valid: false,
            layer1: "",
            layer1Data: tmpData,
            layer2: "",
            layer2Data: [],
            layer3: "",
            layer3Data: [],
            layer4: "",
            layer4Data: [],
            layer5: "",
            layer5Data: []
        };
    }

    componentWillMount() {
    }

    loadData = (conditions) => {

    }
    handleCategory = (layer, item) => {
        console.log(layer, item, item.notAllowed === "true");
        let {
            layer1, layer1Data,
            layer2, layer2Data,
            layer3, layer3Data,
            layer4, layer4Data,
            layer5, layer5Data
        } = this.state;

        switch (layer) {
            case 1:
                this.setState({
                    valid: (item.children == null || item.children.length < 0) && item.notAllowed !== "true",
                    layer1: item.value,
                    layer2: "",
                    layer2Data: item.children,
                    layer3: "",
                    layer3Data: [],
                    layer4: "",
                    layer4Data: [],
                    layer5: "",
                    layer5Data: []
                })
                break;
            case 2:
                this.setState({
                    valid: (item.children == null || item.children.length < 0) && item.notAllowed !== "true",
                    layer2: item.value,
                    layer3: "",
                    layer3Data: item.children,
                    layer4: "",
                    layer4Data: [],
                    layer5: "",
                    layer5Data: []
                })
                break;
            case 3:
                this.setState({
                    valid: (item.children == null || item.children.length < 0) && item.notAllowed !== "true",
                    layer3: item.value,
                    layer4: "",
                    layer4Data: item.children,
                    layer5: "",
                    layer5Data: []
                })
                break;
            case 4:
                this.setState({
                    valid: (item.children == null || item.children.length < 0) && item.notAllowed !== "true",
                    layer4: item.value,
                    layer5: "",
                    layer5Data: item.children
                })
                break;
            case 5:
                this.setState({
                    valid: (item.children == null || item.children.length < 0) && item.notAllowed !== "true",
                    layer5: item.value
                })
                break;
            default:
                break;
        }
    }

    handleChange = (name) => (event) => {
        if (name == "categoryName") {
            let filtered = tmpData.filter((item) => item.name.includes(event.target.value))
            console.log(filtered);
            this.setState({
                categoryName: event.target.value,
                layer1: [],
                layer1Data: filtered,
                layer2: "",
                layer2Data: [],
                layer3: "",
                layer3Data: [],
                layer4: "",
                layer4Data: [],
                layer5: "",
                layer5Data: []
            })
        } else {
            this.setState(
                {
                    [name]: event.target.value,
                },
                () => {

                }
            );
        }
    };

    getPath = () => {
        let pathStr = "";
        if (this.state.layer1) {
            pathStr += this.state.layer1;
            if (this.state.layer2) {
                pathStr += " > " + this.state.layer2;
                if (this.state.layer3) {
                    pathStr += " > " + this.state.layer3;
                    if (this.state.layer4) {
                        pathStr += " > " + this.state.layer4;
                        if (this.state.layer5) {
                            pathStr += " > " + this.state.layer5;
                        }
                    }
                }
            }
        }
        return pathStr;
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

        return (
            <div>
                <div className={"card"}>
                    <div className="card-body shadow">
                        <div className="d-flex align-items-baseline">
                            <h4 className="card-title mb-4 text-uppercase">
                                {t("product_category.title")}
                            </h4>
                        </div>

                        <div className="row">
                            <div className=" card card-body">
                                <TextField
                                    // autofocus
                                    inputProps={{
                                        maxlength: CHARACTER_LIMIT
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    margin="dense"
                                    id="productName"
                                    required={true}
                                    value={this.state.productName}
                                    onChange={this.handleChange("productName")}
                                    label={t("product_category.productName")}
                                    helperText={`${this.state.productName.length}/${CHARACTER_LIMIT}`}
                                    type="name"
                                />
                            </div>

                            <div className=" card card-body" className={classes.categorySelectorWrap}>
                                <TextField
                                    // autofocus
                                    inputProps={{
                                        maxlength: CHARACTER_LIMIT
                                    }}
                                    InputLabelProps={{ shrink: true }}

                                    margin="dense"
                                    id="categoryName"
                                    required={true}
                                    value={this.state.categoryName}
                                    onChange={this.handleChange("categoryName")}
                                    label={t("product_category.categoryName")}
                                    helperText={`${this.state.categoryName.length}/${CHARACTER_LIMIT}`}
                                    type="name"
                                />

                                <div className={classes.categoryList}>
                                    <ul className={classes.scrollItem}>

                                        {this.state.layer1Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                id={item.value} data-id={item.value}
                                                // onClick={this.handleChange('layer1')}
                                                onClick={() => this.handleCategory(1, item)}
                                            >
                                                <p className={item.value == this.state.layer1 ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {item.name}
                                                </p>

                                                <div className={classes.categoryItemRight}>
                                                    {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    }
                                                    {item.children && item.children.length > 0 &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer2Data && this.state.layer2Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                id={item.value} data-id={item.value}
                                                // onClick={this.handleChange('layer2')}
                                                onClick={() => this.handleCategory(2, item)}
                                            >
                                                <p className={item.value == this.state.layer2 ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {item.name}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    }
                                                    {item.children && item.children.length > 0 &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer3Data && this.state.layer3Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                // style={{ color: item.value === this.state.layer3 ? color.seabuckthorn : "#000000" }}
                                                id={item.value} data-id={item.value}
                                                // onClick={this.handleChange('layer3')}
                                                onClick={() => this.handleCategory(3, item)}
                                            >
                                                <p className={item.value == this.state.layer3 ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {item.name}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    }
                                                    {item.children && item.children.length > 0 &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer4Data && this.state.layer4Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                id={item.value} data-id={item.value}
                                                // onClick={this.handleChange('layer4')}
                                                onClick={() => this.handleCategory(4, item)}
                                            >
                                                <p className={item.value == this.state.layer4 ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {item.name}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    }
                                                    {item.children && item.children.length > 0 &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer5Data && this.state.layer5Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                id={item.value} data-id={item.value}
                                                // onClick={this.handleChange('layer5')}
                                                onClick={() => this.handleCategory(5, item)}
                                            >
                                                <p className={item.value === this.state.layer5 ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {item.name}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    }
                                                    {item.children && item.children.length > 0 &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* <ul className={classes.scrollItem}>

                                    </ul> */}
                                </div>

                                <div style={{ marginTop: "20px" }}>
                                    {t("product_category.selectedPath")}:  {this.getPath()}
                                </div>

                                <div style={{ display: "flex", justifyContent: "end" }}>
                                    <Button
                                        disabled={!this.state.valid}
                                        onClick={() => { }}
                                        style={{ width: "120px", borderStyle: "solid", backgroundColor: color.casablanca }}>
                                        {t("commons.button.next")}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ProductCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withToastManager(
    withStyles(styles)(withTranslation()(ProductCategory))
);
