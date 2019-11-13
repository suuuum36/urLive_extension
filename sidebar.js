

whale.storage.sync.set({toggle: 'false'}, function() {
});


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
    fetch(`https://still-anchorage-85470.herokuapp.com/list/${uid}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json()
        }).then(resJSON => {
            const { room_name_arr, room_url_arr, room_part_arr } = resJSON
            const roomName = room_name_arr.split('/')
            const roomUrl = room_url_arr.split('/')
            const roomParti = room_part_arr.split('/')
            document.getElementById('roomCnt').innerText = roomName.length-1;

            if (roomName.length-1 === 0) {

                const youtubeDiv = document.createElement('div')
                youtubeDiv.classList.add('youtube_div')
                youtubeDiv.style = "display: inline-grid; margin: auto;"
                
                // const youtubeHeader = document.createElement('div')
                // youtubeHeader.classList.add('youtube_header')
                // youtubeHeader.style = "width: fit-content; heigh: fit-content; display: flex; align-items: flex-end; margin-bottom: 3px;"

                // const Y1img = whale.runtime.getURL('images/red_logo.png')
                // const Y1 = document.createElement('img')
                // Y1.style = "height: 35px; width: auto; margin-left: 11px;"
                // Y1.src = Y1img;

                const Y2 = document.createElement('p')
                Y2.innerText = "urLive 사용법 영상 보러가기"
                Y2.style = "font-size: 14px; color: #ff8e88; height: fit-content;"

                // const Y3img = whale.runtime.getURL('images/quit.png')
                // const Y3 = document.createElement('img')
                // Y3.src = Y3img;
                // Y3.style = "height: 13px; width: 13px; cursor: pointer;"

                // Y3.addEventListener ('click', () =>{
                //     youtubeDiv.style.display = 'none'
                // });

                const youtubeImg = whale.runtime.getURL('images/playbutton.png')
                const youtube_button = document.createElement('img')
                youtube_button.style = "margin-right: auto; margin-left: auto; margin-bottom: 14px; height: 70px; width: auto; cursor: pointer"
                youtube_button.src = youtubeImg;

                youtube_button.addEventListener ('click', () =>{
                    whale.tabs.create({url: "https://youtu.be/bsFHh-MWM3M"});   
                });

                // youtubeDiv.appendChild(youtubeHeader)
                youtubeDiv.appendChild(youtube_button)
                youtubeDiv.appendChild(Y2)
                // youtubeHeader.appendChild(Y1)
                // youtubeHeader.appendChild(Y2)
                // youtubeHeader.appendChild(Y3)
                document.getElementById('background').appendChild(youtubeDiv);


            }
            if (roomName) {
                for ( let i=0; i<roomName.length-1; i++) {
                    const Room = document.createElement('div')
                    Room.classList.add('room1')
                    const deleteDiv = document.createElement('div')
                    deleteDiv.classList.add('delete_div')
                    const deleteImg = whale.runtime.getURL(`images/out_icon.png`);
                    const delete_button = document.createElement('img');
                    delete_button.style = "position: relative; height: 18px; width: auto; margin-top: auto; margin-bottom: auto;"
                    delete_button.src = deleteImg;
                    deleteDiv.appendChild(delete_button)
                    //삭제 버튼 tooltip
                    const tooltip = document.createElement ('div')
                    tooltip.classList.add('tooltiptext')
                    tooltip.innerHTML = "방 나가기"
                    deleteDiv.appendChild(tooltip)
                    const TouchArea = document.createElement ('div')
                    TouchArea.classList.add('touch_area')
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
                    for (let j=0; j<participant.length-1; j++){
                        if (j === participant.length-2) div2.innerText += participant[j]
                        else div2.innerText += participant[j] + ', '
                    }
                    div1.appendChild(pNum)
                    Content.appendChild(div1)
                    Content.appendChild(div2)
                    Room.appendChild(deleteDiv)
                    Room.appendChild(Content)
                    Room.appendChild(TouchArea)
                    document.getElementById('roomlist').appendChild(Room)
                    TouchArea.addEventListener('click', () => {
                        // localStorage.setItem("encrypt", roomUrl[i])
                        whale.storage.sync.set({site: roomUrl[i]}, function() {
                        });
                        fetch(`https://still-anchorage-85470.herokuapp.com/${roomUrl[i]}/`, {
                            method: 'GET',
                            headers:{
                                'Content-Type': 'application/json'
                            }}).then(res => {
                                return res.json()
                            }).then(resJSON => {
                                window.location.href='room.html'
                            })
                    })
                    delete_button.addEventListener('click', () =>{
                        if (confirm(" 방에서 나가시겠습니까?")==true){
                            fetch(`https://still-anchorage-85470.herokuapp.com/delete/${uid}/${roomUrl[i]}/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }}).then(resJSON => {
                                    setTimeout(function(){
                                        window.location.reload();
                                    }, 1);
                                })
                        } else {return;}
                    })
                }
            }
        })   
});