import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import Home from './home/page'

function IndexPage() {
  return (
    <div>
      <Home/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
