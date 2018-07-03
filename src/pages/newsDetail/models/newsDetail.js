import config from "../../../utils/config";
import * as NewsDetailServices from '../services/newsDetail';

export default {
    namespace: 'newsDetail',
    state: {
        type: '',
        header_title: '',
        inner_title: '',
        con: ''
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/newsDetail') {
                    if (typeof query.type != 'undefined') {
                        const type = query.type;
                        dispatch({
                            type: 'assignType',
                            value: type
                        })
                    }else{
                        dispatch({
                            type: 'assignType',
                            value: ''
                        })
                    }
                }
            })
        }
    },
    reducers: {
        assignType(state, {value}) {
            return {
                ...state,
                type: value
            }
        },
        assignData(state, {header_title, inner_title, con}) {
            return {
                ...state,
                header_title: header_title,
                inner_title: inner_title,
                con: con,
            }
        }
    },
    effects: {
        * getDetail({}, {call, select, put}) {
            const type = yield select(state => state.newsDetail.type);
            if (type === '') {
                yield put({
                    type: 'assignData',
                    header_title: '详情',
                    inner_title: sessionStorage.getItem(config.NEW_TITLE),
                    con: sessionStorage.getItem(config.NEW_CON)
                })
            }
            //产品相关介绍
            if (type === config.NEWS_PROD) {
                const {data} = yield call(NewsDetailServices.getNewsDetail, {id: 7});
                if (data) {
                    yield put({
                        type: 'assignData',
                        header_title: data.标题,
                        inner_title: '',
                        con: data.内容,
                    })
                }
            }
            //免责及隐私声明
            if (type === config.NEWS_SECRET) {
                const {data} = yield call(NewsDetailServices.getNewsDetail, {id: 8});
                if (data) {
                    yield put({
                        type: 'assignData',
                        header_title: data.标题,
                        inner_title: '',
                        con: data.内容,
                    })
                }
            }
        }
    }
}
