import { Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import BookItemForm from "../components/books/BookItemForm";
import { ConnectedBookList } from "../components/books/BookList";
import HomePage from "../components/home/HomePage";
import ChatComponent from "../components/talk/ChatComponent";
import BookReels from "../components/books/BookReels";

const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/book/:id" element={<BookItemForm />} />
    <Route path="/book" element={<BookItemForm />} />
    <Route path="/books" element={<ConnectedBookList />} />
    <Route path="/chatbox" element={<ChatComponent />} />
    <Route path="reels" element={<BookReels />} />
  </Route>
);

export default HomeRoutes;
