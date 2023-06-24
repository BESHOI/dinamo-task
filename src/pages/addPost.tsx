import { Button, Form, Input, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { baseURL } from '../api/posts';
import { Posts } from '../types/posts';
import axios from 'axios';

export default function AddPost() {
  const FormItem = Form.Item;
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = id
  const { data, isInitialLoading } = useQuery<Posts>([isEdit], () => axios.get(`${baseURL}/${id}`).then(res => res.data), { enabled: !!isEdit })
  const { title, body } = data || {}

  const mutation = useMutation({
    mutationFn: (formData: Posts) => {
      return isEdit ? axios.put(`${baseURL}/${id}`, formData) : axios.post(baseURL, formData)
    },
  })

  const onFinish = (values: any) => {
    mutation.mutate(values)
  };

  message.destroy()
  mutation.isSuccess && message.success(isEdit ? 'Updated Successfully' : 'Added Successfully')
  mutation.isSuccess && navigate('/posts')

  if (mutation.isLoading || isInitialLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        title: title,
        body: body
      }}
      validateTrigger={["onBlur", "onFocus", "onInput"]}
    >
      <FormItem
        label="Title"
        name="title"
        rules={[{ required: true, min: 3, max: 60, message: 'Please enter title' }]}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Body"
        name="body"
        rules={[{ required: true, min: 3, max: 200, message: 'Please enter Body' }]}
      >
        <Input />
      </FormItem>

      <FormItem wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

