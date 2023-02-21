import { URL_API_GET } from '../Ajax'

const URL_API = 'http://localhost:800/WebClone_V3/rd/xml/a/';

export const UpdateCountKeyGoogle = async (id_key) => {
    let options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`${URL_API_GET}update-count-key-google/${id_key}`, options)
        .then(response => response.json())
        .then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const UpdateCountKeyYoutube = async (id_key) => {
    let options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`${URL_API_GET}update-count-key-youtube/${id_key}`, options)
        .then(response => response.json())
        .then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const getNextKeyGoogle = async (id_key) => {
    let options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`${URL_API_GET}get-next-key-google/${id_key}`, options)
        .then(response => response.json())
        .then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const getNextKeyYoutube = async (id_key) => {
    let options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`${URL_API_GET}get-next-key-youtube/${id_key}`, options)
        .then(response => response.json())
        .then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const saveImage = async (dataPost) => {
    console.log("Result int SAVE IMAGE: ", dataPost);
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
    }
    await fetch(URL_API + 'save-image', options).then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const saveWeb = async (dataPost) => {
    console.log("Result int SAVE WEB: ", dataPost);
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
    }
    await fetch(URL_API + 'save-web', options)
        .then(rs => console.log(rs))
        .catch(err => console.log(err))
}

export const saveVideo = async (dataPost) => {
    console.log("Result int SAVE VIDEO: ", dataPost);
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
    }
    await fetch(URL_API + 'save-video', options).then(async rs => {
        // if (rs.status === 500) {
        //     console.log("save lai video lan nua")
        //     await saveVideo(dataPost)
        // }
    })
        .catch(err => console.log(err))
}

export const saveFile = async (dataPost) => {
    console.log("Result int SAVE FILE: ", dataPost);
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataPost) // body data type must match "Content-Type" header
    }
    await fetch(URL_API + 'save-file', options).then(rs => console.log(rs))
        .catch(err => console.log(err))

}

export const getApiGoogle = async () => {
    let key_api_search = null;
    let id_key = null;
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    await fetch(URL_API + 'get-key-google', options)
        .then(rs => rs.json())
        .then(rs => {
            if (rs.length > 0) {
                key_api_search = rs[0].key_api
                id_key = rs[0].id
            }
        })
        .catch(err => console.log(err))
    return {
        key_api_search,
        id_key
    }
}

export const getApiYoutube = async () => {
    let key_api_search = null;
    let id_key = null;
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    await fetch(URL_API + 'get-key-youtube', options)
        .then(rs => rs.json())
        .then(rs => {
            if (rs.length > 0) {
                key_api_search = rs[0].key_api
                id_key = rs[0].id
            }
        })
        .catch(err => console.log(err))
    return {
        key_api_search,
        id_key
    }
}

export const getFirstApiYoutube = async () => {
    let key_api_search = null;
    let id_key = null;
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    await fetch(URL_API_GET + 'get-first-key-youtube', options).then(rs => rs.json())
        .then(rs => {
            if (rs.length > 0) {
                key_api_search = rs[0].key_api
                id_key = rs[0].id
            }
        })
        .catch(err => console.log(err))
    return {
        key_api_search,
        id_key
    }
}

export const getFirstApiGoogle = async () => {
    let key_api_search = null;
    let id_key = null;
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    await fetch(URL_API_GET + 'get-first-key-google', options).then(rs => rs.json())
        .then(rs => {
            if (rs.length > 0) {
                key_api_search = rs[0].key_api
                id_key = rs[0].id
            }
        })
        .catch(err => console.log(err))
    return {
        key_api_search,
        id_key
    }
}

export const getUrlByKey = async () => {
    let key_api_search = null;
    let id_key = null;
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    await fetch(URL_API_GET + 'get-first-key-youtube', options).then(rs => rs.json())
        .then(rs => {
            if (rs.length > 0) {
                key_api_search = rs[0].key_api
                id_key = rs[0].id
            }
        })
        .catch(err => console.log(err))
    return {
        key_api_search,
        id_key
    }
}