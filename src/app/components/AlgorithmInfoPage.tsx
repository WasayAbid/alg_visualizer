import React from "react";

const styles = {
  algorithmInfoPage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(50, 50, 50, 0.8)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
    zIndex: 101,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    width: "80%",
    maxWidth: "900px",
  } as React.CSSProperties,
  algorithmInfoTitle: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "3.5em",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
  } as React.CSSProperties,
  algorithmInfoDescription: {
    fontSize: "1.3em",
    color: "#fff",
    marginBottom: "20px",
    lineHeight: "1.7",
    textAlign: "center",
  } as React.CSSProperties,
  algorithmInfoComplexity: {
    color: "#fff",
    marginBottom: "10px",
    fontSize: "1.1em",
    lineHeight: "1.5",
    textAlign: "center",
  } as React.CSSProperties,
  algorithmInfoButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1.2em",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
  } as React.CSSProperties,
  algorithmInfoButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "2px solid rgba(255, 255, 255, 0.5)",
  } as React.CSSProperties,
};

interface AlgorithmInfoPageProps {
  algorithmName: "Selection Sort" | "Insertion Sort";
  onStartInput: () => void;
  onGoBack: () => void;
}

const algorithmInfo = {
  "Selection Sort": {
    title: "Selection Sort",
    description:
      "Imagine you have a messy pile of toys and want to organize them by size. Selection Sort is like picking the smallest toy and placing it first, then finding the next smallest, and so on. It was made to sort things in a very basic way. The main goal is to make it easy to understand how sorting works.",
    timeComplexity: "Time Complexity: O(n^2) in all cases",
    spaceComplexity: "Space Complexity: O(1)",
  },
  "Insertion Sort": {
    title: "Insertion Sort",
    description:
      "Imagine you're arranging books on a shelf. Insertion Sort works like you're taking one book at a time and putting it in the right spot among the books you've already placed. This algorithm was made to be straightforward and is especially good for small lists or when you need to sort data as you receive it.",
    timeComplexity: "Time Complexity: O(n^2) worst case | O(n) best case",
    spaceComplexity: "Space Complexity: O(1)",
  },
};

const AlgorithmInfoPage: React.FC<AlgorithmInfoPageProps> = ({
  algorithmName,
  onStartInput,
  onGoBack,
}) => {
  const info = algorithmInfo[algorithmName];

  return (
    <div style={styles.algorithmInfoPage}>
      <h2 style={styles.algorithmInfoTitle}>{info.title}</h2>
      <p style={styles.algorithmInfoDescription}>{info.description}</p>
      <p style={styles.algorithmInfoComplexity}>{info.timeComplexity}</p>
      <p style={styles.algorithmInfoComplexity}>{info.spaceComplexity}</p>
      <button
        style={styles.algorithmInfoButton}
        onClick={onStartInput}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, styles.algorithmInfoButtonHover);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, styles.algorithmInfoButton);
        }}
      >
        Start
      </button>

      <button
        style={{
          ...styles.algorithmInfoButton,
          marginTop: "10px",
        }}
        onClick={onGoBack}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, styles.algorithmInfoButtonHover);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, styles.algorithmInfoButton);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default AlgorithmInfoPage;
