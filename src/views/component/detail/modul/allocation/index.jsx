
import React, { Component, } from 'react';
import { Modal, Button, } from 'antd';
import CollectionCreateForm from './Personnel';
import './css/index.css';
export class Personnel extends Component {
  state = {
      visible: false,
  };

  showModal = () => {
      this.setState({ visible: true, });
  };

  handleCancel = () => {
      this.setState({ visible: false, });
  };

  handleCreate = () => {
      const { form, } = this.formRef.props;
      form.validateFields((err, values) => {
          if (err) {
              return;
          }

          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false, });
      });
  };

  saveFormRef = formRef => {
      this.formRef = formRef;
  };
  render() {
      return (
          <div>
              <div className="operBtn Personnel" type="primary" onClick={this.showModal}>
                  <span>人员分配</span>
              </div>
              <CollectionCreateForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
              >
              </CollectionCreateForm>
          </div>
      );
  }
}

export default Personnel;