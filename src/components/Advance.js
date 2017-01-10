/* global ipcRenderer remote */
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, Intent } from '@blueprintjs/core';

import { toggleAdvanceDialog } from '../actions/advance';

const Advance = ({ isOpen, requestToggleAdvanceDialog }) => (
  <Dialog
    iconName="add"
    isOpen={isOpen}
    onClose={() => requestToggleAdvanceDialog()}
    title="Advanced Mode"
  >
    <div className="pt-dialog-body">
      <label className="pt-label pt-inline" htmlFor="name">
        Application name
        <div className="pt-input-group">
          <input
            name="name"
            className="pt-input"
            style={{ width: 200 }}
            type="text"
            placeholder="Application name"
            dir="auto"
          />
        </div>
      </label>
      <label className="pt-label pt-inline" htmlFor="url">
        Application URL
        <div className="pt-input-group">
          <input
            name="url"
            className="pt-input"
            style={{ width: 200 }}
            type="text"
            placeholder="Application URL"
            dir="auto"
          />
        </div>
      </label>
      <label className="pt-label pt-inline" htmlFor="icon">
        Application icon
        <div className="pt-input-group">
          <input
            name="icon"
            className="pt-input"
            style={{ width: 200 }}
            type="text"
            placeholder="Application name"
            dir="auto"
          />
        </div>
      </label>
    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions">
        <Button
          text="Install"
          intent={Intent.PRIMARY}
          onClick={() => requestToggleAdvanceDialog()}
        />
        <Button text="Close" onClick={() => requestToggleAdvanceDialog()} />
      </div>
    </div>
  </Dialog>
);

Advance.propTypes = {
  isOpen: React.PropTypes.bool,
  requestToggleAdvanceDialog: React.PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.advance.isOpen,
});

const mapDispatchToProps = dispatch => ({
  requestToggleAdvanceDialog: () => {
    dispatch(toggleAdvanceDialog());
  },
});


export default connect(
  mapStateToProps, mapDispatchToProps,
)(Advance);
