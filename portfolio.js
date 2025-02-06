    // Initialiseer Swiper
    const swiper = new Swiper('.swiper', {
        loop: true, // Zorgt voor een oneindige carousel
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3, // Toon 3 slides tegelijk
        spaceBetween: 10, // Ruimte tussen slides
        breakpoints: {
            768: {
                slidesPerView: 1, // Voor kleine schermen
            },
        },
    });
    