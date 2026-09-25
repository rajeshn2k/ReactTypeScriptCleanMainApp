import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer } from "./components/shared/Footer";
import { Header } from "./components/shared/Header";
import { PagesNav } from "./components/shared/PagesNav";
import BookList from "./components/books/BookList";
import BookEdit from "./components/books/BookEdit";
import Home from "./components/home/Home";
import PersonEdit from "./components/person/PersonEdit";
import PersonList from "./components/person/PersonList";
import BookAdd from "./components/books/BookAdd";
import PersonAdd from "./components/person/PersonAdd";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <table className="table-head">
            <thead>
              <tr>
                <th>
                  <Header />
                </th>
              </tr>
            </thead>
          </table>

          <PagesNav />
          <Routes>
            <Route path="/addbook" element={<BookAdd />} />
            <Route path="/book" element={<BookList />} />
            <Route path="/book/:id" element={<BookEdit />} />
            <Route path="/addperson" element={<PersonAdd />} />
            <Route path="/person" element={<PersonList />} />
            <Route path="/person/:id" element={<PersonEdit />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
