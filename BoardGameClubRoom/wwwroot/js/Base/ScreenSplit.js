class ScreenSplit { 

    constructor() {
        this.chat = $('.chatWindow');
        this.details = $('.detailsWindow');
        this.slider = $('.slider');
        this.sliderChat = $('.sliderChatForm');
        this.chatForm = $('.chatFrom');
        this.BindListeners();
        this.drag = "";

      
        if (window.app.CookieControl.getCookie("horizontal") === "0") {
            window.app.CookieControl.setCookie("horizontal", $(window).width()/2, 365);
        }

        if (window.app.CookieControl.getCookie("vertical") === "0") {
            window.app.CookieControl.setCookie("vertical", "200", 365);
        }

        this.UpdateSize();
    }
    
    BindListeners = () => {
        
        this.slider.on("mousedown", (event) => {
            this.StartDrag("horizontal");
        });

        this.sliderChat.on("mousedown", (event) => {
            this.StartDrag("vertical");
        });

        $(document).mousemove((event) => {
            this.DoDrag(event);
        });

        $(document).on("mouseup", (event) => {
            this.StopDrag();
        });

    }

    StopDrag = () => {
        this.drag = "";

        var styles = {
            "-webkit-touch-callout": "initial",
            "-webkit-user-select": "initial",
            "-khtml-user-select": "initial",
            "-moz-user-select": "initial",
            "-ms-user-select": "initial",
            "user-select": "initial"
        };
        $("body").css(styles);
    }

    StartDrag = (direction) => {
        
        this.drag = direction;

        var styles = {
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
        };
        $("body").css(styles);
    }
    
    DoDrag = (event) => {

        if (this.drag === "") return;

        var width = window.app.CookieControl.getCookie("horizontal");
        var height = window.app.CookieControl.getCookie("vertical");

        if (this.drag === "horizontal") {
            width = (event.clientX).clamp($(window).width() * 0.2, $(window).width() * 0.8);
        }

        if (this.drag === "vertical") {

            var heightOffset = $(window).height() - 60;

            height = (heightOffset - event.clientY).clamp($(window).height() * 0.1, $(window).height() * 0.6);
        }

        window.app.CookieControl.setCookie("horizontal", width, 365);
        window.app.CookieControl.setCookie("vertical", height, 365);

        this.UpdateSize();
        
    }

    UpdateSize = () => {

        var width = parseInt(window.app.CookieControl.getCookie("horizontal"));
        var height = parseInt(window.app.CookieControl.getCookie("vertical"));
        

        this.slider.css({
            left: `${width}px`
        });
        
        this.sliderChat.css({
            bottom: `${height+60}px`
        });

        this.chat.css({
            width: `${width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width() * 100}%`
        });

        this.details.css({
            width: `${100 - (width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width()) * 100}%`
        });

        this.chatForm.css({
            height: `${((height).clamp($(window).height() * 0.1, $(window).height() * 0.6))}px`
        });

        this.sliderChat.css({
            width: `${width.clamp($(window).width() * 0.2, $(window).width() * 0.8) / $(window).width() * 100}%`
        });

        
    }
}

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

