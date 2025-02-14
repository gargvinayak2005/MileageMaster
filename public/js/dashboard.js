document.addEventListener("DOMContentLoaded", async () => {
  const mileageEntries = document.getElementById("mileageEntries");
  const addMileageForm = document.getElementById("addMileageForm");

  // Fetch and display mileage entries
  const response = await fetch('/api/mileage', {
      credentials: 'include'
  });
  const entries = await response.json();
  mileageEntries.innerHTML = entries.map(entry => `
      <div class="entry">
          <p>Date: ${entry.date}</p>
          <p>Miles: ${entry.miles}</p>
          <p>Description: ${entry.description}</p>
      </div>
  `).join('');

  // Add new mileage entry
  addMileageForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const date = document.getElementById("date").value;
      const miles = document.getElementById("miles").value;
      const description = document.getElementById("description").value;

      const response = await fetch('/api/mileage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, miles, description }),
          credentials: 'include'
      });

      if (response.ok) {
          window.location.reload();
      } else {
          alert('Failed to add entry');
      }
  });
});