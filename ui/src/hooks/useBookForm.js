import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const useBookForm = ({
  requestBookUpdate,
  requestBookCreation,
  loading,
  serverError,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [book, setBook] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book.cover_url) {
      return () => URL.revokeObjectURL(book.cover_url);
    }
  }, [book.cover_url]);

  useEffect(() => {
    if (book.book_pdf_url) {
      return () => URL.revokeObjectURL(book.book_pdf_url);
    }
  }, [book.book_pdf_url]);

  const isFormValid = useMemo(() => {
    const validateForm = () => {
      const { title, author, description, price, cover_image, book_pdf } = book;
      const errors = {};

      if (!title) errors.title = "Заглавието е задължително.";
      if (!description) errors.description = "Описанието е задължително.";
      if (!author) errors.author = "Автоът е задължителен.";
      if (!price) errors.price = "Цената е задължителна.";
      if (!cover_image) errors.cover_image = "Корицата е задължителна.";
      if (!book_pdf) errors.book_pdf = "Файлът е задължителен.";

      setErrors(errors);

      return !Object.values(errors).length;
    };

    return validateForm;
  }, [book, setErrors]);

  async function onSubmitForm(e) {
    e.preventDefault();

    if (!isFormValid()) {
      const token = await getAccessTokenSilently();

      if (book?._id) {
        await requestBookUpdate(token, book);
      } else {
        await requestBookCreation(token, user.email, book);
      }
    }
  }

  const onChangeInput = useCallback(
    (e) => {
      setErrors({});

      let properties = {};
      if (!e?.target) {
        properties["genres"] = e?.map((opt) => opt.value);
      } else {
        const { name, value } = e?.target;
        const isCoverImage = name === "cover_image";
        const isBookPDF = name === "book_pdf";

        properties = {
          [name]: isCoverImage || isBookPDF ? e.target?.files : value,
          ...((isCoverImage || isBookPDF) && {
            [`${name}_url`]: URL.createObjectURL(e.target?.files),
          }),
        };
      }

      setBook({
        ...book,
        ...properties,
      });
      return 1;
    },
    [book]
  );

  return {
    book,
    setBook,
    onChangeInput,
    errors,
    onSubmitForm,
  };
};

export default useBookForm;
