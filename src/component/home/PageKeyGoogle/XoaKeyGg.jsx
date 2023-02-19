import React from 'react'

import { ajaxCallDelete } from '../../Ajax';

import { Const_Libs } from '../../libs/Const_Libs';

import { useSelector } from 'react-redux';

import $ from "jquery";

const XoaKeyGg = (props) => {
  
  const { handleGetAllKeyGg } = props;

  const current_id_cam = useSelector(state => state.base.current_id_cam)
  
  const handleDeleteGg = async () => {
    for (let checkbox of document.querySelectorAll('input[name="checkbox-key-google"]')) {
      if (checkbox.checked) {
        await ajaxCallDelete(`delete-key-google/${checkbox.getAttribute('data-id-key-google')}`).then(rs => {
          checkbox.checked = false
        }).catch(err => console.log(err))
      }
    }
    await handleGetAllKeyGg();
    Const_Libs.TOAST.success("Xóa thành công");
  }

  const handleDeleteAllGg = () => {
    ajaxCallDelete(`delete-all-key-google`).then(async response => {
      $('#check-all-key-gg').prop('checked', false);
      $('input[name="checkbox-key-google"]').prop('checked', false)
      $('.btn-delete-key-gg').removeClass('d-none')
      $('.btn-delete-all-key-gg').addClass('d-none')
      $('.start-test-gg').removeClass('d-none')
      $('.stop-test-gg').addClass('d-none')
      await handleGetAllKeyGg();
      Const_Libs.TOAST.success("Xóa tất cả thành công");
    })
    // .catch(err => console.log(err))
  }

  return (
    <>
      <button
        type='button'
        className='btn-delete-key-gg fw-bolder btn btn-outline-danger'
        style={{ fontSize: '14px' }}
        onClick={() => handleDeleteGg()}
      >
        Xóa
      </button>
      <button
        type='button'
        className='btn-delete-all-key-gg fw-bolder btn btn-outline-danger d-none'
        style={{ fontSize: '14px' }}
        onClick={() => handleDeleteAllGg()}
      >
        Xóa hết
      </button>
    </>
  )
}

export default XoaKeyGg