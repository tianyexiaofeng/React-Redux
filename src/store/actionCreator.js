import { NEW_ADD_ITEM, CHANGE_INPUT_VALUE1, CHANGE_INPUT_VALUE2, CHANGE_INPUT_VALUE3, CHANGE_AVATAR_VALUE, ADD_TODO_ITEM, CANCEL_ADD_ITEM, DELETE_TODO_ITEM } from "./actionTypes";

//新增用户
export const newAddAction = () =>({
    type: NEW_ADD_ITEM
});
//姓名
export const getInputChangeAction1 = (value) => ({
    type: CHANGE_INPUT_VALUE1,
    value
});
//年龄
export const getInputChangeAction2 = (value) => ({
    type: CHANGE_INPUT_VALUE2,
    value
});
//性别
export const getInputChangeAction3 = (value) => ({
    type: CHANGE_INPUT_VALUE3,
    value
});
//上传头像
export const getAvatarAction = (info) => ({
    type: CHANGE_AVATAR_VALUE,
    info
});
//提交新增用户信息
export const getAddItemAction = () =>({
    type: ADD_TODO_ITEM
});
//取消提交新增用户信息
export const cancelAddAction = () =>({
    type: CANCEL_ADD_ITEM
});
//删除
export const getDeleteItemAction = (index) =>({
    type: DELETE_TODO_ITEM,
    index
});


