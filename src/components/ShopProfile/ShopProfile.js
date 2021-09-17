import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from 'react-toast-notifications';

import cs from "../../const";
import default_image from '../../img/default_image_gallery.png';
import { Typography } from 'antd';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const storeDetailsURL = cs.BaseURL + '/api/seller/shop/detail';
const createStoreURL = cs.BaseURL + '/api/seller/shop/create';
const editStoreURL = cs.BaseURL + '/api/seller/shop/edit';

const styles = (theme) => ({
    bgImage: {
        height: "300px",
        width: "100%",
        objectFit:"cover"
    },
    avatarImage: {
        position: "absolute",
        top: "20px",
        left: "20px",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        borderStyle: "solid",
        backgroundColor: "#ffffff"
    }
});

class ShopProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: null,
            avatar: null,
            name:"",
            description:"",
            created: false,
        }
    }

    componentWillMount(){
        this.loadData();
    }

    loadData = conditions => {

        const queryString = storeDetailsURL;


        fetch(queryString, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: localStorage.getItem(cs.System_Code + '-token')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.error_code == 0 && data.error_desc == "Success") {
                    this.setState({
                        created: true,
                        shopName: data.data.shopName,
                        description: data.data.description
                    });
                } else {
                    console.log("HERE");
                }
            })
            .catch(() => {
            });
    };

    handleBGChange = (event) => {
        const newImage = URL.createObjectURL(event.target?.files?.[0]);

        if (newImage) {
            console.log(newImage);
            this.setState({ bg: newImage })
            // setImage(URL.createObjectURL(newImage));
        }
    };

    handleAvatarChange = (event) => {
        const newImage = URL.createObjectURL(event.target?.files?.[0]);

        if (newImage) {
            console.log(newImage);
            this.setState({ avatar: newImage })
            // setImage(URL.createObjectURL(newImage));
        }
    };

    handleChange = name => event => {
        if (name == 'bg' || name == 'avatar') {
            const newImage = URL.createObjectURL(event.target?.files?.[0]);

            if (newImage) {
                console.log(newImage);
                this.setState({ [name]: newImage })
                // setImage(URL.createObjectURL(newImage));
            }
        }
        else
            this.setState(
                {
                    [name]: event.target.value
                },
                () => {
                    
                }
            );
    };

    handleDialogAgree = () => {
        //tmpData = data.data.filter((el) => el.is_deleted_by_merchant === 0);
        if (!this.state.shopName ||
            !this.state.description
        ) {
            window.alert('Please input information !');
            return;
        }
        //let agent = this.state.agents.filter((el) => el.id === this.state.agent_id)

        // if (this.state.amount && isNaN(this.state.amount)) {
        //     window.alert('Incorrect amount !');
        //     return;
        // }

        let queryString = `${this.state.created ? editStoreURL : createStoreURL}`;
        let requestBody = {
            shopName:this.state.shopName,
            description: this.state.description
        };

        console.log(requestBody);
        fetch(queryString, {
            method: 'POST',
            body: JSON.stringify(requestBody),
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

                if (data && data.error_code != 0 && data.error_desc != "Success") {
                    this.props.toastManager.add(JSON.stringify(data.error), {
                        appearance: 'error',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                } else {
                    this.props.toastManager.add(this.state.created ? 'Shop is edited !' : 'Shop is created !', {
                        appearance: 'success',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                    //                    window.location.href="/package-info;
                }
                // window.location.reload();

            })
            .catch(() => { });
    };

    render() {
        const { classes, t, i18n } = this.props;
        return (
            <div className={"card"}>
                <div className="card-body shadow">
                    <div className="d-flex align-items-baseline">
                        <h4 className="card-title mb-4 text-uppercase">
                            {t("shop_profile.basic_info")}
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 card card-body me-sm-1">
                            
                            <div >
                                <img src={this.state.bg || default_image} className={classes.bgImage}>

                                </img>
                                <img src={this.state.avatar || default_image} className={classes.avatarImage} />
                            </div>

                            <div>
                                <Typography>{t("shop_profile.background")}</Typography>
                                {/* <input type="file" id="bg" onChange={this.handleChange('bg')} /> */}
                                <Button
                                variant="contained"
                                component="label"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={this.handleChange('bg')}
                                    />
                                </Button>

                                <Typography>{t("shop_profile.avatar")}</Typography>
                                {/* <input type="file" id="avatar" onChange={this.handleChange('avatar')} /> */}
                                <Button
                                variant="contained"
                                component="label"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={this.handleChange('avatar')}
                                    />
                                </Button>
                            </div>

                            {/* <img src={this.state.bg || default_image}/> */}

                            {/* <img src={default_image}/> */}
                        </div>
                        <div className="col-sm-8 card card-body">

                            <TextField
                                // autofocus
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                                id="shopName"
                                required={true}
                                value={this.state.shopName}
                                onChange={this.handleChange('shopName')}
                                label={t("shop_profile.shopName")}
                                type="name"
                            />

                            <TextField
                            shrink
                                // autofocus
                                InputLabelProps={{ shrink: true }}
                                multiline
                                fullWidth
                                margin="dense"
                                id="description"
                                required={true}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                label={t("shop_profile.description")}
                                type="name"
                            />

                            <Button onClick={this.handleDialogAgree} variant="contained" color="primary">
                                {this.state.created ? t("commons.button.edit") : t("commons.button.create")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ShopProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withToastManager(withStyles(styles)(withTranslation()(ShopProfile)));