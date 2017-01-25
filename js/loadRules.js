$(function () {
    $('#mainList').hide();
    $.getJSON("js/rules.json", function (rules) {
            $('#listView').empty();
            $.each(rules, function (i, rule) {
                $('#listView').append(generateRule(rule));
                $('#page_body').append(generatePage(rule));
                //$.mobile.initializePage()
            });
            $('#listView').listview('refresh');
            $('#mainList').slideDown(1000);
        }
    );

    //listView.appendChild();
});

function generateRule(rule) {
    return '<li data-filtertext=\"'+rule.filter+' '+rule.name+'\"><a href=\"#'+rule.id+'\" data-transition=\"slideup\"><h1>&#60;'+rule.id+'&#62; '+rule.name+'</h1></a></li>';
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function generatePage(rule) {
    //return '<a href=\"#'+rule.id+'\" data-transition=\"slideup\"><h1>&#60;'+rule.id+'&#62; '+rule.name+'</h1></a>';

    return'<div data-role=\"page\" id=\"'+rule.id+'\" data-theme=\"b\"> \n' +
        '<header data-role=\"header\"> <a href=\"#home\" data-icon=\"grid\" data-iconpos=\"notext\" data-transition=\"slidedown\">Home</a>\n' +
        ' <h1>&#60;'+rule.id+'&#62;</h1> </header> <article data-role=\"content\"> <h1>'+rule.name+'</h1>'+rule.content.replaceAll("\n", " ")+'</article> </div>';
}