import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import HelpIcon from "@material-ui/icons/Help";
import { Button, Card, Checkbox,
  FormControlLabel, Grid, Input,
  Tooltip, Typography } from '@material-ui/core';

import MergeTemplateInputForm from './MergeTemplateInputForm';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// import { actionCreators } from '../../store/MergeTemplates';

class TitlePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      merge_title: "",
      formInput: false
    }; // initialize empty merge title

    // this.checkTitleInput = this.checkTitleInput.bind(this); // bind the function (know the instance of 'this')
    this.updateTextInput = this.updateTextInput.bind(this);
    this.updateFormInput = this.updateFormInput.bind(this);
  }

  componentWillMount() {
    // This method runs when the component is first added to the page
    // const sheetId = ""; // TODO: get sheetId 
    // this.props.requestMergeTemplates(sheetId);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    // const sheetId = ""; // TODO: get sheetId 
    // this.props.requestMergeTemplates(sheetId);
  }

  // checkTitleInput(event) {
  //   this.setState({ merge_title: event.target.value })
  // }

  updateTextInput(newInput) {
    this.setState({ merge_title: newInput })
    // const currentInputFormState = this.inputFormState.current;
    // return(!currentInputFormState.state.title)
  }

  updateFormInput(newInput) {
    this.setState({ formInput: newInput })
  }

  render() {

    const testData = {
      title: "Hello!",
      timestampColumn: {
        shouldPrefixNameWithMergeTemplateTitle: true
      }
    }

    console.log('Hello!' + this.props); //what we could do is get the id from the path... or do something else??
    return (
      <Grid
        container
        style={styles.container}
      >
        <MergeTemplateInputForm
          title="What should this merge template be called?"
          mergeTemplateInfo={testData}
          textInput="placeholder"
          textInputCallback={this.updateTextInput}
          formInput="Use this title as timestamp column name?"
          formInputCallback={this.updateFormInput}
          tip="This title will help you differentiate this merge from others."
        />
        {/* <Card style={styles.card}>
          <Typography variant="h5" gutterBottom>What should this merge template be called?</Typography>
          <Input name="title_input" placeholder="Title" onChange={this.checkTitleInput}/>
          <FormControlLabel
            control={ <Checkbox color="primary" style={{position: "relative", top: 0}}/> }
            label={ <Typography variant="caption">Use this title as timestamp column name?</Typography> }
            labelPlacement="end"
            style={{paddingTop: 10}}
          />
          <Tooltip title="This title will help you differentiate this merge from others." style={{paddingTop: 10}}><HelpIcon/></Tooltip>
        </Card> */}
        <Link to="/">
          <Button
            variant="contained"
            style={styles.cancel_button}
          >
            Cancel
          </Button>
        </Link>
        <Button
          color="primary"
          variant="contained"
          style={styles.next_button}
          onClick={() => console.log("State: ", this.state)}
          disabled={!this.state.merge_title}>
            Next
        </Button>
      </Grid>
    );
  }
}

const styles = {
  container: {
    paddingTop: 15,
    alignItems: "center",
    // justifyContent: "center"
  },
  card: {
    // alignItems: "center",
    // display: "flex",
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    justifyContent: "center",
    // justify: "center"
    // backgroundColor: "blue"
  },
  cancel_button: {
    position: "absolute",
    bottom: 15,
    left: 15
  },
  next_button: {
    position: "absolute",
    bottom: 15,
    right: 15
  },
  item_: {

  }
}

// export default connect(
//   state => state.mergeTemplates,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )(TitlePage);


const mapDispatchToProps = dispatch => {
  return {
    fetchMergeTemplatesIfNeeded: () =>
      dispatch({
        type: 'FETCH_MERGE_TEMPLATES'
      })
  }
  
  }

  // function  mapStateToProps(state) {
  //   return {

  //   }
  // }

  export default connect(
    state => state.mergeTemplates,
    mapDispatchToProps
  )(TitlePage); //Styles??
  