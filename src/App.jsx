import "./App.css";
import Scanner from "./Scanner";

function App() {
  return (
    <div>
      <h1>
        What I{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #FFD600 0%, #4A94EE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "bold",
            fontSize: "5.5rem",
          }}
        >
          ScanDo
        </span>{" "}
        for You?!
      </h1>
      <Scanner />
    </div>
  );
}

export default App;
