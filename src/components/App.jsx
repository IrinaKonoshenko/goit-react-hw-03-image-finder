import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Component } from 'react';
import { Empty } from './Empty/Empty';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Api } from 'helpers/Api';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    query: '',
    total: 13,
    current: null,
  };

  fetchImages = () => {
    this.setState({
      isLoading: true,
    });
    Api.then(res => {
      this.setState({
        images: [...this.state.images, ...res.data.hits],
        total: res.data.total,
      });
    }).finally(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImages();
    }
  }

  isDisabled() {
    return this.state.page >= Math.ceil(this.state.total / 12);
  }

  onSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const hasImages = this.state.images.length > 0;
    const hasLoading = this.state.isLoading && !hasImages;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
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
