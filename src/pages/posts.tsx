import { Button, Space, Table, message } from 'antd'
import { Posts } from '../types/posts'
import { useMutation, useQuery } from "@tanstack/react-query"
import { baseURL } from '../api/posts'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Posts() {
  const { data, isLoading } = useQuery<Posts[]>(["posts"], () => axios.get(baseURL).then(res => res.data))

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${baseURL}/${id}`)
    },
  })

  const columns = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      visible: false
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      visible: true
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      visible: true
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      visible: true
    },
    {
      title: 'Action',
      key: 'action',
      visible: true,
      render: ({ id }: { id: string }) => (
        <Space size="middle">
          <Link to={`/posts/edit/${id}`}>
            <EditOutlined />
          </Link>
          <DeleteOutlined onClick={() => (mutation.mutate(id), message.success('Deleted Successfully'))} />
        </Space>
      ),
    }
  ].filter((item) => item.visible === true);

  return (
    <>
      <Space direction='vertical' >
        <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <Button type='primary' >
            <Link to="/posts/add" >Add Client</Link>
          </Button>
        </div>
        <Table dataSource={data} columns={columns} loading={isLoading || mutation.isLoading}
          pagination={{ position: ['bottomCenter'] }} bordered={true} rowKey={record => record.id} />
      </Space >
    </>
  )
}
