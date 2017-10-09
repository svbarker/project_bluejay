import React from "react";
import FlatButton from "material-ui/FlatButton";

//STATUSES: stable, pending, resolved
//PASS ME A RESOLVE FUNCTION, AND A wait
//this.props.wait = time until action resolves in seconds
//this.props.tickDown = <Boolean> True, displays a countdown

class Undoable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "stable",
      countDown: this.props.wait || 3,
      timerCallback: undefined,
      tickDown: undefined,
      wait: this.props.wait || 3
    };
  }
  onUndo = () => {
    clearInterval(this.state.timerCallback);
    clearInterval(this.state.tickDown);
    this.setState({ status: "stable", tickDown: this.state.wait });
  };
  onComplete = () => {
    console.log("calling resolve");
    this.props.resolve();
    this.setState({ status: "stable" });
  };
  onBecomePending = () => {
    this.setState({
      timerCallback: setTimeout(this.onComplete, 1000 * this.state.wait),
      tickDown: setInterval(this.onTick, 1000),
      status: "pending"
    });
  };

  //tick the countDown down if you want
  onTick = () => {
    const newTime = this.state.countDown - 1;
    this.setState({ countDown: newTime });
  };
  onClick = e => {
    e.stopPropagation();
    if (this.props.disabled) return null;
    this.onBecomePending();
  };
  componentWillUnmount = () => {
    //run the thing
    if (this.state.status === "pending") {
      this.onComplete();
    }
    ///take off the timeouts
    clearInterval(this.state.timerCallback);
    clearInterval(this.state.tickDown);
  };

  render() {
    if (this.state.status === "pending") {
      if (this.props.pendingView) {
        return this.props.pendingView;
      } else {
        const timeDisplay = this.props.tickDown
          ? ` ${this.state.countDown}`
          : "";
        return (
          <div>
            <FlatButton
              label={`Undo?${timeDisplay}`}
              onClick={this.onUndo}
              secondary={true}
            />
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
