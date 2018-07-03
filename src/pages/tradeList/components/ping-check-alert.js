import CSSModules from 'react-css-modules'
import styles from '../styles/ping-check-alert.less'
import {Flex} from 'antd-mobile'

const Item = ({item}) => (
    <div>
        <p style={{color: '#bcbcbc'}}> 合约号:{item.合约}</p>
        <br/>
        <Flex><Flex.Item styleName={'left'}>浮动盈亏:</Flex.Item>&nbsp;&nbsp;<Flex.Item style={{color: '#E34C4D'}}>{item.浮动盈亏}</Flex.Item></Flex>
        <Flex><Flex.Item styleName={'left'}>开仓价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.均价}</Flex.Item></Flex>
        <Flex><Flex.Item styleName={'left'}>当前价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.当前价}</Flex.Item></Flex>
    </div>
)

export default CSSModules(Item, styles)
