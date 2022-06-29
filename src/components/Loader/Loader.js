import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Circles } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';

function Loader() {
  return (
    <div className={s.isLoadingCircles}>
      <Circles color="#00BFFF" height={80} width={80} ariaLabel="loading" />
    </div>
  );
}
export default Loader;
