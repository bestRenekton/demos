import React from 'react';
import { Tooltip } from 'antd';
import style from '../container/AppContainer/AppContainer.scss';

const BlockChecbox = ({ onChange, list }) => (
  <div className={style.BlockColor} >
    {list.map(item => (
      <Tooltip title={item.title} key={item.key}>
        <div className={style.item} style={{background:item.key}} onClick={() => onChange(item.key)}>
        </div>
      </Tooltip>
    ))}
  </div>
);

export default BlockChecbox;
