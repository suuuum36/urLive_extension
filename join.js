const enterButton = document.querySelector('.enter_room_button')

// whale.storage.sync 가 background 에서 uid를 생성못시키고, set을 못시켜서 빈값을 넘겨줌.

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
            console.log(resJSON)
            const { encrypt } = resJSON
            if (encrypt) {
                console.log(encrypt);
                // localStorage.setItem("encrypt", encrypt)
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