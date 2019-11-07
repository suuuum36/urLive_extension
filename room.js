
const encrypt = localStorage.getItem('encrypt')
console.log(encrypt)
whale.storage.sync.set({site: encrypt}, () => {
});

fetch(`http://127.0.0.1:8000/${encrypt}/`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }}).then(res => {
        return res.json()
    }).then(resJSON => {
        console.log(resJSON)

        const { pincode, users_str, room_name, memo_url, memo_content, memo_author } = resJSON
        const users = users_str.split('/')
        
        const pincodeInput = document.querySelector('#myInput')
        const roomNameContainer = document.querySelector('#roomName')
        const usersContainer = document.querySelector('#users')

        const memoContainer = document.querySelector('.memo_list') //메모 추가 
        const memo_url_list = memo_url.split('[partition]') //메모 추가 
        const memo_content_list = memo_content.split('/')
        const memo_author_list = memo_author.split('/')


        for (let i=0; i<memo_url_list.length-1; i++){
            const div = document.createElement('div')
            div.innerHTML = (i+1) +"."
            div.innerHTML += " url: " + memo_url_list[i];
            div.innerHTML += " 작성자: " + memo_author_list[i];
            div.innerHTML += " 내용: " +memo_content_list[i];
            div.innerHTML += "<br/>"
            memoContainer.append(div)

        }
        pincodeInput.value = pincode
        roomNameContainer.innerText = room_name

        for(let i=0; i<users.length-1; i++) {
            
            const largediv = document.createElement('div')
            const div = document.createElement('div')
            const textdiv = document.createElement('p')
            largediv.classList.add('outerline')
            div.classList.add('users')
            console.log(users[i]);
            textdiv.innerText = users[i].substring(0,2)
            div.key = i
            div.id = i
            div.appendChild(textdiv)
            largediv.appendChild(div)
            usersContainer.append(largediv)
            const myArray = ['#8fc100', '#5da0ff', '#ffbde6', '#a459fc'];    
            const rand = myArray[Math.floor(Math.random() * myArray.length)];
            document.getElementById(`${i}`).style.backgroundColor = rand;
        }


        const copyText = document.querySelector('.tooltip')
        copyText.addEventListener('click', () => {
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");

            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "복사완료: " + copyText.value;
        })

        const again = document.querySelector('.tooltip')
        again.addEventListener("mouseout", () => {
            var again = document.getElementById("myTooltip");
            again.innerHTML = "초대코드 복사";
        })
    })


window.addEventListener(`DOMContentLoaded`, () => {
    // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
    whale.storage.local.get(`message`, storage => {
        console.log(storage.message); // = Hello
        if (storage.message) {whale.tabs.create( {url: storage.message});}
        whale.storage.local.remove(`message`);
        
    });
    whale.storage.onChanged.addListener((changes, areaName) => {
        window.location.reload(true)
        if (areaName === `local` && changes.newValue) {
            if (`message` in changes.newValue ) {
                console.log(changes.newValue.message);
            }
            window.location.reload(true)
        }
        
    });
    
});

// setTimeout(function() {
//     location.reload();
// }, 30000);
// window.addEventListener(`DOMContentLoaded`, () => {
//     // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
//     whale.storage.local.get(`message`, storage => {
//         console.log(storage.message); // = Hello
//         if (storage.message) {whale.tabs.create( {url: storage.message});}
//         whale.storage.local.remove(`message`);
        
//     });

//     whale.storage.onChanged.addListener((changes, areaName) => {
//         window.location.reload(true)
//         if (areaName === `local` && changes.newValue) {
//             if (`message` in changes.newValue ) {
//                 console.log(changes.newValue.message);
//             }
//             window.location.reload(true)
//         }
        
//     });
    
// });

// const memoContainer = document.querySelector('.memo_list')

// window.addEventListener(`DOMContentLoaded`, () => {
//     // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
//     whale.storage.local.get(`memo_url`, result => {
//         console.log(result.memo_url); 
//         if (result.memo_url) {
//             const div = document.createElement('div')
//             div.classList.add('urls')
//             div.innerText= result.memo_url
//             memoContainer.appendChild(div)
            
//         }
//         // whale.storage.local.remove(`memo_url`);
        
//     });
//     whale.storage.local.get(`memo_content`, result2 => {
//         console.log(result2.memo_content); 
//         if (result2.memo_content) {
//             const div = document.createElement('div')
//             div.classList.add('urls_content')
//             div.innerText= result2.memo_content
//             memoContainer.appendChild(div)
            
//         }
//         // whale.storage.local.remove(`memo_url`);
        
//     });

    
//     // whale.storage.onChanged.addListener((changes, areaName) => {
//     //     window.location.reload(true)
//     //     if (areaName === `local` && changes.newValue) {
//     //         if (`message` in changes.newValue ) {
//     //             console.log(changes.newValue.message);
                
//     //         }
//     //         window.location.reload(true)
//     //     }
        
//     // });
    
// });
