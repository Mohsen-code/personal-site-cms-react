const useUtil = () => {

    const routeParent = (route) => {
        return route.substring(0, route.lastIndexOf('/'));
    }

    const mapSpecificDataFromArray = (shortArray, longArray, searchProp, mainProp) => {
        const mappedData = [];

        for (let shortArrayIndex = 0; shortArrayIndex < shortArray.length; shortArrayIndex++){
            for (let longArrayIndex = 0; longArrayIndex < longArray.length; longArrayIndex++){
                if (shortArray[shortArrayIndex] === longArray[longArrayIndex].[searchProp]){
                    mappedData.push(longArray[longArrayIndex].[mainProp]);
                }
            }
        }

        return mappedData;
    }

    return {
        routeParent,
        mapSpecificDataFromArray

    }
}

export default useUtil;