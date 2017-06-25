import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

import {
  close,
  update,
} from '../../actions/dialogs/submit-app';

const styleSheet = createStyleSheet('SubmitApp', {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    minWidth: 240,
  },
});

const SubmitApp = (props) => {
  const {
    classes,
    Name,
    onClose,
    onUpdate,
    open,
    Url,
  } = props;

  // TODO: Implement
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog
      className={classes.root}
      onRequestClose={onClose}
      open={open}
      transition={<Slide direction="up" />}
    >
      <DialogTitle>Submit new app</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          id="name"
          label="Name"
          marginForm
          onChange={e => onUpdate({ Name: e.target.value })}
          placeholder="e.g. Gmail"
          value={Name}
        />
        <TextField
          id="url"
          label="URL"
          marginForm
          onChange={e => onUpdate({ Url: e.target.value })}
          placeholder="e.g. gmail.com"
          value={Url}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SubmitApp.defaultProps = {
  Name: '',
  open: false,
  Url: '',
};

SubmitApp.propTypes = {
  classes: PropTypes.object.isRequired,
  Name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  Url: PropTypes.string,
};

const mapStateToProps = state => ({
  Name: state.dialogs.submitApp.form.Name,
  open: state.dialogs.submitApp.open,
  Url: state.dialogs.submitApp.form.Url,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(close()),
  onUpdate: changes => dispatch(update(changes)),
});

export default
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(SubmitApp));
