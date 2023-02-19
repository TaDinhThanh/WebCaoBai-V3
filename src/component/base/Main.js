import React, { useEffect, useState } from 'react'
import '../../css/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { ajaxCallGet } from '../Ajax'
import { changeDataCam, changeDataKeyGoogle, changeDataKeyYoutube, changeKeyGoogle, changeTrangThaiCam } from '../reducer_action/BaseReducerAction'
import Header from './Header';
import Body from './Body';
import Footer from './Footer'

export default function Main() {

  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment >
  )
}