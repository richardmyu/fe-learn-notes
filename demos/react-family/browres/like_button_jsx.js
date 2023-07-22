'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return (
        <button onClick={() => this.setState({ liked: false })}>
          Yes
        </button>
      );
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

const domContainer = document.getElementById('like_button_container');

const root = ReactDOM.createRoot(domContainer);
root.render(<LikeButton />);
