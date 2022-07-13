import React from "react";
import { faker } from "@faker-js/faker";

const Container = (props) => {
    return (
      <div className="snake-container">
          {props.children}
      </div>
    );
}

/**
 * If Use shouldComponentUpdate Function Used, You Should Use React.PureComponent Instead Of React.Component
 */
class Snake extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Food: this.getRandomPosition(),
            Segment: [
                this.getRandomPosition(),
            ],
            speed: {
                x: 1,
                y: 0
            },
            direction: "left",
            forbidden: "right",
            buffered: null,
            score: 0,
            foodColor: "goldenrod",
            snakeColor: "darkblue",
        }

        this.moveSnake(300);
        // console.log("constructor");
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log("getDerivedStateFromProps", props, state);
    //     return null;
    // }

    // componentDidMount() {
    //     console.log("componentDidMount");
    //     return null;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("shouldComponentUpdate", nextProps, nextState);
    //     return true;
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    //     if (typeof prevState === "object") {
    //         return "object";
    //     }
    //     return null;
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("componentDidUpdate", prevProps, prevState, snapshot);
    //     return false;
    // }

    // componentWillUnmount() {
    //     return false;
    // }

    moveSnake(timeOut){
        this.interValTimeOut = setInterval(() => {
            this.updateSnake();
        }, timeOut);

        document.addEventListener("keydown", this.eventHandlerFunc)
    }

    eat() {
        let head = this.state.Segment[this.state.Segment.length - 1];
        if (head.column === this.state.Food.column && head.row === this.state.Food.row) {
            this.setState({
                foodColor: faker.color.rgb(),
            });
            let score = this.state.score;
            switch (score) {
                case 50:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(250);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 100:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(200);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 200:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(150);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 300:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(100);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 400:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(75);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 500:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(50);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 1000:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(40);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
                case 2000:
                    clearInterval(this.interValTimeOut);
                    this.moveSnake(30);
                    this.setState({
                        snakeColor: faker.color.rgb(),
                    });
                    break;
            }
            return true;
        }
        return false;
    }

    gameOver(){
        let head = this.state.Segment[this.state.Segment.length - 1];
        for(let i = 0; i < this.state.Segment.length - 1; i++) {
            let segment = this.state.Segment[i];
            if (segment.column === head.column && segment.row === head.row) {
                clearInterval(this.interValTimeOut);
                this.moveSnake(300);
                return true;
            }
        }
        return false;
    }

    eventHandlerFunc = (event) => {
        let direction = this.state.direction;
        let forbidden = this.state.forbidden;

        switch (event.keyCode) {
            case 100:
            case 65:
            case 37:
                direction = "left";
                forbidden = "right";
                break;
            case 104:
            case 87:
            case 38:
                direction = "up";
                forbidden = "down";
                break;
            case 102:
            case 68:
            case 39:
                direction = "right";
                forbidden = "left";
                break;
            case 98:
            case 83:
            case 40:
                direction = "down";
                forbidden = "up";
                break;
        }

        if (direction !== this.state.direction && direction !== this.state.forbidden) {
            this.setState(function (state, props) {
                state.buffered = {
                    direction: direction,
                    forbidden: forbidden,
                    speed: {
                        x: direction === "right" ? -1 : direction === "left" ? 1 : 0,
                        y: direction === "up" ? -1 : direction === "down" ? 1 : 0,
                    }
                }
                return null;
            });
        }
    }

    updateSnake() {
        let buffered = this.state.buffered;
        if (buffered !== null) {
           this.setState(function (state, props) {
              if (state.direction !== buffered.direction && state.forbidden !== buffered.forbidden) {
                  state.direction   = buffered.direction;
                  state.forbidden   = buffered.forbidden;
                  state.speed       = buffered.speed;
              }
              return null;
           });
        }
        let segments    = this.state.Segment;
        let lastSegment = this.state.Segment[segments.length - 1];
        let food        = this.state.Food;
        let score       = this.state.score;

        if (this.eat()) {
            food = this.getRandomPosition();
            segments.push(lastSegment);
            score += 5;
        }
        segments.shift();
        segments.push(this.checkSegment({
            column: lastSegment.column + this.state.speed.x,
            row: lastSegment.row + this.state.speed.y,
        }));

        if (this.gameOver()) {
            segments    = [this.getRandomPosition()];
            food        = this.getRandomPosition();
            score       = 0;
        }

        this.setState({
            Segment: segments,
            Food: food,
            score: score,
        });
    }

    checkSegment(segment) {
        if (segment.column > 19) {
            segment.column = 0;
        }else if (segment.column < 0) {
            segment.column = 19;
        }

        if (segment.row > 19) {
            segment.row = 0;
        }else if (segment.row < 0) {
            segment.row = 19;
        }
        return segment;
    }

    getRandomPosition() {
        return {
            column: Math.floor(Math.random() * 20),
            row: Math.floor(Math.random() * 20),
        }
    }

    draw() {
        let Items = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (j === this.state.Food.column && i === this.state.Food.row) {
                    Items.push(<div style={{backgroundColor: this.state.foodColor}} className="Food"></div>);
                }else{
                    Items.push(<div className="snake-items"></div>);
                }
            }
        }

        for (let i = 0; i < this.state.Segment.length; i++) {
            let segment = this.state.Segment[i];
            if (i === this.state.Segment.length -1) {
                Items[segment.row * 20 + segment.column] = <div style={{backgroundColor: "red"}} className="segment"></div>;
            }else{
                Items[segment.row * 20 + segment.column] = <div style={{backgroundColor: this.state.snakeColor}} className="segment"></div>;
            }
        }
        return Items;
    }

    render() {
        // console.log("render");
        return (
            <React.Fragment>
                <h1 className="snake-score">
                    <span>Score : </span>
                    <span>{this.state.score}</span>
                </h1>
                <Container>
                    {this.draw()}
                </Container>
            </React.Fragment>
        );
    }
}
export default Snake;