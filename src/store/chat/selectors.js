
export const getChatItems = data => {
    return data ? Object.keys(data).map(key => { 
        var temp = data[key]
        temp.key = key
        return temp
    }) : []
}
