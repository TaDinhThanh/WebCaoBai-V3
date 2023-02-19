import React from 'react'

import $ from 'jquery'

import axios from 'axios';

import { useSelector } from 'react-redux';

import { UpdateCountKeyYoutube } from '../../Fetch'

import { textUrlByRapidApi } from "../../Axios";

const TestKeyYoutube = () => {

    const data_key_youtube = useSelector(state => state.base.data_key_youtube)

    async function getUrlByYoutube(so_luong, KEY_API_SEARCH, id, key_search, timeOut) {
        let result;
        await textUrlByRapidApi(KEY_API_SEARCH, key_search, so_luong).then(async rs => {
            if (rs.status === 200) {
                await UpdateCountKeyYoutube(id);
                result = rs.data;
            }
        }).catch(error => console.error(error));
        return result;
    }

    const handleTestKeyYoutube = async () => {
        let arr = [];
        if (data_key_youtube.length > 0) {
            await data_key_youtube.map(async (item, index) => {
                if (item) {
                    let rs2 = await getUrlByYoutube(10, item.key_api, item.id, 'xây dựng là gì?', 1000)
                    console.log(rs2);
                    if (Boolean(rs2) === true) {
                        // await handleGetAllKeyYt();
                        $(`.youtube-item-${item.id}`).css("background-color", "green");
                    } else {
                        $(`.youtube-item-${item.id}`).css("background-color", "orange");
                    }
                }
                if (data_key_youtube.length - 1 === index) {
                    $('.start-test-yt').addClass('d-none')
                    $('.stop-test-yt').removeClass('d-none')
                }
            })
        }
    }

    const handleStopTestKeyYoutube = () => {
        $(`.youtube-item`).css("background-color", "rgba(0, 0, 0, 0)").css("color", "black");
        $('.start-test-yt').removeClass('d-none')
        $('.stop-test-yt').addClass('d-none')
    }

    return (
        <>
            <button type="button" className="start-test-yt btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyYoutube()}>
                Test Key
            </button>
            <button type="button" className="stop-test-yt btn btn-primary fw-bolder d-none" style={{ fontSize: '14px' }} onClick={() => handleStopTestKeyYoutube()}>
                Dừng test Key
            </button>
        </>
    )
}

export default TestKeyYoutube