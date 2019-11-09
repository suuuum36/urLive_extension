const enterButton = document.querySelector('.enter_room_button')

enterButton.addEventListener('click', () => {
  const pin = document.querySelector('#pin').value
  const nickname = document.querySelector('#nickname').value

whale.storage.sync.get('uid', result => {
    fetch('https://still-anchorage-85470.herokuapp.com/enter/', {
        method: 'POST',
        body: JSON.stringify({"pincode": pin, "nickname": nickname, "uid": result.uid}),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(function(response) {
            if (!response.ok) {
                alert('이미 입장하였거나 존재하지 않는 방입니다')
            }
            return response.json();
        }).then(resJSON => {

            const { encrypt } = resJSON
            if (encrypt) {
                whale.storage.sync.set({site: encrypt}, () => {
                });
                window.location.href='room.html'
            }
        })
    });

    const Reset = document.getElementById('pin')
    Reset.value = Reset.defaultValue;
    const Reset2 = document.getElementById('nickname')
    Reset2.value = Reset.defaultValue;
    
})