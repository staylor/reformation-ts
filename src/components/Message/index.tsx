import * as React from 'react';
import { messageWrapClass, messageTextClass, dismissButtonClass } from './styled';

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
      <div className={messageWrapClass}>
        <p className={messageTextClass}>{this.props.text}</p>
        <button className={dismissButtonClass} onClick={this.onClick} />
      </div>
    );
  }
}
