export default function Circle() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
      position: "absolute",
      width: "125px",
    }}>
      <circle cx="50" cy="50" r="50"></circle>
      <circle cx="50" cy="50" fill="#eee" r="45"></circle>
    </svg>
  );
}

