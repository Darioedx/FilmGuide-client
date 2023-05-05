import React from "react";
import { useState } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
export const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Good Fellas",
      image:"https://pics.filmaffinity.com/goodfellas-343032101-mmed.jpg",   
      director: "Martin Scorsese",
      plot:"A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.",
      genre:"Crime/Gangster"
    },
    {
      id: 2,
      title: "The Big Lebowski",
      image:"https://pics.filmaffinity.com/the_big_lebowski-877217211-mmed.jpg",
      director: "Joel Coen",
      plot:"Ultimate L.A. slacker Jeff \"The Dude\" Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaire\"s missing wife.",
      genre:"Black Comedy"
    },
    {
      id: 3,
      title: "JavaScript: The Good Parts",
      image:"https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
      director: "Douglas Crockford",
      plot:"",
      genre:""
    },
    {
      id: 4,
      title: "JavaScript: The Definitive Guide",
      image:"https://images-na.ssl-images-amazon.com/images/I/51HbNW6RzhL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      director: "David Flanagan",
      plot:"",
      genre:"crime/gangster",
    },
    {
      id: 5,
      title: "The Road to React",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg",
      author: "Robin Wieruch"
    }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
