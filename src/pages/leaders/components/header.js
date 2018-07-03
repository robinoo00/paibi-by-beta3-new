import {connect} from 'dva'
import Header from '../../../components/header/header'
import {Picker} from 'antd-mobile'

const types = [
    {
        label: '一周',
        value: '一周',
    },
    {
        label: '半月',
        value: '半月',
    },
    {
        label: '一月',
        value: '一月',
    },
];

const LeadersHeader = ({...rest}) => (
    <Header
        title={<div>
            <Picker
                data={types}
                cols={1}
                onOk={rest.assignTypeChoose}
                onDismiss={e => console.log('dismiss', e)}
            >
                <div>
                    高手榜单<span style={{color:'#fb1'}}>({rest.type_choose})</span>
                </div>
            </Picker>
        </div>}
    />
)

const mapStateToProps = state => ({
    tabs:state.leaders.tabs,
    type_choose:state.leaders.type_choose,
})

const mapDispatchToProps = dispatch => ({
    assignTypeChoose:(e) => {
        console.log('ok', e[0])
        dispatch({
            type:'leaders/assignTypeChoose',
            value:e[0]
        })
        dispatch({
            type:'leaders/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(LeadersHeader)
