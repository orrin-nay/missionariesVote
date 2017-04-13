import React from "react";
import BarChart from 'react-bar-chart';

import * as UserVoteActions from "../actions/UserVoteActions";
import UserVoteStore from "../stores/UserVoteStore";

export default class UserVoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showGraph: false
    }
  }
  componentWillMount() {
    UserVoteStore.on("RECIVED_GRAPH_DATA", this.showGraph.bind(this));
    UserVoteActions.getGraphData();
  }
  componentWillUnmount() {
    UserVoteStore.removeListener("RECIVED_GRAPH_DATA", this.showGraph.bind(this));
  }
  showGraph() {
    this.setState({
      showGraph: true
    });
  }
  render() {
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
        return(
        <div>
          {this.state.showGraph?
                      <div style={{width: '50%'}}>
                          <BarChart ylabel='votes'
                            width={600}
                            height={400}
                            margin={margin}
                            data={UserVoteStore.graphData}/>
                      </div>
                  :null}
              </div>
        );
      }
    };
