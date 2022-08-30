const body = document.body;
const images = [];
const rowNumber = 5;
const columnNumber = 5;
const imagesPosition = [{
        left: 4,
        top: 4
    },
    {
        left: 119,
        top: 4
    },
    {
        left: 247,
        top: 4
    },
    {
        left: 370,
        top: 4
    },
    {
        left: 476,
        top: 4
    },
    {
        left: 4,
        top: 99
    },
    {
        left: 98,
        top: 121
    },
    {
        left: 221,
        top: 97
    },
    {
        left: 371,
        top: 121
    },
    {
        left: 497,
        top: 95
    },
    {
        left: 4,
        top: 224
    },
    {
        left: 119,
        top: 247
    },
    {
        left: 226,
        top: 249
    },
    {
        left: 351,
        top: 248
    },
    {
        left: 497,
        top: 223
    },
    {
        left: 4,
        top: 353
    }, {
        left: 121,
        top: 351
    }, {
        left: 252,
        top: 376
    }, {
        left: 370,
        top: 351
    }, {
        left: 479,
        top: 352
    }, {
        left: 3,
        top: 501
    }, {
        left: 96,
        top: 476
    }, {
        left: 223,
        top: 501
    }, {
        left: 369,
        top: 499
    }, {
        left: 475,
        top: 502
    }

]
const scoreSound = new Audio('./score.mp3');
const redemption = new Audio('./redemption.mp3');

const animations = ['slide-in-blurred-top', 'slide-in-blurred-tr', 'slide-in-blurred-right', 'slide-in-blurred-br', 'slide-in-blurred-bottom', 'slide-in-blurred-bl', 'slide-in-blurred-left', 'slide-in-blurred-tl'];

const maxItemLength = 200;
// document.body.querySelector('.background').ondragstart = function() { return false; };
// document.body.querySelector('.final').ondragstart = function() { return false; };
document.body.ondragstart = function() { return false; };

renderItems();

function renderItems() {
    for (let i = 0; i < rowNumber * columnNumber; i++) {
        const img = new Image();
        const wrapper = document.querySelector('.wrapper');
        // img.src = './images/' + (i + 1) + '.png';
        img.style.position = 'absolute';
        img.isFreezed = false;
        // const width = window.innerWidth;
        // const height = window.innerHeight;
        img.classList.add('item');

        const width = wrapper.offsetWidth;
        const height = wrapper.offsetHeight;

        const wrapperX = wrapper.getBoundingClientRect().left;
        const wrapperY = wrapper.getBoundingClientRect().top;


        // img.style.left = `${getRandomIntInclusive(0, width - maxItemLength*2)}px`;
        // img.style.top = `${getRandomIntInclusive(0, height - maxItemLength*2)}px`;

        img.style.left = `${getRandomIntInclusive(-width + 50, (window.innerWidth - width) -150)}px`;
        // img.style.left = `${getRandomPosition(-wrapperX, -150, width, window.innerWidth - width - 150)}px`;
        img.style.top = `${getRandomIntInclusive(-wrapperY , height + (window.innerHeight - ( wrapperY + height)) - 160)}px`;
        // img.style.top = `${getRandomPosition(-wrapperY, -150, height, window.innerHeight - height - 150)}px`;

        images.push(img);

        img.onload = function() {
            setAnimation(img);
            wrapper.appendChild(img);

        }
        img.src = './images/' + (i + 1) + '.png';
    }

    //     setTimeout(() => {
    //         images.forEach((el) => {
    //             document.querySelector('.wrapper').appendChild(el);
    //             // body.appendChild(el);
    //         })
    //         setAnimations();
    //     }, 300)

}

// function setAnimations() {
//     images.forEach(el => {
//         el.style.animationDuration = `${getAnimationDuration()}s`;
//         el.style.animationName = `${animations[getRandomIntInclusive(0, animations.length - 1 )]}`;
//     })
// }

function setAnimation(item) {

    item.style.animationDuration = `${getAnimationDuration()}s`;
    item.style.animationName = `${animations[getRandomIntInclusive(0, animations.length - 1 )]}`;

}

// setTimeout(() => {
//     setAnimations();
// }, 300)

document.onmousedown = function(event) {

    if (event.target.classList.contains('item')) {


        const item = event.target; // 
        if (item.isFreezed) return;

        images.forEach((el) => {
            if (!el.isFreezed) el.style.zIndex = '0';
        })
        item.style.zIndex = '100'; // кликабельный элемент всегда будет сверху

        let shiftX = event.pageX - event.target.getBoundingClientRect().left;
        let shiftY = event.pageY - event.target.getBoundingClientRect().top;



        item.ondragstart = function() {
            return false;

        }

        function moveAt(pageX, pageY) {

            if (document.querySelector('.wrapper').contains(item)) {
                item.style.left = (pageX - shiftX) - document.querySelector('.wrapper').getBoundingClientRect().left + 'px';
                item.style.top = (pageY - shiftY) - document.querySelector('.wrapper').getBoundingClientRect().top + 'px';
            } else {
                item.style.left = pageX - shiftX + 'px';
                item.style.top = pageY - shiftY + 'px';
            }

        }

        function onMouseMove(e) {


            moveAt(e.pageX, e.pageY);

            // item.hidden = true;
            // let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            // item.hidden = false;

        }

        document.addEventListener('mousemove', onMouseMove);

        event.currentTarget.onmouseup = function() {
            checkPosition(item);
            checkGameStatus();
            document.removeEventListener('mousemove', onMouseMove);
            // item.onmouseup = null;
            //             event.currentTarget.onmouseup = null;




        };
    } else document.onmouseup = null;


}

function checkGameStatus() {
    let isOver = true;
    images.forEach(el => {
        if (!el.isFreezed) isOver = false;
    })
    if (isOver) {
        const finalImage = document.querySelector('.final');
        finalImage.style.zIndex = '100';
        finalImage.style.opacity = '1.0';
        finalImage.style.visibility = 'visible';
        setTimeout(() => {
            redemption.play();
            document.onmouseup = null;
            // images.forEach((el) => {
            //     el.onmouseup = function() { return false; };
            //     document.onmouseup = null;
            // })
        }, 400);


    }


}

function checkPosition(item) {
    const index = images.indexOf(item);
    const wrapper = document.querySelector('.wrapper');
    if (index === -1) { console.log('not Found'); return }

    if ((Math.abs(item.getBoundingClientRect().left - wrapper.getBoundingClientRect().left - imagesPosition[index].left) < 4) &&
        (Math.abs(item.getBoundingClientRect().top - wrapper.getBoundingClientRect().top - imagesPosition[index].top) < 4)) {
        // console.log('Match!!', item.getBoundingClientRect().left, imagesPosition[index].left);
        item.isFreezed = true;
        item.style.zIndex = '-1';
        setStaticPosition(index);
    }
}

function setStaticPosition(index) {
    images[index].style.left = imagesPosition[index].left + 'px';
    images[index].style.top = imagesPosition[index].top + 'px';
    scoreSound.play();
    console.log(typeof(imagesPosition[index].left + 'px'));
}

function getAnimationDuration() {
    return String(Math.random() + 0.7).slice(0, 7)
}

function getRandomPosition(windowSize, wrapperSize, wrapperStartPos) {
    const nums = [];
    nums.push(getRandomIntInclusive(-wrapperStartPos, wrapperStartPos));
    nums.push(getRandomIntInclusive(wrapperStartPos, wrapperStartPos + wrapperSize));
    nums.push(getRandomIntInclusive(wrapperSize, wrapperSize + (windowSize - wrapperStartPos + wrapperSize)));


    return nums[getRandomIntInclusive(0, 3)];
}




function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// export { images };