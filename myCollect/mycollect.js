function borrow(event){
    let storage=window.localStorage;

    let id = event.parentNode.getAttribute("data-index-coll");
    let data = {};
    data = {
        id: id
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addrent",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert("借阅成功！");
            }else{
                alert('你有书逾期未还，不可借阅！');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleNoCollect(event){
    let storage=window.localStorage;

    let id = event.parentNode.parentNode.getAttribute("data-index-coll");
    console.log(id);
    let data = {};
    data = {
        id: id
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deleteCollection",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status == 'true') {
                alert("取消收藏成功！");
                location.reload();
            }else{
                alert('error');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
function handleRent(event){
    let endDate = "";
    $("#btn_add_book").click(function() {
        let storage=window.localStorage;

        let id = event.parentNode.parentNode.getAttribute("data-index-coll");
        let data = {};
        data = {
            bookId: id,
            endDate: $("#book_del").val()
        };
        data = JSON.stringify(data);
        console.log(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/addrent",
            headers: {'Authorization': storage.token},
            data: data,
            success: function(res) {
                let json = JSON.parse(res);
                if (json.status) {
                    alert("借阅成功！");
                    location.reload();
                }else{
                    alert('你有书逾期未还，不可借阅！');
                }
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });
    })
}
function handleApp(event){
    let endDate = "";
    $("#btn_add_book").click(function() {
        let storage=window.localStorage;
        let id = event.parentNode.parentNode.getAttribute("data-index-coll");
        let data = {};
        data = {
            bookId: id,
            endDate: $("#book_del").val()
        }
        data = JSON.stringify(data);
        console.log(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/addreserve",
            headers: {'Authorization': storage.token},
            data: data,
            success: function(res) {
                let json = JSON.parse(res);
                if (json.status) {
                    alert("预约成功！等上一个人归还后便可借阅~");
                    location.reload();
                }else{
                    alert('你有书逾期未还，不可预约！');
                }
            },
            error: function(res){
                alert("加载失败"+JSON.stringify(res));
            }
        });
    })
}
window.onload = function (){
    let storage=window.localStorage;

    $.ajax({
        type: "get",
        url: "http://47.94.97.26:8080/BSP/findCollectionByUser",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            console.log(data);
            if(data.length != 0) {
                let ss = "<table id=\"div2\">\n" +
                    "        <caption>\n" +
                    "            <h2>我的收藏</h2>\n" +
                    "        </caption>\n" +
                    "        <thead>\n" +
                    "        <tr>\n" +
                    "            <th class=\"col-md-2\">书籍名称</th>\n" +
                    "            <th class=\"col-md-3\">作者</th>\n" +
                    "            <th class=\"col-md-2\">图书状态</th>\n" +
                    "            <th class=\"col-ma-2\">取消收藏</th>\n" +
                    "            <th class=\"col-ma-2\">借阅</th>\n" +
                    "            <th class=\"col-ma-2\">预约</th>\n" +
                    "        </tr>\n" +
                    "        </thead>\n" +
                    "        <tbody>\n" +
                    "    </table>";
                $(ss).appendTo("#section-2");
                for (let i = 0; i < data.length; i++) {
                    let str = '';
                    if (data[i].status == '0') {
                        str = "        <tr data-index-coll = " + data[i].bookId + ">\n" +
                            "            <td class=\"col-md-2\">" + data[i].bookName + "</td>\n" +
                            "            <td class=\"col-md-2\">" + data[i].author + "</td>\n" +
                            "            <td class=\"col-md-2\">在架</td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"button\" onclick=\"handleNoCollect(this)\">取消收藏</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"button\" data-toggle=\"modal\" data-target=\"#myModal\"  onclick=\"handleRent(this)\">借阅</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"no_button\" disabled onclick=\"handleApp(this)\">预约</button>\n" +
                            "            </td>\n" +
                            "        </tr>";
                    } else if (data[i].status == '2') {
                        str = "        <tr data-index-coll = " + data[i].bookId + ">\n" +
                            "            <td class=\"col-md-2\">" + data[i].bookName + "</td>\n" +
                            "            <td class=\"col-md-2\">" + data[i].author + "</td>\n" +
                            "            <td class=\"col-md-2\">已预约</td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"button\" onclick=\"handleNoCollect(this)\">取消收藏</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"no_button\" disabled onclick=\"handleRent(this)\">借阅</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"no_button\" disabled onclick=\"handleApp(this)\">预约</button>\n" +
                            "            </td>\n" +
                            "        </tr>";
                    } else if (data[i].status == '3') {
                        str = "        <tr data-index-coll = " + data[i].bookId + ">\n" +
                            "            <td class=\"col-md-2\">" + data[i].bookName + "</td>\n" +
                            "            <td class=\"col-md-2\">" + data[i].author + "</td>\n" +
                            "            <td class=\"col-md-2\">已借</td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"button\" onclick=\"handleNoCollect(this)\">取消收藏</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"no_button\" disabled>借阅</button>\n" +
                            "            </td>\n" +
                            "            <td class=\"col-md-2\">\n" +
                            "                <button class=\"button\" data-toggle=\"modal\" data-target=\"#myModal\"  onclick=\"handleApp(this)\">预约</button>\n" +
                            "            </td>\n" +
                            "        </tr>";
                    } else {
                        alert('error');
                    }
                    // console.log(str);
                    $(str).appendTo("#div2 tbody");
                }
            }else{
                let str = "<div class='none_book'>" +
                    "<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>" +
                    "这里是空的哦~快去收藏你喜欢的图书吧~" +
                    "</div>";
                $(str).appendTo("#section-2");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });

}