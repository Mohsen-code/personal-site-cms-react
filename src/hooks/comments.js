import {useCallback, useState} from "react";
import {CommentDAO} from "../DB/CommentDAO";
import {CommentDTO} from "../adapters/CommentDTO";
const commentDAO = new CommentDAO();
export const useComments = () => {
    const [commentsTree, setCommentsTree] = useState(null);
    const [userWantToReply, setUserWantToReply] = useState(false);
    const [replyComment, setReplyComment] = useState(new CommentDTO())
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });

    // Start Show Comments Functionality
    const getComment = useCallback(async (commentId) => {
        return await commentDAO.getComment(commentId)
    }, [])

    const createCommentsTree = useCallback(async (commentObject) => {
        commentObject.reply = await getComment(commentObject.replyId);
        if (commentObject.reply.replyId) await createCommentsTree(commentObject.reply);
    }, [getComment])

    const initComments = useCallback(async (commentId) => {
        const comment = await getComment(commentId);
        if (comment.replyId) await createCommentsTree(comment);
        setCommentsTree(comment);
    }, [getComment, createCommentsTree])
    // End Show Comments Functionality

    // Start Delete Comment Functionality
    const deleteComment = useCallback((commentId) => {
        commentDAO.deleteComment(commentId);
    }, [])

    const deleteCommentAndRepliesFromIndexedDB = useCallback((commentObject) => {
        if (commentObject.reply) deleteCommentAndRepliesFromIndexedDB(commentObject.reply);
        return deleteComment(commentObject.id);
    }, [deleteComment])

    const deleteCommentAndRepliesFromState = useCallback((commentObject, commentID) => {
        if (commentObject.replyId === commentID) {
            deleteCommentAndRepliesFromIndexedDB(commentObject.reply)
            commentObject.reply = null;
            return;
        }
        deleteCommentAndRepliesFromState(commentObject.reply, commentID)
    }, [deleteCommentAndRepliesFromIndexedDB])

    const handleDeleteButtonClicked = async (commentID, parentID) => {
        const comment = await getComment(parentID);
        comment.replyId = null;
        commentDAO.updateComment(comment);
        setCommentsTree(prevState => {
            deleteCommentAndRepliesFromState(prevState, commentID);
            return {
                ...prevState
            }
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment deleted successfully!']
            }
        })
    }
    // End Delete Comment Functionality

    // Start Reply Functionality
    const handleReplyButtonOnClick = (commentID) => {
        setUserWantToReply(true);
        setReplyComment(prevState => {
            return {
                ...prevState,
                parentId: commentID,
                name: 'Admin',
                email: 'admin@gmail.com'
            }
        })
    }

    const addReplyCommentToState = useCallback((state, comment) => {
        if (state.id === comment.parentId) {
            state.replyId = comment.id;
            state.reply = comment;
            return;
        }
        addReplyCommentToState(state.reply, comment)
    }, [])

    const handleSendReply = async () => {
        commentDAO.createComment(replyComment)
        const commentParent = await commentDAO.getComment(replyComment.parentId);
        commentParent.replyId = replyComment.id;
        commentDAO.updateComment(commentParent);
        setCommentsTree(prevState => {
            addReplyCommentToState(prevState, replyComment)
            return {
                ...prevState
            }
        })
        setReplyComment(new CommentDTO());
        setUserWantToReply(false);
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment sent successfully.']
            }
        })
    }
    // End Reply Functionality

    // Start Update Comment Functionality
    const updateCommentFromState = useCallback((state, comment) => {
        if (state.id === comment.id) {
            state.content = comment.content;
            return;
        }
        updateCommentFromState(state.reply, comment)
    }, [])

    const handleEditComment = (comment, {commentContent, isPublic}) => {
        const updatedComment = new CommentDTO({...comment, content: commentContent, isPublic});
        const {reply, ...updatedCommentWithoutReplyProp} = updatedComment;
        commentDAO.updateComment(updatedCommentWithoutReplyProp)
        setCommentsTree(prevState => {
            updateCommentFromState(prevState, updatedComment)
            return {
                ...prevState
            }
        })

        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment updated successfully.']
            }
        })
    }
    // End Update Comment Functionality

    return {
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
    }
}