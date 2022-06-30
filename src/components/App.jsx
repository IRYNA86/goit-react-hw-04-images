import { useState, useEffect } from 'react';
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
import s from '../components/App.module.css';

let totalHits = 0;
let sumHits = 0;
const per_page = 12;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [nameImages, setNameImages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState('');

  // state = {
  //   images: [],
  //   page: 1,
  //   per_page: 12,
  //   nameImages: '',
  //   isLoading: false,
  //   error: null,
  //   showModal: false,
  //   bigImage: '',
  // };

  useEffect(() => {
    if (!nameImages) {
      return;
    }
    const getData = async () => {
      try {
        setIsLoading(true);
        const images = await api.getCoolImages(page, nameImages, per_page);
        const imagesData = mapper(images.hits);
        if (images.hits.length === 0) {
          setIsLoading(false);
          toast.error('There are no images matching your search query');
          return;
        }
        setImages(prevState => [...prevState, ...imagesData]);
        setIsLoading(false);
        totalHits = images.totalHits;
        sumHits += images.hits.length;
      } catch (error) {
        setIsLoading(false);
        toast.error('There are no images matching your search query');
      }
    };
    getData();
  }, [page, nameImages]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { page, nameImages, per_page } = this.state;

  //   if (prevState.page !== page || prevState.nameImages !== nameImages) {
  //     try {
  //       this.setState({ isLoading: true });

  //       const images = await api.getCoolImages(page, nameImages, per_page);
  //       const imagesData = mapper(images.hits);

  //       if (images.hits.length === 0) {
  //         this.setState({ isLoading: false });
  //         toast.error('There are no images matching your search query');
  //         return;
  //       }
  //       this.setState(prevState => {
  //         return {
  //           images: [...prevState.images, ...imagesData],
  //           isLoading: false,
  //         };
  //       });

  //       totalHits = images.totalHits;
  //       sumHits += images.hits.length;

  //     } catch (error) {
  //       this.setState({ error: true, isLoading: false });
  //     }
  //   }
  // }

  const handleFormSubmit = queryValue => {
    setImages([]);
    setIsLoading(false);
    setPage(1);
    setNameImages(queryValue);

    // this.setState({
    //   images: [],
    //   isLoading: false,
    //   page: 1,
    //   nameImages: queryValue,
    // });

    sumHits = 0;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // toggleModal = () => {
  //   this.setState(state => ({
  //     showModal: !state.showModal,
  //   }));
  // };

  const openImage = () => {
    toggleModal();
    setBigImage(bigImage);
    console.log(setBigImage())
    
  };

  // openImage = event => {
  //   this.toggleModal();
  //   this.setState({ bigImage: event });
  // };

  const nextPage = () => {
    setPage(prevState => prevState + 1);
    scrollWindow();
  };

  // nextPage = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  //   this.scrollWindow();
  // };

  const scrollWindow = () => {
    scroll.scrollToBottom({
      offset: 100,
      smooth: true,
    });
  };

  // scrollWindow = () => {
  //   scroll.scrollToBottom({
  //     offset: 100,
  //     smooth: true,
  //   });
  // };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length === 0 && (
        <p className={s.hello}> You can find new picture</p>
      )}
      {/* {error && <p className={s.hello}>Whoops, something went wrong: {error.message}</p>} */}
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery
          images={images}
          nameImages={nameImages}
          onClick={openImage}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      {showModal && (
        <Modal onClose={toggleModal}
        
        >
                   <img src={bigImage} alt=""/>
        </Modal>
      )}
      {totalHits !== sumHits && images.length > 0 && (
        <Button nextPage={nextPage} />
      )}
    </div>
  );
}

//   render() {
//     const { images, isLoading, error, nameImages, showModal, bigImage } =
//       this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {images.length === 0 && <p className={s.hello}> You can find new picture</p>}
//         {error && <p className={s.hello}>Whoops, something went wrong: {error.message}</p>}
//         {isLoading ? (
//          <Loader/>
//         ) : (
//           <ImageGallery
//             images={images}
//             nameImages={nameImages}
//             onClick={this.openImage}
//           />
//         )}
//         <ToastContainer position="top-right" autoClose={3000} />
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//            <img src={bigImage} alt="" />
//           </Modal>
//         )}
//         {totalHits !== sumHits && images.length > 0 && (
//           <Button nextPage={this.nextPage} />
//         )}
//       </div>
//     );
//   }
// }
// }
export default App;
