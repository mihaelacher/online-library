import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const useBookForm = ({
  loading,
  serverError,
  formRef,
  requestBookUpdate,
  requestBookCreation,
  requestBookDelete,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

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

  async function onSubmitForm(e) {
    e.preventDefault();

    formRef.current
      .validateFields()
      .then(async () => {
        e.preventDefault();
        const token = await getAccessTokenSilently();

        if (book?._id) {
          requestBookUpdate(token, book).then(() => {
            if (!loading) {
              if (serverError) {
                toast.error("Грешка! Неуспешнa редация!");
              } else {
                toast.success("Успешна редакция на книгата!");
                navigate("/mybooks");
              }
            }
          });
        } else {
          requestBookCreation(token, user.email, book).then(() => {
            if (!loading) {
              if (serverError) {
                toast.error("Грешка! Неуспешно публикуване!");
              } else {
                toast.success("Успешно публикуване на книгата!");
                navigate("/mybooks");
              }
            }
          });
        }
      })
      .catch(() => {
        toast.error("Грешка! Невалидна форма!");
      });
  }

  const onChangeInput = useCallback(
    (e) => {
      let properties = {};
      if (!e?.target) {
        properties["genres"] = e?.map((opt) => opt.value);
      } else {
        const { id, value } = e?.target;
        const isCoverImage = id === "cover_image";
        const isBookPDF = id === "book_pdf";

        properties = {
          [id]: isCoverImage || isBookPDF ? e.target?.files[0] : value,
          ...((isCoverImage || isBookPDF) && {
            [`${id}_url`]: URL.createObjectURL(e.target?.files[0]),
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

  const onDeleteRequest = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    requestBookDelete(book._id, token, user?.email);
  };

  return {
    book,
    setBook,
    onChangeInput,
    onSubmitForm,
    onDeleteRequest,
  };
};

export default useBookForm;
