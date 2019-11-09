const makeButton = document.querySelector('.make_room_button')


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
            const { encrypt } = resJSON
            if (encrypt) {
                whale.storage.sync.set({site: encrypt}, () => {
                });
                window.location.href='room.html'
            }
        })
    });
    const Reset = document.getElementById('name')
    Reset.value = Reset.defaultValue;
    const Reset2 = document.getElementById('nickname')
    Reset2.value = Reset.defaultValue;
})