import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useSearchParams } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'

import { getChannelAPI ,createAriticleAPI,getArticleById,updateArticleAPI } from '@/apis/article'
// import { useChannel } from '@/hooks/useChannel'
  const { Option } = Select
  
const Publish = () => {

 
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  
  useEffect(() => { 
   const fetchchannels = async () => { 
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    fetchchannels()
  
  }, [])
  
  const onFinish = async (formValue) => {
    console.log(formValue)
    const { channel_id, content, title } = formValue
    const params = {
     
      content,
      title,
      type: imageType,
      cover: {
        type: imageType,
        images: imageList.map(item => { 
          if (item.response) {
            return item.response.data.url
          } else { 
            return item.url
          }
        })
      },
      channel_id
    }
    if (articleId) {
      await   updateArticleAPI({...params,id:articleId})
    } else { 
   createAriticleAPI(params)
    }

 
    message.success(`${articleId ? '编辑' : '发布'}文章成功`)
   
  }
    // 上传图片
  const [imageList, setImageList] = useState([])
  const cacheImageList = useRef([])
  const onUploadChange =(info) => { 
    setImageList(info.fileList)
    cacheImageList.current = info.fileList
  }
  const [imageType, setImageType] = useState(0)

  const onTypeChange = (e) => {
    console.log(e)
    const type = e.target.value
    setImageType(type)
    if (type === 1) {
      const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
      setImageList(imgList)
    } else if (type === 3) { 
      setImageList(cacheImageList.current)
    }
  }
  //回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => { 
    const getArticleDetail = async () => { 
      const res = await getArticleById(articleId)
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type:data.cover.type
      })
      setImageType(cover.type)
      setImageList(cover.images.map(url => { 
        return {url}
      }))
    }
    if (articleId) {
      getArticleDetail()
    }
 
  }, [articleId,form])


    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${articleId ? '编辑文章' : '发布文章'}` },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 0 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                       
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelList.map(item =>  <Option value={item.id} key={item.id}>{ item.name} </Option>
                )}  
              </Select>
            </Form.Item>
            <Form.Item label="封面">
  <Form.Item name="type">
    <Radio.Group onChange={onTypeChange}>
      <Radio value={1}>单图</Radio>
      <Radio value={3}>三图</Radio>
      <Radio value={0}>无图</Radio>
    </Radio.Group>
              </Form.Item>
              { imageType > 0 && <Upload
                name="image"
                // 决定选择文件框的外观样式
              listType="picture-card" 
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
  >
    <div style={{ marginTop: 8 }}>
      <PlusOutlined />
    </div>
  </Upload> }
             
</Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                         <ReactQuill
                            className='publish-quill'
                            theme='snow'
                            placeholder='请输入文章内容'
                        ></ReactQuill>
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish