class PhotoGallery {

    // init the class with flickr api key & gallries id
    constructor() {
        this.API_KEY = 'b372fd548dd65e3a83025e892c5a7d8d';
        this.gallries = ['72157718492977427', '72157718691316261', '72157718503278510', '72157718554484782', '72157718492977427']; // raw galleries id fetch with post man 
        this.gallery = document.getElementById("gallery");
        this.pageNumber = 0;
        this.eventHandler();

        // To Do 
        // 1- add get galleries id api 
        // 2- implement infinte scroll to fetch a new galleries every time 
        // 3- implement tests.
    }




    // get imgs with the page is done loading 
    eventHandler() {

        document.addEventListener('DOMContentLoaded', () => {
            this.getImgs(this.gallries[this.pageNumber]);
            document.getElementById("load").addEventListener("click", function() {
                // console.log(this.pageNumber);

            });
        });
    }

    // get images from flickr api 
    async getImgs(gallery_id) {

        // try to work around infinte scroll
        if (this.pageNumber >= this.gallries.length)
            this.pageNumber = 0;
        this.pageNumber = this.pageNumber + 1;
        // get imgs api fetch 
        const baseURL = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=b372fd548dd65e3a83025e892c5a7d8d&gallery_id=${gallery_id}&format=json&nojsoncallback=1`;
        const responde = await fetch(baseURL, {
            method: 'GET',
        });

        var data = await responde.json();
        console.log(data.photos.photo);
        this.populateImgs(data.photos.photo); // html builder with photos from api 
    }







    // make the html item elements from imgs src from api 
    populateImgs(photos) {

        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
            <a href="#">
                <img src="https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                <h3> ${photo.title} </h3>
            </a>
            `;
            document.getElementById("gallery").appendChild(item);
            console.log(photo.title);
            console.log(`"https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg"`);

        });



        document.getElementById("spinner").style.display = "none";
        document.getElementById("overlay").style.display = "none";

        document.body.className = document.body.className.replace(/\bnoscroll\b/, '');
    }


}

const gallery = new PhotoGallery; // init the class