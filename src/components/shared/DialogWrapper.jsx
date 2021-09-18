import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { withToastManager } from 'react-toast-notifications';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import cs from '../../const';

const styles = (theme) => ({
    typo: {
        fontSize: 18,
    },
    gender_button: {
        marginTop: 20,
        marginLeft: 40
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography {...other}>
            <Typography variant="h6" className={classes.typo}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class DialogWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, title, width, history, open, handleClose } = this.props;
        return (
            <>
                <Dialog
                    onClose={handleClose || history.goBack}
                    open={open || true}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth={width || 'sm'}
                >
                    <DialogTitle id="create_user_form-dialog-title" onClose={handleClose || history.goBack}>
                        {title}
                    </DialogTitle>
                    {children}
                </Dialog>
            </>
        );
    }
}

export default withToastManager(withStyles(styles)(DialogWrapper));
