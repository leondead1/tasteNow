
window.addEventListener('DOMContentLoaded', function() {

    // cards

    class EatCard {
        constructor(src, alt, title, restor, prise, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.restor = restor;
            this.prise = prise;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="categories__card">
                    <img src=${this.src} alt=${this.alt} class="categories__card-img">
                    <div class="categories__card-title">${this.title}</div>
                    <div class="categories__card-rest">${this.restor}</div>
                    <div class="categories__card-price">$${this.prise}</div>
                    <button class="categories__card-btn btn">Add to cart</button>
            </div>
            `;
            this.parent.append(element);
        }
    }
    
    


    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.pizza.forEach(({img, altimg, title, descr, price}) => {
                new EatCard(img, altimg, title, descr, price, ".categories__cards-inner").render();
            });
        })
        .then (data => {
            slider();
        });

    
    // cardOrder
    const cartOrder = [];
    const cartPrice = [];
    let orderCounter = 0,
        totalPrice = 0;
    
    const cartButton = document.querySelector('.menu__list-cart'),
          cartInner = document.querySelector('.cart__order'),
          cart = document.querySelector('.cart'),
          cartClose = document.querySelector('.cart__close'),
          cartTotal = document.querySelector('.cart__total');


    cartButton.addEventListener('click', function(){
        cart.style.display = 'block';
        cartOrder.forEach((elem, i) => {
            const order = document.createElement('div');
            order.classList.add('cart__order');
            order.textContent = `${elem} = $${cartPrice[i]}`;
            cartTotal.textContent = `total: $${totalPrice += +(cartPrice[i])}`;
            cartInner.append(order);
        });
    });

    cartClose.addEventListener('click', function(){
        cart.style.display = 'none';
    });
    

    // slider

   

    function slider() {
        const next = document.querySelector('.categories__slider-next'),
            prev = document.querySelector('.categories__slider-prev'),
            cardsWrapper = document.querySelector('.categories__cards'),
            cardsInner = document.querySelector('.categories__cards-inner'),
            cards = document.querySelectorAll('.categories__card'),
            dots = document.querySelector('.categories__dots'),
            width = window.getComputedStyle(cardsWrapper).width;

            let slideIndex = 0;
            let offset = 0;

            
            cardsInner.style.width = 1240 * Math.ceil(cards.length/4) + 'px';
            cardsInner.style.transform = `translateX(0)`;
    

            next.addEventListener('click', function(){
                if (offset == +width.slice(0, width.length-2) * (Math.ceil(cards.length/4)-1)) {
                    offset = 0;
                    slideIndex = -1;
                } else {
                    offset += +width.slice(0, width.length-2);
                }
                
                slideIndex += 1;
                cardsInner.style.transform = `translateX(-${offset}px)`;

                arrDots.forEach(dot => dot.style.background = '#D9D9D9');
                arrDots[slideIndex].style.background = '#F72D57';
            });

            prev.addEventListener('click', function(){
                if (offset == 0) {
                    offset = +width.slice(0, width.length-2) * (Math.ceil(cards.length/4)-1);
                    slideIndex = arrDots.length;
                } else {
                    offset -= +width.slice(0, width.length-2);
                }
                
                slideIndex -= 1;
                cardsInner.style.transform = `translateX(-${offset}px)`;
                arrDots.forEach(dot => dot.style.background = '#D9D9D9');
                arrDots[slideIndex].style.background = '#F72D57';
            });

            cards.forEach((card, i) => {
                if (!((i+1)%4)) {
                    card.style.margin = 0;
                }
            });
            
            const arrDots = [];

            for (let i = 0; i < cards.length/4; i++){
                const dot = document.createElement('div');
                dot.classList.add('categories__dot');
                dot.setAttribute('data-slide-to', i);
                if (i == 0){
                    dot.style.background = "#F72D57";
                }
                dots.append(dot);
                arrDots.push(dot);
            }

            arrDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideTo = e.target.getAttribute('data-slide-to');

                    slideIndex = slideTo;
                    offset = +width.slice(0, width.length-2) * slideTo;

                    cardsInner.style.transform = `translateX(-${offset}px)`;

                    arrDots.forEach(dot => dot.style.background = '#D9D9D9');
                    arrDots[slideIndex].style.background = '#F72D57';
                });
            });

            // cart with order

            

            const food = document.querySelectorAll('.categories__card-btn'),
                foodName = document.querySelectorAll('.categories__card-title'),
                orderCount = document.querySelector('.menu__list-cart-counter'),
                foodPrice = document.querySelectorAll('.categories__card-price');

            food.forEach((elem, i) => {
                elem.addEventListener('click',  function(){
                    let priceStr = foodPrice[i].textContent,
                        priceNmbr = priceStr.slice(1);

                    cartPrice.push(priceNmbr);
                    cartOrder.push(foodName[i].textContent);
                    orderCounter += 1;
                    if (orderCounter > 0){
                        orderCount.style.display = 'block';
                        orderCount.textContent = `${orderCounter}`;
                    }
                    console.log(cartPrice);
                });
            });

    }


    //get buttons and assign handlers

    const pizza = document.querySelector("#pizza"),
            burger = document.querySelector('#burger'),
            salad = document.querySelector('#salad'),
            combos = document.querySelector('#combos'),
            categoriesBtns = document.querySelectorAll('.categories__btn');

    


    pizza.addEventListener('click', function(){
        categoriesBtns.forEach(elem => {
            elem.classList.remove('categories__btn-active');
        });
        pizza.classList.add('categories__btn-active');

        const cards = document.querySelectorAll('.categories__card'),
              dot = document.querySelectorAll('.categories__dot');

        dot.forEach(elem => {
            elem.remove();
        });
        cards.forEach(elem => {
            elem.remove();
        });
        fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.pizza.forEach(({img, altimg, title, descr, price}) => {
                 new EatCard(img, altimg, title, descr, price, ".categories__cards-inner").render();
            });
        })
        .then (data => {
            slider();
        });
            
    });

    burger.addEventListener('click', function(){

        categoriesBtns.forEach(elem => {
            elem.classList.remove('categories__btn-active');
        });
        burger.classList.add('categories__btn-active');

        const cards = document.querySelectorAll('.categories__card'),
              dot = document.querySelectorAll('.categories__dot');

        dot.forEach(elem => {
            elem.remove();
        });
        cards.forEach(elem => {
            elem.remove();
        });
        fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.burger.forEach(({img, altimg, title, descr, price}) => {
                new EatCard(img, altimg, title, descr, price, ".categories__cards-inner").render();
            });
        })
        .then (data => {
            slider();
        });
    
    });

    salad.addEventListener('click', function(){

        categoriesBtns.forEach(elem => {
            elem.classList.remove('categories__btn-active');
        });
        salad.classList.add('categories__btn-active');

        const cards = document.querySelectorAll('.categories__card'),
              dot = document.querySelectorAll('.categories__dot');

        dot.forEach(elem => {
            elem.remove();
        });
        cards.forEach(elem => {
            elem.remove();
        });
        fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.salads.forEach(({img, altimg, title, descr, price}) => {
                new EatCard(img, altimg, title, descr, price, ".categories__cards-inner").render();
            });
        })
        .then (data => {
            slider();
        });
    
    });

    combos.addEventListener('click', function(){

        categoriesBtns.forEach(elem => {
            elem.classList.remove('categories__btn-active');
        });
        combos.classList.add('categories__btn-active');

        const cards = document.querySelectorAll('.categories__card'),
              dot = document.querySelectorAll('.categories__dot');

        dot.forEach(elem => {
            elem.remove();
        });
        cards.forEach(elem => {
            elem.remove();
        });
        fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.combos.forEach(({img, altimg, title, descr, price}) => {
                new EatCard(img, altimg, title, descr, price, ".categories__cards-inner").render();
            });
        })
        .then (data => {
            slider();
        });
    
    });

    
    
});



