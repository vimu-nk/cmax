import { useState } from "react";

const videos = [
  { id: "21a8e4a0-7588-4997-a802-eb9ddae6825c", title: "Rec 1 (Q1 - Q10)" },
  { id: "77e47952-32b0-408f-a40b-1ed2e2f54d83", title: "Rec 2 (Q11, Q12)" },
  { id: "bbf2bf10-4655-4f73-91a7-eea88d963c61", title: "Rec 3 (Q13)" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white", background: "black" }}>
      <h1 style={{ marginBottom: "10px" }}>Applied Paper #01 Discussion</h1>

      {/* Video Title */}
      <h2 style={{ marginBottom: "10px", color: "#ffcc00" }}>{videos[currentIndex].title}</h2>

      {/* Video Player - Autoplay Removed */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <iframe
          src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videos[currentIndex].id}?autoplay=false`}
          width="640"
          height="360"
          allow="encrypted-media"
          style={{ border: "none", marginBottom: "20px", borderRadius: "10px" }}
        ></iframe>
      </div>

      {/* Navigation Buttons */}
      <div>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          style={{
            background: currentIndex === 0 ? "#555" : "#ffcc00",
            color: "black",
            padding: "10px 20px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}>
          ⬅ Previous
        </button>

        <button 
          onClick={handleNext} 
          disabled={currentIndex === videos.length - 1} 
          style={{
            background: currentIndex === videos.length - 1 ? "#555" : "#ffcc00",
            color: "black",
            padding: "10px 20px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: currentIndex === videos.length - 1 ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
