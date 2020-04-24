$(document).ready(function () {

    if (localStorage.getItem('accesstoken')) {
        $("#Logout").css('display', 'inline-block');
        $("#btnCreateTodo").css('display', 'inline-block');
        $("#btnLogin").css('display', 'none');
        $("#btnRegister").css('display', 'none');
        $(".signin2").css('display', 'none');
    }

    $('#checkbox1').change(function () {
        alert('a')
    });

    $('.datepicker').datepicker({
        minDate: 0
    });

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
                localStorage.setItem('loginWith', 'loginForm')
                getData(localStorage.getItem('accesstoken'))
                $("#Logout").css('display', 'inline-block');
                $("#btnCreateTodo").css('display', 'inline-block');
                $("#btnLogin").css('display', 'none');
                $("#btnRegister").css('display', 'none');
                $(".signin2").css('display', 'none');
                $('#loginForm')[0].reset();
                // $("#Login").toggle();
            })
            .fail(function (err) {
                console.log(err.responseJSON.message)
                swal.fire(err.responseJSON.message)
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
                swal.fire(err.responseJSON.error)
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
                swal.fire(err.responseJSON.error)
            })
    });

    $("#Logout").click(function () {
        if (localStorage.getItem('loginWith') == 'loginForm') {
            localStorage.clear();
            $("#todoList").css('display', 'none');
            $("#Logout").css('display', 'none');
            $("#btnCreateTodo").css('display', 'none');
            $("#btnLogin").css('display', 'inline-block');
            $("#btnRegister").css('display', 'inline-block');
        } else {
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.clear();
            $("#todoList").css('display', 'none');
            $("#Logout").css('display', 'none');
            $("#btnCreateTodo").css('display', 'none');
            $("#btnLogin").css('display', 'inline-block');
            $("#btnRegister").css('display', 'inline-block');
            $(".signin2").css('display', 'inline-block');
        }
    })

});

function getData(token) {
    $("#Login").css('display', 'none');
    $("#todoList").css('display', 'block');
    $.ajax({
        url: "http://localhost:3000/todos",
        type: "GET",
        headers: {
            "accesstoken": token
        },
    })
        .done(function (result) {
            $("#dataBody").html("")
            $.each(result, function (i, data) {
                for (i = 0; i < result.data.length; i++) {
                    let due_date = new Date(`${result.data[i].due_date}`).toDateString();
                    let trHTML =
                        $(`<tr data-id="${result.data[i].id}"><td>
                        <label class="todo-checkbox">
                            <input type="checkbox" onclick="return false;">
                            <span class="checkmark"></span>
                        </label>
                         ${result.data[i].title}
                         </td><td>
                         ${result.data[i].description}
                         </td><td>
                         ${due_date}
                         </td> <td>
                        <button type="button" id="doneTodo" class="btn btn-dark" value="${result.data[i].id}" onclick="doneTodo(${result.data[i].id})">Done</button>
                         <button type="button" id="editData" data-toggle="modal" data-target="#exampleModal" class="btn btn-dark" value="${result.data[i].id}" onclick="editData(${result.data[i].id})">Edit</button>
                         <button type="button" id="deleteData" class="btn btn-dark" value="${result.data[i].id}" onclick="deleteData(${result.data[i].id})">Delete</button>
                    </td></tr>`)
                    if (result.data[i].status) {
                        trHTML.find("#doneTodo").css('display', 'none');
                        trHTML.find("#deleteData").css('display', 'none');
                        trHTML.find("#editData").css('display', 'none');
                    }
                    let checkbox = trHTML.find('input[type=checkbox]')
                    checkbox.prop('checked', result.data[i].status)
                    $('#dataBody').append(trHTML)
                }
            });
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
            swal.fire('Success Delete todo')
            getData(localStorage.getItem('accesstoken'))
        })
        .fail(function (err) {
            console.log(err)
        })
}

function doneTodo(id) {
    let objTodo = {}
    objTodo.status = true

    $.ajax({
        url: "http://localhost:3000/todos/checklist/" + id,
        type: "PUT",
        headers: {
            "Content-Type": "application/json",
            "accesstoken": localStorage.getItem('accesstoken')
        },
        data: JSON.stringify(objTodo)
    })
        .done(function (result) {
            swal.fire('Congratulations!!')
            getData(localStorage.getItem('accesstoken'))
        })
        .fail(function (err) {
            console.log(err)
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: "http://localhost:3000/user/google-login",
        type: "POST",
        data: {
            token: id_token
        },
        statusCode: {
            201: function (response) {
                localStorage.setItem('accesstoken', response.accessToken)
                localStorage.setItem('loginWith', 'googleForm')
                getData(localStorage.getItem('accesstoken'))
                // $("#Login").toggle();
                $("#Logout").css('display', 'inline-block');
                $("#btnCreateTodo").css('display', 'inline-block');
                $("#btnLogin").css('display', 'none');
                $("#btnRegister").css('display', 'none');
                $(".signin2").css('display', 'none');
            }
        }
    })
}

function editData(id) {
    $('#exampleModal').on('show.bs.modal', function (event) {
        let modal = $(this)
        modal.find('.modal-title').text('Edit Todo Data')

        $.ajax({
            url: "http://localhost:3000/todos/" + id,
            type: "GET",
            headers: {
                "accesstoken": localStorage.getItem('accesstoken')
            },
        })
            .done(function (result) {
                modal.find('#title').val(result.data.title)
                modal.find('#description').val(result.data.description)
                modal.find('#due_date').val(result.data.due_date)
                modal.find('#status').val(result.data.status)
                modal.find('#id').val(result.data.id)
            })
            .fail(function (err) {
                console.log(err)
            })
    })
}

$('#editTodo').on('submit', function (e) {
    e.preventDefault();
    let modal = $(this)

    let idTodo = modal.find('#id').val()
    let objTodo = {}
    objTodo.title = modal.find('#title').val()
    objTodo.description = modal.find('#description').val()
    objTodo.due_date = modal.find('#due_date').val()
    objTodo.status = modal.find('#status').val()

    $.ajax({
        url: "http://localhost:3000/todos/" + idTodo,
        type: "PUT",
        headers: {
            "Content-Type": "application/json",
            "accesstoken": localStorage.getItem('accesstoken')
        },
        data: JSON.stringify(objTodo)
    })
        .done(function (result) {
            swal.fire('Success Edit Todo')
            $('#exampleModal').modal('hide');
            getData(localStorage.getItem('accesstoken'))
        })
        .fail(function (err) {
            console.log(err)
            swal.fire(err.responseJSON.error)
        })
});