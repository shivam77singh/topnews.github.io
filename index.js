// console.log("working");




let CAT = ["entertainment", "science", "sports", "technology", "health", "business"];
let btns = document.getElementsByClassName('btn');
let prev;

for (let i = 0; i < 6; i++) {



    btns[i].addEventListener('click', () => {

        document.getElementsByClassName('head')[0].scrollIntoView();
        for (let j = 0; j < 6; j++) {
            if (btns[j].style.background === 'rgb(154, 154, 255)') {
                btns[j].style.background = 'transparent';
            }
        }

        btns[i].style.background = 'rgb(154, 154, 255)';

        // document.querySelector('.head').style.margin = '5rem';
        let xhr = new XMLHttpRequest();



        xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=${CAT[i]}&apiKey=3804253855244010b346e6028aa9cb41`, true);

        // xhr.onprogress = function () {
        //     console.log('progress');
        // }

        xhr.onload = function () {
            if (this.status === 200) {

                let obj = JSON.parse(this.responseText);
                let info = obj.articles;
                let str = "";
                for (key in info) {
                    // console.log('inside for loop');
                    str += `
                    <div class="news">
                      <div class="author-title">
                        <span class="author">By__${info[key].author}</span>
                        <span class="title">${info[key].title}</span>
                      </div>
                      <div class="news-image">
                        <img class="image" src="${info[key].urlToImage}">
                      </div>
                      <div class="content">
                        <p class="main-content">${info[key].content}
                        <a class="link" href="${info[key].url}">Read More Here</a>
                        </p>
                       </div>
                    </div>
                     `;
                }

                // console.log(info);

                let lists = document.querySelector('.news-collection');
                lists.innerHTML = str;


                let news = document.getElementsByClassName('news');

                for (let key = 0; key <= news.length; key++) {
                    news[key].addEventListener('click', () => {
                        // console.log(news[key]);
                        let nodes = news[key].childNodes;
                        console.log(nodes);
                        document.querySelector('.active-news-container').style.display = 'flex';
                        //author-title
                        let author_title = nodes[1];

                        //active-author
                        let active_author = document.querySelector('.active-author');
                        active_author.innerText = author_title.childNodes[1].innerText;

                        let active_title = document.querySelector('.active-title');
                        active_title.innerText = author_title.childNodes[3].innerText;

                        //active-content
                        let content = nodes[5];
                        let active_content = document.querySelector('.active-content');
                        active_content.innerText = content.childNodes[1].innerText;

                        //active-image
                        let news_image = nodes[3];
                        let image_src = news_image.childNodes[1].currentSrc;
                        let elem = document.createElement('img');
                        elem.src = image_src;
                        elem.className = 'active-image';
                        document.getElementById('img').appendChild(elem);



                        let page = document.getElementsByClassName('active-news-container');
                        window.addEventListener('click', function (e) {
                            if (e.target === page[0]) {
                                page[0].style.display = 'none';
                                elem.remove();
                            }


                        });
                    });
                }



            }
            else {
                console.log('error');
            }
        };


        xhr.send();



    });

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 300) {
            document.getElementsByClassName('btns')[0].classList.add('side-btns');
            document.getElementsByClassName('news-page')[0].style.width = '80%';
            document.getElementsByClassName('news-collection')[0].classList.add('side-news');

            //animating buttons
            

        }
        else {
            document.getElementsByClassName('btns')[0].classList.remove('side-btns');
            document.getElementsByClassName('news-page')[0].style.width = '100%';
            document.getElementsByClassName('news-collection')[0].classList.remove('side-news');
        }
    });

}

// side buttons







// writing effect


const texts = ["Get the Worlds Best News ", "Get the Latest Updates ", "Get the Top Headlines "];
let id = 0;
let str_id = 0;
let str = "";

(function add_effect() {
    str += texts[id][str_id];
    str_id++;
    if (texts[id].length == str.length) {

        id++;
        if (id >= texts.length) {
            id = 0;
        }
        str_id = 0;
        str = "";
    }

    document.querySelector('.text').innerHTML = str;
    setTimeout(add_effect, 200);

})();
