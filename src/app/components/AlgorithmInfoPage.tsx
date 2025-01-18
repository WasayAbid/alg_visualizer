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
    textAlign: "left", // Added this to align everything left by default
  } as React.CSSProperties,
  algorithmInfoTitle: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "3.5em",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
    textAlign: "left", // Adjusted to left
  } as React.CSSProperties,
  algorithmInfoDescription: {
    fontSize: "1.3em",
    color: "#fff",
    marginBottom: "20px",
    lineHeight: "1.7",
    textAlign: "left", // Adjusted to left
  } as React.CSSProperties,
  algorithmInfoComplexity: {
    color: "#fff",
    marginBottom: "10px",
    fontSize: "1.1em",
    lineHeight: "1.5",
    textAlign: "left", // Adjusted to left
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
      "It repeatedly finds the smallest element from the unsorted part and moves it to the front.",
    steps: `1. Start with the first element.\n2. Find the smallest element in the unsorted part.\n3. Swap it with the first unsorted element.\n4. Move the boundary of the sorted part forward.\n5. Repeat until sorted.`,
    timeComplexity: `Worst-case: O(n²)\nBest-case: O(n²)\nAverage-case: O(n²)`,
    spaceComplexity: "Space Complexity: O(1) (in-place sorting)",
  },
  "Insertion Sort": {
    title: "Insertion Sort",
    description:
      "It starts from the second element and places it in its correct position, repeating this for each subsequent element until the list is sorted.",
    steps: `1. Start from the second element.\n2. Compare it with the previous one.\n3. Shift larger elements to the right.\n4. Insert the current element in its correct position.\n5. Repeat until sorted.`,
    timeComplexity: `Worst-case: O(n²)\nBest-case: O(n)\nAverage-case: O(n²)`,
    spaceComplexity: "Space Complexity: O(1) (in-place sorting)",
  },
};

const AlgorithmInfoPage: React.FC<AlgorithmInfoPageProps> = ({
  algorithmName,
  onStartInput,
  onGoBack,
}) => {
  const info = algorithmInfo[algorithmName];

  const formatTextWithLineBreaks = (text: string) => {
    return text.replace(/\n/g, "<br/>");
  };

  return (
    <div style={styles.algorithmInfoPage}>
      <h2 style={styles.algorithmInfoTitle}>{info.title}</h2>
      <p style={styles.algorithmInfoDescription}>{info.description}</p>
      <p
        style={styles.algorithmInfoComplexity}
        dangerouslySetInnerHTML={{
          __html: formatTextWithLineBreaks(info.steps),
        }}
      />
      <p
        style={styles.algorithmInfoComplexity}
        dangerouslySetInnerHTML={{
          __html: formatTextWithLineBreaks(info.timeComplexity),
        }}
      />
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
