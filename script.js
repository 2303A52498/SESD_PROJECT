function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('sectionTitle').innerText = id.charAt(0).toUpperCase() + id.slice(1);
}

const books = [
  { title: "Deep Learning", author: "Ian Goodfellow", category: "AI", status: "Available" },
  { title: "Hands-on Machine Learning", author: "Aurelien Geron", category: "ML", status: "Borrowed" },
  { title: "Data Science from Scratch", author: "Joel Grus", category: "Data Science", status: "Available" },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Web Dev", status: "Available" },
  { title: "AI for Everyone", author: "Andrew Ng", category: "AI", status: "Available" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Web Dev", status: "Available" },
  { title: "Cloud Native Patterns", author: "Cornelia Davis", category: "Cloud", status: "Available" },
  { title: "Cybersecurity Essentials", author: "Charles Brooks", category: "Cybersecurity", status: "Borrowed" },
  { title: "Practical Statistics for Data Scientists", author: "Peter Bruce", category: "Data Science", status: "Available" },
  { title: "Mastering AWS", author: "Mark Wilkins", category: "Cloud", status: "Available" }
];

const fines = [];
const notifications = [];

function updateDashboard() {
  document.getElementById('totalBooks').innerText = books.length;
  document.getElementById('borrowedCount').innerText = books.filter(b => b.status === "Borrowed").length;
  const totalFine = fines.reduce((sum, f) => sum + f.amount, 0);
  document.getElementById('fineAmount').innerText = `₹${totalFine}`;
}

function searchBooks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categorySelect').value;

  const filtered = books.filter(b =>
    (category === 'all' || b.category === category) &&
    (b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query))
  );

  document.getElementById('bookTableBody').innerHTML = filtered.map(b =>
    `<tr><td>${b.title}</td><td>${b.author}</td><td>${b.category}</td><td>${b.status}</td></tr>`
  ).join('');
}

function borrowBook() {
  const student = document.getElementById('borrowStudent').value.trim();
  const bookName = document.getElementById('borrowBook').value.trim();
  const book = books.find(b => b.title.toLowerCase() === bookName.toLowerCase());

  if (!student || !bookName) return alert("Please fill all fields!");
  if (!book) return alert("Book not found!");
  if (book.status === "Borrowed") return alert("Book is already borrowed!");

  book.status = "Borrowed";
  addNotification(`${student} borrowed "${book.title}".`);
  updateDashboard();
  searchBooks();
}

function returnBook() {
  const student = document.getElementById('returnStudent').value.trim();
  const bookName = document.getElementById('returnBook').value.trim();
  const book = books.find(b => b.title.toLowerCase() === bookName.toLowerCase());

  if (!student || !bookName) return alert("Please fill all fields!");
  if (!book) return alert("Book not found!");
  if (book.status === "Available") return alert("Book is not borrowed!");

  book.status = "Available";
  const daysLate = Math.floor(Math.random() * 5);
  if (daysLate > 0) {
    const fine = daysLate * 10;
    fines.push({ student, book: book.title, days: daysLate, amount: fine });
    updateFineTable();
    addNotification(`${student} returned "${book.title}" late. Fine ₹${fine}.`);
  } else {
    addNotification(`${student} returned "${book.title}" on time.`);
  }
  updateDashboard();
  searchBooks();
}

function updateFineTable() {
  const fineTableBody = document.getElementById('fineTableBody');
  if (fines.length === 0) {
    fineTableBody.innerHTML = "<tr><td colspan='4'>No pending fines.</td></tr>";
  } else {
    fineTableBody.innerHTML = fines.map(f =>
      `<tr><td>${f.student}</td><td>${f.book}</td><td>${f.days}</td><td>₹${f.amount}</td></tr>`
    ).join('');
  }
}

const sampleNotifications = [
  "📢 Reminder: 'Deep Learning' is due tomorrow.",
  "📢 John borrowed 'Data Science from Scratch'.",
  "📢 Sarah returned 'Eloquent JavaScript' on time.",
  "📢 Fine Alert: Ramesh owes ₹30 for 'Hands-on Machine Learning'.",
  "📢 New Book: 'Cloud Native Patterns' added!",
  "📢 Library will be closed Sunday for maintenance."
];

function loadSampleNotifications() {
  document.getElementById('notificationList').innerHTML = sampleNotifications.map(n => `<li>${n}</li>`).join('');
}

function addNotification(msg) {
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  notifications.unshift(`⏰ ${time} — ${msg}`);
  const all = [...notifications, ...sampleNotifications].slice(0, 10);
  document.getElementById('notificationList').innerHTML = all.map(n => `<li>${n}</li>`).join('');
}

updateDashboard();
searchBooks();
updateFineTable();
loadSampleNotifications();






