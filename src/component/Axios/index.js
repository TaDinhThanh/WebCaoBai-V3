import axios from 'axios';

export const textUrlByRapidApi = async (KEY_API_SEARCH, key_search, so_luong) => {
    let data = null;
    let status
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
            q: key_search,
            part: 'snippet,id',
            maxResults: so_luong,
            order: 'viewCount'
        },
        headers: {
            'X-RapidAPI-Key': KEY_API_SEARCH,
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };
    // k bắt được lỗi 429, 403    
    await axios.request(options).then(async response => {
        console.log(response);
        if (response.status === 200) {
            console.log("KEY IN 200 API: ", KEY_API_SEARCH)
            status = response.status;
            data = [...response.data.items]
        }
    })
        .catch(error => console.error(error));
    return {
        data,
        status
    };
}

export const getUrlByRapidApi = async (KEY_API_SEARCH, key_search, so_luong) => {
    let data = null;
    let status
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
            q: key_search,
            part: 'snippet,id',
            maxResults: so_luong,
            order: 'relevance',
            // order: 'rating',
            regionCode: 'VN'
        },
        headers: {
            'X-RapidAPI-Key': KEY_API_SEARCH,
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };
    // k bắt được lỗi 429, 403    
    await axios.request(options).then(async response => {
        console.log(response);
        if (response.status === 200) {
            console.log("KEY IN 200 API: ", KEY_API_SEARCH)
            status = response.status;
            data = [...response.data.items]
        }
    })
        .catch(error => console.error(error));
    return {
        data,
        status
    };
}