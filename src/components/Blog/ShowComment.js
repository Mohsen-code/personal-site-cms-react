import {Grid, Card, CardContent, makeStyles, Box, Typography, Divider, Avatar} from "@material-ui/core";
import defaultImage from '../../assets/images/no-image.jpg';

const useStyle = makeStyles({
    card: {
        backgroundColor: "#292c31",
        margin: '10px 0'
    },
    avatar: {
        width: '65px',
        height: '65px'
    }
})

export const ShowComment = ({comment}) => {
    const classes = useStyle()
    console.log('ShowComment => ', comment)
    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container>
                    <Grid item>
                        <Avatar src={defaultImage} sizes="190" className={classes.avatar}/>
                    </Grid>
                    <Grid items style={{flex: 1}}>
                        <Box padding="0 10px">
                            <Typography variant="h6">{comment.name}</Typography>
                            <Divider/>
                            <Typography variant="body1" component="p"
                                        dangerouslySetInnerHTML={{__html: comment.content}}/>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}