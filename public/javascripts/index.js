const editor = new MediumEditor('.editable');

function clickHandler() {
    const content = editor.getContent();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/save');
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('DONE')
        }
    };
    xhr.send(content);
}
document.getElementById('save-button').addEventListener('click', clickHandler)