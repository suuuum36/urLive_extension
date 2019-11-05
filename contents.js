//*****************민기야 추가해줘**************************************** */
//********************************************************** */
const url = whale.runtime.getURL(`images/share_button.png`);
console.log(url);
const img = document.createElement('img')
img.src = url;
img.style = "position: fixed; right: 13px; bottom: 80px;  height: 60px !important; weight: auto !important;"
img.id= 'shareButton'
document.body.appendChild(img);


const url2 = whale.runtime.getURL(`images/memo_button.png`);
const img2= document.createElement('img')
img2.src = url2;
img2.style = "position: fixed; right: 13px; bottom: 23px;  height: 60px !important; weight: auto !important;"
img2.id = 'memoButton'
document.body.appendChild(img2);

document.getElementById('shareButton').addEventListener('click',function(){
    const url = String(window.location.href);
    console.log(url);
    
    whale.storage.local.set({
        message: url
    }, () => {
        
    });

})


const url3 = whale.runtime.getURL(`images/cancel_button.png`);
const container = document.createElement('div')
container.innerHTML = `
    <div class = "memo_box">
    <div class = "memo_top">
        <img class = "cancel_button css" src= ${url3} style = "height: 7px; width: auto; padding-right: 5px;">
    </div>

    <div class = "memo_bottom">
    <div class = "memo_bottom_in">
        <div class = "memo_text_area">
        <textarea class = "memo_text" name="메모입력" rows="1" cols="1" placeholder="메모를 입력하세요."></textarea>
        <div class = "memo_submit_button">
            <input type="submit" value="저장"/>
            <input class = 'cancel_button2' type="submit" value="취소"/>
        </div>
        </div>
    </div>
    </div>
    </div>
`

document.body.appendChild(container);

const cancelButton = document.querySelector('.cancel_button')
cancelButton.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'none'
})

const cancelButton2 = document.querySelector('.cancel_button2')
cancelButton2.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'none'
})

const memoButton = document.querySelector("#memoButton")
memoButton.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'block'
})



