import React, { Component } from 'react'

import { withStyles } from "@material-ui/core/styles";
import { useTranslation, withTranslation } from "react-i18next";
import { withToastManager } from "react-toast-notifications";
import { Link, withRouter, Route } from 'react-router-dom';
import color from "../../theme/color";
import cs from "../../const";
import axios from 'axios';

const styles = (theme) => ({
})

class ShopDashboard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {    
        };
        

    }

    componentWillMount() {
        console.log(this.props.history);
        this.loadData();
       
    }

    loadData = async () => {
        console.log ("Shop Home is loading data");

    }
 
    render() {
        const { classes, t, i18n } = this.props;      
        return (
            <div>
                <div className={"card"}>
                    <div className="card-body shadow">
                        <div className="d-flex align-items-baseline">
                            <h4 className="card-title mb-4 text-uppercase">
                               Shop Home
                            </h4>
                        </div>                          
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(withToastManager(
    withStyles(styles)(withTranslation()(ShopDashboard))
));
