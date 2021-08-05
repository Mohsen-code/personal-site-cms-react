const useUtil = () => {

    const routeParent = (route) => {
        return route.substring(0, route.lastIndexOf('/'));
    }

    return {
        routeParent
    }
}

export default useUtil;