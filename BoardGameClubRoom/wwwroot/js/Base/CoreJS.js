$(document).ready(function () {

    //has to be loaded this way as classes can depend on other eg cookiecontrol always must go first
    window.app = {};
    window.app.CookieControl = new CookieControl();
    window.app.ScreenSplit = new ScreenSplit();
    window.app.ThemeSelector = new ThemeSelector();
    window.app.ChatControl = new ChatControl();


    $('.dropdown-toggle').on('click', function (event) {
        $(this).parent().find(".dropdown-menu").toggleClass('show');
    });

    $('body').on('click', function (e) {
        if (!$('.dropdown-toggle').is(e.target)
            && $('.dropdown-toggle').has(e.target).length === 0
            && $('.show').has(e.target).length === 0
        ) {
            $('.dropdown-menu').removeClass('show');
        }
    });
});