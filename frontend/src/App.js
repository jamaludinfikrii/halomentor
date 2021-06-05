import { Button, Input, PageHeader, Result, Skeleton,message, Card, Popconfirm } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import Axios, {API_URL} from './AxiosConfig'

function App() {
  const [mentorData, setMentorData] = useState([]);
  const [pageState, setPageState] = useState('loading');
  const [isShowModal, setIsShowModal] = useState(false);
  const [imageForm, setImageForm] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const [isUpdate, setIsUpdate] = useState(false)
  
  useEffect(() => {
    getMentorData()
  },[])
  const getMentorData = async () => {
    try {
      const response = await Axios.get('/mentors')
      console.log(response)
      if(response.data.length){
        setPageState('success')
        setMentorData(response.data)
      }else{
        setPageState('empty')
      }
    } catch (error) {
      setPageState('error')
    }
  }

  const onRetryClick = () => {
    window.location.reload()
  }

  const onAddNewMentorClick = () => {
    setIsShowModal(true)
  }

  const onUpdateBtnClick = (data) => {
    setIsUpdate(true)
    setIsShowModal(true)
    setForm(data)
  }

  const insertDataHandle = async () => {
    if(form.name && form.email && form.password && form.role && imageForm){
      let fd = new FormData()
      fd.append('avatar', imageForm)
      fd.append('dataMentor', JSON.stringify(form))
      
      try {
        await Axios.post('/mentors',fd)
        message.success('Add data success')
        getMentorData()
      } catch (error) {
        message.error(error.message)
      } finally{
        setIsShowModal(false)
      }
    }else{
      message.error('form must be filled')
    }
  }

  const updateDataHandle = async () => {
    if(form.name && form.email && form.role){
      let fd = new FormData()
      fd.append('avatar', imageForm)
      fd.append('dataMentor', JSON.stringify({
        name : form.name,
        email : form.email,
        role : form.role
      }))

      try {
        await Axios.patch('/mentors/' + form.id,fd)
        message.success('Update data success')
        getMentorData()
      } catch (error) {
        message.error(error.message)
      } finally{
        setIsShowModal(false)
      }
    }
  }
  
  const onOkModal = async () => {
    if(isUpdate){
      updateDataHandle()
    }else{
      insertDataHandle()
    }
    
  }

  const onChangeFile = e => {
    setImageForm(e.target.files[0])
  }

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleConfirmDelete = async id => {
    try {
      await Axios.delete('mentors/' + id )
      message.success('Delete data success')
      getMentorData()
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div className='container pt-4'>
      <PageHeader 
        className="site-page-header mb-5"
        title="Halo Mentor"
        subTitle="Simple Crud"
        backIcon={false}
        extra={[
          <Button key="1" type="primary" onClick={onAddNewMentorClick}>
            New Mentor
          </Button>,
        ]}
      />      
      {
        pageState === 'loading' 
        ? 
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        :
        pageState === 'success'
        ?
        <div className='row'>
          {
            mentorData.map((mentor) => {
              return (
                <div className='col-md-3'>
                  <Card>
                    <div className='text-center'>
                      <Avatar size={64} src={API_URL + '/' + mentor.avatar}/>
                    </div>

                    <table className='mt-4'>
                      <tr>
                        <td className='px-2'> Name : </td>
                        <td className='px-2'> {mentor.name}</td>
                      </tr>
                      <tr>
                        <td className='px-2'> Email : </td>
                        <td className='px-2'> {mentor.email}</td>
                      </tr>
                      <tr>
                        <td className='px-2'> Role : </td>
                        <td className='px-2'> {mentor.role}</td>
                      </tr>
                    </table>

                    <div className='text-center mt-4'>
                      <Button type="primary" size="small"  onClick={() => onUpdateBtnClick(mentor)}>Update</Button>
                      <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => handleConfirmDelete(mentor.id)}>
                        <Button type="danger" size="small" >Delete</Button>
                      </Popconfirm>,
                    </div>
                  </Card>
                </div>
              )
            })
          }
        </div>
        :
        pageState === 'empty'
        ?
        <Result
          status="404"
          title="Empty Result"
          subTitle="Sorry, data not found."
          extra={<Button type="primary" onClick={onRetryClick}>Retry</Button>}
        />
        :
        <Result
          status="500"
          title="Error"
          subTitle="Sorry, something went wrong."
          extra={<Button type="primary" onClick={onRetryClick}>Retry</Button>}
        />
      }

      <Modal title="Add New Mentor" visible={isShowModal} onOk={onOkModal} onCancel={() => setIsShowModal(false)}>
        <Input 
          placeholder="Mentor Name .."
          name="name"
          value={form.name}
          onChange={handleFormChange}
        />
        <Input 
          placeholder="Email .."
          name="email"
          className="mt-2"
          value={form.email}
          onChange={handleFormChange}
        />
        {
          isUpdate ?
          null :
          <Input 
            placeholder="Password .."
            name="password"
            className="mt-2"
            value={form.password}
            onChange={handleFormChange}
          />

        }
        <Input 
          name="role"
          placeholder="Role .."
          className="mt-2"
          value={form.role}
          onChange={handleFormChange}
        />
        
        <input 
          type='file' 
          className='mt-3'
          onChange={onChangeFile}
          accept='image/*'
        />
        
      </Modal>
    </div>
  );
}

export default App;
