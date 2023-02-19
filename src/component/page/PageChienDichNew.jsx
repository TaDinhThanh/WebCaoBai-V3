import { useDispatch, useSelector } from "react-redux";

import DanhSachChienDich from '../home/PageChienDich/DanhSachChienDich';
import XoaChienDich from '../home/PageChienDich/XoaChienDich';
import ModalAddChienDich from "../modal/ModalAddCampaign";
import { changeDataCam } from "../reducer_action/BaseReducerAction";
import { ajaxCallGet } from "../Ajax";


const PageChienDichNew = () => {
    const dispatch = useDispatch();

    const handleGetCampaign = () => {
        const select_all_key = { id: -1, label: 'Tất cả key', language: 'Vietnamese', check: 0 }
        ajaxCallGet(`get-cam`).then(async rs => {
            let arr = rs.data;
            let get_cam = (arr.length === 0) ? [] : [...arr, select_all_key]
            dispatch(changeDataCam(get_cam))
        }).catch(err => console.log(err))
    }

    return (
        <div style={{ height: '77vh', width: '900px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}>
            <div className='right-container position-relative'>
                <div
                    className='row px-4 d-flex align-items-center justify-content-between position-sticky'
                    style={{ top: '0', padding: '10px', background: '#fff' }}
                >
                    <div className='col-9'>
                        <span className='fs-7 fw-bolder'>Danh sách chiến dịch: </span>
                        <a href='#' className='mr-2'>

                        </a>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-end'>
                        <div className='col-4 delete'>
                            <ModalAddChienDich handleGetCampaign={handleGetCampaign} />
                        </div>
                        <div className='col-4 delete'>
                            <XoaChienDich handleGetCampaign={handleGetCampaign} />
                        </div>
                    </div>
                </div>
                <div className='p-3 table-responsive'>
                    <DanhSachChienDich />
                </div>
            </div>
        </div>
    )
}

export default PageChienDichNew;
