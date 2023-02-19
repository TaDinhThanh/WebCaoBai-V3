import React from 'react'

import $ from 'jquery'

import { ajaxCallDelete  } from '../../Ajax';

import { Const_Libs } from '../../libs/Const_Libs';

const XoaChienDich = (props) => {

  const {handleGetCampaign} = props;

  const deleteCamByCheckBox = async () => {
    for (const checkbox of document.querySelectorAll(
      'input[name="checkbox-cam"]'
    )) {
      if (checkbox.checked) {
        await ajaxCallDelete(
          'delete-campaign/' + checkbox.getAttribute('data-id-cam')).then(rs => {
            console.log(rs);
            checkbox.checked = false
          }).catch(err => console.log(err))
      }
    }
    $('#checkAllCam').prop('checked', false)
    handleGetCampaign();
    Const_Libs.TOAST.success('Đã xóa thành công.')
  }

  return (
    <>
      <button
        type='button'
        className='fw-bolder btn btn-outline-danger'
        style={{ fontSize: '14px' }}
        onClick={() => deleteCamByCheckBox()}
      >
        Xóa
      </button>
    </>
  )
}

export default XoaChienDich