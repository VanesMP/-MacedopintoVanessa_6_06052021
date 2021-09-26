export default class MediaFactory {
    static createMedia(media, photographName) {

        if (media.image) {
            return new Image(media, photographName);
        } else {

            return new Video(media, photographName);
        }

    }
}

export class Image {
    constructor(myPrenom, media) {
        node = `<img src="./Sample-Photos/${myPrenom}/${media.image}" alt="${media.alt}" class="mediaStyle">
        <h4 class="lightboxTitle">${media.title}</h4>`;
    }
}

export class Video {
    constructor(media, myPrenom) {
        node = `<video controls="" class="mediaStyle">
        <source src="./Sample-Photos/${myPrenom}/${media.video}" type="video/mp4">
        </video>
        <h4 class="lightboxTitle">${media.title}</h4>`;

    }

}