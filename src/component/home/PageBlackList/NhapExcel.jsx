import React, {useState} from 'react'
import { ExcelRenderer } from 'react-excel-renderer';
import { useSelector } from 'react-redux';

import { ajaxCallPost } from '../../Ajax';
import { Const_Libs } from '../../libs/Const_Libs';



const NhapExcel = (props) => {
 
  const {handleGetBlackListByIdCam} = props
 
  const current_id_cam = useSelector(state => state.base.current_id_cam)

  const [isUploading, setUploading] = useState(false);

  const fileHandler = event => {
    let fileObj = event.target.files[0]
    setUploading(true);

    ExcelRenderer(fileObj, (err, resp) => {
      resp.rows.splice(0, 1);
      let newRows = resp.rows.filter(item => item.length !== 0);
      let data_list = [...newRows];
      if (err) {
        setUploading(false);
        console.log(err)
      } else {
        let arr = [];
        data_list.map(item => {
          arr.push({
            domain: item[0],
            loai: item[1]
          })
        })
        if (current_id_cam) {
          ajaxCallPost(`save-black-list-by-id-cam/${current_id_cam}`, arr).then(rs => {
            handleGetBlackListByIdCam();
            Const_Libs.TOAST.success('Thêm danh sách blackList thành công.')
          })
        } else {
          Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi import.')
        }
      }
    })
  }
  
  return (
    <label htmlFor='inputList' style={{ marginRight: '10px' }}>
      <span className='btn btn-primary fw-bolder'  style={{ fontSize: '14px' }}>
        Nhập Excel
      </span>
      <input
        id='inputList'
        key={isUploading}
        type='file'
        onChange={e => fileHandler(e)}
        style={{ display: 'none' }}
      />
    </label>
  )
}

export default NhapExcel