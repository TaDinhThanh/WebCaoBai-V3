import $ from "jquery";
const TOKENHEADER_VALUE = getCookie('Authorization')

export const URL_API_GET = 'http://localhost:800/WebClone_V3/api/rd/xml/a/';

// get cookie
export function getCookie(name) {
    try {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
        if (match) {
            return match[2]
        } else {
            return ''
        }
    } catch (e) {
        return ''
    }
}

/* get data */
export async function ajaxCallGet(url) {
    let rs = null
    if (url.includes('?')) url = url.concat('&token=' + TOKENHEADER_VALUE)
    else url = url.concat('?token=' + TOKENHEADER_VALUE)
    await $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        type: 'GET',
        url: URL_API_GET + url,
        success: function (result) {
            rs = result
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
    return rs
}

/* post data*/
export async function ajaxCallPost(url, dataJson) {
    let rs = null
    await $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        type: 'POST',
        data: JSON.stringify({
            data: dataJson
        }),
        url: URL_API_GET + url,
        success: function (result) {
            rs = result
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
    return rs
}

/* update data */
export async function ajaxCallPut(url) {
    let rs = null
    await $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        type: 'PUT',
        url: URL_API_GET + url,
        success: function (result) {
            rs = result
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
    return rs
}

/* delete data */
export async function ajaxCallDelete(url, dataJson) {
    let rs = null
    await $.ajax({
        headers: {
            'content-type': 'application/json'
        },
        type: 'DELETE',
        data: JSON.stringify(dataJson),
        url: URL_API_GET + url,
        success: function (result) {
            rs = result
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
    return rs
}

export const getDataIdHaveUrlGoogle = async (id_cam) => {
    let arr1 = [];
    let reducedArray = null;
    await ajaxCallGet(`get-data-id-have-url-google/${id_cam}`).then(async rs => {
        await rs.map(item => {
            arr1.push(item.id);
        })
        reducedArray = arr1.reduce((acc, curr, _, arr) => {
            if (acc.length == 0) acc.push({ idKey: curr, count: 1 })
            else if (acc.findIndex(f => f.idKey === curr) === -1) acc.push({ idKey: curr, count: 1 })
            else ++acc[acc.findIndex(f => f.idKey === curr)].count
            return acc
        }, []);

    })
    return reducedArray;
}

export const getDataIdHaveVideo = async (id_cam) => {
    let arr1 = [];
    let reducedArray = [];
    await ajaxCallGet(`get-data-id-have-video/${id_cam}`).then(async rs => {
        await rs.map(item => {
            arr1.push(item.id);
        })
        reducedArray = arr1.reduce((acc, curr, _, arr) => {
            if (acc.length === 0) acc.push({ idKey: curr, count: 1 })
            else if (acc.findIndex(f => f.idKey === curr) === -1) acc.push({ idKey: curr, count: 1 })
            else ++acc[acc.findIndex(f => f.idKey === curr)].count
            return acc
        }, []);
    })
    return reducedArray;
}

export const resetAllKeyYt = async () => {
    await ajaxCallPut(`reset-all-key-youtube`).then(rs => {
        console.log(rs)
    })
    .catch(err => console.log(err))
}


export const resetAllKeyGg = async () => {
    await ajaxCallPut(`reset-all-key-google`).then(rs => {
        console.log(rs)
    })
    .catch(err => console.log(err))
}