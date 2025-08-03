import { useState } from "react";


import Controls from "../components/Controls";
import BookTable from "../components/BookTable";

function Home() {
  const [region, setRegion] = useState("en_US");
  const [seed, setSeed] = useState("12345");
  const [avgLikes, setAvgLikes] = useState(5);
  const [avgReviews, setAvgReviews] = useState(2.5);
  const [page, setPage] = useState(1);

  const randomizeSeed = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setSeed(newSeed);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📚 Book Generator Dashboard
      </h1>

      <Controls
        region={region}
        setRegion={setRegion}
        seed={seed}
        setSeed={setSeed}
        randomizeSeed={randomizeSeed}
        avgLikes={avgLikes}
        setAvgLikes={setAvgLikes}
        avgReviews={avgReviews}
        setAvgReviews={setAvgReviews}
      />

      <div className="mt-8">
        <BookTable
          region={region}
          seed={seed}
          avgLikes={avgLikes}
          avgReviews={avgReviews}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Home;
