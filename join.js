const enterButton = document.querySelector('.enter_room_button')

// whale.storage.sync 가 background 에서 uid를 생성못시키고, set을 못시켜서 빈값을 넘겨줌.

enterButton.addEventListener('click', () => {
  const pin = document.querySelector('#pin').value
  const nickname = document.querySelector('#nickname').value

whale.storage.sync.get('uid', result => {
    fetch('https://still-anchorage-85470.herokuapp.com/enter/', {
        method: 'POST',
        body: JSON.stringify({"pincode":pin, "nickname": nickname, "uid": result.uid}),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json()
        }).then(resJSON => {
            console.log(resJSON)
            const { encrypt, exist } = resJSON
            if (encrypt) {
                console.log(encrypt);
                // localStorage.setItem("encrypt", encrypt)
                whale.storage.sync.set({site: encrypt}, () => {
                });
                whale.storage.sync.set({exist: exist}, () => {
                });
                window.location.href='room.html'
            }
        })
    });
})