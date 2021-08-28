import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    makeStyles,
    Box,
    TextField,
    InputLabel, Select, MenuItem, FormControl, InputAdornment, Divider
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import defaultImage from '../../assets/images/no-image.jpg'
import {useForm, Controller} from "react-hook-form";
import React, {useCallback, useEffect, useRef, useState, useContext} from "react";
import FAIcon from "../../components/include/FontAwesomeIcon";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useParams} from 'react-router-dom'
import {AccountDTO} from "../../adapters/AccountDTO";
import {AccountDAO} from "../../DB/AccountDAO";
import Message from "../../components/include/Message";
import AppContext from "../../store/app-context";

const accountDAO = new AccountDAO();

const useStyle = makeStyles({
    card: {
        backgroundColor: '#292c31',
        margin: '20px 0 0 0'
    },
    cardImage: {
        width: '100%'
    }
})

const PrimaryButton = new CustomButton('primary')
const ErrorButton = new CustomButton('error')

export const Profile = () => {
    const classes = useStyle()
    const [showPassword, setShowPassword] = useState(false)
    const [account, setAccount] = useState(new AccountDTO())
    const [permission, setPermission] = useState('user')
    const [createDate, setCreateDate] = useState('')
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const fileRef = useRef()
    const params = useParams()
    const {
        handleSubmit,
        formState: {errors},
        control,
        reset
    } = useForm()
    const ctx = useContext(AppContext)

    const convertStringDateToTimestamp = useCallback((stringDate) => {
        const splitDate = stringDate.split("-");
        console.log('splitDate => ', splitDate)
        const timestamp = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]).getTime()
        console.log('timestamp => ', timestamp)
        return timestamp
    }, [])

    const convertTimestampToStringDate = useCallback((timestamp) => {
        const myDate = new Date(timestamp)
        const year = myDate.getFullYear()
        const month = myDate.getMonth() + 1
        const day = myDate.getDate()
        const stringDate = `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
        console.log('stringDate => ', stringDate)
        return stringDate
    }, [])

    const getAccount = useCallback(async (accountId) => {
        const accountObj = await accountDAO.getAccountById(accountId)
        setAccount(new AccountDTO(accountObj))
        setPermission(accountObj.permission)
        setCreateDate(convertTimestampToStringDate(accountObj.createDate))
        reset({
            firstName: accountObj.firstName,
            lastName: accountObj.lastName,
            email: accountObj.email,
            password: accountObj.password,
            permission: accountObj.permission,
            createDate: accountObj.createDate
        })
    }, [])

    const getUserDataFromLS = useCallback(() => {
        return JSON.parse(localStorage.getItem('app-user-data'))
    }, [])

    useEffect(() => {
        console.log('params => ', params)
        if (params.id) {
            getAccount(params.id);
            return;
        }

        const userData = getUserDataFromLS()
        getAccount(userData.id)

    }, [getAccount])

    const handleUploadThumbnail = () => {
        fileRef.current.click()
    }

    const handleClickOnDeleteThumbnail = () => {
        setAccount(prevState => {
            return {...prevState, thumbnail: null}
        })
    }

    const handleFileChanges = (event) => {
        if (event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0])
            fileReader.onload = () => {
                setAccount(prevState => {
                    return {...prevState, thumbnail: fileReader.result}
                })

            }
        }
    }

    const handleSubmitForm = (data) => {
        const updatedAccount = {...account, createDate: convertStringDateToTimestamp(createDate), permission: permission}
        accountDAO.updateAccount(updatedAccount)
        ctx.setAccount(updatedAccount)
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['profile updated successfully!']
            }
        })
    }

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
                    <Card className={classes.card}>
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <CardContent>
                                <Box>
                                    <img src={account.thumbnail || defaultImage} alt={'avatar'}
                                         className={classes.cardImage}/>
                                </Box>
                                <Box margin={'10px 0'}>
                                    <input type="file" hidden ref={fileRef} onChange={handleFileChanges}/>
                                    {account.thumbnail && <ErrorButton onClick={handleClickOnDeleteThumbnail}>Delete Image</ErrorButton>}
                                    {!account.thumbnail && <PrimaryButton onClick={handleUploadThumbnail}>Upload Image</PrimaryButton>}
                                </Box>
                                <Box margin={'10px 0'}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Please enter first name",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Last name must be at least 3 character",
                                            }
                                        }}
                                        render={({field}) => <TextField
                                            label={'First Name'}
                                            fullWidth
                                            {...field}
                                            value={account.firstName}
                                            onChange={event => {
                                                setAccount(prevState => {
                                                    return {
                                                        ...prevState,
                                                        firstName: event.target.value
                                                    }
                                                })
                                                field.onChange(event.target.value)
                                            }}
                                            error={!!errors.firstName}
                                            helperText={(errors.firstName && errors.firstName.message) || ""}
                                        />}
                                    />

                                </Box>
                                <Box margin={'10px 0'}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Please enter last name",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Last name must be at least 3 character",
                                            },
                                        }}
                                        render={({field}) => <TextField
                                            label={'Last Name'}
                                            fullWidth
                                            autoComplete="off"
                                            {...field}
                                            value={account.lastName}
                                            onChange={event => {
                                                setAccount(prevState => {
                                                    return {...prevState, lastName: event.target.value}
                                                })
                                                field.onChange(event.target.value)
                                            }}
                                            error={!!errors.lastName}
                                            helperText={(errors.lastName && errors.lastName.message) || ""}
                                        />}/>

                                </Box>
                                <Box margin={'10px 0'}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Please enter email",
                                            },
                                            pattern: {
                                                value:
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "email is not valid",
                                            }
                                        }}
                                        render={({field}) => <TextField
                                            label={'Email'}
                                            fullWidth
                                            {...field}
                                            value={account.email}
                                            onChange={event => {
                                                setAccount(prevState => {
                                                    return {...prevState, email: event.target.value}
                                                })
                                                field.onChange(event.target.value)
                                            }}
                                            error={!!errors.email}
                                            helperText={(errors.email && errors.email.message) || ""}
                                        />}/>

                                </Box>
                                <Box margin={'10px 0'}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Please enter your password",
                                            },
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                                message: "password is not valid",
                                            }
                                        }}
                                        render={({field}) => <TextField
                                            type={showPassword ? 'text' : 'password'}
                                            label={'Password'}
                                            fullWidth
                                            {...field}
                                            value={account.password}
                                            onChange={event => {
                                                setAccount(prevState => {
                                                    return {...prevState, password: event.target.value}
                                                })
                                                field.onChange(event.target.value)
                                            }}
                                            error={!!errors.password}
                                            helperText={(errors.password && errors.password.message) || ""}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <FAIcon
                                                            icon={showPassword ? faEye : faEyeSlash}
                                                            onClick={() => setShowPassword((prevData) => !prevData)}
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />}
                                    />

                                </Box>
                                <Box margin={'10px 0'}>
                                    <FormControl fullWidth>
                                        <InputLabel id="permission-label">Permission</InputLabel>
                                        <Select
                                            labelId="permission-label"
                                            value={permission}
                                            onChange={(event) => setPermission(event.target.value)}
                                            fullWidth
                                        >
                                            <MenuItem value='user'>User</MenuItem>
                                            <MenuItem value='admin'>Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box margin={'10px 0'}>
                                    <TextField
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        value={createDate}
                                        fullWidth
                                        onChange={event => setCreateDate(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <PrimaryButton type='submit'>Submit</PrimaryButton>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}