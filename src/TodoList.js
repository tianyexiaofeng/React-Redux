import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List, Avatar, Upload, message, Icon, Modal } from 'antd';
import store from './store/index';
import { getInputChangeAction1, getInputChangeAction2, getInputChangeAction3, getAddItemAction, getDeleteItemAction, getAvatarAction, newAddAction, cancelAddAction } from './store/actionCreator';

//限制图片格式和大小
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleShow = this.handleShow.bind(this);                 //展示列表
    this.handleAdd = this.handleAdd.bind(this);                   //新增用户
    this.handleInputChange1 = this.handleInputChange1.bind(this); //姓名
    this.handleInputChange2 = this.handleInputChange2.bind(this); //年龄
    this.handleInputChange3 = this.handleInputChange3.bind(this); //性别 
    this.handleBtnClick = this.handleBtnClick.bind(this);         //提交    
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render(){
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <div style={{marginTop:'10px',marginLeft:'10px'}}>
        <Button onClick={this.handleShow}>
          {this.state.isToggleOn ? '隐藏列表' : '展示列表'}
        </Button>    
        <Button style={{marginLeft:'10px'}} type="primary" onClick={this.handleAdd}>新增用户</Button>     
        <div style={{display: this.state.display}}>  
          <div>
            <Modal title="新增用户" visible={this.state.visible}
            onOk={this.handleBtnClick} onCancel={this.handleCancel}>
              <Input
              value={this.state.inputValue1} 
              placeholder = 'name' 
              style={{width:'300px', margin:'10px'}}
              onChange={this.handleInputChange1}
                /><br/>
              <Input
              value={this.state.inputValue2} 
              placeholder = 'age' 
              style={{width:'300px', margin:'10px'}}
              onChange={this.handleInputChange2}
                /><br/>           
              <Input
              value={this.state.inputValue3} 
              placeholder = 'gender' 
              style={{width:'300px', margin:'10px'}}
              onChange={this.handleInputChange3}
                /><br/>                    
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"//此处为接口及参数
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '128px', height: '128px'}} /> : uploadButton}
              </Upload>
            </Modal>
          </div>
          <List
            style={{marginTop:'10px',width:'300px'}}
            bordered
            dataSource={this.state.list}
            renderItem={(item,index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="www.baidu.com">{item.name}</a>}
                  description={<p>{item.age}岁       {item.gender}</p>}
                />
                <Button type="primary" onClick={this.handleItemDelete.bind(this,index)}>删除</Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }

  handleStoreChange() {
    this.setState(store.getState());
  }
  //新增用户
  handleAdd(){
    const action = newAddAction()
    store.dispatch(action);
  }
  //姓名
  handleInputChange1(e) {
    const action = getInputChangeAction1(e.target.value);
    store.dispatch(action);
  }
  //年龄
  handleInputChange2(e) {
    const action = getInputChangeAction2(e.target.value);
    store.dispatch(action);
  }
  //性别
  handleInputChange3(e) {
    const action = getInputChangeAction3(e.target.value);
    store.dispatch(action);
  }    
  //上传头像
  handleChange(info) {
    const action = getAvatarAction(info)
    store.dispatch(action);
  }   
  //提交
  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action);
  }
  //取消提交
  handleCancel(){
    const action = cancelAddAction()
    store.dispatch(action);
  }
  //删除
  handleItemDelete(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action);
  }
  //展示列表
  handleShow() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      display: prevState.isToggleOn ? 'none': 'block'
    }));
  }

}

export default TodoList;
