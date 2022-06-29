import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import mapper from '../service/mapper.js';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import * as api from '../service/api';
import s from '../components/App.module.css'

let totalHits = 0;
let sumHits = 0;

class App extends Component {
  state = {
    images: [],
    page: 1,
    per_page: 12,
    nameImages: '',
    isLoading: false,
    error: null,
    showModal: false,
    bigImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, nameImages, per_page } = this.state;

    if (prevState.page !== page || prevState.nameImages !== nameImages) {
      try {
        this.setState({ isLoading: true });

        const images = await api.getCoolImages(page, nameImages, per_page);
        const imagesData = mapper(images.hits);

        if (images.hits.length === 0) {
          this.setState({ isLoading: false });
          toast.error('There are no images matching your search query');
          return;
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesData],
            isLoading: false,
          };
        });

        totalHits = images.totalHits;
        sumHits += images.hits.length;

      } catch (error) {
        this.setState({ error: true, isLoading: false });
      }
    }
  }

  handleFormSubmit = queryValue => {
    this.setState({
      images: [],
      isLoading: false,
      page: 1,
      nameImages: queryValue,
    });
    sumHits = 0;
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  openImage = event => {
    this.toggleModal();
    this.setState({ bigImage: event });
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scrollWindow();
  };
  scrollWindow = () => {
    scroll.scrollToBottom({
      offset: 100,
      smooth: true,
    });
  };

  render() {
    const { images, isLoading, error, nameImages, showModal, bigImage } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length === 0 && <p className={s.hello}> You can find new picture</p>}
        {error && <p className={s.hello}>Whoops, something went wrong: {error.message}</p>}
        {isLoading ? (
         <Loader/>
        ) : (
          <ImageGallery
            images={images}
            nameImages={nameImages}
            onClick={this.openImage}
          />
        )}
        <ToastContainer position="top-right" autoClose={3000} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
           <img src={bigImage} alt="" />
          </Modal>
        )}
        {totalHits !== sumHits && images.length > 0 && (
          <Button nextPage={this.nextPage} />
        )}
      </div>
    );
  }
}

export default App;
