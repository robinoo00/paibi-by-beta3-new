import {Tabs, Badge} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'
let id;

class TradeListTabs extends React.Component{
    componentDidMount(){
        let {loadMore,getList,tabs,getPositionList} = this.props;
        const choose_tab = tabs.filter(item => item.choose)[0];
        const index = tabs.indexOf(choose_tab);
        if(index === 0){
            id = setInterval(getPositionList,1000);
        }
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }
    componentWillUnmount(){
        removeScrollListener();
        clearInterval(id);
    }
    render(){
        const {tabs,choose,children} = this.props;
        return(
            <div className="tradelist-tab-wrap">
                <Tabs
                    tabs={tabs}
                    swipeable={false}
                    tabBarBackgroundColor={'#262834'}
                    initialPage={tabs.indexOf(tabs.filter(item => item.choose)[0])}
                    onChange={(tab, index) => {
                        // console.log('onChange', index, tab);
                    }}
                    onTabClick={choose}
                >
                    {children}
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.tradeList.tabs
})

const mapDispatchToProps = (dispatch, props) => ({
    getList:() => {
        dispatch({
            type:'tradeList/getList',
        });
    },
    getPositionList:() => {
        dispatch({
            type:'tradeList/getPositionList',
        });
    },
    choose: (tab, index) => {
        dispatch({
            type:'tradeList/assignTabs',
            choose_index:index
        });
        dispatch({
            type:'tradeList/getList',
        });
        if(index === 0){
            id = setInterval(() => {
                dispatch({
                    type:'tradeList/getPositionList',
                });
            },1000)
        }else{
            clearInterval(id);
        }
    },
    loadMore:() => {
        dispatch({
            type:'tradeList/LoadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(TradeListTabs, styles))
