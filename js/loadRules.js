$(function () {
    $('#mainList').hide();
    $('#footer').hide();
    $('#listView').empty();
    $('#listView').append("<li data-role=\"list-divider\">Saftey Rules</li>");

    // Load S rules yay!
    $.getJSON("js/sRules.json", function (rules) {
        $.each(rules, function (i, rule) {
            $('#listView').append(generateRule(rule));
            $('#page_body').append(generatePage(rule));
        });
        $('#listView').append("<li data-role=\"list-divider\">General Game Rules</li>");

        // Load G rules
        $.getJSON("js/gRules.json", function (rules) {
            $.each(rules, function (i, rule) {
                $('#listView').append(generateRule(rule));
                $('#page_body').append(generatePage(rule));
            });
            $('#listView').append("<li data-role=\"list-divider\">Game Specific Rules</li>");

            // Load GS rules
            $.getJSON("js/gsRules.json", function (rules) {

                $.each(rules, function (i, rule) {
                    $('#listView').append(generateRule(rule));
                    $('#page_body').append(generatePage(rule));
                });
                // Refresh view
                $('#listView').listview('refresh');
                // Show
                $('#mainList').slideDown(1000, function () {
                    $('#footer').show(2000);
                });
            });
        });
    });
});

function generateRule(rule) {
    return '<li data-filtertext=\"'+rule.filter+' '+rule.name+' '+ rule.id+'\"><a href=\"#'+rule.id+'\" data-transition=\"slideup\"><h1>&#60;'+rule.id+'&#62; '+rule.name+'</h1></a></li>';
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
