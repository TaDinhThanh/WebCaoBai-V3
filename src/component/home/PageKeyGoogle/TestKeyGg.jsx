import React from 'react'

import $ from 'jquery'

import { useSelector } from 'react-redux';

import { CX_SEARCH, LINK_SEARCH } from '../../libs/base'
import { UpdateCountKeyGoogle } from '../../Fetch';

const TestKeyGg = () => {

    const data_key_google = useSelector(state => state.base.data_key_google)

    async function getUrlByGoogle(start, count, key_api, key_search, id_key) {
        await fetch(`${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    UpdateCountKeyGoogle(id_key);
                    // handleGetAllKeyGg();
                    $(`.google-item-${id_key}`).css("background-color", "green");
                } else if (response.status === 403) {
                    $(`.google-item-${id_key}`).css("background-color", "red");
                } else if (response.status === 429) {
                    $(`.google-item-${id_key}`).css("background-color", "orange");
                }
                return response.json();
            }).catch(err => console.log(err))
    }


    const handleTestKeyGoogle = async () => {
        if (data_key_google.length > 0) {
            await data_key_google.map(async (item, index) => {
                if (item) {
                    await getUrlByGoogle(1, 1, item.key_api, 'xây dựng là gì?', item.id, 1000)
                }
                if (data_key_google.length - 1 === index) {
                    $('.start-test-gg').addClass('d-none')
                    $('.stop-test-gg').removeClass('d-none')
                }
            })
        }
    }

    const handleStopTestKeyGoogle = () => {
        $(`.google-item`).css("background-color", "rgba(0, 0, 0, 0)").css("color", "black");
        $('.start-test-gg').removeClass('d-none')
        $('.stop-test-gg').addClass('d-none')
    }

    return (
        <>
            <button type="button" className="start-test-gg btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyGoogle()}>
                Test Key
            </button>
            <button type="button" className="stop-test-gg btn btn-primary fw-bolder d-none" style={{ fontSize: '14px' }} onClick={() => handleStopTestKeyGoogle()}>
                Dừng test Key
            </button>
        </>
    )
}

export default TestKeyGg