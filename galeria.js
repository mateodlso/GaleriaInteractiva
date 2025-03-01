class GaleriaInteractiva {
    constructor() {
        this.thumbnails = $(".thumbnail");
        this.currentIndex = 0;

        this.setupEventListeners();
        this.preloadImages();
    }

    setupEventListeners() {
        this.thumbnails.on("click", (e) => this.openImage(e));
        $("#closeButton").on("click", () => this.closeImage());
        $("#prev").on("click", () => this.showPrev());
        $("#next").on("click", () => this.showNext());
        $("#fullscreenButton").on("click", () => this.toggleFullscreen());
        $(document).on("keydown", (e) => this.handleKeyboard(e));
    }

    openImage(event) {
        this.currentIndex = this.thumbnails.index(event.currentTarget);
        this.updateImage(this.currentIndex);
        $(".image-container").addClass("visible").fadeIn(300);
        $("#prev, #next").show();
        this.logEvent("Abrió", this.currentIndex);
    }

    closeImage() {
        $(".image-container").removeClass("visible").fadeOut(300);
        $("#prev, #next").hide();
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    showPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
        this.updateImage(this.currentIndex);
        this.logEvent("Retrocedió", this.currentIndex);
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.thumbnails.length;
        this.updateImage(this.currentIndex);
        this.logEvent("Avanzó", this.currentIndex);
    }

    toggleFullscreen() {
        const container = $(".image-container").get(0);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    }

    handleKeyboard(event) {
        switch (event.key) {
            case "ArrowLeft":
                this.showPrev();
                break;
            case "ArrowRight":
                this.showNext();
                break;
            case "Escape":
                this.closeImage();
                break;
        }
    }

    updateImage(index) {
        const newSrc = this.thumbnails.eq(index).data("full");
        $("#largeImage").off("error").on("error", () => {
            $("#largeImage").attr("src", "imagenes/placeholder.png");
        }).fadeOut(300, function() {
            $(this).attr("src", newSrc).fadeIn(300);
        });
    }

    preloadImages() {
        this.thumbnails.each(function() {
            const img = new Image();
            img.src = $(this).data("full");
        });
    }

    logEvent(action, index) {
        console.log(`[Galeria] ${action} imagen ${index + 1}`);
    }
}

// Inicializa la galería al cargar la página
$(function() {
    new GaleriaInteractiva();
});
