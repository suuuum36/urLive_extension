const encrypt = localStorage.getItem('encrypt')
localStorage.setItem("is_selected", encrypt)

console.log(encrypt)
fetch(`http://127.0.0.1:8000/${encrypt}/`, {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }}).then(res => {
        return res.json()
    }).then(resJSON => {
        console.log(resJSON)

        const { pincode, users_str, room_name} = resJSON
        const users = users_str.split('/')
        
        const pincodeInput = document.querySelector('#myInput')
        const roomNameContainer = document.querySelector('#roomName')
        const usersContainer = document.querySelector('#users')

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
