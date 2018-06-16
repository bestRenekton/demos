
//公用方法


// 模拟锚点
export const anchor = {
    created: function () {
    },
    methods: {
        anchor:function(e){
            let id='anchor-'+e;
            let anchor=document.getElementById(id);
            let go=anchor.offsetTop;
      
            // console.log(go)
            Math.animation(document.documentElement.scrollTop,go,800,'Quart.easeOut', function (value) {
                document.documentElement.scrollTop = value;
            });
          }
    }
}
//ip
// export const webUrl='http://39.108.70.164:8888/'
export const webUrl='https://www.yangyuetao.cn:8888/'

//visit统计
export const visitCount={
    beforeCreate:function(){
        this.$axios.post(webUrl+'api/visitCount',{'view':1})
          .then((response) => {
          })
          .catch((reject) => {
            console.log(reject)
          })
    }
}