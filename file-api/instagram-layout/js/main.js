const addClass = ( className, context ) => context.classList.add( className ),
    removeClass = ( className, context ) => context.classList.remove( className ),
    hasClass = ( className, context ) => context.classList.contains( className );

class iLayout {
    constructor( container ) {
        this.container = container;
        this.positionsContainer = container.querySelector( '.layout__positions' );
        this.actionButton = container.querySelector( '.layout__button' );
        this.result = container.querySelector( '.layout__result' );
        this.layout = {
            left: this.positionsContainer.querySelector('.layout__item_left'),
            top: this.positionsContainer.querySelector('.layout__item_top'),
            bottom: this.positionsContainer.querySelector('.layout__item_bottom')
        };
        this.registerEvents();
    }

    registerEvents() {
        const
            currentLayoutOn = this.currentLayoutOn.bind(this),
            currentLayoutOff = this.currentLayoutOff.bind(this),
            loading = this.loading.bind(this),
            creating = this.creating.bind(this);
        for(let key in this.layout) {
            this.layout[key].addEventListener('dragover', currentLayoutOn);
            this.layout[key].addEventListener('dragleave', currentLayoutOff);
            this.layout[key].addEventListener('drop', loading);
        }
        this.actionButton.addEventListener('click', creating);
    }

    currentLayoutOn(event) {
        event.preventDefault();
        event.target.classList.add('layout__item_active');
    }

    currentLayoutOff(event) {
        event.preventDefault();
        event.target.classList.remove('layout__item_active');
    }

    loading(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length !== 1) {
            this.result.value = 'Может быть загружено только одно изображение';
        } else {
            if (files[0].type.slice(0, 5) === 'image') {
                const image = document.createElement('img');
                image.classList.add('layout__image');
                image.src = URL.createObjectURL(files[0]);
                event.target.appendChild(image);
                event.target.classList.remove('layout__item_active');
            } else {
                this.result.value = 'Это не изображение';
            }
        }
    }

    creating(event) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = this.positionsContainer.offsetHeight;
        canvas.width = this.positionsContainer.offsetWidth;

        for(let key in this.layout) {
            const image = this.layout[key].querySelector('img');
            if (image) {
                ctx.drawImage(image, 0 , 0, image.naturalWidth, Math.min(image.naturalHeight, image.naturalWidth / this.layout[key].offsetWidth * this.layout[key].offsetHeight), this.layout[key].offsetLeft - this.layout[key].parentElement.offsetLeft, this.layout[key].offsetTop - this.layout[key].parentElement.offsetTop, this.layout[key].offsetWidth, Math.min(this.layout[key].offsetHeight, image.naturalHeight / image.naturalWidth * this.layout[key].offsetWidth));
            }
        }

        const collage = document.createElement('img');
        collage.src = canvas.toDataURL();
        this.positionsContainer.appendChild(collage);
        this.result.value = `<img src=${collage.src}>`;

    }
}


new iLayout( document.getElementById( 'layout' ));
