const cards = document.querySelectorAll('.card');
const zones = document.querySelectorAll('.dropzone');
const checkButton = document.getElementById('check');
const result = document.getElementById('result');

cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
});

zones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

let draggedCard = null;

function dragStart(e) {
  draggedCard = e.target;
  setTimeout(() => e.target.style.display = 'none', 0);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (draggedCard) {
    if (e.target.classList.contains('dropzone')) {
      const zone = e.target;

      // Prevent multiple cards stacking
      if (zone.firstChild && zone.firstChild.classList && zone.firstChild.classList.contains('card')) {
        zone.removeChild(zone.firstChild);
      }

      zone.appendChild(draggedCard);
      draggedCard.style.display = 'block';
      draggedCard = null;
    }
  }
}

checkButton.addEventListener('click', () => {
  let correct = 0;
  zones.forEach(zone => {
    if (zone.firstChild && zone.firstChild.classList && zone.firstChild.classList.contains('card')) {
      const card = zone.firstChild;
      if (card.dataset.year === zone.dataset.year) {
        correct++;
      }
    }
  });

  if (correct === zones.length) {
    result.textContent = "Perfect! You placed all milestones correctly.";
    result.style.color = "lightgreen";
  } else {
    result.textContent = `${correct} out of ${zones.length} correct. Try again!`;
    result.style.color = "orange";
  }
});
