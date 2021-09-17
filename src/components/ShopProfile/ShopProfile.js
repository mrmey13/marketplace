import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from 'react-toast-notifications';

import color from '../../theme/color'
import cs from "../../const";
import default_image from '../../img/default_image_gallery.png';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { DropzoneDialog } from 'material-ui-dropzone';
import UploadMedia from './UploadMedia';

const storeDetailsURL = cs.BaseURL + '/api/seller/shop/detail';
const createStoreURL = cs.BaseURL + '/api/seller/shop/create';
const editStoreURL = cs.BaseURL + '/api/seller/shop/edit';
const uploadMediaURL = cs.BaseURL + '/api/seller/shop/media-description/upload';
const deleteMediaURL = cs.BaseURL + '/api/seller/shop/media-description/delete';

function getYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function getEmbededURL(url) {
    
}

const styles = (theme) => ({
    bgImage: {
        height: "200px",
        width: "100%",
        objectFit: "cover"
    },
    avatarImage: {
        position: "absolute",
        top: "20px",
        left: "20px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        borderStyle: "solid",
        backgroundColor: "#ffffff",
        background: "rgba(0,0,0,.1)"
    },
    previewText: {
        position: "absolute",
        top: "10%",
        left: "20%",
        color: "#FFFFFF"
    },
    cover: {
        position: "absolute",
        top: "0",
        // right: "15px",
        // bottom: "135px",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.2)"
    },
    list_info: {
        border: "1px solid #e5e5e5",
        borderTop: "none",
        borderRadius: "0 0 4px 4px"
    },
    info_row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "44px",
        padding: "8px 20px",
        fontSize: "12px",
        borderTop: "1px solid #e5e5e5"
    }
});

class ShopProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: null,
            avatar: null,
            name: "",
            description: "",
            mediaList: [],
            created: false,
            openUploadModal: false
        }
    }

    componentWillMount() {
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
                        description: data.data.description,
                        mediaList: data.data.mediaDescriptionsList
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
            shopName: this.state.shopName,
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

    handleUploadMedia = (files) => {
        console.log('Files:', files);
        let queryString = `${uploadMediaURL}`;
        const formData = new FormData();
        formData.append('file', files[0]);

        fetch(queryString, {
            method: 'POST',
            body: formData,
            headers: { Authorization: localStorage.getItem(cs.System_Code + '-token') }
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);
                var isFileImported = true;
                if (data && data.error_code != 0 && data.error_desc != "Success") isFileImported = false;
                console.log(isFileImported);

                if (isFileImported) {
                    this.props.toastManager.add('Upload thành công !', {
                        appearance: 'success',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                    this.setState({ openUploadModal: false });
                }
            })
            .catch(() => {
                this.resetState();
            });
    }

    deleteMedia(id) {
        const { classes, t, i18n } = this.props;

        var r = window.confirm(t("shop_profile.deleteMedia",{id:id}));
        if (r == true) {
            const queryString = `${deleteMediaURL}?id=${id}`;


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
                        window.location.reload();
                    } else {
                        console.log("HERE");
                    }
                })
                .catch(() => {
                });
        } else {
        }
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
                                {t("shop_profile.basic_info")}
                            </h4>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 card card-body me-sm-1">

                                <div >
                                    {/* <div className={classes.cover}/> */}
                                    <div style={{ position: "relative" }}>
                                        <img src={this.state.bg || default_image} className={classes.bgImage} />
                                        <div className={classes.cover} />
                                    </div>
                                    {/* <img src={this.state.bg || default_image} className={classes.bgImage}> */}

                                    <img src={this.state.avatar || default_image} className={classes.avatarImage} />
                                    <Typography className={classes.previewText}>{t("shop_profile.shopName")}: {this.state.shopName}</Typography>
                                </div>

                                <div>
                                    <div className={classes.list_info}>
                                        <div className={classes.info_row}>
                                            <Typography>{t("shop_profile.avatar")}</Typography>
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
                                        <div className={classes.info_row}>
                                            <Typography>{t("shop_profile.background")}</Typography>
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
                                        </div>
                                        <div className={classes.info_row}>
                                            <Typography>{t("shop_profile.shopView")}</Typography>
                                            <Link to="/shop_view" target="_blank">
                                                {t("commons.button.view")}
                                            </Link>
                                        </div>
                                    </div>
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

                                <Button onClick={this.handleDialogAgree}
                                    variant="contained" color="blue"
                                    style={{ backgroundColor: color.casablanca }}
                                >
                                    {this.state.created ? t("commons.button.edit") : t("commons.button.create")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body shadow">
                        <div className="d-flex align-items-baseline">
                            <h4 className="card-title mb-4 text-uppercase">
                                {t("shop_profile.media")}
                            </h4>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ openUploadModal: true })}>
                                Add Image
                            </Button>

                            <div className="row" style={{paddingTop:"10px"}}>
                                {this.state.mediaList.map((item) => (
                                    
                                    <div className="col" style={{display:"flex", flexDirection:"column" }}>
                                        {item.type === 11 &&
                                            <img
                                            id={item.id}
                                            style={{  height: "400px", width:"800px" }}
                                            src={`${cs.MediaURL}/media/${item.path}`}
                                            srcSet={`${cs.MediaURL}/media/${item.path}`}
                                            alt={item.title}
                                            loading="lazy"
                                            />
                                        }
                                        {item.type === 22 &&
                                            <iframe 
                                            style={{  height: "400px", width:"800px" }}
                                            src={`//www.youtube.com/embed/${getYoutubeId(item.path)}`} 
                                            frameborder="0" allowfullscreen>

                                            </iframe>
                                        }
                                        <Button onClick={() => this.deleteMedia(item.id)} style={{width:"800px"}}>
                                            {t("commons.button.delete")}
                                        </Button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>


                {/* <DropzoneDialog
                    acceptedFiles={['image/*']}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={5000000}
                    open={this.state.openUploadModal}
                    onClose={() => this.setState({openUploadModal: false})}
                    onSave={(files) => {
                        this.handleUploadMedia(files)
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                /> */}
                {this.state.openUploadModal &&
                    <UploadMedia open={this.state.openUploadModal} handleClose={() => {
                        this.setState({ openUploadModal: false });
                        // window.location.reload();
                    }} />
                }
            </div>

        )
    }
}

ShopProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withToastManager(withStyles(styles)(withTranslation()(ShopProfile)));