import React, {useState} from "react";
import Message from "../components/include/Message";

const useUtil = () => {

    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });


    const routeParent = (route) => {
        return route.substring(0, route.lastIndexOf('/'));
    }

    const mapSpecificDataFromArray = (shortArray, longArray, searchProp, mainProp) => {
        const mappedData = [];

        for (let shortArrayIndex = 0; shortArrayIndex < shortArray.length; shortArrayIndex++) {
            for (let longArrayIndex = 0; longArrayIndex < longArray.length; longArrayIndex++) {
                if (shortArray[shortArrayIndex] === longArray[longArrayIndex].[searchProp]) {
                    mappedData.push(longArray[longArrayIndex].[mainProp]);
                }
            }
        }

        return mappedData;
    }

    return {
        routeParent,
        mapSpecificDataFromArray,
        MessageComponent: <Message
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
        />,
        setMessage
    }
}

export default useUtil;