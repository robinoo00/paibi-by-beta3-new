import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import router from 'umi/router'
import {connect} from 'dva'
import React from 'react'

class Header extends React.Component{
    componentDidMount(){
        const {getUserInfo} = this.props;
        getUserInfo();
    }
    render(){
        const {money} = this.props;
        return(
            <div styleName="user-info">
                <img src='https://qhdigitaldevsh.oss-cn-shanghai.aliyuncs.com/ueditor/userPortrait.png' alt=""
                     styleName="hastip"/>
                {/*<span styleName="status">未登录</span>*/}
                <span styleName="login-in">{money} USDT</span>
                <div styleName="topup" onClick={() => router.push('payType')}>
                    充币
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    money:state.personal.info.可用资金
})

const mapDispatchToProps = dispatch => ({
    getUserInfo:() => {
        dispatch({
            type:'personal/getInfo'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Header, styles))
