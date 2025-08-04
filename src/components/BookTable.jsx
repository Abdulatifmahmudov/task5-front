import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Table, Spin } from "antd";

const BATCH_SIZE = 10;

const BookTable = ({ region, seed, avgLikes, avgReviews }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastBookRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get(`${API_BASE_URL}/books`, {
        params: {
          region,
          seed,
          page,
          likes: avgLikes,
          reviews: avgReviews,
          count: BATCH_SIZE,
        },
      });

      const newBooks = response.data.books;

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      if (newBooks.length < BATCH_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setBooks([]);
    setPage(0);
    setHasMore(true);
  }, [region, seed, avgLikes, avgReviews]);

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const columns = [
    {
      title: "#",
      key: "rowNumber",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Authors",
      dataIndex: "authors",
      key: "authors",
      render: (authors) => authors.join(", "),
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
    },
  ];

  return (
    <div className="bg-white p-4 rounded shadow border overflow-y-auto h-[600px]">
      <Table
        dataSource={books.map((book, index) => ({
          ...book,
          key: `${book.isbn}-${index}`,
        }))}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div className="bg-gray-50 p-3 rounded space-y-2">
              <p>
                <strong>Genre:</strong> {record.genre}
              </p>
              <p>
                <strong>Year:</strong> {record.year}
              </p>
              <p>
                <strong>Description:</strong> {record.description}
              </p>
              <div>
                <strong>Reviews:</strong>
                {record.reviewsArray && record.reviewsArray.length > 0 ? (
                  <ul className="space-y-2 mt-2">
                    {record.reviewsArray.map((rev, i) => (
                      <li
                        key={i}
                        className="border-l-4 border-blue-400 pl-3 bg-white rounded shadow-sm p-2"
                      >
                        <p>
                          <strong>{rev.reviewer}</strong> – {rev.date}
                        </p>
                        <p className="text-yellow-600">⭐ {rev.rating}</p>
                        <p>{rev.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No reviews available</p>
                )}
              </div>
            </div>
          ),
          rowExpandable: (record) =>
            !!record.description || !!record.reviewsArray?.length,
        }}
      />

      <div ref={lastBookRef} />

      {loading && (
        <div className="text-center mt-4">
          <Spin size="large" />
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 mt-4">
          You've reached the end.
        </p>
      )}
    </div>
  );
};

export default BookTable;
