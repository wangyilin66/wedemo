import React from 'react';
import './Shujuyanpan.css';
import ReactEcharts from 'echarts-for-react';

class Study extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr1:[
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },

                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },
                {
                    pic:1,
                    name:'松江',
                },


            ],
        };
    }
    componentDidMount(){
      
    }

    componentWillMount(){
        console.log(this);
    }

    //左上
    getOption1(){
        return{
            title: {
                text: '案件数量变化情况折线图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            grid:{
                borderColor: '#fff',
                show:true,
              
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {      
                data:[
                    {
                        name:'新增案件',
                        icon:'roundRect',
                    },
                    {
                        icon:'roundRect',
                        name:'完结案件',
                    },
                    {
                        icon:'roundRect',
                        name:'均显示总数',
                    },
                ],
                itemWidth:10,
                itemHeight:10,
                align:'right',
                padding: 30,
                textStyle:{
                    color: '#fff',//左边线的颜色
                    color:'#fff',
                    fontSize: 9,
                },  
            },
            xAxis: {
                show:true,
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1',//坐标线的宽度
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',//坐标值得具体的颜色
                    },
                },
            },
            yAxis: {
                show:true,
                type: 'value',
                axisLabel: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                    textStyle: {
                        color: '#fff',
                    },
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                },
            },
            series: [
                {
                    name:'新增案件',
                    data: [820, 932, 901, 934, 1290, 1330, 1320,],
                    type: 'line',
                    smooth: true,
                },
                {
                    name:'完结案件',
                    data: [200, 500, 680, 900,100,390, 1000,],
                    type: 'line',
                    smooth: true,
                },
                {
                    name:'均显示总数',
                    data: [100, 200, 300, 400,500,600,700,],
                    type: 'line',
                    smooth: true,
                },
            ],
        };
    }
    //左中
    getOption2(){
        return{
            title : {
                text: '案件数量变化情况环比图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            grid:{
                borderColor: '#fff',
                show:true,
              
            },
            tooltip: {
                trigger: 'axis',
            },
            
            legend: {      
                data:[
                    {
                        name:'去年',
                        icon:'roundRect',
                    },
                    {
                        icon:'roundRect',
                        name:'今年',
                    },
                ],
                itemWidth:10,
                itemHeight:10,
                align:'right',
                padding: 30,
                textStyle:{
                    color: '#fff',//左边线的颜色
                    color:'#fff',
                    fontSize: 9,
                },  
            },
          
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['01','02','03','04','05','06','07','08','09','10','11','12',],
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#fff',//左边线的颜色
                            width:'1',//坐标线的宽度
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',//坐标值得具体的颜色
                        },
                    },
                },
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                    },
                },

            ],
            series : [
                {
                    name:'去年',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,],
                    // markPoint : {
                    //     data : [
                    //         {type : 'max', name: '最大值'},
                    //         {type : 'min', name: '最小值'}
                    //     ]
                    // },
                 
                },
                {
                    name:'今年',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,],
                    // markPoint : {
                    //     data : [
                    //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    //     ]
                    // },
                   
                },
            ],
        };
    }

    //左下
    getOption3(){
        return{
            title : {
                text: '行动次数（任务）变化情况折线图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1',//坐标线的宽度
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',//坐标值得具体的颜色
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                    textStyle: {
                        color: '#fff',
                    },
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                },
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320,],
                type: 'line',
                smooth: true,
            },],
        };
    }
    //中下
    getOption4(){
        return{
            title : {
                text: '行动对象变化情况环比图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1',//坐标线的宽度
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',//坐标值得具体的颜色
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                    textStyle: {
                        color: '#fff',
                    },
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                },
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320,],
                type: 'line',
                smooth: true,
               
            },],
        };
    }
    //右上
    getOption5(){
        return{
            title : {
                text: '行动对象变化情况折线图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1',//坐标线的宽度
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',//坐标值得具体的颜色
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                    textStyle: {
                        color: '#fff',
                    },
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color:'#fff',
                        width:'1',
                    },
                },
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320,],
                type: 'line',
               
            },],
        };
    }
    //右中
    getOption6(){
        return{
            title : {
                text: '案件数量变化情况环比图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            grid:{
                borderColor: '#fff',
                show:true,
          
            },
            tooltip: {
                trigger: 'axis',
            },
        
            legend: {      
                data:[
                    {
                        name:'去年',
                        icon:'roundRect',
                    },
                    {
                        icon:'roundRect',
                        name:'今年',
                    },
                ],
                itemWidth:10,
                itemHeight:10,
                align:'right',
                padding: 30,
                textStyle:{
                    color: '#fff',//左边线的颜色
                    color:'#fff',
                    fontSize: 9,
                },  
            },
      
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['01','02','03','04','05','06','07','08','09','10','11','12',],
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#fff',//左边线的颜色
                            width:'1',//坐标线的宽度
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',//坐标值得具体的颜色
                        },
                    },
                },
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                    },
                },

            ],
            series : [
                {
                    name:'去年',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,],
                    // markPoint : {
                    //     data : [
                    //         {type : 'max', name: '最大值'},
                    //         {type : 'min', name: '最小值'}
                    //     ]
                    // },
             
                },
                {
                    name:'今年',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,],
                    // markPoint : {
                    //     data : [
                    //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    //     ]
                    // },
               
                },
            ],
        };
    }
    //右下
    getOption7(){
        return{
            title : {
                text: '行动次数（任务）变化情况环比图',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                },
                left:'center',
            },
            grid:{
                borderColor: '#fff',
                show:true,
          
            },
            tooltip: {
                trigger: 'axis',
            },
        
            legend: {      
                data:[
                    {
                        name:'去年',
                        icon:'roundRect',
                    },
                    {
                        icon:'roundRect',
                        name:'今年',
                    },
                ],
                itemWidth:10,
                itemHeight:10,
                align:'right',
                padding: 30,
                textStyle:{
                    color: '#fff',//左边线的颜色
                    color:'#fff',
                    fontSize: 9,
                },  
            },
      
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['01','02','03','04','05','06','07','08','09','10','11','12',],
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#fff',//左边线的颜色
                            width:'1',//坐标线的宽度
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',//坐标值得具体的颜色
                        },
                    },
                },
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#fff',
                            width:'1',
                        },
                    },
                },

            ],
            series : [
                {
                    name:'去年',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,],
                    // markPoint : {
                    //     data : [
                    //         {type : 'max', name: '最大值'},
                    //         {type : 'min', name: '最小值'}
                    //     ]
                    // },
             
                },
                {
                    name:'今年',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,],
                    // markPoint : {
                    //     data : [
                    //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    //     ]
                    // },
               
                },
            ],
        };
    }

    render(){     
        return(
            <div className="main3">
               
                <div className="main3_content">
                    <div className="main3_content_left">
                        <div className="main3_content_left_top">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption1()} />
                            
                        </div>
                        <div className="main3_content_left_middle">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px' ,bottom: '-22px',}} option={this.getOption2()} />
                        </div>
                        <div className="main3_content_left_bottom">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption3()} />
                        </div>
                    </div>

                    <div className="main3_content_middle">
                        <div className="main3_content_middle_top">
                            <div  className="main3_content_middle_top_title">行动对象列表</div>
                            <div className="main3_content_middle_top_content">
                                <ul className="main3_content_middle_top_content_ul">
                                    {
                                        this.state.arr1.map((item)=>{
                                            return (                                       
                                                <li className="main3_content_middle_top_content_li">
                                                    <div className="main3_content_middle_top_content_top">{item.pic}</div>
                                                    <div className="main3_content_middle_top_content_bottom">{item.name}</div>
                                                </li>
                                            );
                                        })
                                    }     

                                    
                                </ul>
                            </div>
                        </div>
                        <div className="main3_content_middle_bottom">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption4()} />
                        </div>
                    </div>

                    <div className="main3_content_right">
                        <div className="main3_content_right_top">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption5()} />
                        </div>
                        <div className="main3_content_right_middle">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption6()} />
                        </div>
                        <div className="main3_content_right_bottom">
                            <ReactEcharts style={{width:'98%', height:'99%',color:'#fff',marginLeft:'13px',paddingTop:'15px', bottom: '-22px',}} option={this.getOption7()} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Study;
