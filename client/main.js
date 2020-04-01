$(document).ready(function () {

    $("#btnLogin").click(function () {
        $("#Login").toggle();
    });

    $("#btnRegister").click(function () {
        $("#Register").toggle();
    });

    $("#loginForm").submit(function (e) {
        e.preventDefault();
        let objLogin = {}
        objLogin.email = $("#emailLogin").val()
        objLogin.password = $("#passwordLogin").val()

        $.ajax({
            url: "http://localhost:3000/user/login",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(objLogin)
        })
            .done(function (result) {
                localStorage.setItem('accesstoken', result.accessToken)
                getData(localStorage.getItem('accesstoken'))
                $("#Login").toggle();
            })
            .fail(function (err) {
                console.log(err.responseJSON.message)
            })
    });
});

function getData(token) {
    $.ajax({
        url: "http://localhost:3000/todos",
        type: "GET",
        headers: {
            "accesstoken": token
        },
    })
        .done(function (result) {
            var trHTML = '';
            $.each(result, function (i, data) {
                for (i = 0; i < result.data.length; i++) {
                    trHTML +=
                        '<tr><td>'
                        + result.data[i].title
                        + '</td><td>'
                        + result.data[i].description
                        + '</td><td>'
                        + result.data[i].due_date
                        + '</td></tr>';
                }
            });
            $('#dataBody').append(trHTML);
        })
        .fail(function (err) {
            console.log(err)
        })
        .always(function () {
            //console.log('a')
        })
}