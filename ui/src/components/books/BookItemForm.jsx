import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import PDFViewer from "../common/PDFViewer";
import useBookForm from "../../hooks/useBookForm";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import Loading from "../common/Loading";
import { withRouter } from "../common/withRouter";
import { requestBookCreation, requestBookUpdate } from "../../store/mutations";
import "./BookItemForm.css";

const BookItemForm = ({
  id,
  formBook,
  loading,
  serverError,
  requestBookCreation,
  requestBookUpdate,
}) => {
  const navigate = useNavigate();
  const { book, setBook, onChangeInput, errors, onSubmitForm } = useBookForm({
    requestBookCreation,
    requestBookUpdate,
  });
  const { MultiSelectComponent } = MultiSelectDropdown({
    onChangeHandler: onChangeInput,
    defaultValue: formBook?.genres,
  });

  useEffect(() => {
    if (formBook) {
      setBook(formBook);
    } else if (id) {
      navigate("/404");
    }
  }, [id, formBook]);

  if (loading) {
    return <Loading />;
  }

  return (
    <form className="book-form col-lg-6 col-sm-6">
      <h2>
        Моля, Въведете необходимата информация за книгата, която ще предлагате
      </h2>

      {serverError && <div class="bar error">{serverError.join("\r\n")}</div>}

      <Input
        name="title"
        value={book?.title}
        labelText="Заглавие"
        type="text"
        placeholder="Въведете заглавие на книгата"
        onChange={onChangeInput}
        error={errors?.title}
      ></Input>

      <Input
        name="author"
        value={book?.author}
        labelText="Име и Фамилия на автора"
        type="text"
        placeholder="Въведете Име и Фамилия на автрора"
        onChange={onChangeInput}
        error={errors?.author}
      ></Input>

      <Input
        name="price"
        value={book?.price}
        labelText="Цена"
        type="number"
        placeholder="Въведете цената, на която искате да предлагате книгата"
        onChange={onChangeInput}
        error={errors?.price}
      ></Input>

      <TextArea
        name="description"
        value={book?.description}
        labelText="Пълно описание"
        rows="10"
        placeholder="Въведете пълно описание на книгата"
        onChange={onChangeInput}
        error={errors?.description}
      ></TextArea>

      <div style={{ marginTop: "20px" }}>{MultiSelectComponent}</div>

      {book?.cover_url && (
        <div className="col-sm-7 form-group">
          <img className="img" src={book?.cover_url} alt="book" />
        </div>
      )}

      <Input
        name="cover_image"
        labelText="Корица"
        type="file"
        onChange={onChangeInput}
        error={errors?.cover_image}
      ></Input>

      <Input
        name="book_pdf"
        labelText="Файл"
        type="file"
        onChange={onChangeInput}
        error={errors?.book_pdf}
      ></Input>

      {book?.book_pdf_url && (
        <PDFViewer book_pdf_url={book?.book_pdf_url}></PDFViewer>
      )}

      {book?._id && (
        <Button isDisabled={loading} name="Заяви изтриване"></Button>
      )}
      <Button
        isDisabled={loading}
        name={book?._id ? "Запази" : "Добави"}
        onClick={onSubmitForm}
      ></Button>
    </form>
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
};

const ConnectedBookItemForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookItemForm);

export default withAuthenticationRequired(withRouter(ConnectedBookItemForm), {
  onRedirecting: () => <Loading />,
});
