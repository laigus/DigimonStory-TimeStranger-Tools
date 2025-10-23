function autoResizeTextarea(textarea) {
    if (!textarea) return;
    const maxHeight = parseInt(textarea.dataset.maxHeight || '400', 10);
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
}

function initializeNotesPane() {
    const notesTextarea = document.getElementById('notesTextarea');
    if (!notesTextarea) return;

    const savedContent = localStorage.getItem(NOTES_STORAGE_KEY) || '';
    notesTextarea.value = savedContent;
    autoResizeTextarea(notesTextarea);

    notesTextarea.addEventListener('input', (event) => {
        localStorage.setItem(NOTES_STORAGE_KEY, event.target.value);
        autoResizeTextarea(event.target);
    });
}