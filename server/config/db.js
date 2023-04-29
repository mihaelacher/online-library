const db = {
  mongoDB: {
    dbName: "library-app",
    booksCollection: "books",
    connectionString:
      "mongodb+srv://mihaelachervenkova:nZf3VoPBr2iYy66Q@online-library.8lowu40.mongodb.net/?retryWrites=true&w=majority",
  },
  s3Buckets: {
    bookImages: "myonlinelibrarybookimages",
    bookFiles: "myonlinelibrarybookfiles",
  },
};

export default db;
