import React, { useEffect } from 'react'

import useStateRef from 'react-usestateref'

import { useSelector } from 'react-redux'

import './../../css/style.css'

import ModalPostContent from '../modal/ModalPostContent'

import PageCaoBaiLeft from '../home/PageCaoBai/PageCaoBaiLeft'

import PageCaoBaiRight from '../home/PageCaoBai/PageCaoBaiRight'

import DetailGhiChu from '../home/PageCaoBai/DetailGhiChu'

import { CX_SEARCH, LINK_SEARCH } from '../libs/base'

import { resetAllKeyYt,resetAllKeyGg } from "../Ajax";

import {  UpdateCountKeyGoogle, UpdateCountKeyYoutube ,getFirstApiGoogle,getFirstApiYoutube } from "../Fetch";

import { textUrlByRapidApi } from "../Axios";

export default function PageCaoBaiNew() {
    const dataUrl = useSelector(state => state.base.data_url)
    const [value_stop_ref, set_value_stop_ref, get_value_stop_ref] = useStateRef(
        'start'
    )
    async function getUrlByGoogle(start, count, key_api, key_search) {
        let result;
        await fetch(`${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`).then(response => response.json())
            .then(async rs => {
                result = rs;
            }).catch(err => console.log(err))
        return result;
    }

    async function TestKeyGoogle() {
        await getFirstApiGoogle().then(async rs => {
            console.log(rs);
            if (rs.key_api_search !== null) {
                let rs2 = await getUrlByGoogle(1, 1, rs[0].key_api, 'xây dựng là gì?')
                let rs3 = await getUrlByGoogle(1, 1, rs[0].key_api, 'xây dựng dân dụng là gì?')
                if (rs2.url && rs3.url) {
                    await resetAllKeyGg().then(async rs => {
                        console.log(rs);
                    }) ;
                    await UpdateCountKeyGoogle(rs[0].id);
                }
            }
        }).catch(err => console.log(err))
    }

    async function TestKeyYoutube() {
        await getFirstApiYoutube().then(async rs => {
            if (rs.key_api_search !== null) {
                console.log(rs);
                await textUrlByRapidApi(rs[0].key_api,rs[0].id, 1, 'xây dựng là gì?').then(async rs2 => {
                    if (Boolean(rs2.data) === true) {
                        console.log("key not error");
                        await resetAllKeyYt().then(async rs => {
                            console.log(rs);
                        });
                        await UpdateCountKeyYoutube(rs[0].id);
                    }
                    else{
                        console.log("key error");
                    }
                })
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        async function recursion(value) {
            let a = null;
                if(value == 1) {
                  a = 1;
                } else {
                  let rec_value = await recursion(value-1)
                  a = value + rec_value;
                }
                return a;
          }
          recursion(3).then(rs => {
            console.log(rs);
          })
        TestKeyGoogle();
        TestKeyYoutube();
    }, [])



    return (
        <React.Fragment>
            <ModalPostContent />
            <section id='content'>
                <div className='top-content'>
                    <div className='row justify-content-end'>
                    </div>
                </div>
                <div className='bottom-content'>
                    <div className='row '>
                        <PageCaoBaiLeft value_stop_ref={value_stop_ref} set_value_stop_ref={set_value_stop_ref} get_value_stop_ref={get_value_stop_ref} />
                        <PageCaoBaiRight value_stop_ref={value_stop_ref} set_value_stop_ref={set_value_stop_ref} get_value_stop_ref={get_value_stop_ref} />
                    </div>
                    <DetailGhiChu />
                </div>
            </section>
        </React.Fragment>
    )
}

