import * as LimitServices from '../services/limits'
import {Toast} from 'antd-mobile'
let loading = false;

export default {
    namespace: 'limits',
    state: {
        caode:'',
        nav_show:false,
        nav_choose:'充值',
        nav_list:[
            {title:'充值',choose:true},
            {title:'提现',choose:false},
            {title:'收入',choose:false},
            {title:'支出',choose:false},
        ],
        list:[],
        page:0,
        nomore:false,
        limit_earn: {
            inputs:[
                {
                    text:'手数',placeholder:'请输入手数',name:'qty'
                },
                {
                    text:'止损点1',placeholder:'请输入止损点',name:'slprice'
                },
                {
                    text:'止盈点',placeholder:'请输入止盈点',name:'tpprice'
                },
            ],
            data:{},
            visible:false
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/limits'){
                    console.log(query)
                    if(query.code){
                        dispatch({
                            type:'assignCode',
                            code:query.code
                        })
                    }
                }
            })
        },
    },

    effects: {
        *getList({page =1},{call,put,select}){
            const code = yield select(state => state.limits.code);
            const {data} = yield call(LimitServices.getList,{page:page,symbol:code})
            loading = false;
            if(data){
                if(typeof data.状态 !='undefined' && !data.状态){
                    if(!data.状态){
                        Toast.info(data.信息,1);
                        return;
                    }
                }
                yield put({
                    type:'assignList',
                    data:data,
                    page:page
                })
            }
        },
        *loadMore({},{put,select}){
            if(!loading){
                const page = yield select(state => state.limits.page);
                const nomore = yield select(state => state.limits.nomore);
                if(!nomore){
                    yield put({
                        type:'getList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        },
        *cancel({id},{call,put}){
            const {data} = yield call(LimitServices.cancel,{tpid:id});
            if(data){
                Toast.info(data.信息)
                if(data.状态){
                    yield put({
                        type:'cancelLimit',
                        id:id
                    })
                }
            }
        },
        *modify({qty,tpprice = 0,slprice = 0},{call,select,put}){
            const item = yield select(state => state.limits.limit_earn.data)
            const post_data = {
                symbol:item.Symbol,
                buysell:item.Buysell,
                qty:qty,
                tpprice:tpprice,
                slprice:slprice,
                tpid:item.id
            }
            const {data} = yield call(LimitServices.modify,post_data)
            if(data){
                Toast.info(data.信息,1);
                yield put({
                    type:'hideLimitEarn'
                })
                // if(data.状态){
                //     yield put({
                //         type:'getList'
                //     })
                // }
            }
        }
    },

    reducers: {
        showLimitEarn(state, {data}){
            return {
                ...state,
                limit_earn:{
                    ...state.limit_earn,
                    data:data,
                    visible:true
                }
            }
        },
        hideLimitEarn(state,{}){
            return {
                ...state,
                limit_earn:{
                    ...state.limit_earn,
                    visible:false
                }
            }
        },
        cancelLimit(state,{id}){
            const list = state.list;
            for(let index in list){
                if(list[index]['id'] === id){
                    list.splice(index,1);
                }
            }
            return {
                ...state,
                list:[...list]
            }
        },
        assignCode(state,{code}){
            return {
                ...state,
                code:code
            }
        },
        assignList(state,{data,page}){
            let nomore = false;
            if(data.length === 0 || data.length < 30){
                nomore = true;
            }
            if(page === 1){
                return {
                    ...state,
                    list:data,
                    page:1,
                    nomore:nomore
                }
            }else{
                return {
                    ...state,
                    list:[...state.list,...data],
                    page:page,
                    nomore:nomore
                }
            }
        },
        toggleShow(state){
            return{
                ...state,
                nav_show:!state.nav_show
            }
        },
        assignChoose(state,{index}){
            let temp = [
                {title:'充值',choose:false},
                {title:'提现',choose:false},
                {title:'收入',choose:false},
                {title:'支出',choose:false},
            ];
            temp[index]['choose'] = true;
            return {
                ...state,
                nav_choose:temp[index]['title'],
                nav_list:[...temp]
            }
        }
    },

};
