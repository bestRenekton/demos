import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { NavBar, Icon, SearchBar, Tabs, WhiteSpace, Badge,List  } from 'antd-mobile';

const tabs = [
  { title: <Badge text={'3'}>First Tab</Badge> },
  { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
];
const Item = List.Item;
const Brief = Item.Brief;
function IndexPage() {
  return (
    <div className={styles.flexContainer}>
      <div>
        <NavBar icon={<Icon type="left" />} mode="dark">撒地方</NavBar>
      </div>
      <div className={styles.flex}>
        <div className={styles.page}>
          <SearchBar className={styles.search} placeholder="搜索" />
          <div style={{height:'100%',overflow: 'auto'}}>
          <Tabs tabs={tabs} style={{ height: '100%' }}
            initialPage={1}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
            <div style={{ background: '#ddd', height: '100%',overflow: 'auto'}}>
              <Item data-seed="logId">Sll be hidden with ellipsis；</Item>
              <Item data-seed="logId">Sll be hidden with ellipsis；</Item>
              <Item data-seed="logId">ll be hidden with ellipsis；</Item>
              <Item data-seed="logId">Sll be hidden with ellipsis；</Item>
              <Item data-seed="logId">Sll be hidden with ellipsis；</Item>
              <Item data-seed="logId">S with ellipsis；</Item>
              <Item data-seed="logId">Sn with ellipsis；</Item>
              <Item data-seed="logId"> will be hidden with ellipsis；</Item>
              <Item data-seed="logId">Sipsis；</Item>
              <Item data-seed="logId"> will be hidden with ellipsis；</Item>
              <Item data-seed="logId">Swill be hidden with 1</Item>
              <Item data-seed="logId">Swill be hidden with 2</Item>
              <Item data-seed="logId">S，long text will be hidden with 3</Item>
              <Item data-seed="logId">Swill be hidden with 4</Item>
              <Item data-seed="logId">Single line，long text will be hidden with 66</Item>
              <Item data-seed="logId">S，long text will be hidden with 5</Item>
            </div>
            <div>
            <Item data-seed="logId">Single lwith ellipsis；</Item>
              <Item data-seed="logId">Singlen with ellipsis；</Item>
              <Item data-seed="logId">Singlen with ellipsis；</Item>
              <Item data-seed="logId">Singlen with 1</Item>
              <Item data-seed="logId">Singlen with 2</Item>
              <Item data-seed="logId">Singlewith 3</Item>
              <Item data-seed="logId">Single  with 1</Item>
              <Item data-seed="logId">Single  with 2</Item>
              <Item data-seed="logId">Single  with 3</Item>
              <Item data-seed="logId">Single lwith 4</Item>
              <Item data-seed="logId">Single lwith 66</Item>
              <Item data-seed="logId">Singll be hidden with 5</Item>
              <Item data-seed="logId">Single be hidden with ellipsis；</Item>
              <Item data-seed="logId">Single be hidden with ellipsis；</Item>
              <Item data-seed="logId">Single be hidden with ellipsis；</Item>
              <Item data-seed="logId">Singll be hidden with ellipsis；</Item>
              <Item data-seed="logId">Singl be hidden with ellipsis；</Item>
              <Item data-seed="logId">Single be hidden with ellipsis；</Item>
            </div>
          </Tabs>
          </div>

        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
