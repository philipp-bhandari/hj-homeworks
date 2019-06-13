const prop = ( data, name ) => data.map( item => item[ name ] ),
    summ = data => data.reduce(( total, value ) => total + value, 0 );

class SpriteGenerator {
    constructor( container ) {
        this.uploadButton = container.querySelector( '.sprite-generator__upload' );

        this.submitButton = container.querySelector( '.sprite-generator__generate' );
        this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
        this.codeContainer = container.querySelector( '.sprite-generator__code' );
        this.imageElement = container.querySelector( '.sprite-generator__result-image' );
        this.images = [];
        this.labels = [];
        this.imagesCount = 0;

        this.registerEvents();
    }

    registerEvents() {
        const
            loading = this.loading.bind(this),
            sprite = this.sprite.bind(this);
        this.uploadButton.addEventListener('change', loading);
        this.submitButton.addEventListener('click', sprite)
    }

    loading(event) {
        const files = event.currentTarget.files;
        for (let file of files) {
            if (file.type.slice(0, 5) === 'image') {
                const image = document.createElement('img');
                image.src = URL.createObjectURL(file);
                let addImage = {};
                addImage.image = image;
                let name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
                let label = null;
                while (this.labels.indexOf(name + label) !== -1) {
                    label = Number(index) + +1;
                }
                this.labels.push(name + label);
                addImage.name = name + label;
                this.images.push(addImage);
            }
            this.imagesCount = this.images.length;
            this.imagesCountContainer = this.imagesCount;
        }
    }

    sprite(event) {
        event.preventDefault();
        let width = Math.ceil(Math.sqrt(this.imagesCount)),
            height = Math.ceil(this.imagesCount / width),
            maxHeight = 0,
            maxWidth = 0;

        for (let pic of this.images) {
            if (maxWidth < pic.image.naturalWidth) {
                maxWidth = pic.image.naturalWidth;
            }
            if (maxHeight < pic.image.naturalHeight) {
                maxHeight = pic.image.naturalHeight;
            }
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let sprite = '.icon { display: inline-block; background-image: url(img/sprite.png); }';

        canvas.width = width * maxWidth;
        canvas.height = height * maxHeight;

        for (let i = 0; i <this.images.length; i++) {
            let x = i % width * maxWidth;
            let y = Math.floor(i / width) * maxHeight;
            ctx.drawImage(this.images[i].image, x, y);
            sprite += `.icon_${this.images[i].name} {background-position: ${-x}px ${-y}px; width: ${this.images[i].image.naturalHeight}px; height: ${this.images[i].image.naturalWidth}px; }`;
        }
        this.imageElement.src = canvas.toDataURL();
        this.codeContainer.value = sprite;
    }

}



new SpriteGenerator( document.getElementById( 'generator' ));
