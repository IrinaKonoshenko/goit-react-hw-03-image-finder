import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Component } from 'react';
import { Empty } from './Empty/Empty';
import { Loader } from './Loader/Loader';
import axios from 'axios';
import { Button } from './Button/Button';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      page: 1,
      isLoading: false,
      query: '',
      total: 13,
      current: null,
    };
  }

  fetchImages = (isUpdate = false) => {
    this.setState({
      isLoading: true,
    });
    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=30782828-18aebbc8281f2a6373b4ce5f4&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(res => {
        this.setState({
          images: isUpdate
            ? [...this.state.images, ...res.data.hits]
            : res.data.hits,
          total: res.data.total,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImages(true);
    }
  }

  isDisabled() {
    return this.state.page >= Math.ceil(this.state.total / 12);
  }

  render() {
    const hasImages = this.state.images.length > 0;
    const hasLoading = this.state.isLoading && !hasImages;

    return (
      <div className="App">
        <Searchbar
          onSubmit={query =>
            this.setState({ query, page: 1 }, () => this.fetchImages(false))
          }
        />
        {hasImages ? (
          <ImageGallery
            onClickImage={image => this.setState({ current: image })}
            images={this.state.images}
          />
        ) : (
          <Empty />
        )}
        {hasLoading && <Loader />}
        {hasImages && (
          <Button
            disabled={this.isDisabled()}
            onClick={() => this.setState({ page: this.state.page + 1 })}
          />
        )}

        {this.state.current && (
          <Modal
            onClose={() => this.setState({ current: null })}
            image={this.state.current}
          />
        )}
      </div>
    );
  }
}
