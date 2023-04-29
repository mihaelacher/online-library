import { Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../components/home/HomePage";
import BookItemForm from "../components/books/BookItemForm";
import { ConnectedBookList } from "../components/books/BookList";
import Profile from "../components/auth/Profile";
import MyBookList from "../components/books/MyBookList";

const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/book/:id" element={<BookItemForm />} />
    <Route path="/book" element={<BookItemForm />} />
    <Route path="/books" element={<ConnectedBookList />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/mybooks" element={<MyBookList />} />
  </Route>
);

export default HomeRoutes;
