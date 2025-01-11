"use client";
import React, { useState, useRef } from "react";

const styles = {
  /* Ensure full viewport height initially */
  body: {
    height: "100%",
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "linear-gradient(135deg, #f7ff00, #ffdd00, #ff9e00, #ff7f00)",
    color: "#333",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  } as React.CSSProperties,
  h1: {
    fontSize: "5em",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
    animation: "bounce 2s infinite alternate",
  } as React.CSSProperties,
  h2: {
    fontSize: "2.5em",
    fontStyle: "italic",
    color: "#fff",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
    marginTop: "10px",
  } as React.CSSProperties,
  keyframes: `@keyframes bounce {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-10px);
      }
    }`,
  selectionBox: {
    background: "#444",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "10px",
    padding: "20px",
    margin: "20px",
    fontSize: "2em",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease",
  } as React.CSSProperties,
  selectionBoxHover: {
    transform: "scale(1.1)",
    background: "rgba(255, 255, 255, 0.2)",
  } as React.CSSProperties,
  animateClick: {
    display: "none",
    animation: "bounce 1s ease-out forwards",
  } as React.CSSProperties,
  footer: {
    position: "absolute",
    bottom: "40px",
    color: "#fff",
    fontSize: "2em",
    fontWeight: "bold",
    textAlign: "center",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
    width: "100%",
  } as React.CSSProperties,
  visualizationContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "80%",
    marginTop: "10px",
    background: "#444",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  } as React.CSSProperties,
  dataBar: {
    width: "40px",
    height: "40px",
    margin: "5px",
    backgroundColor: "#4caf50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  dataBarCurrent: {
    backgroundColor: "#ff9800",
  } as React.CSSProperties,
  dataBarSwapped: {
    backgroundColor: "#f44336",
  } as React.CSSProperties,
  dataBarSorted: {
    backgroundColor: "#2196f3",
  } as React.CSSProperties,
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid #fff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.5em",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  backButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  homeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid #fff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.5em",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  homeButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  stepExplanation: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#fff",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
    fontSize: "1.8em",
    fontStyle: "italic",
    fontFamily: "Arial, sans-serif",
    position: "fixed",
    top: "25%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  } as React.CSSProperties,
  stepControls: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  } as React.CSSProperties,
  stepButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid #fff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2em",
    margin: "0 10px",
    transition: "background-color 0.3s ease",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
  } as React.CSSProperties,
  stepButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  arrow: {
    position: "absolute",
    border: "2px solid rgba(255, 255, 255, 0.8)",
    borderWidth: "0 2px 2px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(45deg)",
    transition: "opacity 0.3s ease",
  } as React.CSSProperties,
  arrowActive: {
    opacity: 1,
  } as React.CSSProperties,
  arrowInactive: {
    opacity: 0,
  } as React.CSSProperties,
  inputArrayContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#444",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    zIndex: 101,
  } as React.CSSProperties,
  inputArrayInput: {
    padding: "10px",
    margin: "10px 0",
    fontSize: "1.2em",
    borderRadius: "8px",
    border: "2px solid #ddd",
    color: "#000",
  } as React.CSSProperties,
  inputArrayButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid #fff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1.2em",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
  } as React.CSSProperties,
  inputArrayButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  inputPrompt: {
    fontSize: "1.5em",
    color: "#fff",
    textShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
    marginBottom: "10px",
  } as React.CSSProperties,
  visualizationPage: {
    display: "none",
  } as React.CSSProperties,
  inputArrayPage: {
    display: "none",
  } as React.CSSProperties,
};

interface Step {
  explanation: string;
  indices: number[];
  swap: [number, number] | null;
  sortedIndex: number | undefined;
}

const Visualization: React.FC = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showVisualizationPage, setShowVisualizationPage] =
    useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cartoonRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<HTMLSpanElement[]>([]);
  const [selectionBoxStyle, setSelectionBoxStyle] = useState<{
    [key: string]: React.CSSProperties;
  }>({
    "Selection Sort": styles.selectionBox,
    "Insertion Sort": styles.selectionBox,
  });
  const [inputButtonStyle, setInputButtonStyle] = useState<React.CSSProperties>(
    styles.inputArrayButton
  );
  const [backButtonStyle, setBackButtonStyle] = useState<React.CSSProperties>(
    styles.backButton
  );
  const [homeButtonStyle, setHomeButtonStyle] = useState<React.CSSProperties>(
    styles.homeButton
  );
  const [stepButtonStyle, setStepButtonStyle] = useState<React.CSSProperties>(
    styles.stepButton
  );

  const [showNextButton, setShowNextButton] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputArray, setInputArray] = useState<number[] | null>(null);
  const [showHomeButton, setShowHomeButton] = useState(false);

  const showCartoonAnimation = () => {
    if (cartoonRef.current) {
      cartoonRef.current.style.display = "block";
      setTimeout(() => {
        if (cartoonRef.current) {
          cartoonRef.current.style.display = "none";
        }
      }, 3000);
    }
  };

  const showConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.style.display = "block";
      setTimeout(() => {
        if (confettiRef.current) {
          confettiRef.current.style.display = "none";
        }
      }, 3000);
    }
  };

  const handleShowInput = (algorithmName: string) => {
    showCartoonAnimation();
    showConfetti();
    setCurrentAlgorithm(algorithmName);
    setShowInput(true);
    setShowHomeButton(false);
  };
  const handleStartVisualizationFromInput = () => {
    const inputElement = document.getElementById(
      "array-input"
    ) as HTMLInputElement;
    if (inputElement) {
      try {
        const input = inputElement.value;
        const parsedArray = input
          .split(",")
          .map((item) => parseInt(item.trim()));
        if (parsedArray.some(isNaN)) {
          alert("Please enter valid comma separated integers.");
          return;
        }
        if (parsedArray.length === 0) {
          alert("Please enter at least one valid integer.");
          return;
        }
        setInputArray(parsedArray);
        setShowInput(false);
        setShowVisualizationPage(true);
        setShowHomeButton(false);
        setShowNextButton(true);
        setShowBackButton(true);
        resetVisualization();
        prepareSteps(currentAlgorithm, parsedArray);
      } catch (e) {
        alert("Please enter valid comma separated integers.");
        console.log(e);
      }
    }
  };

  const goBack = () => {
    setShowVisualizationPage(false);
    setShowInput(false);
    setCurrentAlgorithm(null);
    setInputArray(null);
    setShowNextButton(true);
    setShowHomeButton(false);
    setShowBackButton(true);
  };

  const resetVisualization = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      setSteps([]);
      setCurrentStepIndex(0);
    }
  };

  const generateRandomArray = (size: number = 20): number[] => {
    return Array.from(
      { length: size },
      () => Math.floor(Math.random() * 50) + 1
    );
  };

  const prepareSteps = (
    algorithmName: string | null,
    array: number[] | null = null
  ) => {
    if (!algorithmName) return;

    const arrToUse = array || generateRandomArray();
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      arrToUse.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "data-bar";
        Object.assign(bar.style, styles.dataBar);
        bar.textContent = value.toString();
        containerRef.current?.appendChild(bar);
      });
    }

    let newSteps: Step[] = [];
    if (algorithmName === "Selection Sort") {
      newSteps = getSelectionSortSteps(arrToUse);
    } else if (algorithmName === "Insertion Sort") {
      newSteps = getInsertionSortSteps(arrToUse);
    }
    setSteps(newSteps);
    setCurrentStepIndex(0);
    if (newSteps.length > 0) {
      applyStep();
    }
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length) {
      applyStep();
    } else {
      setShowNextButton(false);
      setShowBackButton(false);
      const stepExplanationElement =
        document.getElementById("step-explanation");
      if (stepExplanationElement) {
        stepExplanationElement.textContent = "Sorting Complete!";
        setShowHomeButton(true);
      }
    }
  };
  const goToHomePage = () => {
    window.location.reload();
  };

  const applyStep = () => {
    if (!steps || steps.length === 0 || !containerRef.current) return;

    const step = steps[currentStepIndex];

    const stepExplanationElement = document.getElementById("step-explanation");
    if (stepExplanationElement) {
      stepExplanationElement.textContent = step.explanation;
    }

    removeComparisonArrow();

    const bars = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".data-bar")
    );

    bars.forEach((bar) => {
      Object.assign(bar.style, styles.dataBar);
      bar.classList.remove("current");
      bar.classList.remove("swapped");
    });

    if (step.indices) {
      if (step.indices.length > 1) {
        showComparisonArrow(bars[step.indices[0]], bars[step.indices[1]], true);
      }
      step.indices.forEach((index) => {
        Object.assign(bars[index].style, styles.dataBarCurrent);
        bars[index].classList.add("current");
      });
    }

    if (step.swap) {
      Object.assign(bars[step.swap[0]].style, styles.dataBarSwapped);
      Object.assign(bars[step.swap[1]].style, styles.dataBarSwapped);
      bars[step.swap[0]].classList.add("swapped");
      bars[step.swap[1]].classList.add("swapped");

      const tempHeight = bars[step.swap[0]].textContent;
      bars[step.swap[0]].textContent = bars[step.swap[1]].textContent;
      bars[step.swap[1]].textContent = tempHeight;
    }
    if (step.sortedIndex !== undefined) {
      Object.assign(bars[step.sortedIndex].style, styles.dataBarSorted);
      bars[step.sortedIndex].classList.add("sorted");
    }

    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const getSelectionSortSteps = (arr: number[]): Step[] => {
    const steps: Step[] = [];
    const n = arr.length;
    const arrCopy = [...arr];
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          explanation: `Comparing element at index ${j} with element at index ${minIndex}`,
          indices: [j, minIndex],
          swap: null,
          sortedIndex: undefined,
        });
        if (arrCopy[j] < arrCopy[minIndex]) {
          minIndex = j;
          steps.push({
            explanation: `New minimum found at index ${j}`,
            indices: [j],
            swap: null,
            sortedIndex: undefined,
          });
        } else {
          steps.push({
            explanation: `Current min value still at index ${minIndex}`,
            indices: [minIndex],
            swap: null,
            sortedIndex: undefined,
          });
        }
      }
      if (minIndex !== i) {
        [arrCopy[i], arrCopy[minIndex]] = [arrCopy[minIndex], arrCopy[i]];

        steps.push({
          explanation: `Swapping elements at index ${i} and ${minIndex}`,
          indices: [i, minIndex],
          swap: [i, minIndex],
          sortedIndex: undefined,
        });
      }
      steps.push({
        explanation: `Element at index ${i} is sorted`,
        indices: [],
        swap: null,
        sortedIndex: i,
      });
    }
    steps.push({
      explanation: `Element at index ${n - 1} is sorted`,
      indices: [],
      swap: null,
      sortedIndex: n - 1,
    });
    return steps;
  };

  const getInsertionSortSteps = (arr: number[]): Step[] => {
    const steps: Step[] = [];
    const n = arr.length;
    const arrCopy = [...arr];
    for (let i = 1; i < n; i++) {
      const key = arrCopy[i];
      let j = i - 1;
      steps.push({
        explanation: `Inserting element at index ${i} into sorted portion`,
        indices: [i],
        swap: null,
        sortedIndex: undefined,
      });
      while (j >= 0 && arrCopy[j] > key) {
        steps.push({
          explanation: `Comparing element at index ${j} with element at index ${
            j + 1
          }`,
          indices: [j, j + 1],
          swap: null,
          sortedIndex: undefined,
        });

        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];

        steps.push({
          explanation: `Moving the element at index ${j + 1} to the right`,
          indices: [j, j + 1],
          swap: [j, j + 1],
          sortedIndex: undefined,
        });
        j--;
      }
      arrCopy[j + 1] = key;
      steps.push({
        explanation: `Element at index ${j + 1} is placed correctly`,
        indices: [j + 1],
        swap: null,
        sortedIndex: j + 1,
      });
    }
    return steps;
  };

  const showComparisonArrow = (
    bar1: HTMLElement,
    bar2: HTMLElement,
    above: boolean = false
  ) => {
    if (!containerRef.current) return;
    const rect1 = bar1.getBoundingClientRect();
    const rect2 = bar2.getBoundingClientRect();
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    Object.assign(arrow.style, styles.arrow);
    containerRef.current.appendChild(arrow);
    arrowRefs.current.push(arrow);

    const containerRect = containerRef.current.getBoundingClientRect();

    let arrowTop;
    let arrowLeft;

    if (above) {
      arrowTop = Math.min(rect1.top, rect2.top) - containerRect.top - 20;
    } else {
      arrowTop = (rect1.top + rect2.top) / 2 - containerRect.top - 10;
    }
    arrowLeft = rect1.left + rect1.width / 2 - containerRect.left;

    if (rect1.left > rect2.left) {
      arrowLeft = rect2.left + rect2.width / 2 - containerRect.left;
    }

    arrow.style.left = `${arrowLeft}px`;
    arrow.style.top = `${arrowTop}px`;

    Object.assign(arrow.style, styles.arrowActive);
  };
  const removeComparisonArrow = () => {
    arrowRefs.current.forEach((arrow) => {
      Object.assign(arrow.style, styles.arrowInactive);
      setTimeout(() => {
        if (arrow.parentElement) {
          arrow.remove();
        }
      }, 300);
    });
    arrowRefs.current = [];
  };
  const handleMouseEnter = (algorithmName: string) => {
    setHoveredAlgorithm(algorithmName);
    setSelectionBoxStyle((prev) => ({
      ...prev,
      [algorithmName]: { ...prev[algorithmName], ...styles.selectionBoxHover },
    }));
  };

  const handleMouseLeave = (algorithmName: string) => {
    setHoveredAlgorithm(null);
    setSelectionBoxStyle((prev) => ({
      ...prev,
      [algorithmName]: styles.selectionBox,
    }));
  };

  return (
    <div style={styles.body}>
      <style>{styles.keyframes}</style>
      <div
        id="landing-page"
        style={{
          display: showInput || showVisualizationPage ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={styles.h1}>🧠 Visualizing Algorithm 🚀</h1>
        <h2 style={styles.h2}>Visualizing algorithms through animation</h2>

        <div
          style={selectionBoxStyle["Selection Sort"]}
          onClick={() => handleShowInput("Selection Sort")}
          onMouseEnter={() => handleMouseEnter("Selection Sort")}
          onMouseLeave={() => handleMouseLeave("Selection Sort")}
        >
          Selection Sort 🗃️
        </div>
        <div
          style={selectionBoxStyle["Insertion Sort"]}
          onClick={() => handleShowInput("Insertion Sort")}
          onMouseEnter={() => handleMouseEnter("Insertion Sort")}
          onMouseLeave={() => handleMouseLeave("Insertion Sort")}
        >
          Insertion Sort ✏️
        </div>

        <div
          className="cartoon-animation"
          ref={cartoonRef}
          style={{ display: "none" }}
        >
          🎉 Lets Visualize It! 🚀
        </div>

        <div
          className="confetti"
          ref={confettiRef}
          style={{ display: "none" }}
        ></div>

        <div style={styles.footer}>
          Created by ABDUL WASAY ABID and SADDIQA SHAHID
        </div>
      </div>

      <div
        id="input-array-container"
        style={{
          ...styles.inputArrayContainer,
          display: showInput ? "flex" : "none",
        }}
      >
        <div id="input-prompt" style={styles.inputPrompt}>
          Enter your array separated by commas:
        </div>
        <input type="text" id="array-input" style={styles.inputArrayInput} />
        <button
          onClick={handleStartVisualizationFromInput}
          style={inputButtonStyle}
          onMouseEnter={() => {
            setInputButtonStyle({
              ...inputButtonStyle,
              ...styles.inputArrayButtonHover,
            });
          }}
          onMouseLeave={() => {
            setInputButtonStyle(styles.inputArrayButton);
          }}
        >
          Visualize
        </button>
      </div>

      <div
        id="visualization-page"
        style={{
          ...styles.visualizationPage,
          display: showVisualizationPage ? "flex" : "none",
        }}
      >
        {showBackButton && (
          <button
            style={backButtonStyle}
            onClick={goBack}
            onMouseEnter={() => {
              setBackButtonStyle({
                ...backButtonStyle,
                ...styles.backButtonHover,
              });
            }}
            onMouseLeave={() => {
              setBackButtonStyle(styles.backButton);
            }}
          >
            Go Back
          </button>
        )}

        {showHomeButton && (
          <button
            style={homeButtonStyle}
            onClick={goToHomePage}
            onMouseEnter={() => {
              setHomeButtonStyle({
                ...homeButtonStyle,
                ...styles.homeButtonHover,
              });
            }}
            onMouseLeave={() => {
              setHomeButtonStyle(styles.homeButton);
            }}
          >
            Home Page
          </button>
        )}
        <div id="step-explanation" style={styles.stepExplanation}></div>
        <div
          id="visualization-container"
          style={styles.visualizationContainer}
          ref={containerRef}
        ></div>
        <div style={styles.stepControls}>
          {showNextButton && (
            <button
              style={stepButtonStyle}
              onClick={nextStep}
              onMouseEnter={() => {
                setStepButtonStyle({
                  ...stepButtonStyle,
                  ...styles.stepButtonHover,
                });
              }}
              onMouseLeave={() => {
                setStepButtonStyle(styles.stepButton);
              }}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualization;
