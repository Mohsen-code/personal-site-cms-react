import {useState} from "react";
import {
    Container,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    Box,
    Card,
    CardContent,
    Divider,
    makeStyles
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";

const useStyles = makeStyles({
    paper: {
        backgroundColor: "#292c31",
    }
});
const Posts = () => {
    const classes = useStyles();
    const PrimaryButton = new CustomButton('primary');

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box margin="20px 0">
                        <PrimaryButton>New Post</PrimaryButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.paper}>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thumbnail</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>visit</TableCell>
                                            <TableCell>link</TableCell>
                                            <TableCell>options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>kobs1</TableCell>
                                            <TableCell>kobs2</TableCell>
                                            <TableCell>kobs3</TableCell>
                                            <TableCell>kobs4</TableCell>
                                            <TableCell>kobs5</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>kobs1</TableCell>
                                            <TableCell>kobs2</TableCell>
                                            <TableCell>kobs3</TableCell>
                                            <TableCell>kobs4</TableCell>
                                            <TableCell>kobs5</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={10}
                                                onPageChange={() => {}}
                                                page={1}
                                                rowsPerPage={5}
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Posts;