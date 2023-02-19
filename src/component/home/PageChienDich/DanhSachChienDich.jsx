import React, { useEffect } from 'react'
import $ from 'jquery'
import { useDispatch, useSelector } from "react-redux";

const DanhSachChienDich = () => {
  const dataCam = useSelector(state => state.base.data_cam);

  const data_trang_thai_cam = useSelector(state => state.base.data_trang_thai_cam)

  useEffect(() => {

    $('#checkAllCam').click(function () {
      if ($(this).prop('checked')) {
        $('input[name="checkbox-cam"]').prop('checked', true)
      } else {
        $('input[name="checkbox-cam"]').prop('checked', false)
      }
    })
  }, [data_trang_thai_cam])

  return (
    <table className='table '>
      <colgroup>
        <col style={{ width: '5%!important' }}></col>
        <col style={{ width: '5%!important' }}></col>
        <col style={{ width: '40%!important' }}></col>
        <col style={{ width: '40%!important' }}></col>
        <col style={{ width: '10%!important' }}></col>
        <col style={{ width: '10%!important' }}></col>
      </colgroup>
      <thead>
        <tr>
          <th>
            <input type='checkbox' id='checkAllCam' />
          </th>
          <th />
          <th>Tên chiến dịch</th>
          <th>Trạng thái</th>
          <th>Ngôn ngữ</th>
          {/* <th>Tổng số Key</th> */}
        </tr>
      </thead>
      <tbody>
        {dataCam.length === 0 ? <tr><td>Không có chiến dịch nào</td></tr> :
          (dataCam.map((item, index) => {
            let col_key_count = `col-count-${item.id}`
            return (
              item.id !== -1 ? <tr key={index}>
                <td style={{ maxHeight: '21px', width: '5%' }}>
                  <input
                    type='checkbox'
                    name='checkbox-cam'
                    data-id-cam={item.id}
                  />
                </td>
                <td
                  style={{
                    maxHeight: '21px',
                    width: '5%',
                    textAlign: 'center'
                  }}
                  className='fw-bolder'
                >
                  {index + 1}
                </td>
                <td
                  className='text-primary'
                  style={{
                    maxHeight: '21px',
                    width: '30%',
                    maxWidth: '300px'
                  }}
                >
                  {item.value}
                </td>
                <td style={{ maxHeight: '21px', width: '20%' }}>
                  {item.check ? <span style={{ color: '#2eb62e' }}>Đang cào</span> : <span style={{ color: 'red' }}>Đã dừng</span>}
                </td>
                <td
                  style={{
                    maxHeight: '21px',
                    width: '10%',
                    textAlign: 'center',
                    fontSize: '14px'
                  }}
                >
                  {
                    item.language
                  }
                </td>
              </tr> : ''
            )
          }))
        }

      </tbody>
    </table>
  )
}

export default DanhSachChienDich