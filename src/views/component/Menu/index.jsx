import React from 'react';
import { Menu, Icon, } from 'antd';
const { SubMenu, } = Menu;

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
        };
    }
	handleClick = (e) => {
	    console.log('click ', e);
	};
	componentDidMount() {
	    this.TreeStart();
	}
	TreeStart = () => {
	    let headers = JSON.parse(localStorage.getItem('user')).token;
	    this.$axios({
	        headers: {
	            Authorization: headers,
	        },
	        method: "post",
	        url: "http://39.98.37.28:8085/command/user/getUserTree",
	    }).then(res => {
	        const newdata = res.data.map(item => {
	            return item;
	        });
	        this.setState({
	            newData: newdata,
	        });

	    });
	}


	render() {
	    const { newData, } = this.state;
	    // console.log(newData)
	    return (
	        <Menu
	            onClick={this.handleClick}
	            style={{ width: 256, }}
	            defaultSelectedKeys={['1',]}
	            defaultOpenKeys={['sub1',]}
	            mode="inline"
	        >
	            <SubMenu key="sub2" title={<span><span>朝阳区</span></span>}>
	                {
	                    newData.map(item => {
	                        return (
	                            <SubMenu
	                                key={item.id}
	                                title={item.name}
	                                style={{ width: '300px', background: 'rgba(5,59,100,1)', color: '#fff',  }}
	                            >
	                                {
	                                    item.childNode.map(itmes => {
	                                        return (
	                                            <Menu.Item
	                                                key={itmes.id}
	                                                style={{ width: '300px', opacity:0.5,}}>
	                                                {itmes.name}
	                                            </Menu.Item>
	                                        );
	                                    })
	                                }
	                            </SubMenu>
	                        );
	                    })
	                }

	            </SubMenu>
	        </Menu>
	    );
	}
}
export default Sider;
