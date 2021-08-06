import {useHistory, useRouteMatch} from 'react-router-dom'
import useUtil from "../../hooks/util";
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
    makeStyles, Avatar
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import {PostDAO} from "../../DB/PostDAO";
import {useEffect, useState} from "react";
import CustomIconButton from "../../adapters/CustomIconButton";
import FAIcon from '../../components/include/FontAwesomeIcon';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "@material-ui/lab";


const useStyles = makeStyles({
    paper: {
        backgroundColor: "#292c31",
    }
});

const postDAO = new PostDAO();

const Posts = () => {
    const classes = useStyles();
    const PrimaryButton = new CustomButton('primary');
    const WarningIconButton = new CustomIconButton('warning');
    const history = useHistory();
    const {path} = useRouteMatch();
    const util = useUtil();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postDAO.getPosts().then(posts => {
            setPosts(posts)
        })
    }, [])

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box margin="20px 0">
                        <PrimaryButton onClick={() => history.push(`${util.routeParent(path)}/new-post`)}>New
                            Post</PrimaryButton>
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
                                            <TableCell>Visit</TableCell>
                                            <TableCell>Comments</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {posts.length > 0 && <TableBody>
                                        {posts.map(post => {
                                            return (
                                                <TableRow key={post.id}>
                                                    <TableCell>
                                                        <Avatar src={post.thumbnail}/>
                                                    </TableCell>
                                                    <TableCell>{post.title}</TableCell>
                                                    <TableCell>{post.visits}</TableCell>
                                                    <TableCell>{post.comments.length}</TableCell>
                                                    <TableCell>
                                                        <WarningIconButton>
                                                            <FAIcon icon={faEdit} fontSize="sm"/>
                                                        </WarningIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}
                                    {posts.length > 0 && <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={10}
                                                onPageChange={() => {
                                                }}
                                                page={1}
                                                rowsPerPage={5}
                                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                            />
                                        </TableRow>
                                    </TableFooter>}
                                </Table>
                            </TableContainer>
                            {posts.length === 0 && <Alert variant="filled" severity="error">There is no post!</Alert> }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Posts;