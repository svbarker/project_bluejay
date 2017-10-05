import React from "react";
import FlatButton from "material-ui/FlatButton";

class Undoable extends React.Component {
  constructor(props) {
    super(props);
    //STATUSES: stable, pending, resolved
    //PASS ME A RESOLVE FUNCTION, AND A TOTALTIME
    this.state = {
      status: "stable",
      countDown: 15,
      timerCallback: undefined,
      totalTime: this.props.totalTime || 3
    };
  }
  onUndo = () => {
    clearInterval(this.state.timerCallback);
    this.setState({ status: "stable" });
  };
  onComplete = () => {
    // console.log("thing is done");
    this.setState({ status: "resolved" });
    this.props.resolve();
  };
  onBecomePending = () => {
    this.setState({
      timerCallback: setTimeout(this.onComplete, 1000 * this.state.totalTime),
      status: "pending"
    });
  };

  //tick the countDown down if you want
  // onTick = () => {
  //   return null;
  // };
  componentWillUnmount = () => {
    //run the thing
    if (this.state === "pending") this.onComplete();

    ///take off the timeouts
    clearInterval(this.state.timerCallback);
  };

  render() {
    if (this.state.status === "pending") {
      if (this.props.pendingView) {
        return this.props.pendingView;
      } else {
        return (
          <div>
            <FlatButton label="Undo?" onClick={this.onUndo} />
          </div>
        );
      }
    } else if (this.state.status === "stable") {
      return <div onClick={this.onBecomePending}>{this.props.children}</div>;
    } else if (this.state.status === "resolved") {
      return <div>Nothing here now</div>;
    }
  }
}

export default Undoable;
