import React, { Component, } from 'react';

export class FaciltyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        this.facilityList();
    }

    facilityList = () => {
        this.$axios({
            headers: {
                Authorization: JSON.parse(localStorage.getItem('user')).token,
            },
            method: "get",
            url: "http://39.98.37.28:8085/command/combat/selectDeviceListGroupByCategory",
        }).then(itm => {
            console.log(itm, '===========');
            this.setState({
                data: itm.data,
            });
        });
    }
    render() {
        const { data, } = this.state;

        // console.log(data)
        return (
            <div>
                <div className="headerUl">
                    <h4>设备资源</h4>
                    <div className="ulContent">
                        {
                            data.map(item => {
                                return (
                                    <div className="liContent">
                                        <h5>{item.name}：</h5>
                                        <div className="liContentSpan">
                                            {
                                                item.deviceList.map(items => {
                                                    return (
                                                        <span>{items.name}</span>

                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="liA">
                                            <a href="#">查看更多 ></a>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default FaciltyList;
