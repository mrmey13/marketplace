import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";

import cs from "../../const";
import default_image from '../../img/default_image_gallery.png';
import { Typography } from 'antd';
import { TextField } from '@material-ui/core';
const styles = (theme) => ({
    bgImage: {
        height: "300px",
        width: "100%"
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
            avatar: null
        }
    }

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

    render() {
        const { classes } = this.props;
        return (
            <div className={"card"}>
                <div className="card-body shadow">
                    <div className="d-flex align-items-baseline">
                        <h4 className="card-title mb-4 text-uppercase">
                            Thông tin cơ bản
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 card card-body me-sm-1">
                            {/* <div style={{backgroundImage:URL.createObjectURL("../../img/default_image_gallery.png") }}>
                                trgr
                            </div> */}
                            {/* <image src={this.state.bg || require("../../img/default_image_gallery.png")}>

                            </image> */}
                            <div >
                                <img src={this.state.bg || default_image} className={classes.bgImage}>

                                </img>
                                <img src={this.state.avatar || default_image} className={classes.avatarImage} />
                            </div>

                            <div>
                                <Typography>Background</Typography>
                                <input type="file" onChange={this.handleBGChange} />
                                <Typography>Avatar</Typography>
                                <input type="file" onChange={this.handleAvatarChange} />
                            </div>

                            {/* <img src={this.state.bg || default_image}/> */}

                            {/* <img src={default_image}/> */}
                        </div>
                        <div className="col-sm-8 card card-body">
                        <TextField
                            disabled
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="fullname"
                            required={true}
                            value={this.state.fullname}
                            // onChange={this.handleChange('fullname')}
                            label="Tên"
                            type="name"
                        />

                        <TextField
                            disabled
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="name"
                            required={true}
                            value={this.state.name}
                            // onChange={this.handleChange('name')}
                            label="Tên"
                            type="name"
                        />
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

export default withStyles(styles)(withTranslation()(ShopProfile));