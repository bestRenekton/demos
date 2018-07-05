
export const handleAdd = () => ({
    type: 'ADD_TODO'
})

//切歌
export const toggleMusic=(newMusic)=>({
    type:'TOGGLEMUSIC',
    newMusic:newMusic
})
