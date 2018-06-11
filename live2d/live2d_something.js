let clothesNum = Math.floor(Math.random() * 7);

const changeClothes = () => {
    let newClothesNum = Math.floor(Math.random() * 7);

    if (newClothesNum == clothesNum) {
        changeClothes();
    } else {
        clothesNum = newClothesNum;
        if (newClothesNum == 0) {
            loadlive2d("live2d", `./tia/model0.json`);
        } else if (newClothesNum == 1) {
            loadlive2d("live2d", `./tia/model1.json`);
        } else if (newClothesNum == 2) {
            loadlive2d("live2d", `./tia/model2.json`);
        } else if (newClothesNum == 3) {
            loadlive2d("live2d", `./pio/0.json`);
        } else if (newClothesNum == 4) {
            loadlive2d("live2d", `./z16/z16.model.json`);
        } else if (newClothesNum == 5) {
            loadlive2d("live2d", `./epsilon/Epsilon2.1.model.json`);
        } else if (newClothesNum == 6) {
            loadlive2d("live2d", `./remu/rem.json`);
        }
    }
}

