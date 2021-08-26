import {Container, Grid, TextField, Card, CardContent, CardActions, makeStyles, Box, Divider} from "@material-ui/core";
import CustomButton from "../adapters/CustomButton";

const useStyle = makeStyles({
    card: {
        backgroundColor: "#292c31",
        marginTop: '20px'
    }
})

const PrimaryButton = new CustomButton('primary')

export const ContactUs = () => {
    const classes = useStyle()
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box>
                                <TextField
                                    label={`Name`}
                                    fullWidth
                                />
                            </Box>
                            <Box margin={'10px 0'}>
                                <TextField
                                    label={`Email`}
                                    fullWidth
                                />
                            </Box>
                            <Box margin={'10px 0'}>
                                <TextField
                                    label={`Title`}
                                    fullWidth
                                />
                            </Box>
                            <Box margin={'10px 0'}>
                                <TextField
                                    label={`Content`}
                                    multiline
                                    rows={10}
                                    fullWidth
                                />
                            </Box>
                        </CardContent>
                        
                        <CardActions>
                            <PrimaryButton>Send Message</PrimaryButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}