import { Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import BookItemForm from "../components/books/BookItemForm";
import { ConnectedBookList } from "../components/books/BookList";
import MyBookList from "../components/books/MyBookList";
import { ConnectedBookItemsCarousel } from "../components/books/BookItemsCarousel";

const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    <Route index element={<ConnectedBookItemsCarousel />} />
    <Route path="/book/:id" element={<BookItemForm />} />
    <Route path="/book" element={<BookItemForm />} />
    <Route path="/books" element={<ConnectedBookList />} />
    <Route path="/mybooks" element={<MyBookList />} />
  </Route>
);

export default HomeRoutes;
