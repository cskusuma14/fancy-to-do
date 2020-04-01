$(document).ready(function () {

    $("#btnLogin").click(function () {
        $("#Login").toggle();
    });

    $("#btnRegister").click(function () {
        $("#Register").toggle();
    });

    $("#btnCreateTodo").click(function () {
        $("#CreateTodo").toggle();
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
                $('#loginForm')[0].reset();
                $("#Login").toggle();
                $("#Logout").css('display', 'inline-block');
                $("#btnCreateTodo").css('display', 'inline-block');
                $("#btnLogin").css('display', 'none');
                $("#btnRegister").css('display', 'none');
            })
            .fail(function (err) {
                console.log(err.responseJSON.message)
            })
    });

    $("#registerForm").submit(function (e) {
        e.preventDefault();
        let objRegister = {}
        objRegister.name = $("#name").val()
        objRegister.username = $("#username").val()
        objRegister.password = $("#passwordRegister").val()
        objRegister.email = $("#email").val()

        $.ajax({
            url: "http://localhost:3000/user/register",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(objRegister)
        })
            .done(function (result) {
                console.log(result)
                $('#registerForm')[0].reset();
                $("#Register").toggle();
            })
            .fail(function (err) {
                console.log(err.responseJSON.error)
            })
    });

    $("#todoForm").submit(function (e) {
        e.preventDefault();
        let objTodo = {}
        objTodo.title = $("#title").val()
        objTodo.description = $("#description").val()
        objTodo.due_date = $("#dueDate").val()
        objTodo.status = false

        $.ajax({
            url: "http://localhost:3000/todos",
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                "accesstoken": localStorage.getItem('accesstoken')
            },
            data: JSON.stringify(objTodo)
        })
            .done(function (result) {
                $('#todoForm')[0].reset();
                $("#CreateTodo").toggle();
                getData(localStorage.getItem('accesstoken'))
            })
            .fail(function (err) {
                console.log(err)
            })
    });

    $("#Logout").click(function () {
        localStorage.clear();
        $("#todoList").css('display', 'none');
        $("#Logout").css('display', 'none');
        $("#btnCreateTodo").css('display', 'none');
        $("#btnLogin").css('display', 'inline-block');
        $("#btnRegister").css('display', 'inline-block');
    })

});

function getData(token) {
    $("#dataBody").empty();
    $("#todoList").css('display', 'block');
    $.ajax({
        url: "http://localhost:3000/todos",
        type: "GET",
        headers: {
            "accesstoken": token
        },
    })
        .done(function (result) {
            let trHTML = '';
            $.each(result, function (i, data) {
                for (i = 0; i < result.data.length; i++) {
                    trHTML +=
                        `<tr><td>
                         ${result.data[i].title}
                         </td><td>
                         ${result.data[i].description}
                         </td><td>
                         ${result.data[i].due_date}
                         </td> <td>
                         <button type="button" id="deleteData" class="btn btn-dark" value="${result.data[i].id}" onclick="deleteData(${result.data[i].id})">Delete</button>
                    </td></tr>`
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

function deleteData(id) {
    $.ajax({
        url: "http://localhost:3000/todos/" + id,
        type: "DELETE",
        headers: {
            "accesstoken": localStorage.getItem('accesstoken')
        },
    })
        .done(function (result) {
            getData(localStorage.getItem('accesstoken'))
        })
        .fail(function (err) {
            console.log(err)
        })
}