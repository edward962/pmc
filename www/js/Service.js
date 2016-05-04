//var serviceUrl = "http://localhost/dojoservice/api/";
var serviceUrl = "http://api.dojoexpert.com/api/";


$(document).on('pageinit', "#msgPage", function () {
    GetSession("UID|msgPage");
});
$(document).on('pageinit', "#calendarPage", function () {
    GetSession("UID|calendarPage");
});

$(document).on('pageinit', "#invoicePage", function () {
    GetSession("UID|invoicePage");
});

$(document).on('pageinit', "#inPage", function () {
    GetSession("UID|inPage");
});

$(document).on('pageinit', "#attendPage", function () {
    GetSession("UID|attendPage");
});

$(document).on('pageinit', "#qrPage", function () {
    GetSession("UID|qrPage");
});

$(document).on('pageinit', "#resultPage", function () {
    GetSession("UID|resultPage");
});


$(document).on('pageinit', "#beltPage", function () {
    GetSession("UID|beltPage");
});

$(document).on('pageinit', "#passwordPage", function () {
    GetSession("UID|passwordPage");
});

$(document).on('pageinit', "#loginPage", function () {
    SetLogin();
});


$(document).on('pageinit', "#mainPage", function () {
    GetSession("UID|mainPage");
});


function GetSession(arg) {

    var sessionuid = ReadCookie("sessionuid");
    if (sessionuid == null) {
        window.location = "mobile-login.html";
        return;
    }
    var result = sessionuid;
    var args = arg.split("|");
    switch (args[1]) {
        case "msgPage":
            GetKlub(result);
            break;
        case "calendarPage":
            GetCalendar(result);
            break;
        case "invoicePage":
            GetInvoice(result);
            break;
        case "inPage":

            GetInPage(result);
            break;
        case "attendPage":
            GetAttendance(result);
            break;
         case "qrPage":
            GetQR(result);
            break;
        case "resultPage":
            GetResult(result);
            break;
        case "beltPage":
            GetBelt(result);
            break;
        case "passwordPage":
            // GetPasswordInfo(result);
            break;
        case "mainPage":
            SetMainPage(result);
            break;
        default:
            break;
    }
}
function SetMainPage(arg) {
    $("#h1club").html(ReadCookie("naziv"));
    $("#h1").html(ReadCookie("ime") + ' ' + ReadCookie("prezime"));
    var content = "";
    var klub = ReadCookie("klub");
    content += (klub == "dancemaxx" ? '<li><a data-icon="alert" data-transition="slide" href="mobile-messages.html">News</a></li>' : '<li><a data-icon="alert" data-transition="slide" href="mobile-messages.html">Msg.board</a></li>');
    content += '<li><a data-icon="grid" data-transition="slide" href="mobile-calendar.html">Calendar</a></li>';
    content += '<li><a data-icon="info" data-transition="slide" href="mobile-invoices.html">Invoices</a></li>';
    content += '<li><a data-icon="check" data-transition="slide" href="mobile-attendance.html">Attendance</a></li>';
    content += '<li><a data-icon="star" data-transition="slide" href="mobile-results.html">Results</a></li>';
    if (klub != "dancemaxx") {
        if (klub != "erinschool") {
            content += (klub == "joe@j4k" ? '<li><a data-icon="minus" data-transition="slide" href="mobile-belts.html">Grading</a></li>' : '<li><a data-icon="minus" data-transition="slide" href="mobile-belts.html">Belts</a></li>');
        }
        else {
            content += '<li><a data-icon="delete" data-transition="slide" href="mobile.html?logout=1">Logout</a></li>';
        }
    }
    else {
        content += '<li><a data-icon="alert" data-transition="slide" href="mobile-messages.html?v=1">DMS DANCE PASS</a></li>';
    }




    var myNavbar = $('<div data-role="navbar"><ul>' + content + '</ul></div>');
    $('#contaner').append(myNavbar).trigger('create');

    var footer = '<a href="#" data-role="button" data-icon="delete" data-transition="slide" onclick="javascript:LogoutFromMainPage()">Logout</a>';
    if (klub != "tinjan" && klub != "test") {
        footer += '<a href="mobile-pass.html" data-role="button" data-transition="slide">Change password</a>';
    }
    $('#mainPage').append('<div data-role="footer" data-position="fixed" class="ui-bar">' + footer + '</div>').trigger("create");

}

function LogoutFromMainPage() {
    EraseCookie("sessionuid");
    EraseCookie("invoicearg");
    EraseCookie("attendancearg");
    EraseCookie("resultarg");
    EraseCookie("beltarg");
    GetSession("");
}

/*
function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function ReadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function EraseCookie(name) {
    CreateCookie(name, "", -1);
}

*/

function CreateCookie(name, value, days) {
    /*if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";*/
    window.localStorage.setItem(name, value);
}

function ReadCookie(name) {
    /*var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;*/
    return window.localStorage.getItem(name);
}

function EraseCookie(name) {
    /*CreateCookie(name, "", -1);*/
    window.localStorage.removeItem(name);
}



function SetLogin() {


    var p = GetQueryString("p");
    if (p == "i") {
        window.location = 'mobile-invoices.html?y=' + GetQueryString("y") + '&m=' + GetQueryString("m");
        return;
    }
    if (p == "a") {
        window.location = 'mobile-attendance.html?y=' + GetQueryString("y") + '&m=' + GetQueryString("m");
        return;
    }


    if (GetQueryString("title") == "") {
        $("#inTitle").html("Dojo Login");
    } else {
        $("#inTitle").html("title");
    }
    $("#txtUID1").val(ReadCookie('dojouid'));
    $("#txtPWD1").val(ReadCookie('dojopwd'));

    var isRem = ReadCookie('dojorem');
    if (isRem == "1") {
        $("#chkRemember").prop("checked", true).checkboxradio("refresh");
    }


}

function GetPasswordInfo(arg) {
    $.mobile.loading('show', {
        text: 'please wait...',
        textVisible: true,
        theme: 'b',
        html: ''
    });
    var oldpass = $("#oldp").val().trim();
    var newpass1 = $("#newp1").val().trim();
    var newpass2 = $("#newp2").val().trim();

    if (newpass1 == "" || newpass2 == "") {
        $.mobile.loading('hide');
        $("#lblstatus").html('You need to enter new password twice.');
        return;
    }
    if (newpass1 != newpass2) {
        $.mobile.loading('hide');
        $("#lblstatus").html('New passwords are not matched.');
        return;
    }

    if (newpass1.length < 3 || newpass2.length < 3) {
        $.mobile.loading('hide');
        $("#lblstatus").html("New password is to short. Must be at least 3 characters.");
        return;
    }



    //$.getJSON("getsession.aspx?s=UID", function (uid) {
        var mUid = ReadCookie("sessionuid");
        var info = { "uid": mUid, "password": oldpass, "newpassword": newpass1 };
        $.ajax({
            url: serviceUrl + "ChangePassword",
            data: JSON.stringify(info),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result == "0") {
                    $("#lblstatus").html("Failed to change password, error occured.");
                    $.mobile.loading('hide');
                    return;
                }
                if (result == "1") {
                    $("#lblstatus").css("color", "green");
                    $("#lblstatus").html("Password is successfully changed.");
                    $.mobile.loading('hide');
                    return;
                }
                if (result == "2") {
                    $("#lblstatus").html("Wrong old password.");
                    $.mobile.loading('hide');
                    return;
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    //});
}

function ShowBelt() {
    var u = document.getElementById('selMember3').value;
    CreateCookie("beltarg", u, 1);
    GetBelt();
}

function GetBelt(arg) {
    $("#beltBoard2").empty();
    $("#beltBoard1").empty();

    $("#divMember").hide();
    $("#divButton").hide();
    $("#divNoMember").hide();
    var mainUid = ReadCookie("sessionuid");
    var u = ReadCookie("beltarg");
    if (u == null)
        u = arg;

    ShowLoading();
    $.getJSON(serviceUrl + "GetKlub/" + u, function (klu) {
        if (klu == "joe@j4k") {
            $("#htitle").html("Grading");
        }
        else {
            $("#htitle").html("Belts");
        }
        HideLoading();
    });

    
    $("#beltBoard2").hide();
    $("#divMember").html('<label for="selMember3">Member:</label> <select id="selMember3" name="selMember3" data-history="false" data-native-menu="false">   <option value=' + mainUid + '>Me</option></select></div>');
    ShowLoading();
    $.ajax({
        url: serviceUrl + "GetFamily/" + mainUid,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                $("#divMember").hide();
                $("#divButton").hide();
                $("#divNoMember").hide();
                HideLoading();
                return;
            }
            result.forEach(function (fa) {
                var parts = fa.split("|");
                var idfam = parts[0];
                var imeip = parts[1];
                
                if (u == idfam) {
                    $("#selMember3").append($("<option selected>").attr('value', idfam).text(imeip));
                }
                else {
                    $("#selMember3").append($("<option>").attr('value', idfam).text(imeip));
                }
                HideLoading();
            });


            $('#selMember3').selectmenu();
            $('#selMember3').selectmenu('refresh', true);
            $("#divMember").show();
            $("#divButton").show();
            $("#divNoMember").show();

        }, error: function (e) {
            console.log(e);
        }
    });

    var clanid = arg;
    if (isNumber(u)) {
        clanid = u;
    }

    //var clanid = arg;
    //var u = GetQueryString('u');
    //if (isNumber(u)) {
    //    clanid = u;
    //}

    ShowLoading();
    $.getJSON(serviceUrl + "GetBelts/" + clanid, function (belts) {
        if (belts == null || belts == "" || belts.length == 0) {
            HideLoading();
        }
        else {
            $.each(belts, function (index, value) {
                var content = "";
                content = '<li><div style="display: inline; float: left; width: 20px; height: 20px; background-color: #' + value.colorcode + ';"></div>'
                           + '&nbsp;' + (value.boja1==null?"":value.boja1) + '&nbsp;' + formatDateEN(value.datum) + '&nbsp;'
                           + '<p><img src="/images/' + value.rating + '.png" /></p>'
                           + '<p>' + value.ocjene + '</p></li>';
                $("#beltBoard1").append(content).listview('refresh');


                content = '<li><div style="display: inline; float: left; width: 20px; height: 20px; background-color: #' + value.colorcode + ';"></div>'
                           + '&nbsp;' + (value.boja1==null?"":value.boja1) + '&nbsp;' + formatDateEN(value.datum) + '&nbsp;</li>';
                $("#beltBoard2").append(content).listview('refresh');
            });
            HideLoading();
        }
    })

    ShowLoading();
    $.getJSON(serviceUrl + "GetShowBelt/" + clanid, function (isShowBelt) {
        if (isShowBelt == "0") {
            $("#beltBoard1").hide();
            $("#beltBoard2").show();
        }
        else {
            $("#beltBoard1").show();
            $("#beltBoard2").hide();
        }
        HideLoading();
    });
}

function ShowResult() {
    ShowLoading();
    var u = document.getElementById('selMember4').value;   
    CreateCookie("resultarg",u,1);
    GetResult();
}
function GetResult(arg) {
    ShowLoading();
    $("#divMember").hide();
    $("#divButton").hide();
    $("#divNoMember").hide();

    var mainUid = ReadCookie("sessionuid");
    var u = ReadCookie("resultarg");
    if (u == null)
        u = arg;

    $("#divMember").html('<label for="selMember4">Member:</label> <select id="selMember4" name="selMember4" data-history="false" data-native-menu="false">   <option value=' + mainUid + '>Me</option></select></div>');
    $.ajax({
        url: serviceUrl + "GetFamily/" + mainUid,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                HideLoading();
                $("#divMember").hide();
                $("#divButton").hide();
                $("#divNoMember").hide();
                return;
            }
            result.forEach(function (fa) {
                var parts = fa.split("|");
                var idfam = parts[0];
                var imeip = parts[1];                
                if (u == idfam) {
                    $("#selMember4").append($("<option selected>").attr('value', idfam).text(imeip));
                }
                else {
                    $("#selMember4").append($("<option>").attr('value', idfam).text(imeip));
                }               
            });
            $('#selMember4').selectmenu();
            $('#selMember4').selectmenu('refresh', true);
            $("#divMember").show();
            $("#divButton").show();
            $("#divNoMember").show();
            HideLoading();
        }, error: function (e) {
            console.log(e);
        }
    });

    var clanid = arg;
    if (isNumber(u)) {
        clanid = u;        
    }
    ShowLoading();
    $.getJSON(serviceUrl + "GetRezultati/" + clanid, function (rezu) {
        HideLoading();
        if (rezu == null || rezu == "" || rezu.length == 0) {

        }
        else {
            var content = "";
            var godina = "0";
            $.each(rezu, function (index, value) {
                if (new Date(value.datum).getFullYear() != godina) {
                    if (godina != "0") {
                        content += "</p></div>";
                    }
                    godina = new Date(value.datum).getFullYear();
                    content += '<div data-role="collapsible"><h3>' + godina + '</h3><p>';
                }
                if (value.klub == "erinschool") {
                    content += '<p>' + value.naziv + ' ' + value.mjesto + ' ' + formatDateEN(value.datum) + ' ' + value.kategorija + ' ' + '</p>';
                } else {
                    content += '<p>' + value.plasman + '. place:  ' + value.kategorija + ' ' + value.naziv + ' ' + value.mjesto + ' ' + formatDateEN(value.datum) + ' ' + '</p>';
                }
            });
            $("#resultBoard").html(content);
            $('div[data-role=collapsible]').collapsible();
        }
    });
}

function ShowInvoice() {
    ShowLoading();
    var arg = document.getElementById('selYear1').value + '|' + document.getElementById('selMonth1').value + '|' + document.getElementById('selMember1').value;
    CreateCookie("invoicearg", arg, 1);
    GetInvoice();
}

function GetInvoice(arg) {
    $("#divMember").hide();
    $("#divNoMember").show();

    var id = arg;
    var m = "0";
    var y = new Date().getFullYear();
    var u = "0";

    var mainUid = ReadCookie("sessionuid");
    arg = ReadCookie("invoicearg");
    if (arg != null) {
        var args = arg.split("|");
        if (args.length == 3) {
            y = args[0];
            m = args[1];
            u = args[2];
            if (!isNumber(m) && !isNumber(y)) {
                m = "0";
                y = new Date().getFullYear();
            }
            if (!isNumber(u)) {
                u = "0";
            }
            if (u != "0") {
                id = u;
                console.log(id);
            }
            arg = id;
        }
    }
    $.ajax({
        url: serviceUrl + "GetTotalDue/" + id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $("#totalDue").html("<b>Total due: " + result.replace(",",".") + '</b>');
        }, error: function (e) {
            console.log(e);
        }
    });

    console.log(arg);

    $("#divMember").html('<label for="selMember1">Member:</label> <select id="selMember1" name="selMember1" data-history="false" data-native-menu="false">   <option value=' + mainUid + '>Me</option></select></div>');
    $.ajax({
        url: serviceUrl + "GetFamily/" + mainUid,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                console.log('no fam');

                $("#divMember").hide();
                $("#divNoMember").show();
                return;
            }
            console.log(result);
            result.forEach(function (fa) {
                var parts = fa.split("|");
                var idfam = parts[0];
                var imeip = parts[1];
                if (id == idfam) {
                    $("#selMember1").append($("<option selected>").attr('value', idfam).text(imeip));
                }
                else {
                    $("#selMember1").append($("<option>").attr('value', idfam).text(imeip));
                }
            });
            $("#divMember").show();
            $("#divNoMember").hide();
            $('#selMember1').selectmenu();
            $('#selMember1').selectmenu('refresh', true);
        }, error: function (e) {
            console.log(e);
        }
    });
    $("#year").html('<label for="selYear1">Year:</label> <select id="selYear1" name="selYear1" data-history="false" data-native-menu="false"> </select></div>');
    for (i = new Date().getFullYear() ; i >= 2012; i--) {
        if (y == i) {
            $('#selYear1').append($('<option selected />').val(i).html(i));
        }
        else {
            $('#selYear1').append($('<option />').val(i).html(i));
        }
    }
    $('#selYear1').selectmenu();
    $('#selYear1').selectmenu('refresh', true);
    $("#month").html('<label for="selMonth1">Month:</label> <select id="selMonth1" name="selMonth1" data-history="false" data-native-menu="false"> </select></div>');
    if (m == "0") {
        $('#selMonth1').append($('<option />').val("0").html("All"));
    }
    for (i = 1 ; i <= 12; i++) {
        if (m == i) {
            $('#selMonth1').append($('<option selected />').val(i).html(i));
        }
        else {
            $('#selMonth1').append($('<option />').val(i).html(i));
        }
    }
    $('#selMonth1').selectmenu();
    $('#selMonth1').selectmenu('refresh', true);
    $("#racuni").html("");
    $.ajax({
        url: serviceUrl + "GetRacuni/" + id + "-" + m + "-" + y,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            result.forEach(function (ra) {
                var parts = ra.split("|");
                var broj = parts[0];
                var iznos = parts[1].replace(",",".");
                var placeno = parts[2].replace(",",".");
                var dug = parts[3].replace(",",".");
                var id = parts[4];
                var datumz = formatDateHR(parts[5]);
                var datump = formatDateHR(parts[6]);
                var li = "";
                if (dug == "green") {
                    li = '<li onclick ="SetInvoiceId(' + id + ')"><a data-transition="slide" style="color:' + dug + ';" href="mobile-in.html?id=' + id + '">#' + broj + '&nbsp;&nbsp;&nbsp;' + datumz + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + iznos + '</a><span class="ui-li-count">Paid ' + datump + '</span></li>';
                }
                else {
                    li = '<li onclick ="SetInvoiceId(' + id + ')"><a data-transition="slide" style="color:' + dug + ';" href="mobile-in.html?id=' + id + '">#' + broj + '&nbsp;&nbsp;&nbsp;' + datumz + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + iznos + '</a><span class="ui-li-count">Open</span></li>';
                }
                $("#racuni").append(li).listview('refresh');
            });
        }, error: function (e) {
            console.log(e);
        }
    });
    $.mobile.loading('hide');
}

function SetInvoiceId(id) {
    CreateCookie("invoiceId", id, 1);
    window.location = "mobile-in.html";
}

function ShowAttendance() {
    var arg = document.getElementById('selYear2').value + '-' + document.getElementById('selMonth2').value + '-' + document.getElementById('selMember2').value;
    CreateCookie("attendancearg", arg, 1);
    GetAttendance();
}

function GetAttendance(arg) {
    ShowLoading();
    $("#divMember").hide();
    $("#divNoMember").show();



    $("#attab tbody").html("");
    $("#attenChart").html("");
    $("#attendanceStatus").html("");

    var trinit = '<tr><th>#</th><th>Group</th><th class="centar">Date</th><th class="centar">Attended</th></tr>';
    $("#attab tbody").append(trinit);


    var id = arg;

    var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();
    var u = "0";
    var para = arg + "-" + y + "-" + m;

    var mainUid = ReadCookie("sessionuid");

    arg = ReadCookie("attendancearg");
    if (arg != null) {
        var args = arg.split("-");


        //var id = arg;
        //var m = "0";
        //var y = new Date().getFullYear();
        //var u = "0";

      

        //if (arg != null) {
        //    var args = arg.split("|");
        //    if (args.length == 3) {
        //        y = args[0];
        //        m = args[1];
        //        u = args[2];
        //        if (!isNumber(m) && !isNumber(y)) {
        //            m = "0";
        //            y = new Date().getFullYear();
        //        }
        //        if (!isNumber(u)) {
        //            u = "0";
        //        }
        //        if (u != "0") {
        //            id = u;
        //            console.log(id);
        //        }
        //        arg = id;
        //    }
        //}





        if (args.length == 3) {
            y = args[0];
            m = args[1];
            u = args[2];
            if (!isNumber(m) && !isNumber(y)) {
                m = new Date().getMonth() + 1;
                y = new Date().getFullYear();
            }

            if (!isNumber(u)) {
                u = "0";
            }
            if (u != "0")
                para = u + "-" + y + "-" + m;
            arg = u;
            id = arg;
        }
    }
    var attended = 0;
    var unattended = 0;
    $.getJSON(serviceUrl + "GetPrisutnost/" + para, function (pri) {
        if (pri == null || pri == "" || pri.length == 0) {
            HideLoading();
            $("#attendanceStatus").html("Attended: 0%");
        }
        else {
            var countPri = 0;
            $.each(pri, function (index, value) {
                countPri++;
                var kors = value.komentar.split('|');
                var trContent = "";
                trContent += '<tr class="' + (value.prisutan == true ? "zeleno" : "crveno") + '">';
                trContent += '<td>' + (index + 1) + '</td>';
                trContent += '<td>' + kors[1] + '</td>';
                trContent += '<td class="centar">' + formatDateEN(value.datum) + '</td>';
                trContent += '<td class="centar">' + value.prisutan + '</td>';
                $("#attab tbody").append(trContent);
                if (kors[0]) {
                    var trContentKo = '<tr><td colspan="4">' + kors[0] + '</td></tr>';
                    $("#attab tbody").append(trContentKo);
                }
                if (value.prisutan == true) {
                    attended++;
                }
                else {
                    unattended++;
                }
                if (countPri == pri.length) {
                    HideLoading();
                    DrawChart(attended, unattended);
                }
            });
        }
    });


    $("#divMember").html('<label for="selMember2">Member:</label> <select id="selMember2" name="selMember2" data-history="false" data-native-menu="false">   <option value=' + mainUid + '>Me</option></select></div>');
    $.ajax({
        url: serviceUrl + "GetFamily/" + mainUid,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                $("#divMember").hide();
                $("#divNoMember").show();
                return;
            }
            result.forEach(function (fa) {
                var parts = fa.split("|");
                var idfam = parts[0];
                var imeip = parts[1];                
                if (id == idfam) {
                    $("#selMember2").append($("<option selected>").attr('value', idfam).text(imeip));
                }
                else {
                    $("#selMember2").append($("<option>").attr('value', idfam).text(imeip));
                }
            });
            $("#divMember").show();
            $("#divNoMember").hide();          
            $('#selMember2').selectmenu();
            $('#selMember2').selectmenu('refresh', true);

        }, error: function (e) {
            console.log(e);
        }
    });


    $("#year").html('<label for="selYear2">Year:</label> <select id="selYear2" name="selYear2" data-history="false" data-native-menu="false"> </select></div>');
    for (i = new Date().getFullYear() ; i >= 2012; i--) {
        if (y == i) {
            $('#selYear2').append($('<option selected />').val(i).html(i));
        }
        else {
            $('#selYear2').append($('<option />').val(i).html(i));
        }
    }

    $('#selYear2').selectmenu();
    $('#selYear2').selectmenu('refresh', true);

    $("#month").html('<label for="selMonth2">Month:</label> <select id="selMonth2" name="selMonth2" data-history="false" data-native-menu="false"> </select></div>');
    if (m == "0") {
        $('#selMonth2').append($('<option />').val("0").html("All"));
    }
    for (i = 1 ; i <= 12; i++) {
        if (m == i) {
            $('#selMonth2').append($('<option selected />').val(i).html(i));
        }
        else {
            $('#selMonth2').append($('<option />').val(i).html(i));
        }
    }
    $('#selMonth2').selectmenu();
    $('#selMonth2').selectmenu('refresh', true);


}



function GetCalendar(arg) {
    ShowLoading();
    $.ajax({
        url: serviceUrl + "GetCalendar/" + arg,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                $("#calBoard").html('No data..');
                HideLoading();
                return;
            }
            var content = "";
            var godina = "0";
            var mjesec = "0";
            result.forEach(function (msg) {
                var parts = msg.split("|");
                var start = parts[0];
                var end = parts[1];
                var name = parts[2];
                var opis = parts[3];

                var startDate = start.split("-")[0];
                var startTime = start.split("-")[1];
                var startYear = startDate.split("/")[2];
                var startMonth = startDate.split("/")[0];
                var startDay = startDate.split("/")[1];
                var startDate2=startYear + "-" + startMonth + "-" + startDay
                
                var endDate = end.split("-")[0];
                var endTime = end.split("-")[1];
                var endYear = endDate.split("/")[2];
                var endMonth = endDate.split("/")[0];
                var endDay = endDate.split("/")[1];

                if ((godina != startYear) || (mjesec != startMonth)) {
                    godina = startYear;
                    mjesec = startMonth;
                    content += '</div><div data-role="collapsible"><h3>' + mjesec + '/' + godina + '</h3>';
                }

                if (startDay == endDay) {
                    content += '<p>' + formatDateEN(startDate2) + ' ' + startTime + '-' + endTime + ': <b>' + name + '</b>';
                }
                else {
                    content += '<p>' + formatDateEN(startDate2) + ' ' + startTime + '-' + endDate + ' ' + endTime + ': <b>' + name + '</b>';
                }
                if (opis != "") {
                    content += '<br />' + opis + '<br/>';
                }
                content += '</p>';
            });
            HideLoading();
            $("#calBoard").html(content);
            $('div[data-role=collapsible]').collapsible();
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function DrawChart(x, y) {
    var dataset = [
        { label: "Unattended", data: y, color: '#FF4500' },
        { label: "Attended", data: x, color: '#ADFF2F' }
    ];

    var options = {
        series: {
            pie: { show: true }
        },
        legend: {
            show: false
        }
    };

    $.plot($("#attenChart"), dataset, options);

    var percent = x / (x + y) * 100;
    $("#attendanceStatus").html("Attended: " + percent.toFixed(0) + "%");
}



function GetInPage(arg) {
    ShowLoading();
    var id = ReadCookie("invoiceId");
    $.getJSON(serviceUrl + "GetRacuni2/" + id, function (data) {
        if (data == null) {
            window.location = "mobile-invoices.html";
        }
        else {
            if (data.clanid != arg) {
                var para = data.clanid + "-" + arg;
                ShowLoading();
                $.getJSON(serviceUrl + "GetClaId/" + para, function (claid) {
                    if (claid == null) {
                        window.location = "mobile-login.html";
                    }
                    if (claid == "") {
                        window.location = "mobile-login.html";
                    }
                });
            }
            $("#pPaid").html((data.placeno == null ? "" : data.placeno.toFixed(2)) + " " + (data.datump == null ? "" : formatDateEN(data.datump)));
            $("#pTotal").html((data.iznos == null ? "" : data.iznos.toFixed(2)));
            $("#pDue").html(((data.iznos - data.placeno) == null ? "" : (data.iznos - data.placeno).toFixed(2)));

            $("#brojh").html("#" + data.broj);
            $("#payLink").html('<a href="#" onclick=window.open("https://manager.dojoexpert.com/student/pay.aspx?uid=' + data.clanid + '&br=' + data.broj + '","_system");return false;><img src="paypal.gif" alt="pay with PayPal" /></a>');
            $("#payLink").hide();

            var dug = data.iznos - data.placeno;
            if (typeof (dug) != "undefined" && dug != null) {
                ShowLoading();
                $.getJSON(serviceUrl + "GetPaypalEnableStatus/" + data.klub, function (ep) {
                    if (ep == "1") {
                        $("#payLink").show();
                        if(dug.toFixed(2)=="0.00"){
                            $("#payLink").hide();
                        }
                    }
                    else {
                        $("#payLink").hide();
                    }
                });
               
            }
            else {
                $("#payLink").hide();
            }

            $("#payLink").hide();

            $.getJSON(serviceUrl + "GetRacuniStavke/" + id, function (rs) {
                if (rs == null || rs == "" || rs.length == 0) {
                    HideLoading();
                }
                else {
                    ShowLoading();
                    var racuniCount = 0;
                    $.each(rs, function (index, value) {
                        racuniCount++;
                        var trContent = "<tr>";
                        trContent += '<td>' + value.opis + '</td>';
                        //trContent += '<td>' + (value.datumod == null ? "" : value.datumod) + '-' + (value.datumdo == null ? "" : value.datumdo) + '</td>';
						 trContent += '<td>' + (value.datumod == null ? "" : formatDateEN(value.datumod)) + '-' + (value.datumdo == null ? "" : formatDateEN(value.datumdo)) + '</td>';
                        trContent += '<td>' + (value.kolicina == null ? "" : value.kolicina.toFixed(2)) + '</td>';
                        trContent += '<td>' + (value.cijena == null ? "" : value.cijena.toFixed(2)) + '</td>';
                        trContent += '<td>' + ((value.kolicina * value.cijena) == null ? "" : (value.kolicina * value.cijena).toFixed(2)) + '</td>';
                        $("#intab tbody").append(trContent);
                        if (racuniCount == rs.length) {
                            HideLoading();
                        }
                    });
                }
            });
        }
    });
}




function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



function GetQueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function GetMessages(arg) {
    ShowLoading();
    $.ajax({
        url: serviceUrl + "getmessages/" + arg,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "") {
                $("#msgBoard").html('<p id="pMsg"></p>');
                $("#pMsg").html("No message.");
                HideLoading();
                return;
            }
            var content = "";
            result.forEach(function (msg) {
                var parts = msg.split("|");
                content += '<div data-role="collapsible">';
                content += '<h3>' + parts[0] + '</h3>';
                content += '<p>' + parts[1] + '</p>';
                content += '</div>';
            });
            $("#msgBoard").html(content + '<p id="pMsg"></p>');
            $('div[data-role=collapsible]').collapsible();
            HideLoading();
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function GetKlub(arg) {
    $.ajax({
        url: serviceUrl + "getklub/" + arg,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            var v = GetQueryString('v');
            if (v == "1") {
                $("#msgboardTitle").html("DMS DANCE PASS");
            }
            else {
                var klub = result.toLowerCase();
                if (klub == "dancemaxx") {
                    $("#msgboardTitle").html("News");
                }
                else {
                    $("#msgboardTitle").html("Msg.board");
                }
            }
            GetMessages(arg + '-' + v);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function GetQR (arg){
    $("#qrContent").html('<img src="http://chart.googleapis.com/chart?chs=250x250&cht=qr&choe=UTF-8&chl=' + arg + '" />');
}

function Login() {


    var checkedBoxes = $('input[type="checkbox"]').filter('#chkRemember').map(function () {
        return $(this).is(':checked') ? 1 : 0;
    });
    var isrem = checkedBoxes[0];

    $.mobile.loading('show');
    jQuery.support.cors = true;
    var uid = $("#txtUID1").val();
    var password = $("#txtPWD1").val();
    if (uid == "") {
        $("#txtUID1").val("");
        $("#txtUID1").css("border", "solid 1px red");
        $("#txtUID1").attr("placeholder", "UID is required and must be number");
        $.mobile.loading('hide');
        return;
    }
    if (password == "") {
        $("#txtPWD1").css("border", "solid 1px red")
        $("#txtPWD1").attr("placeholder", "Password is required");
        $.mobile.loading('hide');
        return;
    }

    var info = { "uid": uid, "password": password };
    $.ajax({
        url: serviceUrl + "login",
        data: JSON.stringify(info),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == "0") {
                window.location = "mobile-login.html?err=3";
                return;
            }
            var arr = result.split("|");
            if (arr.length < 5) {
                window.location = "mobile-login.html";
                return;
            }

            CreateCookie("sessionuid", uid, 1);

            if (isrem == "1") {
                //alert('checked from');
                CreateCookie("dojouid", uid, 1);
                CreateCookie("dojopwd", password, 1);
                CreateCookie("dojorem", "1", 1);
            }


            CreateCookie("ime", arr[0], 1);
            CreateCookie("prezime", arr[1], 1);
            CreateCookie("klub", arr[2], 1);
            CreateCookie("jezik1", arr[3], 1);
            CreateCookie("naziv", arr[4], 1);

            window.location = "mobile.html";
            //?uid=" + uid + "&pwd=" + password + "&isrem=" + isrem + "&ime=" + arr[0] + "&prezime=" + arr[1] + "&klub=" + arr[2] + "&jezik1=" + arr[3] + "&Naziv=" + arr[4];
        },
        error: function (e) {
            console.log(e);
        }
    });



}



function ShowLoading() {
    $.mobile.loading('show', {
        text: 'please wait...',
        textVisible: true,
        theme: 'b',
        html: ''
    });
}

function HideLoading() {
    $.mobile.loading('hide');
}

function formatDateHR(dat){
    var res=dat.split(".")
    switch(ReadCookie("jezik1")){
        case "en-GB":
        case "es-ES":
        case "fr-FR":
            return res[0] + "/" + res[1] + "/" + res[2];
             break;
        case "pt-PT":
            return res[0] + "-" + res[1] + "-" + res[2];
             break;
        case "hr-HR":
            return dat;
             break;
        default:
             return res[1] + "/" + res[0] + "/" + res[2];
             break;
     }   
}

function formatDateEN(dat){
    var res=dat.split("-");
    var res2= res[2].split("T");
    switch(ReadCookie("jezik1")){
        case "en-GB":
        case "es-ES":
        case "fr-FR":
            return res2[0] + "/" + res[1] + "/" + res[0];
             break;
        case "pt-PT":
            return res2[0] + "-" + res[1] + "-" + res[0];
             break;
        case "hr-HR":
            return res2[0] + "." + res[1] + "." + res[0];
             break;
        default:
             return res[1] + "/" + res2[0] + "/" + res[0];
             break;
     }   
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
