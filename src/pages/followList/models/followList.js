import {Badge} from 'antd-mobile'
import * as FollowListServices from '../services/followList'

export default {
    namespace:'followList',
    state:{
        tabs:[
            {title:'正在跟随',num:0,choose:true},
            {title:'已取消跟随',num:0,choose:true}
        ],
        follow_list:[]
    },
    subscriptions:{},
    reducers:{
        assignFollowList(state,{data}){
            return {
                ...state,
                follow_list:data
            }
        },
        // assignTabsNum(state,{num,index}){
        //     let tabs = state.tabs;
        //     tabs[index][num] = num;
        // }
    },
    effects:{
        *getList({},{call,put}){
            const {data} = yield call(FollowListServices.getList,{});
            if(data){
                yield put({
                    type:'assignFollowList',
                    data:data.data
                })
            }
        }
    }
}
