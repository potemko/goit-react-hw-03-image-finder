import { Component } from 'react';
import css from './ImageGallary.module.css';
import { RotatingLines } from 'react-loader-spinner';
import Scroll from 'react-scroll';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { getSearch } from '../../services/getSearch';

class ImageGallery extends Component {
  state = {
    myData: [],
    loading: false,
    page: 1,
    open: false,
    currentImageIndex: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchText !== this.props.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      getSearch(this.props.searchText, this.state.page)
        .then(response => response.json())
        .then(data =>
          this.setState(prevState => ({
            myData: [...prevState.myData, ...data.hits],
          }))
        )
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.scrollWindow();
      }
    );
  };

  scrollWindow = () => {
    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({ smooth: true, delay: 1000 });
  };

  clickImage = index => {
    this.setState({
      open: true,
      currentImageIndex: index,
    });
  };

  closeLightbox = () => {
    this.setState({ open: false });
  };

  render() {
    const { myData, loading } = this.state;
    return (
      <div className={css.Gallary_container}>
        {loading && (
          <div className={css.spiner}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}
        {myData.length > 0 && (
          <div>
            <ImageGalleryItem
              myData={this.state.myData}
              currentImageIndex={this.state.currentImageIndex}
              open={this.state.open}
              clickImage={this.clickImage}
              closeLightbox={this.closeLightbox}
            />

            <Button loadMoreImages={this.loadMoreImages} />
          </div>
        )}
      </div>
    );
  }
}

export default ImageGallery;

// fetch(
//   `https://pixabay.com/api/?q=${this.props.searchText}&page=${this.state.page}&key=35290662-206a97f69559c1351b8f165bd&image_type=photo&orientation=horizontal&per_page=12`
// )
