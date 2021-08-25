import Dialog from "../../include/Dialog";
import {Box} from "@material-ui/core";
import FroalaEditor from "react-froala-wysiwyg";
import React, {useEffect} from "react";
import Message from "../../include/Message";
import CustomButton from "../../../adapters/CustomButton";
import ShowComment from "../../include/ShowComment";
import {useComments} from "../../../hooks/comments";

const PrimaryButton = new CustomButton('primary')
const ErrorButton = new CustomButton('error')

export const CommentDialog = ({showDialog, setShowDialog, commentId}) => {
    const {
        initComments,
        commentsTree,
        message,
        setMessage,
        userWantToReply,
        replyComment,
        setReplyComment,
        handleReplyButtonOnClick,
        handleDeleteButtonClicked,
        handleEditComment,
        handleSendReply
    } = useComments();

    useEffect(() => {
        console.log('commentId => ', commentId)
        initComments(commentId)
    }, [initComments])

    return (
        <React.Fragment>
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

            <Dialog
                cancelBtnText="close"
                show={showDialog}
                handleClose={() => setShowDialog(false)}
                title="View Comment"
                style={{width: '700px'}}
            >

                {commentsTree &&
                <ShowComment
                    comment={commentsTree}
                    replyButtonOnClick={handleReplyButtonOnClick}
                    deleteButtonOnClick={handleDeleteButtonClicked}
                    editComment={handleEditComment}
                    inPanel={true}
                />}
                {userWantToReply && <Box>
                    <FroalaEditor tag='textarea' model={replyComment.content} onModelChange={(content) => {
                        setReplyComment(prevState => {
                            return {...prevState, content}
                        })
                    }
                    }/>
                    <Box margin="10px 0 0 0">
                        <ErrorButton
                            onClick={() => {
                            }}
                            style={{margin: '0 7px 0 0'}}
                        >Cancel Reply</ErrorButton>
                        <PrimaryButton onClick={handleSendReply}>Send Reply</PrimaryButton>
                    </Box>
                </Box>}
            </Dialog>
        </React.Fragment>

    )
}