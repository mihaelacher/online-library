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
  }, [id, formBook]);

  if (loading) {
    return <Loading />;
  }

  return (
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
        <h2>
          Моля, Въведете необходимата информация за книгата, която ще предлагате
        </h2>

        {serverError && <div className="bar error">{serverError}</div>}

        <Form.Item
          name="title"
          label="Заглавие"
          rules={[
            {
              required: true,
              message: "Моля, въведете заглавие на книгата",
            },
          ]}
        >
          <Input
            placeholder="Въведете заглавие на книгата"
            value={book?.title}
            onChange={onChangeInput}
          />
        </Form.Item>

        <Form.Item
          name="author"
          label="Име и Фамилия на автора"
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

        <Form.Item
          name="price"
          label="Цена"
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

        <Form.Item
          name="description"
          label="Пълно описание"
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

        <div style={{ marginTop: "20px" }}>{MultiSelectComponent}</div>

        {book?.cover_image_url && (
          <div className="col-sm-7 form-group">
            <img className="img" src={book?.cover_image_url} alt="book" />
          </div>
        )}

        <Form.Item
          name="cover_image"
          label="Корица"
          rules={[
            {
              required: true,
              message: "Моля, изберете корица за книгата",
            },
          ]}
        >
          <Input type="file" onChange={onChangeInput} />
        </Form.Item>

        <Form.Item
          name="book_pdf"
          label="Файл"
          rules={[
            {
              required: true,
              message: "Моля, качете файл за книгата",
            },
          ]}
        >
          <Input type="file" onChange={onChangeInput} />
        </Form.Item>

        {book?.book_pdf_url && (
          <PDFViewer book_pdf_url={book?.book_pdf_url}></PDFViewer>
        )}

        {book?._id && (
          <Button
            onClick={onDeleteRequest}
            className="btn-quarternary btn-right"
          >
            Заяви изтриване
          </Button>
        )}
        <Button className="btn-right" type="primary" onClick={onSubmitForm}>
          {!book?._id ? "Запази" : "Редактирай"}
        </Button>
      </Form>
    </ConfigProvider>
  );
};

const mapStateToProps = (state, { params: { id } }) => ({
  id,
  formBook: state.books.find((book) => book._id === id),
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
