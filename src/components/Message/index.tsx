import * as React from 'react';

interface Props {
  text: string;
}

interface State {
  hidden: boolean;
}

export default class Message extends React.Component<Props, State> {
  state = {
    hidden: false,
  };

  onClick = () => {
    this.setState({ hidden: true });
  };

  componentWillReceiveProps() {
    this.setState({ hidden: false });
  }

  render() {
    return this.state.hidden ? null : (
      <div>
        <p>{this.props.text}</p>
        <button onClick={this.onClick} />
      </div>
    );
  }
}
