import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {updateFavicon} from '../lib/utils';
import {makeImageUrl} from '../lib/blob-helpers'
import AddressBookList from './AddressBookList';
import {sortPY} from '../lib/makePy';
import NewTopicView from './NewTopicView';

/* eslint-disable */

/* ContactsView holds all contacts-related stuff */
/* ContactsView holds all contacts-related stuff */
/* ContactsView holds all contacts-related stuff */
class AddressBookView extends React.Component {
    
    constructor(props) {
        super(props);

        this.prepareContactList = this.prepareContactList.bind(this);

        this.state = {
            contactList: this.prepareContactList()
        };

        this.tnMeContactUpdate = this.tnMeContactUpdate.bind(this);
        this.tnMeSubsUpdated = this.tnMeSubsUpdated.bind(this);
        this.resetContactList = this.resetContactList.bind(this);

        var me = this.props.tinode.getMeTopic();
        me.onContactUpdate = this.tnMeContactUpdate;
        me.onSubsUpdated = this.tnMeSubsUpdated;
    }

    componentWillUnmount() {
        var me = this.props.tinode.getMeTopic();
        me.onContactUpdate = undefined;
        me.onSubsUpdated = undefined;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.topicSelected !== nextProps.topicSelected) {
            // If topicSelecetd is changed externally, update the
            // topic with online status and access mode.
            for (var i=0;i<this.state.contactList.length;i++) {
                var c = this.state.contactList[i];
                if (c.topic === nextProps.topicSelected) {
                    nextProps.onOnlineChange(c.online);
                    nextProps.onAcsChange(c.acs);
                    break;
                }
            }
        }
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
            if (c.topic.indexOf('usr') === 0) {
                contactsNames.push(c);
                c.user = c.topic;
            }
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
     componentDidMount(){
        this.props.onRef(this);
    }
     onRef = (e) => {

        this.modal = e

        }
    showContactsView(){
        this.modal.showContactsView();
    }

    render() {
        return (
            <AddressBookList
                tinode={this.props.tinode}
                connected={this.props.connected}
                contacts={this.state.contactList}
                emptyListMessage={<span>您没有好友<br />¯\_(ツ)_/¯</span>}
                topicSelected={this.props.topicSelected}
                showOnline={true}
                showUnread={true}
                onRef={this.onRef}
                onSearchContacts={this.props.onSearchContacts}
                onTopicSelected={this.props.onTopicSelected}
                showContextMenu={this.props.showContextMenu} />
        );
    }
};
/* END Contact list */

export default AddressBookView;
/* END Contact list */