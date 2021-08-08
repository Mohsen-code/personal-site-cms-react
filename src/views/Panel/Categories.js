import React, {useState, useEffect} from "react";
import {useHistory, useRouteMatch} from 'react-router-dom'
import {
    Container,
    Grid,
    Box,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    makeStyles,
    Avatar, TablePagination
} from '@material-ui/core'
import {Alert} from "@material-ui/lab";
import Message from "../../components/include/Message";
import CustomIconButton from "../../adapters/CustomIconButton";
import FAIcon from '../../components/include/FontAwesomeIcon';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../adapters/CustomButton";
import useUtil from "../../hooks/util";
import {CategoryDAO} from "../../DB/CategoryDAO";


const categoryDAO = new CategoryDAO();
const EDIT_CATEGORY_ROUTE = '/panel/edit-category/'

const PrimaryButton = new CustomButton('primary')
const WarningIconButton = new CustomIconButton('warning');
const ErrorIconButton = new CustomIconButton('error');

const useStyles = makeStyles({
    paper: {
        backgroundColor: "#292c31",
    }
});

export const Categories = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });

    const history = useHistory();
    const {path} = useRouteMatch();
    const util = useUtil();

    const PARENT_ROUTE = util.routeParent(path);

    const getCategories = async () => {
        const categories = await categoryDAO.getCategories()
        setCategories(categories);
    }

    const handleDeleteCategory = (categoryId) => {
        categoryDAO.deleteCategory(categoryId);
        getCategories();
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                messages: ['Category deleted successfully'],
                status: 'success'
            }
        })
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <Container>
            <Message
                show={message.show}
                onClose={() => {
                    setMessage(prevState => {
                        return {...prevState, show: false}
                    })
                }
                }
                messages={message.messages}
                duration={message.duration}
                status={message.status}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Box margin="20px 0">
                        <PrimaryButton onClick={() => history.push(`${PARENT_ROUTE}/new-category`)}>New
                            Category</PrimaryButton>
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
                                            <TableCell>isPublic</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {categories.length > 0 && <TableBody>
                                        {categories.map(category => {
                                            return (
                                                <TableRow key={category.id}>
                                                    <TableCell>
                                                        <Avatar src={category.thumbnail}/>
                                                    </TableCell>
                                                    <TableCell>{category.title}</TableCell>
                                                    <TableCell>{category.isPublic ? 'yse' : 'no'}</TableCell>
                                                    <TableCell>
                                                        <WarningIconButton onClick={() => history.push(EDIT_CATEGORY_ROUTE + category.id)}>
                                                            <FAIcon icon={faEdit} fontSize="sm"/>
                                                        </WarningIconButton>
                                                        <ErrorIconButton onClick={() => handleDeleteCategory(category.id)}>
                                                            <FAIcon icon={faTrash} fontSize="sm"/>
                                                        </ErrorIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}

                                    {categories.length > 0 && <TableFooter>
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
                            {categories.length === 0 &&
                            <Alert variant="filled" severity="error">There is no category!</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
