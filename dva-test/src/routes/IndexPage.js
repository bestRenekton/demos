import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { NavBar, Icon, SearchBar, Tabs, WhiteSpace, Badge, List, ListView } from 'antd-mobile';

const tabs = [
  { title: <Badge text={'3'}>First Tab</Badge> },
  { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
];
const Item = List.Item;
const Brief = Item.Brief;
const DS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const dataSource = DS.cloneWithRows([1111, 222, 3333, 4444, 55555, 6, 7, 8, 9, 90, 100, 234])


function IndexPage() {
  return (
    <div className={styles.flexContainer}>
      <div>
        <NavBar icon={<Icon type="left" />} mode="dark">微信浏览器禁止页面下拉查看网址</NavBar>
      </div>
      <div className={styles.flex}>
        <div className={styles.page}>
          <SearchBar className={styles.search} placeholder="搜索" />
          <div id="LIST" style={{ height: '100%', overflow: 'auto' }}>
            <Tabs tabs={tabs} style={{ height: '100%' }}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
              <div style={{ background: '#ddd', height: '100%', overflow: 'auto' }}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData) =>
                    <div key={rowData} className={styles.card} >
                      {rowData}
                    </div>
                  }
                  onScroll={(e) => {
                    // console.log(e.target.clientHeight)
                    // console.log(e.target.scrollTop)
                    // console.log(e.target.scrollHeight)
                    if (e.target.scrollTop == 0) {
                      window.isScroll = false;
                    } else {
                      window.isScroll = true;
                    }
                  }}
                  pageSize={5}
                  style={{
                    height: '100%',
                    overflow: 'auto',
                  }}
                />
              </div>
              <div style={{ background: '#ddd', height: '100%', overflow: 'auto' }}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData) =>
                    <div key={rowData} className={styles.card} >
                      {rowData}
                    </div>
                  }
                  onScroll={(e) => {
                    // console.log(e.target.clientHeight)
                    // console.log(e.target.scrollTop)
                    // console.log(e.target.scrollHeight)
                    if (e.target.scrollTop == 0) {
                      window.isScroll = false;
                    } else {
                      window.isScroll = true;
                    }
                  }}
                  pageSize={5}
                  style={{
                    height: '100%',
                    overflow: 'auto',
                  }}
                />
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
