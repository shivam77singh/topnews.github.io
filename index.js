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

        // to get updated news
        // let url = `http://newsapi.org/v2/top-headlines?country=in&category=${CAT[i]}&apiKey=3804253855244010b346e6028aa9cb41`;

        xhr.open('GET', `json/${CAT[i]}.json`, true);

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
                    <div class="news-container">
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
                        <div class="bookmark">
                           <i class="fas fa-bookmark"></i>
                           <span class="bk">Bookmark</span>
                        </div>
                    </div>
            
                     `;
                }

                let lists = document.querySelector('.news-collection');
                lists.innerHTML = str;

                // console.log(info);

                let news = document.getElementsByClassName('news');





                //bookmark animation

                let bookmark = document.getElementsByClassName('bookmark');
                let cart_container = document.querySelector('.cart-container');
                // console.log(bookmark);

                let bookmark_list = [];


                let news_key_bookmark_title_pair = {};

                for (let key = 0; key < bookmark.length; key++) {
                    // console.log('ppp');
                    bookmark[key].addEventListener('click', () => {

                        function check(x) {
                            return x === key;
                        }
                        let f = 0;

                        if (bookmark_list.length && bookmark_list.find(check) === key) {
                            console.log('Already in the List');
                            alert('Already in the List');
                            f = 1;
                        }
                        bookmark_list.push(key);

                        // console.log(bookmark[key], 'key');
                        // let str = `
                        //  <div class="cart-items">
                        //     <div class="cart-title">
                        //         <p class="cart-title-p">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        //             Deserunt sequi laboriosam</p>
                        //         <div class="line"></div>
                        //      </div>
                        //      <div class="trash">
                        //           <i class="fa fa-trash"></i>
                        //      </div>
                        // </div>`;

                        //cart-items DIV
                        if (!f) {
                            let cart_items = document.createElement('div');
                            cart_items.className = `cart-items ${key}`;

                            //cart-title DIV
                            let nodes = news[key].childNodes[1];
                            let cart_title = document.createElement('div');
                            cart_title.className = 'cart-title';


                            //cart-title p
                            let cart_title_p = document.createElement('p');
                            cart_title_p.className = 'cart-title-p';
                            cart_title_p.innerText = nodes.childNodes[3].innerText;

                            //adding to news_key_bookmark_title_pair list
                            let t = news[key].childNodes[1].childNodes[3].innerText;
                            news_key_bookmark_title_pair['t'] = news[key];

                            // console.log(news_key_bookmark_title_pair['t'], t);
                            //line DIV
                            let line = document.createElement('div');
                            line.className = 'line';

                            //trash DIV

                            let trash = document.createElement('div');
                            trash.className = 'trash';
                            trash.innerHTML = `<i class="fa fa-trash"></i>`;

                            cart_title.appendChild(cart_title_p);
                            cart_title.appendChild(line);

                            cart_items.appendChild(cart_title);
                            cart_items.appendChild(trash);

                            cart_container.appendChild(cart_items);


                            document.querySelector('.cart-container').style.right = '0px';
                            //document.getElementsByClassName('cart-items').style.opacity = '1';

                            // cart_items.right = '-100px';



                            // delete items of bookmarked list

                            let trash_delete = document.getElementsByClassName('fa-trash');
                            //  let cart_items = document.getElementsByClassName('cart-items');

                            for (let i = 0; i < trash_delete.length; i++) {


                                trash_delete[i].addEventListener(('click'), (e) => {


                                    //delete animation
                                    let parent = e.target.parentElement.parentElement;

                                    console.log(typeof (parent.classList[1]), 'parent');
                                    for (let k = 0; k < 100; k++) {

                                        if (parent.classList[1] === k.toString()) {
                                            console.log(parent.classList, 'classsss');
                                            delete bookmark_list[bookmark_list.indexOf(k)];
                                        }
                                    }

                                    parent.classList.add('delete-animation');

                                    parent.addEventListener('transitionend', () => {
                                        parent.remove();
                                    });


                                    if (trash_delete.length === 1) {
                                        setTimeout(() => {
                                            if (document.querySelector('.cart-container').style.right === '0px') {
                                                document.querySelector('.cart-container').style.right = '-500px';
                                            }
                                        }, 700);

                                    }

                                });
                            }


                            console.log(document.getElementsByClassName('cart-items'), 'vscds');

                            let to_show_items = document.getElementsByClassName('cart-items');
                            // console.log(to_show_items);

                            for (let i = 0; i < to_show_items.length; i++) {
                                to_show_items[i].childNodes[0].childNodes[0].addEventListener('click', (e) => {
                                    let key = parseInt(to_show_items[i].classList[1]);

                                    let nodes = news[key].childNodes;

                                    document.querySelector('.active-news-container').style.display = 'flex';
                                    //author-title
                                    let author_title = nodes[1];

                                    //active-author
                                    let active_author = document.querySelector('.active-author');
                                    active_author.innerText = author_title.childNodes[1].innerText;

                                    //active title
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

                                    let cnt = document.getElementById('img');

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


                    });





                }

                // bookmark animation ends here


                //popp on clicking cart itmes;

                //   





                let news_container = document.getElementsByClassName('news-container');

                for (let key = 0; key <= news.length; key++) {


                    news_container[key].addEventListener('mouseover', () => {
                        document.getElementsByClassName('bookmark')[key].style.right = '0';
                        document.getElementsByClassName('bookmark')[key].style.opacity = '1';
                    });

                    news[key].addEventListener('mouseout', () => {
                        document.getElementsByClassName('bookmark')[key].style.right = '-100px';
                        document.getElementsByClassName('bookmark')[key].style.opacity = '0';
                    });

                    news[key].addEventListener('click', () => {
                        // console.log(news[key]);
                        let nodes = news[key].childNodes;
                        // console.log(nodes);
                        document.querySelector('.active-news-container').style.display = 'flex';
                        //author-title
                        let author_title = nodes[1];

                        //active-author
                        let active_author = document.querySelector('.active-author');
                        active_author.innerText = author_title.childNodes[1].innerText;

                        //active title
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









                //ok status ends here

            }
            else {
                console.log('error');
            }
        };


        xhr.send();



    });




    window.addEventListener('scroll', () => {

        let dist = window.scrollY;
        if (dist >= 300) {
            document.getElementsByClassName('btns')[0].classList.add('side-btns');
            document.getElementsByClassName('news-page')[0].style.width = '100%';
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



//hiding bookmark container




//open bookmark container

document.querySelector('.top-bookmark').addEventListener('click', () => {
    console.log('uyt');
    console.log(document.querySelector('.cart-container').style.right);
    if (document.querySelector('.cart-container').style.right === '-500px') {
        document.querySelector('.cart-container').style.right = '0px';
    }
    else {
        document.querySelector('.cart-container').style.right = '-500px';
    }
});

//hiding bookmark container

document.querySelector('.fa-times').addEventListener('click', () => {
    if (document.querySelector('.cart-container').style.right === '0px') {
        document.querySelector('.cart-container').style.right = '-500px';
    }
    else {
        document.querySelector('.cart-container').style.right = '0px';
    }
});









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
    setTimeout(add_effect, 170);

})();




