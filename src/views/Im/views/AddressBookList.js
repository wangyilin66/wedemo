import React,{Component} from 'react'
import ReactDom from 'react-dom'
import {makeImageUrl} from "../lib/blob-helpers";
import AddressBook from './AddressBook';
// @material-ui/core component
import withStyles from "@material-ui/core/styles/withStyles";
import navbarsStyle from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
/* eslint-disable */

/* BEGIN AddressBookList: component for showing a list of contacts,
 * such as a list of group members in a group chat */
class AddressBookList extends React.Component {
     constructor(props) {
        super(props);
        this.state={
          anchor : "",
          searchKey :"",
          contactNodes:[],
          contactList:[],
          showSearch:false,

        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handelSearchContact = this.handelSearchContact.bind(this);
       // this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }
      //滚动  
      ifHasAnchorJustScorll() {
        // let anchor = this.getURLStuff("anchor");
        
        let anchor = this.state.anchor;
        // 对应id的话, 滚动到相应位置
        if (!!anchor) {
          let anchorElement = document.getElementById(anchor);
          if (anchorElement) {
          var ascIndex =document.getElementById(anchor).getAttribute("ascIndex");
         document.getElementById('menuTab').scrollTop =49*ascIndex-40;
            //window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
          }
        }
        // 没有的话，滚动到头部
        else {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      }
      handleSearchChange(e){
        this.setState({searchKey:e.target.value.trim()});
      }
      componentDidMount(){
        this.props.onRef(this);
        var me = this.props.tinode.getCurrentUserID();
        //var contactNodes = [];
        var instance = this;
        var showCheckmark = Array.isArray(this.props.topicSelected);
       
        var  contactList =[];
        if (this.props.contacts && this.props.contacts.size() > 0) {
          var ascIndex = 0;
            for(var index = 0; index < this.props.contacts.size(); index++) {//遍历链表
                var data = this.props.contacts.getVal(index).data;
                //console.log("size="+data.length )
                if(data.length === 1){
                   continue;
                   ascIndex++;
                }
                   


               data.map(function(c) {
                var key = c.topic ? c.topic : c.user;
                 var isletter=c.ac === null?true:false;
                 ascIndex++;
                // If filter function is provided, filter out the items
                // which don't satisfy the condition.
                if (instance.props.filterFunc && instance.props.filter) {
                    var content = [key];
                    if (c.private && c.private.comment) {
                        content.push(("" + c.private.comment).toLowerCase());
                    }
                    if (c.public && c.public.fn) {
                        content.push(("" + c.public.fn).toLowerCase());
                    }
                    if (!instance.props.filterFunc(instance.props.filter, content)) {
                        return;
                    }
                }

                var selected = showCheckmark ?
                    (this.props.topicSelected.indexOf(key) > -1) :
                    (this.props.topicSelected === key);
                var badges = [];
                if (this.props.showMode) {
                    if (key === me) {
                        badges.push({name: 'you', color: 'green'});
                    }
                    if (c.acs && c.acs.isOwner()) {
                        badges.push({name: 'owner'});
                    }
                }
                var comment = Array.isArray(c.private) ?
                    c.private.join(", ") : (c.private ? c.private.comment : null);

                this.state.contactNodes.push(
                    <AddressBook
                        title={c.public ? c.public.fn : null}
                        avatar={makeImageUrl(c.public ? c.public.photo : null)}
                        comment={comment}
                        unread={this.props.showUnread ? c.unread : 0}
                        now={c.online && this.props.connected}
                        acs={c.acs}
                        showMode={this.props.showMode}
                        badges={badges}
                        showCheckmark={showCheckmark}
                        selected={selected}
                        showOnline={this.props.showOnline}
                        onSelected={this.props.onTopicSelected}
                        showContextMenu={this.props.showContextMenu}
                        item={key}
                        ascIndex={ascIndex}
                        isletter={isletter}
                        index={this.state.contactNodes.length}
                        key={key} />
                );
            this.state.contactList = this.state.contactNodes;
            }, this);
            }
        }
      }
      onClickF(value){
    //     失效，无法再codepen的iframe展示，换方法
        
        // console.log(window.location.href);
        // // window.location.href = "";
        // let url  = window. window.location.origin+window.location.pathname +"?anchor="+value;
        // // console.log(url);
        // window.location.assign(url);
        //var anchorElement = document.getElementById(value);
            // 如果对应id的锚点存在，就跳转到锚点
          // anchorElement.scrollIntoView(); 
        this.setState({
          anchor : value,
        })
        
      }
    showContactsView(){
        this.setState({
          showSearch : true,
        })
      }
    handelSearchContact(){
        var skey = this.state.searchKey;
        var newNode=[];
        this.state.contactList.map(function(c){
         // console.log(c.props.title);
         // console.log(skey);
          var fnName = c.props.title;
         /* newNode.push(c);*/
          if(fnName.indexOf(skey)>-1){
           newNode.push(c);
          }

        }, this);
        this.setState({contactNodes:newNode, showSearch : false});
      }
   
  

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handelSearchContact(e);
        }
    }

    handleClear() {
        if (this.state.searchKey) {
            this.props.onSearchContacts(DEL_CHAR);
        }
        this.setState({searchKey: '',  showSearch : false});
    }
    render() {
     const { classes } = this.props;
        this.ifHasAnchorJustScorll();
        return (
            <div id="menuTab" className={this.props.noScroll ? null : "scrollable-panel"}>
            {this.state.showSearch? 
              <div className="panel-form">
                    <div className="panel-form-row">
                        <i className="material-icons search">search</i>
                        <input className="search" type="text"
                               placeholder="请输入关键字"
                               value={this.state.search} onChange={this.handleSearchChange}
                               onKeyPress={this.handleKeyPress} required autoFocus />
                        <a href="javascript:;" onClick={this.handleClear}>
                            <i className="material-icons">close</i>
                        </a>
                    </div>
                </div>:
                <div>
                <div className="chatLeft">
                    {this.state.contactNodes.length > 0 ?
                        <ul className="contact-box">
                            {this.state.contactNodes}
                        </ul>
                        :
                        <div className="center-medium-text">
                            {this.props.emptyListMessage}
                        </div>}
                </div>
                <div className="chatRight">
                        <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("#")}}>#</a></p>
                        <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("A")}}>A</a></p>
                        <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("B")}}>B</a></p>
                        <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("C")}}>C</a></p>
                        <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("D")}}>D</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("E")}}>E</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("F")}}>F</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("G")}}>G</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("H")}}>H</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("I")}}>I</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("J")}}>J</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("K")}}>K</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("L")}}>L</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("M")}}>M</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("N")}}>N</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("O")}}>O</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("P")}}>P</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("Q")}}>Q</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("R")}}>R</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("S")}}>S</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("T")}}>T</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("U")}}>U</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("V")}}>V</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("W")}}>W</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("X")}}>X</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("Y")}}>Y</a></p>
                         <p><a href="javascript:void(0);" onClick={()=>{this.onClickF("Z")}}>Z</a></p>
                  </div>
              </div>
            }
            </div>
        );
    }
};

   

/* END AddressBookList */

export default  withStyles(navbarsStyle) (AddressBookList);