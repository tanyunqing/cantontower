var Sharer = {
    shareFacebook: function(url) {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), 
            "facebooksharedialog", 
            "width=626,height=436"
        ); 
    },

    shareTwitter: function(url, text) {
        window.open("https://twitter.com/intent/tweet?" +
            "&text=" + text + 
            "&url=" + encodeURIComponent(url) +
            "&via=space_needle",
            "twittersharedialog", 
            "width=626,height=436"
        );
    },

    shareGoogle: function(url) {
        window.open("https://plus.google.com/share?url=" + encodeURIComponent(url),
            "googlesharedialog", 
            "width=626,height=436"
        );
    }
}