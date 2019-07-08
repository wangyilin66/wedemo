// 翻頁器
import React, { Component, } from 'react';
import { Pagination, } from 'antd';
function showTotal(total) {
    return `Total ${total} items`;
}

  
class index extends Component {
    render() {
        return (
            <div>
                <Pagination defaultCurrent={6} total={500} />
            </div>
        );
    }
}
  
export default index;
  