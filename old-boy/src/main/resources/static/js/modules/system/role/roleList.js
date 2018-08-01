layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //编码列表
    var tableIns = table.render({
        elem: '#roleList',
        url : '../../../../static/json/rolelist.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "roleListTable",
        cols : [[
            {field: 'id', title: 'ID', align:"center"},
            {field: 'roleName', title: '角色名称'},
            {field: 'userType', title: '角色类型'},
            {field: 'roleCode', title: '角色编码', align:'center'},
            {field: 'updateDate', title: '更新时间',  align:'center'},
            {field: 'status', title: '状态', align:'center'},
            {title: '操作', width:250, templet:'#roleListBar',fixed:"right",align:"center"}
        ]]
    });


    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("roleListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加编码
    function addRole(edit){
        var index = layui.layer.open({
            title : "添加角色",
            type : 2,
            content : "roleAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                   body.find(".roleName").val(edit.roleName);
                   body.find(".userType").val(edit.abstract);
									 body.find(".status select").val(edit.status);
									 body.find(".roleCode").val(edit.roleCode);
                   body.find(".remarks").val(edit.remarks);

                	//可参考如下
//                    body.find(".newsName").val(edit.newsName);
//                    body.find(".abstract").val(edit.abstract);
//                    body.find(".thumbImg").attr("src",edit.newsImg);
//                    body.find("#news_content").val(edit.content);
//                    body.find(".newsStatus select").val(edit.newsStatus);
//                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
//                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回编码列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addRole_btn").click(function(){
    	addRole();
    })



    //列表操作
    table.on('tool(roleList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
        	addRole(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此此编码？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'permission'){ //配置权限			
									layer.open({
										type: 1,
										title: false //不显示标题栏
										,closeBtn: false
										,area: '300px;'
										,shade: 0.8
										,id: 'LAY_layuipro' //设定一个id，防止重复弹出
										,btn: ['火速围观', '残忍拒绝']
										,btnAlign: 'c'
										,content: $("#menuselect")
									});
        }
    });

})