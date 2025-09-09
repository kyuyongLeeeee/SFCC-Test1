(function() {
    let codeview = new Array();
    // codeview.push({ 'url': '../../assets/js/libraries/jquery-3.6.1.min.js', 'cashbuster': false });
    codeview.push({ 'url': '../../assets/js/libraries/gasp.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/slick.min.js', 'cashbuster': false });
    codeview.push({ 'url': '../../assets/js/plugins/swiper.min.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/aos.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/masonry.pkgd.min.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/jquery.nice-select.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/jquery-ui.min.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/MonthPicker.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/plugins/ripples.js', 'cashbuster': false });
    // codeview.push({ 'url': '../../assets/js/ui.common.js', 'cashbuster': true });

    for (let a = 0, atotal = codeview.length; a < atotal; a++) {
        document.write('<script src="' + codeview[a].url + ((codeview[a].cashbuster) ? '?cb=' + new Date().getTime() : '') + '" charset="utf-8"></' + 'script>');
    };
})();
