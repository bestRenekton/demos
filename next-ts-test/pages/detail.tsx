import React from 'react'
import { GetDetail } from '../redux/server/home'


const Detail = (props) => {
  console.log('detail', props)

  return (
    <div style={{ textAlign: 'center' }}>
      {
        Object.keys(props.detailData).map((e, i) => <p key={i}>{e}:{props.detailData[e]}</p>)
      }
    </div>
  )
}

Detail.getInitialProps = async function () {
  const json = await GetDetail({ id: 1 })

  return {
    detailData: json
  }
}

export default Detail