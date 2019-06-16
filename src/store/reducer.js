import { CHANGE_INPUT_VALUE1, CHANGE_INPUT_VALUE2, CHANGE_INPUT_VALUE3, ADD_TODO_ITEM, DELETE_TODO_ITEM, NEW_ADD_ITEM, CANCEL_ADD_ITEM, CHANGE_AVATAR_VALUE } from './actionTypes'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

const defaultState = {
    loading: false,
    isToggleOn: true,
    dispaly: 'block',
    visible:false,
    inputValue1:'',//姓名
    inputValue2:'',//年龄
    inputValue3:'',//性别
    list:[        
        {
            name: 'name 1',
            age:1,
            gender:'boy',
            avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558621923847&di=4637be3a0e6e847d2539f8190569276b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181127%2Ff69632e0966c4bc1ac375f161ab6200d.jpeg'
          },
          {
            name: 'name 2',
            age:2,
            gender:'girl',
            avatar:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2993332973,1954478622&fm=11&gp=0.jpg'
          },
      ],
}

export default (state = defaultState, action) => {
    //新增用户
    if (action.type === NEW_ADD_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.visible = true;
        return newState;
    }    
    //取消新增用户
    if (action.type === CANCEL_ADD_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue1 = '';
        newState.inputValue2 = '';
        newState.inputValue3 = '';   
        newState.imageUrl = '';
        newState.visible = false;
        return newState;
    }
    //姓名
    if (action.type === CHANGE_INPUT_VALUE1){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue1 = action.value;
        return newState;
    }
    //年龄
    if (action.type === CHANGE_INPUT_VALUE2){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue2 = action.value;
        return newState;
    }   
    //性别 
    if (action.type === CHANGE_INPUT_VALUE3){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue3 = action.value;
        return newState;
    }
  
    //头像
    if (action.type === CHANGE_AVATAR_VALUE){
        const newState = JSON.parse(JSON.stringify(state));   
        if (action.info.file.status === 'uploading') {
            newState.loading = true;
            getBase64(action.info.file.originFileObj, imageUrl =>
                newState.imageUrl = imageUrl,
                newState.loading = false,
        )
        }
        // if (action.info.file.status === 'done') {
        //     getBase64(action.info.file.originFileObj, imageUrl =>
        //         newState.imageUrl = imageUrl,
        //         newState.loading = false,
        // );}
        return newState;
    } 
    //提交    
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push({name:newState.inputValue1,age:newState.inputValue2,gender:newState.inputValue3,avatar:newState.imageUrl});
        newState.inputValue1 = '';
        newState.inputValue2 = '';
        newState.inputValue3 = '';   
        newState.imageUrl = '';
        newState.visible = false;   
        console.log(newState);
        return newState;
    }
    //删除
    if (action.type === DELETE_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index,1)
        return newState;
    }
    return state;
}