import axios from 'axios';
import { actionTypes } from '@/store/actionTypes';
import { mutationTypes } from '@/store/mutationTypes';
import { getAbsoluteHeight } from '@/roadhog/utils';

const state = {
    mainHeight: 0,
    contentHeight: 0,
    headerHeight: 0,
    webSettings: {
        clientVersion: process.env.CLIENT_VERSION,
    },
};

const mutations = {
    calcViewHeight (state) {
        const $app = document.getElementById('app');
        const $header = document.getElementsByClassName('header')[0];
        const $mainFrame = document.getElementsByClassName('main-frame')[0];

        state.mainHeight = getAbsoluteHeight($app);
        if ($header) {
            state.headerHeight = getAbsoluteHeight($header);
        }

        let mainFramePaddingHeight = 0;
        if ($mainFrame) {
            const styles = window.getComputedStyle($mainFrame);
            mainFramePaddingHeight = parseFloat(styles['paddingTop']) + parseFloat(styles['paddingBottom']) +
                parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        }

        state.contentHeight = state.mainHeight - state.headerHeight - mainFramePaddingHeight;
    },
    [mutationTypes.global.setWebSettings] (state, data) {
        document.title = data.title;
        state.webSettings = Object.assign(state.webSettings, data);
    },
};

const actions = {
    async [actionTypes.common.getWebSettings] ({ commit }) {
        const { data } = await axios.get('/web_settings');
        commit(mutationTypes.global.setWebSettings, data);
    },
    async [actionTypes.common.getAttachments] (store, { recorderId }) {
        const { data } = await axios.get(`/attachment/recorder_attachments/${recorderId}`);
        return data;
    },
    [actionTypes.common.downloadAttachment] (store, { attachmentId, token }) {
        window.open(`/api/attachment/download/${attachmentId}/${token}`, 'blank');
    },
    [actionTypes.common.previewImage] (store, { attachmentId, token }) {
        window.open(`/api/attachment/preview_image/${attachmentId}/${token}`, 'blank');
    },
};

export default {
    state,
    actions,
    mutations,
};
