console.log (100);
window.addEventListener('load', (event) => {
    if (document.visibilityState === `visible`) { 
        // 사이드바가 열렸을 때
        const background = document.querySelector('.background');
        setTimeout(() => {
            background.style.display = 'none'
        }, 1500)
    } else {
        background.style.display = 'none'
        // 사이드바가 닫혔을 때
    }
});

whale.storage.sync.get('uid', result => {
    const uid = result.uid
    fetch(`http://127.0.0.1:8000/list/${uid}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json()
        }).then(resJSON => {
            console.log(resJSON)

            const { room_name_arr, room_url_arr, room_part_arr } = resJSON
            const roomName = room_name_arr.split('/')
            const roomUrl = room_url_arr.split('/')
            const roomParti = room_part_arr.split('/')
            console.log(roomParti)
            document.getElementById('roomCnt').innerText = roomName.length-1;
            console.log(roomName);
            console.log(roomUrl);
            if (roomName) {
                for ( let i=0; i<roomName.length-1; i++) {
                    const Room = document.createElement('div')
                    Room.classList.add('room1')
                    const Content = document.createElement('div')
                    Content.classList.add('room_content')
                    const div1 = document.createElement('div')
                    div1.classList.add('p2');
                    div1.innerText = roomName[i]
                    const div2 = document.createElement('div')
                    div2.classList.add('p3')
                    const pNum = document.createElement('p')
                    //pNum.classList.add('')
                    const participant = roomParti[i].split('=')
                    pNum.innerText = participant.length-1
                    console.log(participant)
                    for (let j=0; j<participant.length-1; j++){
                        if (j === participant.length-2) div2.innerText += participant[j]
                        else div2.innerText += participant[j] + ', '
                    }
                    div1.appendChild(pNum)
                    Content.appendChild(div1)
                    Content.appendChild(div2)
                    Room.appendChild(Content)
                    document.getElementById('roomlist').appendChild(Room)
                    Room.addEventListener('click', () => {
                        fetch(`http://127.0.0.1:8000/${roomUrl[i]}/`, {
                            method: 'GET',
                            headers:{
                                'Content-Type': 'application/json'
                            }}).then(res => {
                                return res.json()
                            }).then(resJSON => {
                                console.log(resJSON)
                                window.location.href='room.html'
                                const { encrypt, pincode, users_str, room_name} = resJSON
                                localStorage.setItem("is_selected", encrypt)
                                const users = users_str.split('/')
                                const pincodeInput = document.querySelector('#myInput')
                                const roomNameContainer = document.querySelector('#roomName')
                                const usersContainer = document.querySelector('#users')

                                pincodeInput.value = pincode
                                roomNameContainer.innerText = room_name

                                users.forEach((u, i) => {
                                    const div = document.createElement('div')
                                    div.innerText = u
                                    div.key = i

                                    usersContainer.append(div)
                                })
                                whale.storage.sync.set({site: roomUrl[i]}, () => {
                                });

                                const copyText = document.querySelector('.tooltip')
                                copyText.addEventListener('click', () => {
                                    var copyText = document.getElementById("myInput");
                                    copyText.select();
                                    copyText.setSelectionRange(0, 99999);
                                    document.execCommand("copy");

                                    var tooltip = document.getElementById("myTooltip");
                                    tooltip.innerHTML = "복사완료: " + copyText.value;
                                })
                            })

                    })
                }
            }
                    
        })
    });