import {Container, Grid, Card, CardContent, CardActions, makeStyles, Typography, Divider, Box} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import defaultImage from '../../assets/images/no-image.jpg'
import {AccountDAO} from "../../DB/AccountDAO";
import {useCallback, useEffect, useState} from "react";
import {AccountDTO} from "../../adapters/AccountDTO";
import {useHistory} from 'react-router-dom'

const accountDAO = new AccountDAO();

const useStyle = makeStyles({
    card: {
        backgroundColor: "#292c31",
        margin: '20px 0 0 0'
    }
})


const PrimaryButton = new CustomButton('primary')
const ErrorButton = new CustomButton('error')

export const Users = () => {
    const classes = useStyle()
    const [accounts, setAccounts] = useState([])
    const history = useHistory()

    const getAccounts = useCallback(async () => {
        const accountsList = await accountDAO.getAccounts()
        const mappedAccounts = accountsList.map(account => new AccountDTO(account))
        setAccounts(await accountDAO.getAccounts(mappedAccounts))
    }, [])

    useEffect(() => {
        getAccounts()
    }, [getAccounts])

    return (
        <Container>
            <Grid container>
                {accounts.map(account => {
                    return (
                        <Grid item xs={12} key={account.id}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Box margin={'0 10px 0 0'}>
                                                <img src={account.thumbnail || defaultImage} alt={'avatar'} style={{width: '100%'}}/>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="body1">Username: {account.username}</Typography>
                                            <Typography variant="body1">Name: {account.firstName}</Typography>
                                            <Typography variant="body1">Last Name: {account.lastName}</Typography>
                                            <Typography variant="body1">Email: {account.email}</Typography>
                                            <Typography variant="body1">Permission: {account.permission}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider/>
                                <CardActions>
                                    <PrimaryButton onClick={() => history.push('/panel/profile/' + account.id)}>Edit</PrimaryButton>
                                    <ErrorButton>Remove</ErrorButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}