function dragStartHandler(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
}
function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData('text/plain');
    ev.target.appendChild(document.getElementById(data));
    document.getElementById(data).classList.remove('dragging');
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#draggables div').forEach(div => {
        div.addEventListener('dragstart', dragStartHandler);
    });

    document.querySelector('#dropzone')?.addEventListener('drop', dropHandler);
    document.querySelector('#dropzone')?.addEventListener('dragover', dragoverHandler);
});
