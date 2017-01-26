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

    var out = '<div data-role=\"page\" id=\"'+rule.id+'\" data-theme=\"b\"> \n' +
        '<header data-role=\"header\"> <a href=\"#home\" data-icon=\"grid\" data-iconpos=\"notext\" data-transition=\"slidedown\">Home</a>\n' +
        ' <h1>&#60;'+rule.id+'&#62;</h1> </header> <article data-role=\"content\"> <h1>'+rule.name+'</h1>'+rule.content.replaceAll("\n", " ")+'</article>';

    if(rule.hasOwnProperty('points')){
        out += '<div role="main" class="ui-content"><h1>Possible Penalties</h1>';
        out += '<table data-role="table" id="my-table" data-mode="reflow"><thead><tr>';
        // Headers
        out += (rule.points.toString().includes("w") || rule.points.toString().includes("d")) ? "<th>Warning/Disable</th>" : "";
        out += rule.points.toString().includes("m") ? "<th>Minor Penalty</th>" : "";
        out += rule.points.toString().includes("M") ? "<th>Major Penalty</th>" : "";
        out += rule.points.toString().includes("c") ? "<th>Card Issued</th>" : "";
        out += rule.points.toString().includes("n") ? "<th>Points Issued</th>" : "";

        out += '</tr></thead><tbody><tr>';
        // Content
        out += (rule.points.toString().includes("w") ? "<td>Warning</td>"  : rule.points.toString().includes("d") ? "<td>Robot Disabled </td>" : "");
        out += rule.points.toString().includes("m1") ? "<td>5pts.</td>" : "";
        out += rule.points.toString().includes("m2") ? "<td>5pts + 5pts every 5 seconds</td>" : "";
        out += rule.points.toString().includes("M1") ? "<td>50pts.</td>" : "";
        out += rule.points.toString().includes("M2") ? "<td>100pts.</td>" : "";
        out += rule.points.toString().includes("cp") ? "<td>Possible Yellow Card</td>" : "";
        out += rule.points.toString().includes("cy") ? "<td>Yellow Card</td>" : "";
        out += rule.points.toString().includes("cr") ? "<td>Yellow/Red Card</td>" : "";
        out += rule.points.toString().includes("nj") ? "<td>Particle Points</td>" : rule.points.toString().includes("n")? "<td>None</td>" :"";



        out += '</tr></tbody></table></div>'
    }

    out += '</div>';

    return out;
}
