function mapper (data) {
    return data.map(({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id: id,
        webformatURL: webformatURL,
        largeImageURL: largeImageURL,
        tags: tags,
      };
    });
  };

  export default mapper