import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import Header from '../../../components/header/header'
import {Flex} from 'antd-mobile'
import React from 'react'
import {connect} from 'dva'
import router from 'umi/router'

class TradeListHeader extends React.Component{
    componentDidMount(){
        const {info,getUserInfo} = this.props;
        if(info.empty){
            getUserInfo()
        }
    }
    render(){
        const {info} = this.props;
        return(
            <div styleName="header-wrap">
                <Header
                    title={<div styleName="product-name">
                        余额<span styleName="float-money">{info.可用资金}</span>
                    </div>}
                    rightText={'充值'}
                    rightCallBack={() => {router.push('payType')}}
                />
                {/*<div styleName="head_content">*/}
                    {/*<div styleName="left">*/}
                        {/*<i styleName="icon-back"></i>*/}
                        {/*<h3 styleName="product-name">*/}
                            {/*余额*/}
                            {/*<span styleName="float-money">{info.可用资金}</span>*/}
                        {/*</h3>*/}
                    {/*</div>*/}
                    {/*<div styleName="right" onClick={() => {router.push('payType')}}>*/}
                        {/*<span>充值</span>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <Flex styleName="finance-wrap">
                    <Flex.Item styleName="finance-list">
                        <p styleName="finance-txt">可用资金</p>
                        <p styleName="fianace-num">{info.可用资金}</p>
                    </Flex.Item>
                    <Flex.Item styleName="finance-list">
                        <p styleName="finance-txt">劣后资金</p>
                        <p styleName="fianace-num">{info.劣后资金}</p>
                    </Flex.Item>
                    <Flex.Item styleName="finance-list">
                        <p styleName="finance-txt">优先资金</p>
                        <p styleName="fianace-num">{info.优先资金}</p>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    info:state.personal.info
})

const mapDispatchToProps = dispatch => ({
    getUserInfo:() => {
        dispatch({
            type:'personal/getInfo'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(TradeListHeader, styles))
