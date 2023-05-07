import { Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import BookItemForm from "../components/books/BookItemForm";
import { ConnectedBookList } from "../components/books/BookList";
import MyBookList from "../components/books/MyBookList";
import HomePage from "../components/home/HomePage";

const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/book/:id" element={<BookItemForm />} />
    <Route path="/book" element={<BookItemForm />} />
    <Route path="/books" element={<ConnectedBookList />} />
    <Route path="/mybooks" element={<MyBookList />} />
  </Route>
);

export default HomeRoutes;
