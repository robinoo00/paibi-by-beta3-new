import CSSModules from 'react-css-modules'
import styles from '../styles/nav.less'
import icon1 from '../images/nav1.png'
import icon2 from '../images/nav2.png'
import icon3 from '../images/nav3.png'
import icon4 from '../images/nav4.png'
import router from 'umi/router'
import {Flex} from 'antd-mobile'

const list = [
    {text:'金融资讯',icon:icon1,url:'news'},
    {text:'进阶必备',icon:icon2,url:'knowledge'},
    {text:'风险提示',icon:icon3,url:'guide'},
    {text:'跟随高手',icon:icon4,url:'leaders'},
]

const Nav = () => (
    <Flex styleName="nav-wrap">
        {list.map(item => (
            <Flex.Item styleName="li" key={item.text} onClick={() => {router.push(item.url)}}>
                <img src={item.icon} alt=""/>
                <p>{item.text}</p>
            </Flex.Item>
        ))}
    </Flex>
)

export default CSSModules(Nav,styles)
