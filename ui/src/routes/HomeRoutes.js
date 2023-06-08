import { Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import BookItemForm from "../components/books/BookItemForm";
import HomePage from "../components/home/HomePage";
import ChatComponent from "../components/talk/ChatComponent";
import BookReels from "../components/books/BookReels";
import BookFavorites from "../components/books/BookFavorites";
import Profile from "../components/auth/Profile";
import BrowseBooksList from "../components/books/BrowseBooksList";
import SearchBooksList from "../components/books/SearchBooksList";

const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/book/:id" element={<BookItemForm />} />
    <Route path="/book" element={<BookItemForm />} />
    <Route path="/books" element={<SearchBooksList />} />
    <Route path="/chatbox" element={<ChatComponent />} />
    <Route path="/reels" element={<BookReels />} />
    <Route path="/favorites" element={<BookFavorites />} />
    <Route path="/profile/:username" element={<Profile />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/browse" element={<BrowseBooksList />} />
  </Route>
);

export default HomeRoutes;
