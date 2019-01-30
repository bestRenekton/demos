import * as React from "react";
import { Input, Card } from "antd"

interface IExampleProps {
  name?: string,
  content: string,
  count: number,
  add: () => void,
}
const Example: React.SFC<IExampleProps> = (props) => {
  return (
    <Card
      title={props.name}
      extra={<a href="javascript:;" onClick={props.add}>点击计数</a>}
      style={{ width: 300, margin: '20px auto' }}
    >
      <p>{props.count}</p>
      <p>{props.content}</p>
    </Card>
  )
}

export default Example