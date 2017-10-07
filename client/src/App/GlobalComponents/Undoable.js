import React from "react";
import FlatButton from "material-ui/FlatButton";

//STATUSES: stable, pending, resolved
//PASS ME A RESOLVE FUNCTION, AND A wait
//this.props.wait = time until action resolves in seconds

class Undoable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "stable",
      countDown: 15,
      timerCallback: undefined,
      wait: this.props.wait || 3
    };
  }
  onUndo = () => {
    clearInterval(this.state.timerCallback);
    this.setState({ status: "stable" });
  };
  onComplete = () => {
    this.props.resolve();
    this.setState({ status: "stable" });
  };
  onBecomePending = () => {
    this.setState({
      timerCallback: setTimeout(this.onComplete, 1000 * this.state.wait),
      status: "pending"
    });
  };

  //tick the countDown down if you want
  // onTick = () => {
  //   return null;
  // };
  onClick = e => {
    e.stopPropagation();
    if (this.props.disabled) return null;
    this.onBecomePending();
  };
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
            <FlatButton label="Undo?" onClick={this.onUndo} secondary={true} />
          </div>
        );
      }
    } else if (this.state.status === "stable") {
      return <div onClick={this.onClick}>{this.props.children}</div>;
    } else if (this.state.status === "resolved") {
      return <div>You shouldn't see this </div>;
    }
  }
}

export default Undoable;
