import bgm from '../public/audio/bgm.mp3'

let initialStgate = {
    music: bgm
};
const play = (state = initialStgate, action) => {
    switch (action.type) {
        case 'TOGGLEMUSIC':
            let { music } = state;
            let { musicNew } = action;

            music = musicNew;
            return { ...state, music };
        default:
            return state
    }
}

export default play