const grades = document.querySelectorAll('.grade');
const dropArea = document.querySelector('.drop-area');
const generateButton = document.getElementById('generate-paragraph');
const paragraphOutput = document.getElementById('generated-paragraph');
const adjectives = document.querySelectorAll('.adjective-section input[type="checkbox"]');

// Drag and Drop for Grades
grades.forEach(grade => {
  grade.addEventListener('dragstart', dragStart);
});

dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', dragDrop);

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.textContent);
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.preventDefault();
  const grade = e.dataTransfer.getData('text');
  dropArea.innerHTML += `<p>${grade}</p>`;
}

// Generate Paragraph Based on Adjectives
generateButton.addEventListener('click', () => {
  const selectedAdjectives = Array.from(adjectives)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  if (selectedAdjectives.length === 0) {
    paragraphOutput.textContent = 'Please select at least one quality.';
    return;
  }

  paragraphOutput.textContent = `The student is ${selectedAdjectives.join(", ")}.`;
});
