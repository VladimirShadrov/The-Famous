import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/footer.scss';
import '../styles/pictures.scss';

//Перенос фотографий в папку dist
require.context('../images', true, /\.(png|jpg|svg|gif)$/);