import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import router from 'umi/router'
import config from '../../../utils/config'
import {Flex} from 'antd-mobile'

const Item = ({item}) =>(
    <div styleName="earnings-list-wrap" onClick={() => {router.push({pathname:'leaderDetail',query:{id:item.ID}})}}>
        <div styleName="portrait-wrap">
            <img styleName="portrait" src={config.server+'getuserpic?url='+item.头像} alt=""/>
            <p>{item.昵称}</p>
        </div>
        <Flex styleName="earnings-list-con">
            <Flex.Item>
                <p styleName="earnings-num"  className={item.总收益 > 0 ? "up-color" : "down-color"}>
                    {parseInt(item.总收益)}
                </p>
                <p styleName="earnings-list-txt">
                    总收益
                </p>
            </Flex.Item>
            <Flex.Item>
                <p styleName="earnings-num" className={item.盈利率 > 0 ? "up-color" : "down-color"}>
                    {item.盈利率}%
                </p>
                <p styleName="earnings-list-txt">
                    盈利率
                </p>
            </Flex.Item>
            <Flex.Item>
                <p styleName="earnings-num" className={item.赢亏比列 > 0 ? "up-color" : "down-color"}>
                    {item.赢亏比列}%
                </p>
                <p styleName="earnings-list-txt">
                    盈亏比例
                </p>
            </Flex.Item>
            {item.是否被跟随 === "false" ? <Flex.Item style={{marginTop:0}} onClick={(e) => {e.stopPropagation();router.push({pathname:'followEdit',query:{id:item.ID,nickname:item.昵称,from:config.FOLLOW_TYPE_ADD}})}}>
                <span styleName="follow-btn">跟随</span>
            </Flex.Item> : <Flex.Item style={{marginTop:0}} onClick={(e) => {e.stopPropagation();router.push({pathname:'followEdit',query:{fid:item.跟随id,nickname:item.昵称,from:config.FOLLOW_TYPE_EDIT}})}}>
                <span styleName="follow-btn">编辑</span>
            </Flex.Item>}

        </Flex>
    </div>
)

export default CSSModules(Item,styles)
