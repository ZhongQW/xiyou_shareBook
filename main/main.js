function show_div(e){
    let book = e.target.parentNode.parentNode;
    let div = book.getElementsByClassName('detials')[0];
    div.style.visibility = "visible";
    div.style.top = 30 + "px";
}
var image;
function selectImage(file){
    if(!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt){
        document.getElementById('book_img').src = evt.target.result;
        image = evt.target.result;
        // console.log(image);
    };
    reader.readAsDataURL(file.files[0]);
}
function hidden_div(e){
    e.currentTarget.attributes["data-toggle"].nodeValue;
    let book = e.target.parentNode.parentNode;
    let div = book.getElementsByClassName('detials')[0];
    div.style.visibility = "hidden";
    div.style.top = -10 + "px";
}
function handleDetails(event){
    var sessionStorage=window.sessionStorage;
    console.log(event);
    console.log(event.getAttribute("data-index-book"));
    sessionStorage.setItem('book_id', event.getAttribute("data-index-book"));
    window.location.href = "../detail/librarydetail.html";
}
function handlePage(event) {
    let set = event.getAttribute("data-index-page");
    var sessStorage = window.sessionStorage;
    var storage = window.localStorage;
    // console.log(set);
    let page = sessStorage.page;
        if(set == "previous" && sessStorage.page == "1"){
            alert('是第一页，没有更多了！');
        }else if(set == "previous" && sessStorage.page != "1"){ //非第一页，点击上一页
            page--;
            sessStorage.setItem('page', page);
            console.log(page);
            let data = {
                page: sessStorage.page
            };
            if(page == 1){
                location.reload();
            }else {
                data = JSON.stringify(data);
                $.ajax({
                    type: "post",
                    url: "http://47.94.97.26:8080/BSP/page",
                    headers: {'Authorization': storage.token},
                    data: data,
                    success: function (res) {
                        let data = JSON.parse(res);
                        $("#container_div").empty();
                        document.getElementById("page_y").innerHTML = "第"+sessStorage.page+"页";
                        for(let i=0;i<data.length;i++) {
                            let classB1 = " <div class=\"book\">\n" +
                                "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                "                <div class=\"p_cover\"><span>"+ data[i].name +"</span></div>\n" +
                                "            </a>\n" +
                                "        </div>";
                            $(classB1).appendTo($("#container_div"));
                        }
                        // let page_ = "    <div id=\"page\">\n" +
                        //     "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                        //     "        <span class=\"page_detail actived\">第"+ sessStorage.page +"页</span>\n" +
                        //     "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                        //     "    </div>";
                        // $(page_).appendTo($("#library"));
                    },
                    error: function (res) {
                        alert("加载失败" + JSON.stringify(res));
                    }
                });
            }
        }else{ //点击下一页
            page++;
            sessStorage.setItem('page', page);
            let data = {
                page: sessStorage.page
            };
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/page",
                headers: {'Authorization': storage.token},
                data: data,
                success: function (res) {
                    let data = JSON.parse(res);
                    if (data == '') {
                        page--;
                        sessStorage.setItem('page', page);
                       alert("没有更多书了！");
                    } else {
                        $("#container_div").empty();
                        // $("#library").find('#page').empty();
                        for(let i=0;i<data.length;i++) {
                            let classB1 = " <div class=\"book\">\n" +
                                "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                "                <div class=\"p_cover\"><span>"+ data[i].name +"</span></div>\n" +
                                "            </a>\n" +
                                "        </div>";
                            $(classB1).appendTo($("#container_div"));
                        }
                        document.getElementById("page_y").innerHTML = "第"+sessStorage.page+"页";
                        // let page_ = "    <div id=\"page\">\n" +
                        //     "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                        //     "        <span class=\"page_detail actived\">第"+ sessStorage.page +"页</span>\n" +
                        //     "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                        //     "    </div>";
                        // $(page_).appendTo($("#library"));
                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }
    console.log(sessStorage.getItem('page'));
}
window.onload = function(){
    var oBook = document.getElementsByClassName("book");
    var oDetails = [];
    let storage = window.localStorage;
    var sessStorage=window.sessionStorage;
    sessStorage.setItem('page', '1');
    console.log(storage.token);
    for(var i=0;i<oBook.length;i++) {
        oDetails[i] = oBook[i].getElementsByClassName('detials')[0];
        oBook[i].addEventListener('mouseover', show_div, false);
        oBook[i].addEventListener('mouseout', hidden_div, false);
    }
    let data = {};
    data = {
        page: 1
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/page",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            if(data == ''){
                let classB = "<div class=\'none_book\'><i class=\"fa fa-meh-o\" aria-hidden=\"true\"></i>还没有人上传图书~</div>>";
                $(classB).appendTo($("#library"));
            }else {
                for(let i=0;i<data.length;i++) {
                    let classB1 = " <div class=\"book\">\n" +
                        "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                        "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                        "                <div class=\"p_cover\"><span>"+ data[i].name +"</span></div>\n" +
                        "            </a>\n" +
                        "        </div>";
                    $(classB1).appendTo($("#container_div"));
                }
                document.getElementById("page_y").innerHTML = "第"+sessStorage.page+"页";

                // let page_ = "    <div id=\"page\">\n" +
                //     "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                //     "        <span class=\"page_detail actived\">第"+ sessStorage.page +"页</span>\n" +
                //     "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                //     "    </div>";
                // $(page_).appendTo($("#library"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    // $.ajax({
    //     type: "post",
    //     url: "http://47.94.97.26:8080/BSP/overdue",
    //     headers: {'Authorization': storage.token},
    //     data: JSON.stringify({}),
    //     success: function(res) {
    //         let data = JSON.parse(res);
    //         console.log(data);
    //
    //         if(data == ''){
    //
    //         }else {
    //             for(let i=0;i<data.length;i++){
    //                 let str = "<div class=\"float\" >\n" +
    //                     "            <i class=\"fa fa-bullhorn\" aria-hidden=\"true\"></i>\n" +
    //                     "            <span>通知：你的《"+ data[i].bookName +"》已逾期~</span>\n" +
    //                     "        </div>";
    //                 $(str).appendTo($("#container_Div"));
    //             }
    //         }
    //     },
    //     error: function(res){
    //         alert("加载失败"+JSON.stringify(res));
    //     }
    // });

    setTimeout(function(){
        document.getElementById('containerDiv').style.display = 'none';
    }, 15500);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/notice",
        headers: {'Authorization': storage.token},
        data: JSON.stringify({}),
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            if(data.length == 0){

            }else {
                let str = '';
                for(let i=0;i<data.length;i++){
                    str += "<div class=\"float\" >\n" +
                        "            <i class=\"fa fa-bullhorn\" aria-hidden=\"true\"></i>\n" +
                        "            <span>通知：您预约的《"+ data[i].bookName +"》已被归还，系统已自动帮你借阅，快去查看吧~</span>\n" +
                        "        </div>";
                }
                $(str).appendTo($("#containerDiv"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    // image = image.split(',')[1];
};