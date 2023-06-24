import { Empty } from 'antd'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <Empty
      image="/notfound.svg"
      imageStyle={{ height: 400 }}
      description={
        <Link to="/">Back to Home</Link>
      }
    >
    </Empty>
  )
}
