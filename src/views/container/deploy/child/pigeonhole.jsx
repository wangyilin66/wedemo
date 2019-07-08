import React, { Component, } from 'react';
import { connect, } from 'react-redux';

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        console.log(this.props.caseId);

    }
    render() {
        return (
            <div>
                案件归档
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.PelouedCaseID)
    const caseId = state.PelouedCaseID.CaseId;
    return {
        caseId: caseId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(componentName);