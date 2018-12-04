import React from 'react';
import SortItem from './item'



export default class SortTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { name: 'aa', value: 1 },
                { name: 'bbb', value: 2 },
                { name: 'c', value: 3 },
            ]
        }
    }
    onSort = (start, end) => {//调换
        // debugger
        let { list } = this.state;
        let item_s = JSON.parse(JSON.stringify(list.filter(e => e.value == start)[0]));
        let item_e = JSON.parse(JSON.stringify(list.filter(e => e.value == end)[0]));

        list.forEach((e, i) => {
            if (e.value == start) {
                list.splice(i, 1, item_e)
            }
            if (e.value == end) {
                list.splice(i, 1, item_s)
            }
        })
        this.setState({
            list
        });
    }
    render() {
        let { list } = this.state;
        return (
            <div>
                <h1>拖动排序</h1>
                {
                    list.map(e => {
                        return (
                            <SortItem onSort={this.onSort} data={e} index={e.value} key={e.value} />
                        )
                    })
                }
            </div>
        )
    }
}