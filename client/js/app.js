function getSessionList(success, error) {
  var soql = "SELECT Name FROM Account";
  force.query(soql, success, error);
}

function getSessionDetails(sessionId, success, error) {
  var soql = "SELECT Name " +
  "FROM Account ";
  force.query(soql, success, error);
}

function testMethod() {
    console.log('testMethod');
    console.log(force.oauth, 'forceToken2');
    console.log(force.tokenStore, 'forceToken2');
    return false;
}

function showSessionList() {
    console.log('testMethod2');
    console.log(force.oauth, 'forceToken3');
    console.log(force.tokenStore, 'forceToken3');
    getSessionList(
        function (data) {
            var sessions = data.records,
                html = '';
            for (var i=0; i<sessions.length; i++) {
                html += '<li class="table-view-cell"><a href="#sessions/'+ sessions[i].Name +'">' + sessions[i].Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showSessionDetails(sessionId) {
    console.log(sessionId,'sessionId');
    getSessionDetails(sessionId,
        function (data) {
            var session = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + session.Name + '</h4>' +
                                '<p>' + (session.Name || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Speaker: ' +
                                session.Name +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (session.Name || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div><div>' + sessionId + 'hola</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showSessionList);
router.addRoute('sessions/:id', showSessionDetails);
router.addRoute('', testMethod);