import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withToastManager } from 'react-toast-notifications';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import cs from '../../const';
import moment from 'moment-timezone';
import DialogWrapper from '../shared/DialogWrapper';
import { Icon, List, ListItem, Typography, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
// import { DropzoneArea } from 'material-ui-dropzone';

const courseURL = cs.BaseURL + '/api/trainer/courses/list';
const uploadMediaURL = cs.BaseURL + '/api/seller/shop/media-description/upload'

const hubName = ["Đồng bằng Bắc Bộ", "Đông Bắc Bộ", "Tây Bắc Bộ", "Bắc Trung Bộ", "Nam Trung Bộ", "Tây Nguyên", "Đông Nam Bộ", "Đồng bằng Sông Cửu Long", "Hà Nội", "TP.HCM"];

const endsWithAny = (suffixes, string) => {
    return suffixes.some(function (suffix) {
        return string.endsWith(suffix);
    });
}

const styles = theme => ({
    gridContainer: {
        paddingTop: 10
    },
    downloadContainer: {
        paddingTop: 10
    },
    dropZone: {
        paddingTop: 10,
        minHeight: 200
    },
    erItem: {
        secondary: 'pink'
    },
    statusItem: {
        marginTop: 5
    },
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
});

function validatePhoneInput(phone) {
    const validHeadNums = /((086|096|097|098|032|033|034|035|036|037|038|039|088|091|094|083|084|085|081|082|092|056|058|089|090|093|070|079|077|076|078|099|059)+([0-9]{7})\b)/g;
    let validPhoneNumber = (String(phone).length === 10) && (validHeadNums.test(String(phone)));
    return (validPhoneNumber);
};

class UploadMedia extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',

            file: null,
            isProcessing: false,
        }
        // if (!isTelesaleOP()) {
        //     window.location.href="/";
        //     return;
        // }

        this.handleDialogAgree = this.handleDialogAgree.bind(this);
        this.handleDropZoneChange = this.handleDropZoneChange.bind(this);
    }

    handleDropZoneChange(files) {
        const acceptedTypes = [
            ".jng",".jpg",".png",
            ".jpeg",".gif",
        ];

        console.log('add file');
        if (files && files instanceof Array && files.length > 0) {
            console.log(files);
            this.setState({
                file: files[0],
                isProcessing: false,

            });
           
        } else this.resetState();
    }

    resetState() {
        this.setState({
            file: null,
            isProcessing: false,
        });
    }

    handleChange = name => event => {
        if (name == 'cus_gender') this.setState({ cus_gender: event.target.checked });
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
        console.log(this.state);
        this.setState({
            isProcessing: true,
        });

        let queryString = `${uploadMediaURL}`;

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('url', this.state.url);

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
                    this.handleClose();
                } else {
                    this.props.toastManager.add(data.error_desc, {
                        appearance: 'error',
                        autoDismiss: true,
                        pauseOnHover: true
                    });
                    this.handleClose();
                }
            })
            .catch(() => {
                this.resetState();
            });
    };

    handleClose = () => {
        this.resetState();
        this.props.handleClose();
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <DialogWrapper title={'Upload materials'} {...this.props} open={this.props.open}>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            spacing={4}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="url"
                                    required={true}
                                    value={this.state.url}
                                    onChange={this.handleChange('url')}
                                    label="url"
                                    type="text"
                                    InputProps={{ inputProps: { min: 0, max: 128 } }}
                                />
                            </Grid>
                        </Grid>



                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="stretch"
                            spacing={1}
                            className={classes.gridContainer}
                        >
                            {this.state.isProcessing && (
                                <div style={{ height: 150 }}>
                                    <CircularProgress
                                        style={{
                                            position: 'relative',
                                            left: '45%',
                                            top: '70px'
                                        }}
                                    />
                                </div>
                            )}
                            {!this.state.isProcessing && (
                                <Grid item gutterBottom>
                                    <DropzoneArea
                                        // acceptedFiles={[
                                        //     'application/vnd.ms-excel',
                                        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                        // ]}
                                        // acceptedFiles={"image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf"}
                                        acceptedFiles={['image/*']}
                                        dropzoneText={
                                            this.state.file && this.state.file.name
                                                ? this.state.file.name
                                                : 'Upload file'
                                        }
                                        maxFileSize={50000000}
                                        filesLimit={1}
                                        showAlerts={false}

                                        onChange={this.handleDropZoneChange}
                                        dropZoneClass={classes.dropZone}

                                        showPreviews={true}
                                        showPreviewsInDropzone={false}
                                        useChipsForPreview
                                        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                        // previewChipProps={{ classes: { root: classes.previewChip } }}
                                        previewText="Selected files"
                                        showAlerts={true}
                                    />
                                </Grid>
                            )}


                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={this.handleDialogAgree} color="primary">
                            Tạo mới
                        </Button>
                    </DialogActions>
                </DialogWrapper>
            </div>
        );
    }
}

UploadMedia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withToastManager(withStyles(styles)(UploadMedia));
