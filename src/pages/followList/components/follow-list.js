import CSSModules from 'react-css-modules'
import styles from '../styles/follow-list.less'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'
import router from 'umi/router'
import config from "../../../utils/config";

const List = ({...rest}) => (
    <div>
        {rest.list.map(item => (
            <Flex styleName="item" key={item.记录ID}>
                <Flex.Item styleName="img-wrap">
                    <img
                        src={config.server+'getuserpic?url='+item.被随头像}
                        alt=""/>
                </Flex.Item>
                <Flex.Item styleName="info">
                    <p>{item.被随者昵称}</p>
                    <p styleName="num">{item.固定手数 === "0" ? "固定倍数" : "固定手数"}：{item.固定手数 === "0" ? item.倍数 + "倍" : item.固定手数 + "手"}</p>
                </Flex.Item>
                <Flex.Item styleName="action">
                    <p styleName="earn">{item.方向}</p>
                    <span styleName="edit" onClick={rest.edit(item)}>编辑</span>
                </Flex.Item>
            </Flex>
        ))}
    </div>
)

const mapStateToProps = state => ({
    list: state.followList.follow_list
})

const mapDispatchToProps = dispatch => ({
    edit:item => () => {
        sessionStorage.setItem(config.FOLLOW_EDIT,JSON.stringify(item));
        router.push({pathname:'followEdit',query:{fid:item.记录ID,nickname:item.被随者昵称,from:config.FOLLOW_TYPE_EDIT}})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(List, styles))
