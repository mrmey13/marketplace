import React from 'react';
import { Card, Grid, Button, Typography, CardContent, CardActions } from '@material-ui/core';
import FormData from 'form-data';

const styles = (theme) => ({
    downloadContainer: {
        paddingTop: 10
    }
});

function MockupFilePanel({ importURL }) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom component="h2">
                        Import từ file:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Xem file excel mẫu để import dữ liệu vào hệ thống
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                download="import-agents-template.zip"
                                target="_blank"
                                href={importURL}
                                style={{ fontSize: 13, marginTop: 2 }}
                                color="primary"
                            >
                                Download
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            {/* <Grid
                container
                direction="row"
                justify="fixed-start"
                alignItems="stretch"
                spacing={20}
                className={styles.downloadContainer}
                gutterBottom
            >
                <Grid item xs={5}>
                    <Typography variant="body1">Tải file mẫu :</Typography>
                </Grid>
                <Grid item xs={7}>
                    <a
                        download="import-agents-template.zip"
                        target="_blank"
                        href={importURL}
                        style={{ fontSize: 13, marginTop: 2 }}
                    >
                        File mẫu
                    </a>
                </Grid>
            </Grid> */}
        </>
    );
}

export default MockupFilePanel;
