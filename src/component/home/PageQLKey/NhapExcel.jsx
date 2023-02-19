import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExcelRenderer } from 'react-excel-renderer'

import { ajaxCallGet, ajaxCallPost } from '../../Ajax'
import { Const_Libs } from '../../libs/Const_Libs'
import { changeDataKey } from '../../reducer_action/BaseReducerAction'

const NhapExcel = () => {
  const dispatch = useDispatch()

  const [isUploading, setUploading] = useState(false);
  const data_current_id_cam = useSelector(state => state.base.current_id_cam)

  const cutKeyAndUrl = myString => {
    let index = myString.indexOf('-')
    return {
      phan_tu_1: myString.slice(0, index),
      phan_tu_2: myString.slice(index + 1).trim()
    }
  }

  const handleGetKeyByIdCam = (id) => {
    ajaxCallGet('get-key-by-id-cam/' + id).then(rs => {
      console.log(rs);
      dispatch(changeDataKey([...rs]))
    }).catch(err => console.log(err))
  }

  const handleGetAllKey = () => {
    ajaxCallGet('get-key').then(rs => {
      dispatch(changeDataKey([...rs]))
    }).catch(err => console.log(err))
  }

  //https://www.youtube.com/watch?v=41GviT3Pepk&list=PLBcGPKNwWSiJpYdz3JQZ4vOMz00jSt5il
  const cutIdListYoutubeFromLink = (Link) => {
    console.log(Link)
    let id_list;
    if (Link.length > 0) {
      let index = Link.indexOf('list=');
      if (index >= 0) {
        id_list = Link.substring(index + 5);
      } else {
        id_list = ''
      }
    }
    return id_list;
  }

  const fileHandler = event => {
    let fileObj = event.target.files[0]
    setUploading(true);

    ExcelRenderer(fileObj, async (err, resp) => {
      resp.rows.splice(0, 3)
      let data_key = [...resp.rows.filter(item => item.length !== 0)]
      console.log(data_key)
      if (err) {
        setUploading(false);
        console.log(err)
      } else {
        let arr = []
        await data_key.map(item => {
          arr.push({
            tien_to: item[2] ? item[2] : '',
            ten: item[3] ? item[3] : '',
            hau_to: item[4] ? item[4] : '',
            key_1: item[7] ? cutKeyAndUrl(item[7]).phan_tu_1 : '',
            url_key_1: item[7] ? cutKeyAndUrl(item[7]).phan_tu_2 : '',
            key_2: item[8] ? cutKeyAndUrl(item[8]).phan_tu_1 : '',
            url_key_2: item[8] ? cutKeyAndUrl(item[8]).phan_tu_2 : '',
            key_3: item[9] ? cutKeyAndUrl(item[9]).phan_tu_1 : '',
            url_key_3: item[9] ? cutKeyAndUrl(item[9]).phan_tu_2 : '',
            key_4: item[10] ? cutKeyAndUrl(item[10]).phan_tu_1 : '',
            url_key_4: item[10] ? cutKeyAndUrl(item[10]).phan_tu_2 : '',
            top_view_1: item[11] ? cutKeyAndUrl(item[11]).phan_tu_1 : '',
            url_top_view_1: item[11] ? cutKeyAndUrl(item[11]).phan_tu_2 : '',
            top_view_2: item[12] ? cutKeyAndUrl(item[12]).phan_tu_1 : '',
            url_top_view_2: item[12] ? cutKeyAndUrl(item[12]).phan_tu_2 : '',
            top_view_3: item[13] ? cutKeyAndUrl(item[13]).phan_tu_1 : '',
            url_top_view_3: item[13] ? cutKeyAndUrl(item[13]).phan_tu_2 : '',
            top_view_4: item[14] ? cutKeyAndUrl(item[14]).phan_tu_1 : '',
            url_top_view_4: item[14] ? cutKeyAndUrl(item[14]).phan_tu_2 : '',
            top_view_5: item[15] ? cutKeyAndUrl(item[15]).phan_tu_1 : '',
            url_top_view_5: item[15] ? cutKeyAndUrl(item[15]).phan_tu_2 : '',
            ky_hieu: item[5] ? item[5] : '',
            id_list_vd: item[6] ? cutIdListYoutubeFromLink(item[6]) : '',
          })
        })
        console.log(arr)
        if (data_current_id_cam) {
          await ajaxCallPost(`save-key-by-id-cam/${data_current_id_cam}`, arr).then(rs => {
            Const_Libs.TOAST.success('Thêm key theo chiến dịch thành công')
            handleGetKeyByIdCam(data_current_id_cam)
          })
        } else {
          await ajaxCallPost(`save-key`, arr).then(rs => {
            Const_Libs.TOAST.success('Thêm key thành công')
            handleGetAllKey()
          })
        }
      }
    })
  }
  return (
    <label htmlFor='inputTag' style={{ marginRight: '10px' }}>
      <span className='btn btn-primary fw-bolder' style={{ fontSize: '14px' }}>Nhập Excel</span>
      <input
        id='inputTag'
        key={isUploading}
        type='file'
        onChange={e => fileHandler(e)}
        style={{ display: 'none' }}
      />
    </label>
  )
}

export default NhapExcel