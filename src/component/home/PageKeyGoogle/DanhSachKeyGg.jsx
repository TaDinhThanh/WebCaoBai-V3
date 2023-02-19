import React from 'react'

import $ from "jquery";

import { useEffect } from 'react';

import { useSelector } from 'react-redux';

const DanhSachKeyGg = () => {
  
  const dataKeyGoogle = useSelector(state => state.base.data_key_google)

  useEffect(() => {
    $('#check-all-key-gg').click(function () {
      if ($(this).prop('checked')) {
        $('.btn-delete-all-key-gg').removeClass('d-none')
        $('.btn-delete-key-gg').addClass('d-none')

        $('input[name="checkbox-key-google"]').prop('checked', true);
      } else {
        $('.btn-delete-all-key-gg').addClass('d-none')
        $('.btn-delete-key-gg').removeClass('d-none')

        $('input[name="checkbox-key-google"]').prop('checked', false);
      }
    })

  })

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
            <input type='checkbox' id='check-all-key-gg' />
          </th>
          <th style={{ textAlign: 'center', backgroundColor: 'beige' }}>STT</th>
          <th style={{ backgroundColor: 'beige' }}>Key google</th>
          <th style={{ textAlign: 'center', backgroundColor: 'beige' }}>Count</th>
          {/* <th>Tổng số Key</th> */}
        </tr>
      </thead>
      <tbody>
        {dataKeyGoogle.length === 0 ? <tr><td>Không có chiến dịch nào</td></tr> :
          (dataKeyGoogle.map((item, index) => {
            let class_item = `google-item google-item-${item.id}`;
            return (
              <tr key={index} className={class_item}>
                <td style={{ maxHeight: '21px', width: '5%' }}>
                  <input
                    type='checkbox'
                    name='checkbox-key-google'
                    data-id-key-google={item.id}
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
                  className=''
                  style={{
                    maxHeight: '21px',
                    width: '30%',
                    maxWidth: '300px'
                  }}
                >
                  {item.key_api}
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
                    item.count
                  }
                </td>
              </tr>
            )
          }))
        }

      </tbody>
    </table>
  )
}

export default DanhSachKeyGg