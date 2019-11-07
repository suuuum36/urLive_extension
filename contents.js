
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

//공유하기 버튼//
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
        <textarea class = "memo_text" id="memo_area" name="메모입력" rows="1" cols="1" placeholder="메모를 입력하세요."></textarea>
        <div class = "memo_submit_button">
            <input class = "submit_button" type="submit" id="memo_submit" value="저장"/>
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

const submitButton = document.querySelector('.submit_button')
submitButton .addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'none'
})


const memoButton = document.querySelector("#memoButton")
memoButton.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'block'
})

var memo_url;
var memo_content;

// document.getElementById('memo_submit').addEventListener('click',function(){
//     memo_url = String(window.location.href);
//     memo_content= String(document.getElementById('memo_area').value);
//     // whale.storage.local.set({
//     //     memo_content: memo_content
//     // }, () => {      
//     // });
//     console.log(memo_url)
//     console.log(memo_content)
    
// })

document.getElementById('memo_submit').addEventListener('click',function(){
    var encrypt;
    memo_url = String(window.location.href);
    memo_content= String(document.getElementById('memo_area').value);
    whale.storage.sync.get('site', result => {
        // console.log(result.site)
        encrypt=result.site
        // console.log(encrypt)
        whale.storage.sync.get('uid', result => {
            console.log(encrypt)
            
            fetch(`http://127.0.0.1:8000/memo/${encrypt}/`, {
    
            
                method: 'POST',
                body: JSON.stringify({"url": memo_url, "content": memo_content, "uid": result.uid}),
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(res => {
                    return res.json()
                }).then(resJSON => {
                    console.log(resJSON)
                
            })
        });
    })
    
})







// document.getElementById('memoButton').addEventListener('click',function(){
//     var count=0;
//     const memo_url = String(window.location.href);
//     console.log(memo_url); 
//     // console.log(memo_content);
//     whale.storage.local.set({
//         memo_url: memo_url
//     }, () => {      
//     });

//     document.getElementById('memo_submit').addEventListener('click',function(){
//         const memo_content= String(document.getElementById('memo_area').value);
//         count= count+1;
//         whale.storage.local.set({
//             memo_content: memo_content
//         }, () => {      
//         });
//         console.log(memo_content)
        
//     })



// })


