import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from "react-toast-notifications";

import color from "../../theme/color";
import cs from "../../const";
import default_image from "../../img/default_image_gallery.png";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { DropzoneDialog } from "material-ui-dropzone";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DialogWrapper from '../shared/DialogWrapper';

const allProductStatusURL = cs.BaseURL + "/api/manager/common/all-product-status";
const approveURL = cs.BaseURL + "/api/manager/product/approve";

function getYoutubeId(url) {
    var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return "error";
    }
}

function getEmbededURL(url) { }

const styles = (theme) => ({

});

class ApproveProduct extends Component {
    constructor(props) {
        console.log("ApproveProduct");
        super(props);
        this.state = {
            statusList: [],
            productId: this.props.match.params.productId,
            approveStatus: ""
        };
        this.handleDialogAgree = this.handleDialogAgree.bind(this);
    }

    componentWillMount() {
        this.loadStatus();
    }

    handleDialogAgree() {
        console.log(this.state);
        //tmpData = data.data.filter((el) => el.is_deleted_by_merchant === 0);
        if (!this.state.approveStatus) {
            window.alert('Please input information !');
            return;
        }

        const {
            approveStatus,
            productId
        } = this.state;
        let queryString = `${approveURL}?productId=${this.state.productId}&approveStatus=${this.state.approveStatus}`;

        fetch(queryString, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem(cs.System_Code + '-token')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // if (data && (data.code == cs.erAuthenticationFailed.code || data.code == cs.erAccountIsLocked.code)) {
                //     localStorage.clear();
                //     sessionStorage.clear();
                //     window.location.reload();
                // }
                console.log(data);
                if (data && data.error_code !== 0 && data.error_desc !== "Success") {
                    this.props.toastManager.add(JSON.stringify(data.error_desc), {
                        appearance: 'error',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                } else {
                    this.props.toastManager.add('Product is updated !', {
                        appearance: 'success',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                    this.props.history.push({
                        pathname: `/product-list/all`,
                        state: { reload: true }
                    });
                    //                    window.location.href="/package-info;

                }
            })
            .catch(() => { });
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

                console.log(data.data);
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

    handleChange = name => event => {
        if (name === 'cus_gender') this.setState({ cus_gender: event.target.checked });
        else
            this.setState(
                {
                    [name]: event.target.value
                },
                () => {
                    // console.log("HERE");

                }
            );
    };

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
                {/* <div className={"card"}>
					<div className="card-body shadow">
						<div className="d-flex align-items-baseline">
							<h4 className="card-title mb-4 text-uppercase">
								{t("shop_profile.basic_info")}
							</h4>
						</div>


					</div>
				</div> */}
                {/* <Dialog open={true} onClose={()=>{}} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog> */}
                <DialogWrapper title={'Approve product'} {...this.props} >
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="merchantId">Status (*)</InputLabel>
                            <Select
                                value={this.state.approveStatus}
                                onChange={this.handleChange('approveStatus')}
                                inputProps={{
                                    name: 'package_type',
                                    id: 'package_type'
                                }}
                            >
                                <MenuItem value={null} disabled>--SELECT--</MenuItem>
                                {this.state.statusList.map(item => (
                                    <MenuItem value={item.productStatusId}>{item.productStatusId}-{item.productStatusName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.history.goBack} color="primary">
                            {t("commons.button.cancel")}
                        </Button>
                        <Button onClick={this.handleDialogAgree} color="primary">
                            {t("commons.button.ok")}
                        </Button>
                    </DialogActions>
                </DialogWrapper>
            </div >
        );
    }
}

ApproveProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withToastManager(
    withStyles(styles)(withTranslation()(ApproveProduct))
);
