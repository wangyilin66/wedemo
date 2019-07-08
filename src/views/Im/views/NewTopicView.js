import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {vcard,DEL_CHAR} from '../lib/utils';
import HashNavigation from '../lib/navigation.js';
import ContactList from '../widgets/contact-list';
import AvatarUpload from '../widgets/avatar-upload';
import TagManager from '../widgets/tag-manager'
import {sortPY} from '../lib/makePy';
import {sortPYArray} from '../lib/makePy';
import AddressBookView  from './AddressBookView';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ChipInput from '../widgets/chip-input';
/* eslint-disable */

/* BEGIN Create new topic and invite users or send an invite */
/* BEGIN Create new topic and invite users or send an invite */
class NewTopicView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          //  tabSelected: "p2p",
            tabSelected:"contacts",
            searchQuery: props.contactsSearchQuery,
            //contactList: props.foundContacts,
            contactSelected: null,
            contactList: this.prepareContactList(),
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleContactSelected = this.handleContactSelected.bind(this);
        this.handleNewGroupSubmit = this.handleNewGroupSubmit.bind(this);
        this.handleGroupByID = this.handleGroupByID.bind(this);
        this.tnMeContactUpdate = this.tnMeContactUpdate.bind(this);
        this.tnMeSubsUpdated = this.tnMeSubsUpdated.bind(this);
        this.resetContactList = this.resetContactList.bind(this);
    //    this.onSearchContacts =  this.handSearchContacts.hind(this);

        var me = this.props.tinode.getMeTopic();
        me.onContactUpdate = this.tnMeContactUpdate;
        me.onSubsUpdated = this.tnMeSubsUpdated;
    }

    componentDidMount() {
        this.props.onInitFind();
          var me = this.props.tinode.getMeTopic();
        me.onContactUpdate = undefined;
        me.onSubsUpdated = undefined;
        this.props.onRef(this);
    }

    showContacts(){
       // e.preventDefault();
       window.location.hash = HashNavigation.addUrlParam(window.location.hash, 'tab', 'contacts');
        //window.location.hash = addUrlParam(window.location.hash, 'tab', 'contacts');
        this.setState({tabSelected: 'contacts', contactSelected: null});

        this.child.showContactsView();
    }
    showP2P(){
        window.location.hash = addUrlParam(window.location.hash, 'tab', 'p2p');
        this.setState({tabSelected: 'p2p', contactSelected: null});
    }
    showGrp(){
        window.location.hash = addUrlParam(window.location.hash, 'tab', 'grp');
        this.setState({tabSelected: 'grp', contactSelected: null});
    }
    onRef = (ref) => {
        this.child = ref
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            searchQuery: nextProps.contactsSearchQuery,
            contactList: nextProps.foundContacts
        });
         if (this.props.topicSelected !== nextProps.topicSelected) {
            // If topicSelecetd is changed externally, update the
            // topic with online status and access mode.
            /*for (var i=0;i<this.state.contactList.length;i++) {
                var c = this.state.contactList[i];
                if (c.topic === nextProps.topicSelected) {
                    //nextProps.onOnlineChange(c.online);
                    //nextProps.onAcsChange(c.acs);
                    break;
                }
            }*/
        }
    }

    handleTabClick(e) {

        e.preventDefault();
        this.setState({searchOpen:true});
        window.location.hash = addUrlParam(window.location.hash, 'tab', e.currentTarget.dataset.id);
        this.setState({tabSelected: e.currentTarget.dataset.id, contactSelected: null});
    }
     handSearchContacts(e) {

        e.preventDefault();
        this.setState({searchOpen:true});
        window.location.hash = addUrlParam(window.location.hash, 'tab', "contacts");
        this.setState({tabSelected: "contacts", contactSelected: null});
    }

    handleContactSelected(sel) {
        if (this.state.tabSelected === "p2p") {
            window.location.hash = HashNavigation.removeUrlParam(window.location.hash, 'tab');
            this.props.onCreateTopic(sel, undefined);
        }
    }


    handleNewGroupSubmit(name, dataUrl, priv, tags,added) {
        window.location.hash = HashNavigation.removeUrlParam(window.location.hash, 'tab');
        this.props.onCreateTopic(undefined, vcard(name, dataUrl), priv, tags,added);
    }

    handleGroupByID(topicName) {
        window.location.hash = HashNavigation.removeUrlParam(window.location.hash, 'tab');
       
        this.props.onCreateTopic(topicName);
    }
      // Reactions to updates to the contact list.
    tnMeContactUpdate(what, cont) {
        if (what === "on" || what === "off") {
            this.resetContactList();
            if (this.props.topicSelected === cont.topic) {
                this.props.onOnlineChange(what === "on");
            }
        } else if (what === "read") {
            this.resetContactList();
        } else if (what === "msg") {
            // New message received
            // Skip update if the topic is currently open, otherwise the badge will annoyingly flash.
            if (this.props.topicSelected !== cont.topic) {
                // Disable sound for now. Need to add a config option.
                // POP_SOUND.play();
                this.resetContactList();
            } else if (document.hidden) {
                // Disable sound for now.
                // POP_SOUND.play();
            }
        } else if (what === "recv") {
            // Explicitly ignoring "recv" -- it causes no visible updates to contact list.
        } else if (what === "gone" || what === "unsub") {
            // Topic deleted or user unsubscribed. Remove topic from view.
            // If the currently selected topic is gone, clear the selection.
            if (this.props.topicSelected === cont.topic) {
                this.props.onTopicSelected(null);
            }
            // Redraw without the deleted topic.
            this.resetContactList();
        } else if (what === "acs") {
            // Permissions changed. If it's for the currently selected topic,
            // update the views.
            if (this.props.topicSelected === cont.topic) {
                this.props.onAcsChange(cont.acs);
            }
        } else if (what === "del") {
            // messages deleted (hard or soft) -- update pill counter.
        } else {
            // TODO(gene): handle other types of notifications:
            // * ua -- user agent changes (maybe display a pictogram for mobile/desktop).
            // * upd -- topic 'public' updated, issue getMeta().
            console.log("Unsupported (yet) presence update:" + what + " in: " + cont.topic);
        }
    }
tnMeSubsUpdated(names) {
        this.resetContactList();
    }

     prepareContactList() {
       var instance = this;
        var contactsNames = [];
        var contacts = [];//new LinkedList();
        var unreadThreads = 0;
        this.props.tinode.getMeTopic().contacts(function(c) {
            // Force to integers;
           // c.seq = ~~c.seq;
           // c.read = ~~c.read;
           // c.unread = c.seq - c.read;
           // unreadThreads += c.unread > 0 ? 1 : 0;
            // console.log("---------");
            //console.log(c.public.fn);
            //linkList=sortPY(c.public.fn);
            // console.log(sortPY(c.public.fn));;
            contactsNames.push(c);
            if (instance.props.topicSelected === c.topic) {
                //instance.props.onOnlineChange(c.online);
                //instance.props.onAcsChange(c.acs);
            }
        }, this);
         contacts=sortPY(contactsNames);
      /**  for(var i=0;i<contacts.size();i++){
              console.log(contacts.getVal(i).data);
        }
      
        contacts.sort(function(a,b){
            return b.touched - a.touched;
        });
        updateFavicon(unreadThreads);*/
        return contacts;
    }

    resetContactList() {
        this.setState({contactList: this.prepareContactList()});
    }

    render() {
        return (
             <div className="flex-column">
                {this.state.tabSelected === "contacts" ?
                    <AddressBookView
                        tinode={this.props.tinode}
                        connected={this.props.connected}
                        topicSelected={this.props.topicSelected}
                        showContextMenu={this.props.showContextMenu}
                        onTopicSelected={this.props.onTopicSelected}
                        onAcsChange={this.props.onAcsChange}
                        onRef={this.onRef}
                        onOnlineChange={this.props.onOnlineChange} />
                           : 
                this.state.tabSelected === "grp" ?
                    <NewTopicGroup 
                    tinode={this.props.tinode}
                    onSubmit={this.handleNewGroupSubmit}
                    contacts={this.props.foundContacts} /> :
                    this.state.tabSelected === "byid" ?
                        <NewTopicById
                            onSubmit={this.handleGroupByID}
                            onError={this.props.onError} /> :
                        <div className="flex-column">
                            <SearchContacts type="p2p"
                                            searchQuery={this.state.searchQuery}
                                            onSearchContacts={this.props.onSearchContacts} />
                      <ContactList
                      tinode={this.props.tinode}
                                contacts={this.state.contactList}
                                emptyListMessage="搜索聊天对象"
                                topicSelected={this.state.selectedContact}
                                showOnline={false}
                                showUnread={false}
                                showContextMenu={false}
                                onTopicSelected={this.handleContactSelected} />
                        </div>}
            </div>
        );
    }
};

//members:[],contacts:联系人
class NewTopicGroup extends React.PureComponent {

    prepareContactList() {
       var instance = this;
        var contactsNames = [];
        var contacts = [];//new LinkedList();
        var unreadThreads = 0;
      
        this.props.tinode.getMeTopic().contacts(function(c) {
            // Force to integers;
           // c.seq = ~~c.seq;
           // c.read = ~~c.read;
           // c.unread = c.seq - c.read;
           // unreadThreads += c.unread > 0 ? 1 : 0;
            // console.log("---------");
            //console.log(c.public.fn);
            //linkList=sortPY(c.public.fn);
            // console.log(sortPY(c.public.fn));;
            if (c.topic.indexOf('usr') === 0) {
                contactsNames.push(c);
                c.user = c.topic;
            }
            // if (instance.props.topicSelected === c.topic) {
            //     instance.props.onOnlineChange(c.online);
            //     instance.props.onAcsChange(c.acs);
            // }
        }, this);
         contacts=sortPYArray(contactsNames);
      /**  for(var i=0;i<contacts.size();i++){
              console.log(contacts.getVal(i).data);
        }
      
        contacts.sort(function(a,b){
            return b.touched - a.touched;
        });
        updateFavicon(unreadThreads);*/
        return contacts;
    }

    constructor(props) {
        super(props);

        var me = this.props.tinode.getMeTopic();
        me.user = this.props.tinode.getCurrentUserID();
        var members=[me];
        this.state = {
            fn: '', // full/formatted name
            private: '',
            imageDataUrl: null,
            tags: [],
            requiredMember:me.user,
            members: members,//props.members,
            index: NewTopicGroup.indexMembers(members),
            contactFilter: '',
            noContactsMessage: '您还没有好友 :-(',
            contacts:this.prepareContactList(),
            selectedContacts: NewTopicGroup.selectedContacts(members)
        };

        this.handleFnChange = this.handleFnChange.bind(this);
        this.handlePrivateChange = this.handlePrivateChange.bind(this);
        this.handleImageChanged = this.handleImageChanged.bind(this);
        this.handleTagsChanged = this.handleTagsChanged.bind(this);
        this.handleTagsChanged = this.handleTagsChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 

        this.handleContactSelected = this.handleContactSelected.bind(this);
        this.handleMemberRemoved = this.handleMemberRemoved.bind(this);
        this.handleContactFilter = this.handleContactFilter.bind(this);
    }

    handleFnChange(e) {
        this.setState({fn: e.target.value});
    }

    handlePrivateChange(e) {
        this.setState({private: e.target.value});
    }

    handleImageChanged(img) {
        this.setState({imageDataUrl: img});
    }

    handleTagsChanged(tags) {
        this.setState({tags: tags});
    }

    handleSubmit(e) {
        //先创建group，拉入联系人
        e.preventDefault();
        if (this.state.fn && this.state.fn.trim()) {
            var instance = this;
            var members = [];
            var added = [];
            var removed = [];

            var keys = Object.keys(this.state.index);
            keys.map(function(k) {
                if (instance.state.index[k].present) {
                    members.push(k);
                }

                if (instance.state.index[k].delta > 0) {
                    added.push(k);
                } else if (instance.state.index[k].delta < 0) {
                    removed.push(k);
                }
            });

            this.props.onSubmit(this.state.fn.trim(),
                this.state.imageDataUrl, this.state.private.trim(),
                this.state.tags,added);
        }
    }

    static indexMembers(members) {
        var index = {};
        members.map(function(m) {
            index[m.user] = {delta: 0, present: true}; // Delta: 0 unchanged, +1 added, -1 removed
        });
        return index;
    }

    static selectedContacts(members) {
        var sel = [];
        members.map(function(m) {
            sel.push(m.user);
        });
        return sel;
    }

    handleMemberRemoved(userId, index) {
        var status = this.state.index[userId];
        if (!status || !status.present) {
            return;
        }
        status.present = false;
        status.delta -= 1;

        var m = this.state.members.slice();
        m.splice(index, 1);

        var sel = NewTopicGroup.selectedContacts(m);

        var i = this.state.index;
        i[userId] = status;

        this.setState({members: m, index: i, selectedContacts: sel});
    }

    handleContactFilter(val) {
        var msg = !val ?
            "你还没有联系人 :-(" :
            "未找到匹配的联系人 '" + val + "'";

        this.setState({contactFilter: val, noContactsMessage: msg});
    }

    static doContactFiltering(filter, values) {
        if (filter) {
            for (var i = 0; i < values.length; i++) {
                if (values[i].indexOf(filter) >= 0) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }


    handleContactSelected(userId, index) {
        var status = this.state.index[userId];
        if (status) {
            if (status.present) {
                // Prevent duplicate members
                return;
            }
            status.delta += 1;
            status.present = true;
        } else {
            status = {delta: 1, present: true};
        }

        var m = this.state.members.slice();
        m.push(this.state.contacts[index]);

        var sel = NewTopicGroup.selectedContacts(m);

        var i = this.state.index;
        i[userId] = status;

        this.setState({members: m, index: i, selectedContacts: sel});
    }


    render() {
        var submitClasses = "blue";
        if (this.props.disabled) {
            submitClasses += " disabled";
        }
        return (
            <form className="panel-form" onSubmit={this.handleSubmit}>
                <div className="panel-form-row">
                    <div className="panel-form-column">
                        <label className="small" htmlFor="new-topic-fn">编组名称</label>
                        <input type="text" id="new-topic-fn" placeholder="自定义编组名称"
                               value={this.state.fn} onChange={this.handleFnChange} autoFocus required />
                        <br />
                        <label className="small" htmlFor="new-topic-priv">编组描述</label>
                        <input type="text" id="new-topic-priv" placeholder="仅对您可见"
                               value={this.state.private} onChange={this.handlePrivateChange} />
                    </div>
                    <AvatarUpload
                        onError={this.props.onError}
                        onImageChanged={this.handleImageChanged} />
                </div>
                <TagManager
                    tags={this.state.tags}
                    activated={true}
                    onTagsChanged={this.handleTagsChanged}
                    title="可选标签 (查找发现)" />

                <div className="panel-form-row">
                    <ChipInput
                        chips={this.state.members}
                        required={this.state.requiredMember}
                        prompt="添加成员"
                        filterFunc={this.handleContactFilter}
                        onChipRemoved={this.handleMemberRemoved} />
                </div>
                <ContactList
                    //联系人
                    contacts={this.state.contacts}
                    topicSelected={this.state.selectedContacts}
                    filter={this.state.contactFilter}
                    filterFunc={NewTopicGroup.doContactFiltering}
                    emptyListMessage={this.state.noContactsMessage}
                    showOnline={false}
                    showUnread={false}
                    onTopicSelected={this.handleContactSelected} />
                <div className="dialog-buttons">
                    <button className={submitClasses}>创建</button>
                </div>
            </form>
        );
    }
};

class SearchContacts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edited: false,
            search: props.searchQuery
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillUnmount() {
        if (this.state.search) {
            this.setState({search: ''});
            this.props.onSearchContacts(DEL_CHAR);
        }
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value});
    }

    handleSearch(e) {
        e.preventDefault();
        var query = this.state.search.trim();
        if (query.length > 0) {
            this.setState({edited: true});
            //query="name:"+query;
            this.props.onSearchContacts(query);
        }
    }

    handleClear() {
        if (this.state.edited || this.state.search) {
            this.props.onSearchContacts(DEL_CHAR);
        }
        this.setState({search: '', edited: false});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch(e);
        }
    }

    render() {
        return (
            <div className="panel-form">
                <div className="panel-form-row">
                    <i className="material-icons search">search</i>
                    <input className="search" type="text"
                           placeholder="输入用户名称"
                           value={this.state.search} onChange={this.handleSearchChange}
                           onKeyPress={this.handleKeyPress} required autoFocus />
                    <a href="javascript:;" onClick={this.handleClear}>
                        <i className="material-icons">close</i>
                    </a>
                </div>
            </div>
        );
    }
};

class NewTopicById extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            groupId: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({groupId: e.target.value});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.groupId) {
            var name = this.state.groupId.trim();
            if (name.length > 0) {
                this.props.onSubmit(name);
            } else {
                this.props.onError("无效的用户名", "err");
            }
        }
    }

    render() {
        return (
            <div className="panel-form">
                <div className="panel-form-row">
                    <input type="text" placeholder="用户或编组名称"
                           value={this.state.groupId} onChange={this.handleChange}
                           onKeyPress={this.handleKeyPress} required />
                </div>
                <div className="dialog-buttons">
                    <button className="blue" onClick={this.handleSubmit}>添加好友或编组</button>
                </div>
            </div>
        );
    }
};
export default  NewTopicView;
/* END Create new topic and invite users or send an invite */