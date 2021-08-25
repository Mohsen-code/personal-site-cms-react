import {
    Grid,
    Card,
    CardContent,
    makeStyles,
    Box,
    Typography,
    Divider,
    Avatar,
    FormControlLabel
} from "@material-ui/core";
import defaultImage from '../../assets/images/no-image.jpg';
import React, {useEffect, useState} from "react";
import CustomIconButton from "../../adapters/CustomIconButton";
import FAIcon from './FontAwesomeIcon';
import {faReply, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import FroalaEditor from "react-froala-wysiwyg";
import CustomButton from "../../adapters/CustomButton";
import Switch from '@material-ui/core/Switch';


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

const PrimaryIconButton = new CustomIconButton('primary')
const WarningIconButton = new CustomIconButton('warning')
const ErrorIconButton = new CustomIconButton('error')
const PrimaryButton = new CustomButton('primary')
const ErrorButton = new CustomButton('error')

const ShowComment = ({comment, replyButtonOnClick, deleteButtonOnClick, editComment, inPanel}) => {
    const classes = useStyle()
    const [editCommentMode, setEditCommentMode] = useState(false)
    const [commentContent, setCommentContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        setIsPublic(comment.isPublic)
        setCommentContent(comment.content)
    }, [comment])

    const handleChangeCommentIsPublic = () => {
        setIsPublic(prevState => !prevState)
    }

    const handleClickOnEditCommentBtn = () => {
        editComment(comment, {commentContent, isPublic});
        setEditCommentMode(false);
    }

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
                            {!editCommentMode && <Typography variant="body1" component="p"
                                                             dangerouslySetInnerHTML={{__html: comment.content}}/>}
                            {editCommentMode && <React.Fragment>
                                <FroalaEditor tag='textarea' model={commentContent}
                                              onModelChange={value => setCommentContent(value)}/>
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={isPublic}
                                                onChange={handleChangeCommentIsPublic}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Is Public?"
                                    />
                                </Box>
                                <Box margin={'10px 0 0 0'}>
                                    <PrimaryButton onClick={handleClickOnEditCommentBtn}
                                                   style={{margin: '0 5px 0 0'}}>Edit</PrimaryButton>
                                    <ErrorButton onClick={() => setEditCommentMode(false)}>cancel</ErrorButton>
                                </Box>
                            </React.Fragment>}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{textAlign: 'end'}}>
                        <PrimaryIconButton onClick={() => replyButtonOnClick(comment.id, comment.name)} size={'small'}>
                            <FAIcon icon={faReply} fontSize="sm"/>
                        </PrimaryIconButton>
                        {inPanel && <WarningIconButton style={{margin: '0 5px'}} size={'small'}
                                                       onClick={() => setEditCommentMode(true)}>
                            <FAIcon icon={faEdit} fontSize="sm"/>
                        </WarningIconButton>}
                        {inPanel && <ErrorIconButton size={'small'} onClick={() => {
                            deleteButtonOnClick(comment.id, comment.parentId)
                        }}>
                            <FAIcon icon={faTrash} fontSize="sm"/>
                        </ErrorIconButton>}
                    </Grid>

                    <Grid item xs={12}>
                        {comment.reply &&
                        <ShowComment
                            comment={comment.reply}
                            replyButtonOnClick={replyButtonOnClick}
                            deleteButtonOnClick={deleteButtonOnClick}
                            editComment={editComment}
                            inPanel={inPanel}
                        />}
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default React.memo(ShowComment);