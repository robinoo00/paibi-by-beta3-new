import * as TradeListServices from '../services/tpl'
import {Toast, Modal} from 'antd-mobile'
import config from "../../../utils/config";
import * as TradeServices from "../../trade/services/trade";

const alert = Modal.alert
let loading = false;
export default {
    namespace: 'tradeList',
    state: {
        tabs: [
            {
                title: '持仓',
                choose: true,
                list_name: 'position_list',
                action: TradeListServices.getPositionList,
                pageSize: 30
            },
            {title: '成交', choose: false, list_name: 'deal_list', action: TradeListServices.getDealList, pageSize: 30},
            {
                title: '未成交',
                choose: false,
                list_name: 'undeal_list',
                action: TradeListServices.getUnDealList,
                pageSize: 30
            },
            {
                title: '历史',
                choose: false,
                list_name: 'history_list',
                action: TradeListServices.getHistoryList,
                pageSize: 30
            },
            {title: '平仓', choose: false, list_name: 'ping_list', action: TradeListServices.getPingList, pageSize: 30},
        ],
        earn: 0,//总浮动盈亏
        position_list: {
            list: [],
            page: 0,
            nomore: false,
            empty: false
        },
        deal_list: {
            list: [],
            page: 0,
            nomore: false,
            empty: false
        },
        undeal_list: {
            list: [],
            page: 0,
            nomore: false,
            empty: false
        },
        history_list: {
            list: [],
            page: 0,
            nomore: false,
            empty: false
        },
        ping_list: {
            list: [],
            page: 0,
            nomore: false,
            empty: false
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                // if (pathname === '/tradeList' && localStorage.getItem(config.KEY)) {
                //     dispatch({
                //         type: 'getPositionList'
                //     })
                // }
            })
        },
    },

    effects: {
        * order({direction, code, num}, {call, put}) {
            const post_data = {
                symbol: code,
                Buysell: direction,
                Qty: num,
                Price: 0,
                Ordertype: "市价"
            }
            const {data} = yield call(TradeListServices.order, post_data);
            window.hideAll();
            if (data) {
                if (data.信息 === 'api error') {
                    Toast.info('交易失败');
                } else {
                    Toast.info(data.信息)
                }
            }
        },
        * ping({direction, code}, {put, call, select}) {
            const {data} = yield call(TradeListServices.getOffect, {symbol: code});
            if (data) {
                if (data.手数 === 0) {
                    window.toast('还未持仓');
                    Toast.hide();
                } else {
                    yield put({
                        type: 'order',
                        direction: direction === 0 ? "卖出" : "买入",
                        num: data.手数,
                        code: code
                    })
                }
            } else {
                Toast.info('交易失败');
                Toast.hide();
            }

        },
        * getList({page = 1}, {call, put, select}) {
            const tabs = yield select(state => state.tradeList.tabs);
            const choose_tab = tabs.filter(item => item.choose)[0];
            const action = choose_tab.action;
            const {data} = yield call(action, {page: page});
            loading = false;
            if (data != '') {
                yield put({
                    type: 'assignList',
                    data: data.data,
                    page: page
                })
            }
        },
        //为了获取浮动盈亏和定时器
        * getPositionList({forEarn = false}, {put, call}) {
            const {data} = yield call(TradeListServices.getPositionList, {})
            if (data) {
                const get_data = data.data;
                yield put({
                    type: 'assignPositionList',
                    data: get_data
                })
                if(forEarn){
                    let earn = 0;
                    for (let item of get_data) {
                        earn += item['浮动盈亏'];
                    }
                    yield put({
                        type: 'assignEarn',
                        value: earn
                    })
                }
            }
        },
        * LoadMore({}, {put, select}) {
            if(!loading){
                const tabs = yield select(state => state.tradeList.tabs);
                const choose_tab = tabs.filter(item => item.choose)[0];
                const list = yield select(state => state.tradeList[choose_tab['list_name']]);
                const page = list.page;
                const nomore = list.nomore;
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1
                    })
                }
                loading = true;
            }
        },
    },

    reducers: {
        assignPositionList(state, {data}) {
            const list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
            let k_item;
            data.map(item => {
                k_item = list.filter(item2 => item2['合约'] === item['合约']);
                item['当前价'] = k_item.length === 0 ? 0 : k_item[0]['最新价'];
            })
            let position_list = state.position_list;
            position_list['list'] = data;
            position_list['nomore'] = true;
            return {
                ...state,
                position_list: position_list
            }
        },
        assignEarn(state, {value}) {
            return {
                ...state,
                earn: value
            }
        },
        assignTabs(state, {choose_index}) {
            const tabs = state.tabs;
            tabs.map((item, index) => {
                if (index === choose_index) {
                    item['choose'] = true;
                } else {
                    item['choose'] = false;
                }
            })
            return {
                ...state,
                tabs: tabs
            }
        },
        assignList(state, {data, page}) {
            const tabs = state.tabs;
            const choose_tab = tabs.filter(item => item.choose)[0];
            const list_name = choose_tab['list_name'];
            const pageSize = choose_tab['pageSize'];
            let nomore = false, empty = false;
            if (data.length === 0) {
                empty = true;
            }
            if (data.length === 0 || data.length < pageSize) {
                nomore = true;
            }
            //如果是持仓单独处理
            if (list_name === 'position_list') {
                const list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
                let k_item;
                data.map(item => {
                    k_item = list.filter(item2 => item2['合约'] === item['合约']);
                    item['当前价'] = k_item.length === 0 ? 0 : k_item[0]['最新价'];
                })
            }
            if (page === 1) {
                state[list_name] = {
                    list: [...data],
                    page: 1,
                    nomore: nomore,
                    empty: empty
                }
            } else {
                state[list_name] = {
                    list: [...state[list_name].list, ...data],
                    page: page,
                    nomore: nomore
                }
            }
            return {
                ...state,
            }
        }
    },

};
