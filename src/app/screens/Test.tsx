// @ts-nocheck

import React, { Component } from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  componentDidMount(): void {
    //runs after first render => retrive data from backend
    console.log("componentmunt");
  }
  componentWillUnmount(): void {
    console.log("componentunmount");
    //runs before components unmount
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {}
  changeColor = () => {
    this.setState({ color: "blue", brand: "Tesla" });
  };
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Test;
