// const { text } = require("stream/consumers");

let files = [];
button = document.querySelector('.top button'),
form = document.querySelector('form'),
container = document.querySelector('.content'),
text = document.querySelector('.inner'),
browse = document.querySelector('.select'),
input = document.querySelector('form input')

browse.addEventListener('click', () => input.click());

input.addEventListener('change', () => {
    let file = input.files;

    for(let i = 0; i < file.length; i++) {
        if(files.every(e => e.name != file[i].name)) files.push(file[i])    
    }

    form.reset();
    showImages();
})

const showImages = () => {
    let images = '';
    files.forEach((e,i) => {
        images += `
        <div class="slider-inner">
        <div class="image active">
        <img src="${URL.createObjectURL(e)}" alt="Image">
        <span onclick="delImage(${i})">&times;</span>
      </div></div>`
    })
    container.innerHTML = images;
}

const delImage = index => {
    files.splice(index,1)
    showImages()
}

form.addEventListener('dragover', e => {
    e.preventdefault()
    form.classList.add('dragover')
    text.innerHTML = 'Drop Images here'
})

form.addEventListener('dragleave', e => {
    e.preventdefault()
    form.classList.remove('dragover')
    text.innerHTML = 'Drag & Drop image here or <span class="select">Browse</span></span>'
})

form.addEventListener('drop', e => {
    e.preventdefault()
    form.classList.remove('dragover')
    text.innerHTML = 'Drag & Drop image here or <span class="select">Browse</span></span>'
    let file = e.dataTransfer.files;
    for(let i = 0; i < file.length; i++) {
        if(files.every(e => e.name != file[i].name)) files.push(file[i])
        showImages();
    }
})


$(document).ready(function() {
    $('.next').on('click',function() {
        console.log("next");
        debugger
        var currentImg = $('.active');
        var nextImg = currentImg.next();
        if(nextImg.length) {
            currentImg.removeClass('active').css('z-index', -10);
            nextImg.addClass('active').css('z-index', 10);

        }
    });
    $('.prev').on('click',function() {
        console.log("prev");
        var currentImg = $('.active');
        var prevImg = currentImg.prev();
        if(prevImg.length) {
            currentImg.removeClass('active').css('z-index', -10);
            prevImg.addClass('active').css('z-index', 10);
        }
    });
});

const easyMDE = new EasyMDE({
    element: $('#my-text-area')[0],
    autoDownloadFontAwesome: true,
    initialValue: '## Toolbar \nHere you can see all the buttons available for the toolbar.',
    showIcons: ['strikethrough', 'code', 'table', 'redo', 'heading', 'undo', 'heading-bigger', 'heading-smaller', 'heading-1', 'heading-2', 'heading-3', 'clean-block', 'horizontal-rule'],
});
// new EasyMDE({
//     autoDownloadFontAwesome: false,
//     showIcons: ['strikethrough', 'code', 'table', 'redo', 'heading', 'undo', 'heading-bigger', 'heading-smaller', 'heading-1', 'heading-2', 'heading-3', 'clean-block', 'horizontal-rule'],
//     // element: document.getElementById('my-text-area'),
//     // element: $('#my-text-area')[0],
//     initialValue: '## Toolbar \nHere you can see all the buttons available for the toolbar.'
// });