import React from 'react'
import List from './list'
import Header from '../../../components/header/header'
import {connect} from 'dva'
import LimitEarn from './limit-earn'

const Limits = ({code}) => (
    <div>
        <Header
            title={`止损止盈(${code})`}
        />
        <List/>
        <LimitEarn/>
    </div>
)

const mapStateToProps = state => ({
    code:state.limits.code
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Limits)
