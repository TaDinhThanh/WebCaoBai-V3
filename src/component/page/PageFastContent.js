import '../../css/style_fast_content.css'
import { ajaxCallGet } from '../libs/base'

import Tinymce from '../libs/Tinymce'



export default function PageFastContent() {
    const handleTest = () => {
        fetch(`https://cse.google.com/cse.js?cx=87e4a5e86971a4e70?key=AIzaSyDtdade-qHgL_a2GMRMJrHVtgtjYkCKOuE?q=onepiece`)
            .then(response=> {
                console.log(response);
                return response.json();
            })
            .then(rs => {
                console.log(rs);
            })
    }
    return (
        <section id="FastContent">
            <div className="fast-container">
                <div className="row">
                    <div className="fast-left col-5">
                        <div className="m-1">
                            <button type="button" className="btn btn-primary p-2">Delete link</button>
                            <div className="fast-left-container">
                                <div className="fast-delete">
                                    <div className="delete-select ">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fast-right  col-7">
                        <div>
                            <div className="fast-right-button">
                                <button className="btn btn-primary p-2 me-3" type="button" onClick={() => handleTest()}>Convert</button>
                                <button className="btn btn-primary p-2" type="button">Thêm bài viết</button>
                            </div>
                            <div className="right-container-fast">
                                <h3 className="fs-5 fw-bolder">Thêm bài viết</h3>
                                <hr />
                                <div className="right-select d-flex justify-content-between">
                                    <div className=" select-left ">
                                        <h5 className="fs-6 fw-bolder">Ảnh Bài Viết</h5>
                                        <button className="upload"><i className="fa fa-upload" /></button>
                                        <button className="delete fs-6 fw-bolder ">Delete</button>
                                    </div>
                                    <div className="select-right ">
                                        <button className="infomation active">Thông tin</button>
                                        <button className="seo">SEO</button>
                                    </div>
                                </div>
                                <div className="right-form">
                                    <form>
                                        <div className="row">
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor="title">Tiêu đề bài viết</label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <input type="text" id="title"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor="slug">Slug <i className="fa fa-question" /></label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <input type="text" id="slug"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor>Tác giả <i className="fa fa-question" /></label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <select name id>
                                                        <option value={1}>Tuấn Anh</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor>Mô tả</label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor>Thể loại <i className="fa fa-question" /></label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <select name id>
                                                        <option value={1}>Tài liệu thi công</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="fs-6 fw-bolder" htmlFor>Bài viết liên quan <i className="fa fa-question" /></label>
                                                <div className="item">
                                                    <i className="fa fa-briefcase" />
                                                    <select name id>
                                                        <option disabled selected>select</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h5 className="fs-6 fw-bolder mb-2">Nội dung bài viết</h5>
                                    <div className="fast-delete">
                                        <div className="delete-select ">

                                            <Tinymce />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></section>
    )
}