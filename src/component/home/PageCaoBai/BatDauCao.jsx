import React from 'react'

import $ from 'jquery'

import { useSelector, useDispatch } from 'react-redux';

import { changeCurrentIdKey, changeDataKey, changeDataUrl, changeTrangThaiCam } from '../../reducer_action/BaseReducerAction';

import { ajaxCallPost, URL_API_GET } from '../../libs/base';

import { ajaxCallGet, ajaxCallPut } from '../../Ajax'
import { Const_Libs } from '../../libs/Const_Libs'

const BatDauCao = (props) => {
    const dispatch = useDispatch();
    const { value_stop_ref, set_value_stop_ref, get_value_stop_ref } = props;

    const data_trang_thai_cam = useSelector(state => state.base.data_trang_thai_cam);

    const dataKey = useSelector(state => state.base.data_key)

    const data_current_id_cam = useSelector(state => state.base.current_id_cam)

    const handleUpdateCam = (id) => {
        ajaxCallPut(`update-cam/${id}`).then(async rs => {
            await dispatch(changeTrangThaiCam(true));
            Const_Libs.TOAST.success("Chiến dịch này đang được chạy")
        }).catch(err => console.log(err))
    }

    const handleResetCam = (id) => {
        ajaxCallPut(`reset-cam/${id}`).then(async rs => {
            await dispatch(changeTrangThaiCam(false));
            Const_Libs.TOAST.success("Chiến dịch này đã được dừng lại, vui lòng đợi chạy nốt URL này")
        }).catch(err => console.log(err))
    }

    /**
* Lấy ra danh sách Url theo key
*
* @param id_key
* @author XHieu
*/
    const handleGetUrlByKey = async id_key => {
        let result = [];
        let key = dataKey.filter(item => item.id == id_key)
        dispatch(changeCurrentIdKey(id_key))
        await fetch(URL_API_GET + `get-url-by-id-key/` + id_key)
            .then(response => response.json())
            .then(async rs => {
                await dispatch(changeDataUrl([...rs]));
                result = [...rs];
            })
            .catch(err => {
                console.log(err);
            })
        return result;
    }

    const handleGetKeyByIdCam = (id) => {
        ajaxCallGet(`get-key-by-id-cam/` + id).then(rs => {
            $('.box-note-default').addClass('d-flex');
            $('.box-note-default').removeClass('d-none');
            $('.box-note-all').addClass('d-none');
            $('.box-note-all').removeClass('d-flex');
            dispatch(changeDataKey([...rs]));
        }).catch(err => console.log(err))
    }

    const handleCaoBai = async () => {
        console.log(data_trang_thai_cam);
        if (!data_trang_thai_cam) {
            if (data_current_id_cam) {
                const node_get_post = document.createElement("div");
                const text_get_node_post = document.createTextNode("Đang cào bài");
                node_get_post.appendChild(text_get_node_post);
                document.getElementById("get-url-process").appendChild(node_get_post);
                handleUpdateCam(data_current_id_cam);
                set_value_stop_ref('pendding')
                for (let x = 0; x < dataKey.length; x++) {
                    console.log(`bat dau cao dataKey ${x}`)
                    if (dataKey[x].check) continue
                    await setTimeout(() => { }, 1000)
                    let data = await handleGetUrlByKey(dataKey[x].id)
                    $('.icon-status').removeClass('d-none')
                    $('.status-stop').addClass('d-none')
                    $('.label-key')
                        .eq(x)
                        .addClass('pendding')
                    $('.input-key')
                        .eq(x)
                        .prop('checked', true)
                    let sl_bai_da_cao = 0
                    for (let i = 0; i < data.length; i++) {
                        if (get_value_stop_ref.current === 'stop') {
                            $('.icon-status').addClass('d-none')
                            $('.status-stop').removeClass('d-none')
                            $('.label-key')
                                .eq(x)
                                .removeClass('pendding')
                            handleGetKeyByIdCam(data_current_id_cam)
                            return 0;
                        }
                        if (data[i].check) continue
                        let body = {
                            id: data[i].id,
                            url: data[i].url,
                            id_key: data[i].id_key,
                            check: data[i].check
                        }
                        $('.sspinner')
                            .eq(i)
                            .removeClass('d-none')

                        await ajaxCallPost('tool-clone', body)
                            .then(rs => {
                                if (rs.code == 200) {
                                    data[i].check = true
                                    data[i].post_name = rs.post_name
                                    sl_bai_da_cao += 1
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        $('.sspinner')
                            .eq(i)
                            .addClass('d-none')
                        handleGetUrlByKey(dataKey[x].id);
                    }

                    $('.input-key')
                        .eq(x)
                        .prop('checked', false)
                    $('.icon-status').addClass('d-none')
                    $('.status-stop').removeClass('d-none')
                    $('.label-key')
                        .eq(x)
                        .removeClass('pendding')
                    if (sl_bai_da_cao >= 0) {
                        await ajaxCallPut('update-key/' + dataKey[x].id).catch(err => {
                            console.log(err);
                        })
                        dataKey[x].check = true
                    }
                }
                dispatch(changeDataKey([...dataKey]))
                handleResetCam(data_current_id_cam)
                const node_post = document.createElement("div");
                const text_node_post = document.createTextNode("Đã cào xong");
                node_post.appendChild(text_node_post);
                document.getElementById("get-url-process").appendChild(node_post);
                Const_Libs.TOAST.success(
                    'Các key đã được cào hết. Không có key trống, vui lòng thêm key trước.'
                )
                //
            } else {
                Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi thực hiện thao tác này!')
            }
        } else {
            Const_Libs.TOAST.error('Vui lòng dừng chiến dịch trước khi thực hiện thao tác này!')
        }

    }

    return (
        <button
            type='button'
            onClick={() => {
                handleCaoBai()
            }}
            className='fw-bolder active btn btn-outline-primary me-2 start-cao-bai'
            style={{ fontSize: '14px' }}
        >
            Bắt đầu cào
        </button>
    )
}

export default BatDauCao