import { Checkbox, Input, Button, Switch, Select } from 'antd';
import styles from '../../../components/FormControl/Attribute.less'
function Attribute(text, canChange) {
  return function HOCFactory(WrappedComponent) {
    return class HOC extends React.Component {
      render() {
        return (<div className={styles.attrItem}>
          <div className={styles.attrTitle}>
            <span className={styles.attrTitleName}>{text}</span>
            {canChange ? <Button type="primary">{this.props.TypeName}</Button> : ""}
          </div>
          <div >
            <WrappedComponent  {...this.props} />
          </div>
        </div>)
      }
    }
  }
}
export default Attribute;