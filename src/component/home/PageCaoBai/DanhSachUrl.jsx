import React, { useEffect } from 'react'
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux';

import { URL_API_WEB } from '../../libs/base'
import DetailPost from './DetailPost';

const DanhSachUrl = () => {
    const dispatch = useDispatch();

    const data_url = useSelector(state => state.base.data_url)

    useEffect(() => {
        $('#checkAll').click(function () {
            if ($(this).prop('checked')) {
                $('input[name="checkbox-url"]').prop('checked', true)
            } else {
                $('input[name="checkbox-url"]').prop('checked', false)
            }
        })
    }, [])

    return (
        <div className='p-3 table-responsive'>
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
                            <input type='checkbox' id='checkAll' />
                        </th>
                        <th />
                        <th />
                        <th>URL</th>
                        <th>URL hoàn thiện</th>
                        <th style={{ textAlign: 'center' }}>KH</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {data_url.length <= 0 ? (
                        <tr><td>Không có url</td></tr>
                    ) : (
                        data_url.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ maxHeight: '21px', width: '5%' }}>
                                        <input
                                            type='checkbox'
                                            name='checkbox-url'
                                            data-id-url={item.id}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            maxHeight: '21px',
                                            width: '5%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        style={{
                                            maxHeight: '21px',
                                            width: '5%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <a href={item.url_image} target='_blank'> <img src={item.url_image} alt='asdklf' style={{ width: '100px' }} /></a>
                                    </td>
                                    <td
                                        className={
                                            item.check == false
                                                ? 'text-dark'
                                                : 'text-primary'
                                        }
                                        style={{
                                            maxHeight: '21px',
                                            width: '40%',
                                            maxWidth: '300px'
                                        }}
                                    >
                                        <a href={item.url} target='_blank'>
                                            {item.url}
                                        </a>
                                    </td>
                                    <td style={{ maxHeight: '21px', width: '40%' }}>
                                        {item.post_name == null ? (
                                            'Không có nội dung'
                                        ) : (
                                            <a
                                                target={'_blank'}
                                                href={URL_API_WEB + item.post_name}
                                            >
                                                {URL_API_WEB + item.post_name}
                                            </a>
                                        )}{' '}
                                        <div
                                            className='spinner-border text-primary sspinner d-none'
                                            style={{ width: '30px', height: '30px' }}
                                            role='status'
                                        >
                                            <span className='visually-hidden'>
                                                Loading...
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            maxHeight: '21px',
                                            width: '5%',
                                            textAlign: 'center',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {item.ky_hieu
                                            ? item.ky_hieu
                                            : ''}
                                    </td>
                                    <td
                                        style={{
                                            maxHeight: '21px',
                                            width: '5%',
                                            textAlign: 'center',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {item.post_content
                                            ? item.post_content.length
                                            : ''}
                                    </td>
                                    <td
                                        style={{
                                            maxHeight: '21px',
                                            width: '5%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.check == true ? (
                                            <DetailPost id={item.ID} />
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DanhSachUrl