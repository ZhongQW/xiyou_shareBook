/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/16
    Time: 10:11
*/
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfdelete btn btn-primary  btn-sm" style="margin-right:15px;">删除</button>',

        '<button type="button" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;">修改</button>'
    ].join('');
}
function SignOut(){
    window.location = "../index.html";
}
function getElementByAttr(tag,attr,value) {
    var aElements=document.getElementsByTagName(tag);
    var aEle=[];
    for(var i=0;i<aElements.length;i++)
    {
        if(aElements[i].getAttribute(attr)==value)
            aEle.push( aElements[i] );
    }
    return aEle;
}
function handleBook(event){
    $("#div3 table tbody").empty();
    let storage=window.localStorage;
    let index = event.getAttribute("data-li-index");
    let div = $("#div_ div");
    for (i = 0; i < div.length; i++) {
        if (index == i) {
            div[i].style.display = 'block';
        } else {
            div[i].style.display = 'none';
        }
    }
    $.ajax({
        method: "get",
        url: "http://47.94.97.26:8080/BSP/searchBookUnderCheck",
        headers: {'Authorization': storage.token},
        data: {},
        success: function(res){
            let data = JSON.parse(res);
            // console.log(data[0].name);
            for(let i=0;i<data.length;i++){
                var str = "<tr data-index-book = "+ data[i].id +">\n" +
                    "                    <td>"+ data[i].name +"</td>\n" +
                    "                    <td>"+ data[i].userName +"</td>\n" +
                    "                    <td>\n" +
                    "                        <button type=\"button\" class=\"btn btn-link\" onclick=\"handleAgree(this)\">同意</button>\n" +
                    "                        <button type=\"button\" class=\"btn btn-link\" onclick=\"handleReject(this)\">拒绝</button>\n" +
                    "                    </td>\n" +
                    "                </tr>";
                $(str).appendTo($("#div3 table tbody"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleUser(event) {
    $("#div4 table tbody").empty();
    let storage=window.localStorage;
    let index = event.getAttribute("data-li-index");
    let div = $("#div_ div");
    for (i = 0; i < div.length; i++) {
        if (index == i) {
            div[i].style.display = 'block';
        } else {
            div[i].style.display = 'none';
        }
    }
    $.ajax({
        type: "get",
        url: "http://47.94.97.26:8080/BSP/findAllUser",
        headers: {'Authorization': storage.token},
        data: {
        },
        success: function(res){
            let data = JSON.parse(res);
            for(let i=0;i<data.length;i++){
                var str = "                <tr data-index-user = '"+ data[i].id +"'>\n" +
                    "                    <td>"+ data[i].userName +"</td>\n" +
                    "                    <td>"+ data[i].tel +"</td>\n" +
                    "                    <td> <button type=\"button\" class=\"btn btn-link\" onclick=\"delUser(this)\">删除</button> </td>\n" +
                    "                </tr>";
                $(str).appendTo($("#div4 table tbody"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleDelBook(event){
    $("#div5 table tbody").empty();

    let storage=window.localStorage;
    let index = event.getAttribute("data-li-index");
    let div = $("#div_ div");
    for (i = 0; i < div.length; i++) {
        if (index == i) {
            div[i].style.display = 'block';
        } else {
            div[i].style.display = 'none';
        }
    }
    $.ajax({
        type: "get",
        url: "http://47.94.97.26:8080/BSP/findAllStoredBook",
        headers: {'Authorization': storage.token},
        data: {
        },
        success: function(res){
            let data = JSON.parse(res);
            // console.log(data);
            for(let i=0;i<data.length;i++){
                var str = "                    <tr data-index-book-del=\""+ data[i].id +"\">\n" +
                    "                        <td>"+ data[i].name +"</td>\n" +
                    "                        <td>"+ data[i].userName +"</td>\n" +
                    "                        <td> <button type=\"button\" class=\"btn btn-link\" onclick=\"handleOfflineBook(this)\">下架</button> </td>\n" +
                    "                    </tr>";
                $(str).appendTo($("#div5 table tbody"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleExpire(event){
    $("#div6 table tbody").empty();
    let storage=window.localStorage;
    let index = event.getAttribute("data-li-index");
    let div = $("#div_ div");
    for (i = 0; i < div.length; i++) {
        if (index == i) {
            div[i].style.display = 'block';
        } else {
            div[i].style.display = 'none';
        }
    }
    $.ajax({
        type: "get",
        url: "http://47.94.97.26:8080/BSP/alloverdue",
        headers: {'Authorization': storage.token},
        data: {
        },
        success: function(res){
            let data = JSON.parse(res);
            for(let i=0;i<data.length;i++){
                var str = "<tr data-index-expire = "+ data[i].rentId +">\n" +
                    "                        <td>"+ data[i].bookName +"</td>\n" +
                    "                        <td>"+ data[i].userName +"</td>\n" +
                    "                        <td>"+ data[i].borrowName +"</td>\n" +
                    "                        <td>"+ data[i].day +"</td>\n" +
                    "                        <td>"+ data[i].borrowTel +"</td>\n" +
                    "                    </tr>";
                $(str).appendTo($("#div6 table tbody"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleOfflineBook(event){
    let  id = event.parentNode.parentNode.getAttribute("data-index-book-del");
    let storage=window.localStorage;
    let data = {
        id: id
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deletebook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            if (data.status) {
                alert("下架成功！");
                window.location.reload();
            }else{
                alert("下架失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function delUser(event){
    let  id = event.parentNode.parentNode.getAttribute("data-index-user");
    let storage=window.localStorage;
    let data = {
        id: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deleteUser",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            // console.log(data.status);
            if (data.status) {
                alert("删除成功");
                window.location.reload();

            }else{
                alert("删除失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleAgree(event){
    let storage=window.localStorage;
    let id = event.parentNode.parentNode.getAttribute("data-index-book");
    let data = {
        id: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/approveBook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            // console.log(data.status);
            if (data.status) {
                alert("成功上架");
                window.location.reload();

            }else{
                alert("上架失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleReject(event){
    let storage=window.localStorage;
    let id = event.parentNode.parentNode.getAttribute("data-index-book");
    let data = {
        id: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deleteBookByAdmin",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            // console.log(data.status);
            if (data.status) {
                alert("驳回成功");
                window.location.reload();

            }else{
                alert("驳回失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
window.onload = function(){
    let storage=window.localStorage;
    // let ul = $('#main-nav');
    // let btn = getElementByAttr('a', 'data-li-logo', 'a');
    // let div = $('#div_ div');
    // for (let i = 0; i < btn.length; i++) {
    //     btn[i].onclick = function () {//按钮点击事件
    //         let index = (this.getAttribute('data-li-index') - 0);
    //         if (btn[index].className.indexOf('curr_btn') >= 0)return;
    //         for (i = 0; i < btn.length; i++) {
    //             if (index === i) {
    //                 btn[i].style.background = '#b8b894';
    //                 div[i].style.display = 'block';
    //             } else {
    //                 btn[i].style.background = '#ffffff';
    //                 div[i].style.display = 'none';
    //             }
    //         }
    //     }
    // }
    $("#handlePass").click(function(){
        if($("#newPasword").val() !== $("#rePasword").val()){
            alert("俩次密码不一致");
        }else{
            let data = {};
            data = {
                password: $("#pass").val()
            };
            data = JSON.stringify(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/updateUserPassword",
                headers: {'Authorization': storage.token},
                data: data,
                success: function (res) {
                    let json = JSON.parse(res);
                    if(eval('json.'+"status") === "0"){
                        alert("修改密码成功");
                    }
                },
                error: function(res){
                    alert("加载失败"+JSON.stringify(res));
                }
            });
        }
    });

    $("#agree").click(function(e){
        console.log($(e.target).parent().parent().attr("data-index"));
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/SearchBookUnderCheckServlet",
            headers: {'Authorization': storage.token},
            data: {
            },
            success: function(res){
                if (res.error_code === '0') {
                    for(let i=0;i<res.data.length;i++) {
                        let str = "<tr>\n" +
                            "                    <td>"+ res.data.name +"</td>\n" +
                            "                    <td>"+ res.data.user +"</td>\n" +
                            "                    <td>"+ res.data.time +"</td>\n" +
                            "                    <td>\n" +
                            "                        <button type=\"button\" class=\"btn btn-link\">同意</button>\n" +
                            "                        <button type=\"button\" class=\"btn btn-link\">拒绝</button>\n" +
                            "                    </td>\n" +
                            "                </tr>";
                        $("str").appendTo("#div3 table tbody");
                    }
                }else{
                    alert("加载失败！");
                }
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });
    });

    $("#reject").click(function(e){
        // console.log($(e.target).parent().parent().attr("data-index"));
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/SearchBookUnderCheckServlet",
            headers: {'Authorization': storage.token},
            data: {
                id: $(e.target).parent().parent().attr("data-index")
            },
            success: function(res){
                if (res.error_code === '0') {
                    alert("成功拒绝！");
                    window.location.reload();

                }else{
                    alert("加载失败！");
                }
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });
    })
};