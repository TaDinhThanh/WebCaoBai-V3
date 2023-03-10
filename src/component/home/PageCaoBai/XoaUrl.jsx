import React from 'react'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import { ajaxCallGet } from '../../libs/base'
import { Const_Libs } from '../../libs/Const_Libs'
import { changeCurrentIdKey, changeDataKey, changeDataUrl } from '../../reducer_action/BaseReducerAction'

const XoaUrl = () => {
    const dispatch = useDispatch()

    const current_id_key = useSelector(state => state.base.current_id_key)
    const data_current_id_cam = useSelector(state => state.base.current_id_cam)
    const dataKey = useSelector(state => state.base.data_key)


    const handleGetKeyByIdCam = (id) => {
        ajaxCallGet(`get-key-by-id-cam/` + id).then(rs => {
            $('.box-note-default').addClass('d-flex');
            $('.box-note-default').removeClass('d-none');
            $('.box-note-all').addClass('d-none');
            $('.box-note-all').removeClass('d-flex');
            dispatch(changeDataKey([...rs]));
        }).catch(err => console.log(err))
    }

    const handleGetKey = () => {
        ajaxCallGet('get-key').then(rs => {
            dispatch(changeDataKey([...rs]))
        }).catch(err => console.log(err))
    }


    const handleResetKey = idKey => {
        if (data_current_id_cam) {
            ajaxCallGet('reset-key/' + idKey).then(rs => {
                handleGetKeyByIdCam(data_current_id_cam)
            }).catch(err => console.log(err))
        } else {
            ajaxCallGet('reset-key/' + idKey).then(rs => {
                handleGetKey()
            }).catch(err => console.log(err))
        }

    }

    const handleGetUrlByKey = async id_key => {
        let key = dataKey.filter(item => item.id === id_key)
        // set_current_key_ref(key[0])
        dispatch(changeCurrentIdKey(id_key))
        return await ajaxCallGet('get-url-by-id-key/' + id_key).then(rs => {
            for (let i = 0; i < rs.length; i++) {
                rs[i].state = 'create'
            }
            dispatch(changeDataUrl([...rs]))
            return rs
        }).catch(err => console.log(err))
    }

    /**
 * X??a url theo checkbox
 *
 * @param No
 * @author XHieu
 */
    const deleteUrl = async () => {
        if (data_current_id_cam) {
            if (current_id_key == null) {
                Const_Libs.TOAST.error('B???n ph???i ch???n key tr?????c khi x??a.')
                return 0
            }
            if (document.querySelectorAll('input:checked[name="checkbox-url"]').length === 0) {
                Const_Libs.TOAST.error('B???n ph???i ch???n url c???n x??a tr?????c khi x??a.')

                return 0
            }
            for (const checkbox of document.querySelectorAll('input[name="checkbox-url"]')) {
                if (checkbox.checked) {
                    await ajaxCallGet(
                        'delete-url/' + checkbox.getAttribute('data-id-url')
                    ).then(rs => {
                        checkbox.checked = false
                        handleResetKey(current_id_key)
                    }).catch(err => console.log(err))
                }
            }
            Const_Libs.TOAST.success('???? x??a th??nh c??ng.')
            handleGetUrlByKey(current_id_key)
            $('#checkAll').prop('checked', false)
        } else {
            Const_Libs.TOAST.error('Vui l??ng ch???n chi???n d???ch tr?????c khi th???c hi???n thao t??c n??y!!!')
        }
    }

    return (
        <div className='col-2 delete'>
            <button
                type='button'
                onClick={() => {
                    deleteUrl()
                }}
                className=' fw-bolder btn btn-outline-danger btn-delete-url'
                style={{ fontSize: '14px' }}
            >
                X??a URL
            </button>
        </div>
    )
}

export default XoaUrl