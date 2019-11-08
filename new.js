console.log('FDasdfafdsf')
const makeButton = document.querySelector('.make_room_button')

// whale.storage.sync 가 background 에서 uid를 생성못시키고, set을 못시켜서 빈값을 넘겨줌.

makeButton.addEventListener('click', () => {
  const name = document.querySelector('#name').value
  const nickname = document.querySelector('#nickname').value

whale.storage.sync.get('uid', result => {
    fetch('https://still-anchorage-85470.herokuapp.com/make/', {
        method: 'POST',
        body: JSON.stringify({"name":name, "nickname": nickname, "uid": result.uid}),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json()
        }).then(resJSON => {
            console.log(resJSON)
            const { encrypt } = resJSON
            if (encrypt) {
                // localStorage.setItem("encrypt", encrypt)
                whale.storage.sync.set({site: encrypt}, () => {
                });
                window.location.href='room.html'
              //   window.location.href = `http://127.0.0.1:8000/${encrypt}/`
            }
        })
    });
})