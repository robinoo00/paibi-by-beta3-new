import CSSModuels from 'react-css-modules'
import styles from '../styles/header.less'

const Header = ({info}) => (
    <div styleName="header">
        <div styleName="img">
            <img src="https://qhdigitaldevsh.oss-cn-shanghai.aliyuncs.com/ueditor/userPortrait.png" alt=""/>
        </div>
        <div styleName="info">
            <div>
                <div styleName="p">
                    <div styleName="text">{info.持卡人}</div>
                </div>
                <div styleName="switch-wrap">
                    <div styleName="account-type">
                        实盘账户
                    </div>
                    {/*<div styleName="switch-btn">*/}
                        {/*切换至模拟账户*/}
                    {/*</div>*/}
                </div>
            </div>
            {/*<div>*/}
                {/*<div styleName="p">*/}
                    {/*<div styleName="text">未登录</div>*/}
                {/*</div>*/}
                {/*<div styleName="login-btn-wrap">*/}
                    {/*<div styleName="login-btn">*/}
                        {/*去登陆*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    </div>
)

export default CSSModuels(Header, styles)
