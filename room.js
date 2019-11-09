whale.storage.sync.get('site', result => {
    const encrypt= result.site
    whale.storage.sync.get('uid', user =>{
        
        fetch(`https://still-anchorage-85470.herokuapp.com/${encrypt}/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }}).then(res => {
            return res.json()
        }).then(resJSON => {
            const { pincode, users_str, room_name, memo_url, memo_content, memo_author, shared_list ,sender } = resJSON
            const users = users_str.split('/')
            const pincodeInput = document.querySelector('#myInput')
            const roomNameContainer = document.querySelector('#roomName')
            const usersContainer = document.querySelector('#users')
            const memoContainer = document.querySelector('.memo_list') //메모 추가 
            const memo_url_list = memo_url.split('[partition]') //메모 추가 
            const memo_content_list = memo_content.split('/')
            const memo_author_list = memo_author.split('/')
            whale.storage.sync.set({users_str: users_str }, () => {
            });
            whale.storage.sync.set({memo_url: memo_url}, () => {
            });
            whale.storage.sync.set({shared_list: shared_list}, () => {
            });
            const shared_urls = shared_list.split('[partition]')
            const shared_urls_length = shared_urls.length -2
            const the_sender = sender.split('/')[0]
            if (shared_urls.length != 1) {
                if (the_sender !== user.uid){
                    
                    setTimeout(function(){
                        whale.tabs.create({url: shared_urls[shared_urls_length], active: false }, tab =>{
                            setTimeout(function(){
                                whale.tabs.remove(tab.id);
                            },1000);
                        }); 
                    },1000);
                      
                }
                setTimeout( function(){
                    fetch(`https://still-anchorage-85470.herokuapp.com/share/${encrypt}/`, {
                        method: 'PUT',
                        body: JSON.stringify({"url": shared_urls[shared_urls_length]}),
                        headers: {
                            'Content-Type': 'application/json'
                    }}).then(resJSON => {  
                    })
                }, 1500)
            }
            for (let i=memo_url_list.length-2; i>=0; i--){
                const outDiv = document.createElement ('div')
                outDiv.classList.add('out_div')
                const urlDiv =document.createElement ('div')
                urlDiv.classList.add('url_div')
                const a_tag = document.createElement('a')
                a_tag.classList = "urltag"
                a_tag.href = memo_url_list[i];
                if (memo_url_list[i].length>50){a_tag.innerText= memo_url_list[i].substring(0,50) + "..."}
                else {a_tag.innerText= memo_url_list[i].substring(0,50)}
                a_tag.target= "_blank"
                urlDiv.appendChild(a_tag)

                const contentsDiv = document.createElement('div')
                contentsDiv.classList.add('contents_div')

                const writer = document.createElement('div')
                writer.classList.add('writer')
                writer.innerHTML += memo_author_list[i];

                const line = document.createElement ('div')
                line.classList.add('line2')

                const memoContent = document.createElement('pre')
                memoContent.classList.add('memo_content')
                memoContent.innerHTML += memo_content_list[i];

                contentsDiv.appendChild(writer)
                contentsDiv.appendChild(line)
                contentsDiv.appendChild(memoContent)
                outDiv.appendChild(urlDiv);
                outDiv.appendChild(contentsDiv);
                memoContainer.append(outDiv);

                const removeImg = document.querySelector('.background_logo');
                removeImg.style.display = 'none'
                const bottomdiv = document.createElement('div')
                memoContainer.appendChild(bottomdiv);
                // const element = document.getElementById("bottom");
                bottomdiv.scrollIntoView(false);
            }

            pincodeInput.value = pincode
            roomNameContainer.innerText = room_name

            for(let i=0; i<users.length-1; i++) {
                const largediv = document.createElement('div')
                const div = document.createElement('div')
                const textdiv = document.createElement('p')
                largediv.classList.add('outerline')
                div.classList.add('users')
                textdiv.innerText = users[i].substring(0,2)
                div.key = i
                div.id = i
                div.appendChild(textdiv)
                largediv.appendChild(div)
                usersContainer.append(largediv)
                const myArray = ['#8fc100', '#5da0ff', '#ffbde6', '#a459fc', '#f94e83', '#ff8548', '#0055d1', '#ffcc00'];    
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
                tooltip.innerHTML = "복사완료 : " + copyText.value;
            })
            const again = document.querySelector('.tooltip')
            again.addEventListener("mouseout", () => {
                var again = document.getElementById("myTooltip");
                again.innerHTML = "초대코드 복사";
            })
        })
    })
    
setInterval(function() {
    fetch(`https://still-anchorage-85470.herokuapp.com/${encrypt}/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }}).then(res => {
            return res.json()
        }).then(resJSON => {
            const { users_str, memo_url, shared_list } = resJSON
            whale.storage.sync.get('users_str', result =>{
                if (result.users_str !== users_str){
                    window.location.reload()
                }
            });
            whale.storage.sync.get('memo_url', result =>{
                if (result.memo_url !== memo_url){
                    window.location.reload()

                }
            });
            whale.storage.sync.get('shared_list', result =>{

                if (result.shared_list !== shared_list){
                    window.location.reload() 
                }
            });
        })
}, 1000);  
});