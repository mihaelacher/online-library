import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Form, Input, Button, ConfigProvider } from "antd";
import "antd/dist/reset.css";

import PDFViewer from "../common/PDFViewer";
import useBookForm from "../../hooks/useBookForm";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import Loading from "../common/Loading";
import { withRouter } from "../common/withRouter";
import {
  requestBookCreation,
  requestBookUpdate,
  requestBookDelete,
} from "../../store/mutations/bookMutations";
import "./BookItemForm.css";

const BookItemForm = ({
  id,
  formBook,
  loading,
  serverError,
  requestBookCreation,
  requestBookUpdate,
  requestBookDelete,
}) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { book, setBook, onChangeInput, onDeleteRequest, onSubmitForm } =
    useBookForm({
      loading,
      serverError,
      formRef,
      requestBookCreation,
      requestBookUpdate,
      requestBookDelete,
    });
  const { MultiSelectComponent } = MultiSelectDropdown({
    onChangeHandler: onChangeInput,
    defaultValue: formBook?.genres,
  });

  useEffect(() => {
    if (formBook) {
      setBook(formBook);
    } else if (id && !loading) {
      navigate("/404");
    }
  }, [id, loading, navigate, setBook, formBook]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ec8f6a",
          },
        }}
      >
        <Form
          ref={formRef}
          initialValues={formBook}
          className="book-form col-lg-6 col-sm-6"
          onFinish={onSubmitForm}
          validateTrigger="onSubmit"
          layout="vertical"
        >
          {serverError && <div className="bar error">{serverError}</div>}

          <div className="col-md-6">
            <label htmlFor="title">Заглавие</label>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Моля, въведете заглавие на книгата",
                },
              ]}
            >
              <Input
                className="u-full-width"
                placeholder="Въведете заглавие на книгата"
                value={book?.title}
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <label htmlFor="author">Автор</label>
            <Form.Item
              className="u-full-width"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Моля, въведете Име и Фамилия на автрора",
                },
              ]}
            >
              <Input
                placeholder="Въведете Име и Фамилия на автрора"
                value={book?.author}
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <label htmlFor="description">Пълно описание</label>
            <Form.Item
              name="description"
              className="u-full-width"
              rules={[
                {
                  required: true,
                  message: "Моля, въведете пълно описание на книгата",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Въведете пълно описание на книгата"
                value={book?.description}
                rows="10"
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <label>Жанр</label>
            {MultiSelectComponent}
          </div>

          <div className="col-md-12">
            <label htmlFor="price">Цена</label>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message:
                    "Моля, въведете цената, на която искате да предлагате книгата",
                },
              ]}
            >
              <Input
                placeholder="Въведете цената, на която искате да предлагате книгата"
                value={book?.price}
                type="number"
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          {book?.cover_image_url && (
            <div className="col-sm-12">
              <img className="img" src={book?.cover_image_url} alt="book" />
            </div>
          )}

          {book?.book_pdf_url && (
            <div className="col-md-12">
              <PDFViewer book_pdf_url={book?.book_pdf_url}></PDFViewer>
            </div>
          )}

          <div className="col-md-6">
            <label htmlFor="cover_image">Корица</label>
            <Form.Item
              name="cover_image"
              rules={[
                {
                  required: true,
                  message: "Моля, изберете корица за книгата",
                },
              ]}
            >
              <Input
                type="file"
                className="custom-file-input cover-image-input"
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <label htmlFor="book_pdf">Файл</label>
            <Form.Item
              name="book_pdf"
              rules={[
                {
                  required: true,
                  message: "Моля, качете файл за книгата",
                },
              ]}
            >
              <Input
                className="custom-file-input book-pdf-input"
                type="file"
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>

          <div className="col-md-12">
            {book?._id && (
              <Button onClick={onDeleteRequest} className="btn-primary">
                Заяви изтриване
              </Button>
            )}
            <Button className="btn btn-large" onClick={onSubmitForm}>
              {!book?._id ? "Запази" : "Редактирай"}
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

const mapStateToProps = (state, { params: { id } }) => ({
  id,
  formBook: Object.values(state.books).find((book) => book._id === id),
  loading: state.apiCallsInProgress > 0,
  serverError: state.errors?.manageBookErrors,
});

const mapDispatchToProps = {
  requestBookCreation,
  requestBookUpdate,
  requestBookDelete,
};

const ConnectedBookItemForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookItemForm);

export default withAuthenticationRequired(withRouter(ConnectedBookItemForm), {
  onRedirecting: () => <Loading />,
});
