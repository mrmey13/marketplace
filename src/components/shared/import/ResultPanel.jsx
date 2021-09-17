import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import { Divider } from '@material-ui/core';

function ResultPanel({ errors = [], results = [] }) {
    return (
        <>
            {(errors.length !== 0 || results.length !== 0) && (
                <>
                    <Divider />
                    <Typography
                        variant="body1"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <b>Kết quả</b>
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                        style={{
                            overflow: 'scroll',
                            height: '500px'
                        }}
                    >
                        <Grid item xs={6}>
                            {errors.length ? <Typography variant="body1">Lỗi:</Typography> : ''}
                            <div>
                                <List>
                                    {errors.map((er, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                style={{ paddingTop: 5, paddingBottom: 5 }}
                                            >
                                                <ListItemIcon
                                                    style={{ marginLeft: 0, marginRight: 0 }}
                                                >
                                                    <Icon
                                                        color="error"
                                                        style={{
                                                            marginLeft: 0,
                                                            marginRight: 0,
                                                            fontSize: 26
                                                        }}
                                                    >
                                                        error_outline
                                                    </Icon>
                                                </ListItemIcon>
                                                <ListItemText
                                                    classes={{
                                                        primary: { color: 'primary' },
                                                        secondary: { color: 'primary' }
                                                    }}
                                                    secondary={er.error}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {results.length ? (
                                <Typography variant="body1">Thành công:</Typography>
                            ) : (
                                ''
                            )}
                            <div>
                                <List>
                                    {results.map((res, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                style={{ paddingTop: 5, paddingBottom: 5 }}
                                            >
                                                <ListItemIcon
                                                    style={{ marginLeft: 0, marginRight: 0 }}
                                                >
                                                    <Icon
                                                        style={{
                                                            color: '#218838',
                                                            marginLeft: 0,
                                                            marginRight: 0,
                                                            fontSize: 26
                                                        }}
                                                    >
                                                        check_circle_outline
                                                    </Icon>
                                                </ListItemIcon>
                                                <ListItemText
                                                    classes={{
                                                        primary: { color: 'primary' },
                                                        secondary: { color: 'primary' }
                                                    }}
                                                    secondary={res.msg}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}

export default ResultPanel;
