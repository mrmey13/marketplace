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

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import axios from 'axios';

const productCategoryUrl = cs.BaseURL + "/api/common/product/category/list";

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



class ProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            categoryName: "",
            valid: false,
            layer1: "",
            layer1Data: [],
            layer2: "",
            layer2Data: [],
            layer3: "",
            layer3Data: [],
            layer4: "",
            layer4Data: [],
            layer5: "",
            layer5Data: []
        };
        this.tmpData = [];
    }

    componentWillMount() {
        this.loadData();
    }

    loadData = async (parentId, categoryLevel) => {
        console.log("params", parentId, categoryLevel);
        if (!categoryLevel) {
            categoryLevel = 1;
        }
        let url = productCategoryUrl;
        if (parentId) {
            console.log("HERE", parentId, categoryLevel);
            url += `?parentId=${parentId}&categoryLevel=${categoryLevel}`;
        }

        try {
            const response = await axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: localStorage.getItem(cs.System_Code + "-token")
                }
            });
            console.log(response.data.data);
            if (response.data.data && response.data.data.length > 0) {
                console.log("HERE");
                this.setState({ [`layer${categoryLevel}Data`]: response.data.data });
                if (categoryLevel === 1) {
                    this.tmpData = response.data.data;
                }
            }
        } catch (error) {
            console.log(error);
        }

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
                    valid: (!item.hasChildren),
                    layer1: item,
                    layer2: "",
                    // layer2Data: [],
                    layer3: "",
                    layer3Data: [],
                    layer4: "",
                    layer4Data: [],
                    layer5: "",
                    layer5Data: []
                });
                break;
            case 2:
                this.setState({
                    valid: (!item.hasChildren),
                    layer2: item,
                    layer3: "",
                    layer3Data: [],
                    layer4: "",
                    layer4Data: [],
                    layer5: "",
                    layer5Data: []
                });
                break;
            case 3:
                this.setState({
                    valid: (!item.hasChildren),
                    layer3: item,
                    layer4: "",
                    layer4Data: [],
                    layer5: "",
                    layer5Data: []
                });
                break;
            case 4:
                this.setState({
                    valid: (!item.hasChildren),
                    layer4: item,
                    layer5: "",
                    layer5Data: []
                });
                break;
            case 5:
                this.setState({
                    valid: (!item.hasChildren),
                    layer5: item
                });
                break;
            default:
                break;
        }
        if (layer != 5 && item.hasChildren) {
            this.loadData(item.categoryId, layer + 1);
        }
    }

    handleChange = (name) => (event) => {
        if (name == "categoryName") {
            console.log(this.tmpData);
            let filtered = this.tmpData
            if (event.target.value ==="") {
                
            } else {
                filtered = this.tmpData.filter((item) => 
                item.categoryEngName.toLowerCase().indexOf(event.target.value) != -1 || 
                item.categoryVieName.toLowerCase().indexOf(event.target.value) != -1);
            }
            // let filtered = this.tmpData.filter((item) => 
            // item.categoryEngName.match(`/${event.target.value}/i`) || 
            // item.categoryVieName.match(`/${event.target.value}/i`))
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
        const { classes, t, i18n } = this.props;
        let language = i18n.language;
        // item.categoryEngName : item.categoryVieName
        let pathStr = "";
        if (this.state.layer1) {
            pathStr += language === "en" ? this.state.layer1.categoryEngName : this.state.layer1.categoryVieName;
            if (this.state.layer2) {
                pathStr += " > ";
                pathStr += language === "en" ? this.state.layer2.categoryEngName : this.state.layer2.categoryVieName;
                if (this.state.layer3) {
                    pathStr += " > ";
                    pathStr += language === "en" ? this.state.layer3.categoryEngName : this.state.layer3.categoryVieName;
                    if (this.state.layer4) {
                        pathStr += " > ";
                        pathStr += language === "en" ? this.state.layer4.categoryEngName : this.state.layer4.categoryVieName;
                        if (this.state.layer5) {
                            pathStr += " > ";
                            pathStr += language === "en" ? this.state.layer5.categoryEngName : this.state.layer5.categoryVieName;
                        }
                    }
                }
            }
        }
        return pathStr;
    }
    handleNext(){
        let {
            layer1, layer1Data,
            layer2, layer2Data,
            layer3, layer3Data,
            layer4, layer4Data,
            layer5, layer5Data
        } = this.state;

        let lastItem = layer5 || layer4 || layer3 || layer2 || layer1;
        console.log("lastItem",lastItem);
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
                                                id={item.categoryId} data-id={item.categoryId}
                                                // onClick={this.handleChange('layer1')}
                                                onClick={() => this.handleCategory(1, item)}
                                            >
                                                <p className={item.categoryId == this.state.layer1.categoryId ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {i18n.language === "en" ? item.categoryEngName : item.categoryVieName}
                                                </p>

                                                <div className={classes.categoryItemRight}>
                                                    {/* {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    } */}
                                                    {item.hasChildren &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer2Data && this.state.layer2Data.map((item) => (
                                            <li className={classes.categoryItem}
                                                id={item.categoryId} data-id={item.categoryId}
                                                // onClick={this.handleChange('layer2')}
                                                onClick={() => this.handleCategory(2, item)}
                                            >
                                                <p className={item.categoryId == this.state.layer2.categoryId ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {i18n.language === "en" ? item.categoryEngName : item.categoryVieName}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {/* {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    } */}
                                                    {item.hasChildren &&
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
                                                id={item.categoryId} data-id={item.categoryId}
                                                // onClick={this.handleChange('layer3')}
                                                onClick={() => this.handleCategory(3, item)}
                                            >
                                                <p className={item.categoryId == this.state.layer3.categoryId ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {i18n.language === "en" ? item.categoryEngName : item.categoryVieName}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {/* {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    } */}
                                                    {item.hasChildren &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer4Data && this.state.layer4Data.map((item) => (
                                            <li className={classes.categoryItem}
                                            id={item.categoryId} data-id={item.categoryId}
                                            // onClick={this.handleChange('layer4')}
                                                onClick={() => this.handleCategory(4, item)}
                                            >
                                                <p className={item.categoryId == this.state.layer4.categoryId ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {i18n.language === "en" ? item.categoryEngName : item.categoryVieName}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {/* {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    } */}
                                                    {item.hasChildren &&
                                                        <ChevronRightIcon />
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className={classes.scrollItem}>
                                        {this.state.layer5Data && this.state.layer5Data.map((item) => (
                                            <li className={classes.categoryItem}
                                            id={item.categoryId} data-id={item.categoryId}
                                                // onClick={this.handleChange('layer5')}
                                                onClick={() => this.handleCategory(5, item)}
                                            >
                                                <p className={item.categoryId === this.state.layer5.categoryId ?
                                                    classes.textOverflowSelected : classes.textOverflow}>
                                                    {i18n.language === "en" ? item.categoryEngName : item.categoryVieName}
                                                </p>
                                                <div className={classes.categoryItemRight}>
                                                    {/* {item.notAllowed === "true" &&
                                                        <div className={classes.notAllowedTag}>
                                                            Not Allowed
                                                        </div>
                                                    } */}
                                                    {item.hasChildren &&
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
                                        onClick={() => { 
                                            this.handleNext();
                                        }}
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
