import * as api from './api.js'

// ============ UTILITIES ============
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}

function renderList(container, items, renderItem) {
  container.innerHTML = ''
  if (!items || items.length === 0) {
    container.textContent = 'No items'
    return
  }
  const ul = document.createElement('ul')
  ul.className = 'compact'
  items.forEach(it => {
    const li = document.createElement('li')
    li.className = 'item-card'
    li.innerHTML = renderItem(it)
    ul.appendChild(li)
  })
  container.appendChild(ul)
}

// ============ TAB SWITCHING ============
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'))
    btn.classList.add('active')
    document.getElementById(`${tabName}-tab`).classList.add('active')
  })
})

// ============ BOOKS ============
async function loadBooks() {
  const statusEl = document.getElementById('booksStatus')
  const listEl = document.getElementById('books')
  statusEl.textContent = 'loading...'
  try {
    const books = await api.fetchBooks()
    listEl.innerHTML = ''
    if (!books || books.length === 0) {
      listEl.textContent = 'No books found'
      statusEl.textContent = '✓'
      return
    }
    const container = document.createElement('div')
    container.className = 'books-grid'
    books.forEach(b => {
      const card = document.createElement('div')
      card.className = 'book-card'
      card.innerHTML = `
        <div class="book-title">${escapeHtml(b.title || '—')}</div>
        <div class="book-author">by ${escapeHtml(b.author || 'unknown')}</div>
        <div class="book-meta">
          ${b.year ? `<span class="book-year">${b.year}</span>` : ''}
          ${b.genre ? `<span class="book-genre">${escapeHtml(b.genre)}</span>` : ''}
        </div>
      `
      container.appendChild(card)
    })
    listEl.appendChild(container)
    statusEl.textContent = `✓ ${books.length} books`
  } catch (err) {
    listEl.textContent = `Error: ${err.message}`
    statusEl.textContent = '✗ error'
  }
}

window.deleteBook = async (id) => {
  if (!confirm('Delete this book?')) return
  try {
    await api.deleteBook(id)
    loadBooks()
  } catch (err) {
    alert(`Delete failed: ${err.message}`)
  }
}

document.getElementById('loadBooksBtn').addEventListener('click', loadBooks)
document.getElementById('bookForm').addEventListener('submit', async e => {
  e.preventDefault()
  const statusEl = document.getElementById('bookFormStatus')
  try {
    statusEl.textContent = 'creating...'
    await api.createBook({
      title: document.getElementById('bookTitle').value,
      author: document.getElementById('bookAuthor').value,
      year: document.getElementById('bookYear').value || null,
      genre: document.getElementById('bookGenre').value || null
    })
    document.getElementById('bookForm').reset()
    statusEl.textContent = '✓ Book added'
    setTimeout(() => { statusEl.textContent = '' }, 2000)
    loadBooks()
  } catch (err) {
    statusEl.textContent = `✗ ${err.message}`
  }
})

// ============ USERS ============
const apiKeyInput = document.getElementById('apiKey')

async function loadUsers() {
  const statusEl = document.getElementById('usersStatus')
  const listEl = document.getElementById('users')
  statusEl.textContent = 'loading...'
  try {
    const apiKey = apiKeyInput.value.trim()
    const users = await api.fetchUsers(apiKey || undefined)
    renderList(listEl, users, u =>
      `<div class="item-info">
        <strong>${escapeHtml(u.name || '—')}</strong>
        <span class="muted">${escapeHtml(u.email || 'no email')}</span>
      </div>
      <button class="btn-delete" onclick="deleteUser(${u.id})">Delete</button>`
    )
    statusEl.textContent = '✓ loaded'
  } catch (err) {
    listEl.textContent = `Error: ${err.message}`
    statusEl.textContent = '✗ error'
  }
}

window.deleteUser = async (id) => {
  if (!confirm('Delete this user?')) return
  try {
    const apiKey = apiKeyInput.value.trim()
    await api.deleteUser(id, apiKey || undefined)
    loadUsers()
  } catch (err) {
    alert(`Delete failed: ${err.message}`)
  }
}

document.getElementById('loadUsersBtn').addEventListener('click', loadUsers)
document.getElementById('userForm').addEventListener('submit', async e => {
    e.preventDefault()
    const statusEl = document.getElementById('userFormStatus')
    const submitBtn = document.querySelector('#userForm button[type="submit"]')
    submitBtn.disabled = true
    try {
        statusEl.textContent = 'creating...'
        const apiKey = apiKeyInput.value.trim()
        await api.createUser({
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value
        }, apiKey || undefined)
        document.getElementById('userForm').reset()
        statusEl.textContent = '✓ User added'
        setTimeout(() => { statusEl.textContent = '' }, 2000)
        loadUsers()
    } catch (err) {
        // show the exact server message (e.g. "Email already exists")
        statusEl.textContent = `✗ ${err.message || 'Create failed'}`
    } finally {
        submitBtn.disabled = false
    }
})

// Initial load
loadBooks()