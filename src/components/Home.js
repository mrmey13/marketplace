import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { useTranslation, withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    
})

class Home extends Component {

    render() {
        return (
            <div>
                HOME
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTranslation()(Home));
