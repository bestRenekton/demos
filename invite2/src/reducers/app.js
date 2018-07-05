// import bgm from '../public/audio/bgm.mp3'

let initialStgate = {
    inviteDate: Math.round(new Date('2019-10-01 12:00:00').getTime()/1000), //1569902400
    music: 'bgm',

};
const app = (state = initialStgate, action) => {
    switch (action.type) {
        case 'TOGGLEMUSIC':
            let { music } = state;
            let { newMusic } = action;

            music = newMusic;
            return { ...state, music };
        default:
            return state
    }
}

export default app