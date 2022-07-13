import React from "react";


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          counter : props.counter,
        };
        this.is_end = false;
        if (this.props.timer === true) {
            this.timeInterval = setInterval(this.timerAction, 1000);
        }
        this.incTime = this.incTime.bind(this);
    }

    timerAction = () =>
    {
        if (this.state.counter === 0) {
            clearInterval(this.timeInterval);
            this.is_end = true;
        }
       this.setState(
           {
               counter : this.state.counter - 1,
           }
       );
    }

    incTime(events)
    {
        console.log(events);
        this.setState(
            {
                counter : this.state.counter + 1,
            }
        )
    }

    redTime = (events) =>
    {
        this.setState(
            {
                counter : this.state.counter - 1,
            }
        )
        console.log(events);
    }

    render() {
        return (
          <div className="timer-container">
              {this.is_end !== true ?
                  (<p className="timer" id="timer-id">{this.state.counter}</p>)
                  :
                  (<p className="timer-end" style={{color:"red"}}> Finished </p>)
              }

              {this.props.btnDis !== false &&
                  (
                      <div className="timer-btn-container">
                          <span className="timer-btn" onCopy={this.incTime}> + </span>
                          <span className="timer-btn" onClick={this.redTime}> - </span>
                      </div>
                  )
              }
          </div>
        );
    }
}

export default Timer;