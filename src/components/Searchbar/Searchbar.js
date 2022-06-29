import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import s from '../Searchbar/Searchbar.module.css';

function Searchbar({onSubmit}) {
  const [nameImages, setNameImages] = useState('');

  // class Searchbar extends Component {
  //   state = {
  //     nameImages: '',
  //   };

  const handleNameChange = event => {
    setNameImages(event.currentTarget.value.toLowerCase())
  }

   // handleNameChange = event => {
  //   this.setState({ nameImages: event.currentTarget.value.toLowerCase() });
  // };

  const handleSubmit = event => {
    event.preventDefault();
    if(nameImages.trim() === ''){
      toast.error('Enter the name in the search bar');
    }
    onSubmit(nameImages);
    setNameImages('')
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.nameImages.trim() === '') {
  //     toast.error('Enter the name in the search bar');
  //   }
  //   this.props.onSubmit(this.state.nameImages);
  //   this.setState({ nameImages: '' });
  //   return;
  // };


  return (
    <header className={s.header}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchForm_button}>
          <span className={s.buttonLabel}>Search</span>
        </button>
        
        <input
          className={s.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={nameImages}
          onChange={handleNameChange}
        />
        
      </form>
      </header>
  );

}

  // render() {
  //   return (
  //     <header className={s.header}>
  //       <form className={s.searchForm} onSubmit={this.handleSubmit}>
  //         <button type="submit" className={s.searchForm_button}>
  //           <span className={s.buttonLabel}>Search</span>
  //         </button>
          
  //         <input
  //           className={s.searchForm_input}
  //           type="text"
  //           autoComplete="off"
  //           autoFocus
  //           placeholder="Search images and photos"
  //           value={this.state.nameImages}
  //           onChange={this.handleNameChange}
  //         />
          
  //       </form>
  //       </header>
  //   );
  // }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
