import React, { useEffect, useState } from 'react'

import PageChienDichNew from '../page/PageChienDichNew'

import PageBlackListNew from '../page/PageBlackListNew'

import PageCaoBaiNew from '../page/PageCaoBaiNew'

import PageQLKeyNew from '../page/PageQLKeyNew'

import PageQlKeyGoogle from '../page/PageQlKeyGoogle'

import PageQlKeyYoutube from '../page/PageQlKeyYoutube'

import PageFastContent from '../page/PageFastContent'

import PageNgonNgu from '../page/PageNgonNgu'

import PageSpinWordNew from '../page/PageSpinWord'

export default function Body() {

    return (
        <div className='tab-content' id='pills-tabContent'>
            <div
                className='tab-pane fade show active'
                id='pills-home'
                role='tabpanel'
                aria-labelledby='pills-home-tab'
            >
                <PageCaoBaiNew />
            </div>
            <div
                className='tab-pane fade'
                id='pills-campaign'
                role='tabpanel'
                aria-labelledby='pills-campaign-tab'
            >
                <PageChienDichNew />
            </div>
            <div
                className='tab-pane fade'
                id='pills-profile'
                role='tabpanel'
                aria-labelledby='pills-profile-tab'
            >
                <PageQLKeyNew />
            </div>
            <div
                className='tab-pane fade'
                id='pills-keygg'
                role='tabpanel'
                aria-labelledby='pills-keygg-tab'
            >
                <PageQlKeyGoogle />
            </div>
            <div
                className='tab-pane fade'
                id='pills-keyyt'
                role='tabpanel'
                aria-labelledby='pills-keyyt-tab'
            >
                <PageQlKeyYoutube />
            </div>
            <div
                className='tab-pane fade'
                id='pills-contact'
                role='tabpanel'
                aria-labelledby='pills-contact-tab'
            >
                <PageBlackListNew />
            </div>
            {/* <div
                className='tab-pane fade'
                id='pills-spin'
                role='tabpanel'
                aria-labelledby='pills-spin-tab'
            >
                <PageSpinWordNew />
            </div>
            <div
                className='tab-pane fade'
                id='pills-fast'
                role='tabpanel'
                aria-labelledby='pills-fast-tab'
            >
                <PageFastContent />
            </div>
            <div
                className='tab-pane fade'
                id='pills-language'
                role='tabpanel'
                aria-labelledby='pills-language-tab'
            >
                <PageNgonNgu />
            </div> */}
        </div>
    )
}