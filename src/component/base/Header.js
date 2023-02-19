import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ajaxCallGet } from '../Ajax'

import { changeDataCam, changeDataKeyGoogle, changeDataKeyYoutube, changeKeyGoogle, changeTrangThaiCam } from '../reducer_action/BaseReducerAction'

import ChonChienDich from '../home/PageCaoBai/ChonChienDich'

import ChonNgonNgu from '../home/PageCaoBai/ChonNgonNgu'

export default function Header() {

    // const data_current_id_cam = useSelector(state => state.base.current_id_cam)
    // let id_cam = getItemLocalStorage('id_cam')[0];
    // 
    const dispatch = useDispatch();
    const dataCam = useSelector(state => state.base.data_cam);
    const data_current_id_cam = useSelector(state => state.base.current_id_cam);
    const [tab, setTab] = useState();

    // useEffect(() => {
    window.onbeforeunload = function async(event) {
        event = event || window.event;

        var confirmClose = 'Are you sure?';
        console.log(event.returnValue)

        // For IE and Firefox prior to version 4
        if (event) {
            ajaxCallGet(`reset-cam/${data_current_id_cam}`).then(async rs => {
                console.log('thanh cong')
                await dispatch(changeTrangThaiCam(false))
            }).catch(err => console.log(err))
            event.returnValue = confirmClose;
        }

        // For Safari
        return confirmClose;
    }

    // }, [])

    const handleGetCampaign = () => {
        let current_cam = dataCam.filter(item => {
            return item.id === data_current_id_cam;
        })

        if (current_cam.length !== 0) {
            document.title = current_cam[0].label;
        }
    }

    useEffect(() => {
        handleGetCampaign();
    }, [data_current_id_cam])

    const getCampaign = () => {
        const select_all_key = { id: -1, label: 'Tất cả key', language: 'Vietnamese', check: 0 }
        ajaxCallGet(`get-cam`).then(async rs => {
            let arr = rs.data;
            let get_cam = (arr.length === 0) ? [] : [...arr, select_all_key]
            dispatch(changeDataCam(get_cam))
        }).catch(err => console.log(err))
    }

    const handleGetAllKeyGg = async () => {
        await ajaxCallGet(`get-all-key-google`).then(async rs => {
            dispatch(changeDataKeyGoogle([...rs.data]))
        }).catch(err => console.log(err))
    }

    const handleGetAllKeyYt = async () => {
        await ajaxCallGet(`get-all-key-youtube`).then(async rs => {
            dispatch(changeDataKeyYoutube([...rs.data]))
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getCampaign();
        handleGetAllKeyGg();
        handleGetAllKeyYt();
    }, [tab])

    return (
        <div className='d-flex justify-content-between align-items-center' style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <ul
                className='col-6 nav-pills mt-2 mb-2 nav nav-content'
                id='tabs'
                role='tablist'
            >
                <li className='nav-item ms-4' role='presentation'>
                    <button
                        className='nav-link active'
                        id='pills-home-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-home'
                        type='button'
                        role='tab'
                        aria-controls='pills-home'
                        aria-selected='true'
                        onClick={() => setTab('tab1')}
                    >
                        Cào bài
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-campaign-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-campaign'
                        type='button'
                        role='tab'
                        aria-controls='pills-campaign'
                        aria-selected='false'
                        onClick={() => setTab('tab2')}
                    >
                        Chiến dịch
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-profile-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-profile'
                        type='button'
                        role='tab'
                        aria-controls='pills-profile'
                        aria-selected='false'
                        onClick={() => setTab('tab3')}
                    >
                        Quản lý key
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-keygg-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-keygg'
                        type='button'
                        role='tab'
                        aria-controls='pills-keygg'
                        aria-selected='false'
                        onClick={() => setTab('tab4')}
                    >
                        Key Google
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-keyyt-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-keyyt'
                        type='button'
                        role='tab'
                        aria-controls='pills-keyyt'
                        aria-selected='false'
                        onClick={() => setTab('tab5')}
                    >
                        Key Youtube
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-contact-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-contact'
                        type='button'
                        role='tab'
                        aria-controls='pills-contact'
                        aria-selected='false'
                        onClick={() => setTab('tab6')}
                    >
                        Blacklist domain
                    </button>
                </li>
                {/* <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-spin-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-spin'
                        type='button'
                        role='tab'
                        aria-controls='pills-spin'
                        aria-selected='false'
                        onClick={() => setTab('tab7')}
                    >
                        Spin Word
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-fast-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-fast'
                        type='button'
                        role='tab'
                        aria-controls='pills-fast'
                        aria-selected='false'
                        onClick={() => setTab('tab8')}
                    >
                        Fast Content
                    </button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button
                        className='nav-link'
                        id='pills-language-tab'
                        data-bs-toggle='pill'
                        data-bs-target='#pills-language'
                        type='button'
                        role='tab'
                        aria-controls='pills-language'
                        aria-selected='false'
                        onClick={() => setTab('tab9')}
                    >
                        Ngôn ngữ
                    </button>
                </li> */}
            </ul>
            <div className='col-6 d-flex flex-row'>
                <div className='col-6 px-1 d-flex align-items-center justify-content-between name-campaign'>
                    <label className='col-4 text-start fs-7 fw-bolder'>
                        Tên chiến dịch:{' '}
                    </label>

                    <ChonChienDich />

                </div>
                <div
                    className='col-6 name-domain d-flex align-items-center'
                    style={{ marginLeft: '16px' }}
                >
                    <label className='col-4 text-start fs-7 fw-bolder'>
                        Ngôn ngữ:{' '}
                    </label>
                    <ChonNgonNgu />
                </div>
            </div>

        </div>
    )
}