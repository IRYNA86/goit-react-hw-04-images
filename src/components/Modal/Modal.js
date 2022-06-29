import { Component } from 'react';
import s from '../Modal/Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const {children} = this.props
    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
