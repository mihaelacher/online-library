import mime from "mime-types";

import config from "../config/config.js";

export function updateBookFiles(
  books,
  bookId,
  coverImageMimeType,
  bookFileMimeType
) {
  books.updateOne(
    { _id: new ObjectId(bookId) },
    {
      $set: {
        cover_url: `${config.cloudfrontBaseUrl}${bookId}.${mime.extension(
          coverImageMimeType
        )}`,
        book_pdf: `${config.s3BucketFilesBaseUrl}${bookId}.${mime.extension(
          bookFileMimeType
        )}`,
      },
    }
  );
}

export function validateBook(book) {
  let errors = [];

  if (!book.title) {
    errors.push("Заглавието на книга е задължително!");
  }

  if (!book.author) {
    errors.push("Авторът на книга е задължително!");
  }

  if (!book.description) {
    errors.push("Описанието на книга е задължително!");
  }

  if (!book.price) {
    errors.push("Цената на книга е задължително!");
  }

  if (!book.cover_image) {
    errors.push("Корицата на книга е задължително!");
  }

  if (!book.book_pdf) {
    errors.push("Файлът на книга е задължително!");
  }

  return errors;
}
