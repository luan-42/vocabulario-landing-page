const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    on: {
    slideChange: function () {
            let videos = document.querySelectorAll('video');
            Array.prototype.forEach.call(videos, function(video){ video.pause()});
        }
    },
});

const videos = document.getElementById("uso").querySelectorAll("video");

document.getElementById("saveSub").onclick = () => {
    window.location.href = "#uso"; 
    swiper.slideTo(0); 
    videos[0].play();
};

document.getElementById("copySub").onclick = () => {
    window.location.href = "#uso"; 
    swiper.slideTo(1); 
    videos[1].play();
};

document.getElementById("sliceMp3").onclick = () => {
    window.location.href = "#uso";
     swiper.slideTo(2);
      videos[2].play();
};

document.getElementById("install").onclick = () => {window.location.href = "https://github.com/luan-42/mpv-scripts"};

AOS.init();

async function getMovie(title, callback) {
    const url = `https://www.omdbapi.com/?apikey=c9c66c8e&t=${title}`;
    const movie = document.createElement('div');
    movie.className = "movie";
    movie.setAttribute("data-aos", "zoom-in-up");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

        if (json['Error']) {
            const msg = document.createElement('p');
            msg.innerText = "Filme não encontrado!";
            div.appendChild(msg);
        } else {
            const title = document.createElement("h3");
            const year = document.createElement('p');
            const poster = document.createElement("img");
            const plot  = document.createElement('p');
            const genre = document.createElement('p');

            title.innerText = json["Title"];
            year.innerText = json["Year"];
            poster.src = json["Poster"];
            plot.innerText = json["Plot"];
            genre.innerText = json["Genre"];
            
            movie.appendChild(title);
            movie.appendChild(year);
            movie.appendChild(poster);
            movie.appendChild(plot);
            movie.appendChild(genre);
        }
    } catch (error) {
        const msg = document.createElement('p');
        msg.className = "Error";
        msg.innerText = error;
        movie.appendChild(msg);
    }
    callback(movie);
}

const movies = document.getElementById("movies");
const recommendations = ["The Office","Friends", "Game of Thrones", "House of Cards", "The Simpsons", "Modern Family"];

recommendations.forEach(title => {
    getMovie(title, (movie) => {
        movies.appendChild(movie);
    });
});

emailjs.init({
    publicKey: "t6-c-0nFGk7z5m-wx",
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("message").value;
    if (nome === "" || email === "" || mensagem === "") {
        window.alert("Preencha todos os campos!");
    } else {
        emailjs.sendForm('contact_service', 'contact_form', this)
        .then(() => {
            window.alert('Mensagem enviada com sucesso!');
        }, (error) => {
            window.alert('Falhou...', error);
        });
    }
});