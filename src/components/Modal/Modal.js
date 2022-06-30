import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';

function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  // handleKeyDown = event => {
  //   if (event.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  // handleBackdropClick = event => {
  //   if (event.currentTarget === event.target) {
  //     this.props.onClose();
  //   }
  // };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        
        {children}
        
        </div>
    </div>
  );
}

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const {children} = this.props
//     return (
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>{children}</div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
