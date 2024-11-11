import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import "./styles/app.css";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [grades, setGrades] = useState({});
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [reportCard, setReportCard] = useState(null);
  const componentRef = useRef();

  const subjects = [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Art",
  ];

  const qualities = [
    "hardworking",
    "creative",
    "analytical",
    "responsible",
    "leadership",
    "teamwork",
    "communication",
    "problem-solving",
    "organized",
    "innovative",
  ];

  const handleGradeChange = (subject, value) => {
    setGrades((prev) => ({
      ...prev,
      [subject]: parseInt(value),
    }));
  };

  const handleQualityToggle = (quality) => {
    setSelectedQualities((prev) =>
      prev.includes(quality)
        ? prev.filter((q) => q !== quality)
        : [...prev, quality]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/report-cards",
        {
          studentName,
          grades,
          qualities: selectedQualities,
        }
      );
      setReportCard(response.data);
    } catch (error) {
      console.error("Error creating report card:", error);
      alert("Error creating report card");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="app-container">
      <div className="school-header">
        <h1>School Report Card Generator</h1>
      </div>

      <div className="student-info">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="student-name-input"
        />
      </div>

      <div className="grades-section">
        <h2>Academic Grades</h2>
        {subjects.map((subject) => (
          <div key={subject} className="grade-container">
            <label>{subject}</label>
            <input
              type="number"
              min="0"
              max="100"
              value={grades[subject] || ""}
              onChange={(e) => handleGradeChange(subject, e.target.value)}
              className="grade-input"
            />
          </div>
        ))}
      </div>

      <div className="qualities-section">
        <h2>Student Qualities</h2>
        <div className="qualities-grid">
          {qualities.map((quality) => (
            <label key={quality} className="quality-checkbox">
              <input
                type="checkbox"
                checked={selectedQualities.includes(quality)}
                onChange={() => handleQualityToggle(quality)}
              />
              {quality}
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Generate Report Card
      </button>

      {reportCard && (
        <div className="report-card" ref={componentRef}>
          <h2>Report Card</h2>
          <h3>{reportCard.studentName}</h3>

          <div className="grades-summary">
            <h4>Academic Performance</h4>
            {Object.entries(reportCard.grades).map(([subject, grade]) => (
              <div key={subject} className="grade-row">
                <span>{subject}:</span>
                <span>{grade}</span>
              </div>
            ))}
          </div>

          <div className="qualities-summary">
            <h4>Student Qualities</h4>
            <p>{reportCard.qualities.join(", ")}</p>
          </div>

          <div className="description">
            <h4>Teacher's Comments</h4>
            <p>
              {reportCard.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      )}

      {reportCard && (
        <button onClick={handlePrint} className="print-button">
          Print Report Card
        </button>
      )}
    </div>
  );
};

export default App;
