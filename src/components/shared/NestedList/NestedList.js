import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//import { menu } from "./menu";
import { hasChildren, hasAccess, hasNonAccess } from "./utils";
import { Divider, Typography } from "@material-ui/core";
import { useTranslation, withTranslation } from 'react-i18next';

export default function NestedList(props) {
    const { t, i18n } = useTranslation();
    const menu = props.menu;
    const userrole = props.userrole;
    const multilingual = props.multilingual;
    return menu.map((item, key) => <MenuItem key={key} item={item} userrole={userrole} closeMenuTab={props.closeMenuTab} multilingual={multilingual} t={t} i18n={i18n} />);
}

const MenuItem = ({ item, userrole, closeMenuTab, multilingual, t, i18n }) => {
    if (!hasAccess(item, userrole)) return null;
    if (hasNonAccess(item, userrole)) return null;
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} userrole={userrole} closeMenuTab={closeMenuTab} multilingual={multilingual} t={t} i18n={i18n} />;
};

const SingleLevel = ({ item, userrole, closeMenuTab, multilingual, t, i18n }) => {
    //console.log(item);
    if (item.to) {
        //component={Link} to="/report/daily"
        return (
            <>
                <ListItem button component={Link} to={item.to} onClick={() => { closeMenuTab() }} style={{ whiteSpace: "normal" }}>
                    <ListItemIcon className="ms-3">{item.icon}</ListItemIcon>
                    <ListItemText
                        // primary={multilingual ? t(item.title) :item.title} 
                        disableTypography
                        primary={<Typography type="body2" style={{ fontSize: 12 }}>
                            {multilingual ? t(item.title) : item.title}
                        </Typography>} />
                </ListItem>
                {/* <Divider /> */}
            </>
        );
    } else {
        return (
            <>
                {/* <Divider /> */}
                <ListItem button style={{ whiteSpace: "normal" }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                        // primary={multilingual ? t(item.title) :item.title} 
                        disableTypography
                        primary={<Typography type="body2" style={{ fontSize: 12 }}>
                            {multilingual ? t(item.title) : item.title}
                        </Typography>} />
                </ListItem>
            </>

        );
    }

};

const MultiLevel = ({ item, userrole, closeMenuTab, multilingual, t, i18n }) => {
    //console.log(item, userrole);
    const { items: children } = item;
    //console.log(children);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick} style={{ whiteSpace: "normal" }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {/* <ListItemText primary={item.title} style={{ fontWeight: 'bold' }} /> */}
                <ListItemText
                    disableTypography
                    primary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: 12 }}>
                        {multilingual ? t(item.title) : item.title}
                    </Typography>}
                />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} userrole={userrole} closeMenuTab={closeMenuTab} multilingual={multilingual} t={t} i18n={i18n} />
                    ))}
                </List>
            </Collapse>
            <Divider />
        </React.Fragment>
    );
};
