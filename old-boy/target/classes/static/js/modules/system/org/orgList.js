layui.use(['element', 'layer', 'form', 'tree','table','laydate'], function () {
	  var layer = layui.layer
	  ,$ = layui.jquery,
		form = layui.form,
	  laydate = layui.laydate,
	  laytpl = layui.laytpl,
	  table = layui.table;
	  //节点标记
	  var flag = '';
	  var mycars;
	  function initOrgTree(){
		  $.ajax({
			   url: "../../../../static/json/orgTree.json",
			   success: function(res){
				mycars = res;				
				layui.tree({
					elem: '#orgTree' //指定元素
					,target: '_blank'
					,spread: true
					,click: function(item){ //点击节点回调
						// layer.msg('当前节名称：'+ item.name + '<br>全部参数：'+ JSON.stringify(item.children));
						//机构列表
						flag = item.id;
						var tableIns = table.render({
							elem: '#orgList',
							data : item.children,
							cellMinWidth : 95,
							page : true,
							height : "full-125",
							limit : 20,
							limits : [10,15,20,25],
							id : "orgListTable",
							cols : [[
								{field: 'id', title: 'ID', align:"center"},
								{field: 'parentId', title: '父级ID'},
								{field: 'name', title: '机构名称'},
								{title: '操作', width:170, templet:'#orgListBar',fixed:"right",align:"center"}
							]]
						});	
					}
					,nodes: mycars
				});
			   },
			   error: function() { 
					alert("数据异常,请检查是否json格式"); 
				} 
			});		  
	  }
	  initOrgTree();

    //添加编码
    function addOrg(edit){
        var index = layui.layer.open({
            title : "添加机构",
            type : 2,
            content : "orgAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                	body.find(".parentId").val(edit.parentId);
                	body.find(".name").val(edit.name);
                	
                	//可参考如下
//                    body.find(".newsName").val(edit.newsName);
//                    body.find(".abstract").val(edit.abstract);
//                    body.find(".thumbImg").attr("src",edit.newsImg);
//                    body.find("#news_content").val(edit.content);
//                    body.find(".newsStatus select").val(edit.newsStatus);
//                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
//                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }else{
									if(flag !=''){
										body.find(".parentId").val(flag);
									}else{
										layer.msg("请选中一个节点后增加机构");
									}
								}
                setTimeout(function(){
                    layui.layer.tips('点击此处返回机构列表', '.layui-layer-setwin .layui-layer-close', {
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
    $(".addOrg_btn").click(function(){
			if(flag !=''){
				addOrg();
			}else{
				layer.msg("请选中一个节点后增加机构");
			}
    })	  
	  
    //列表操作
    table.on('tool(orgList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
        	addOrg(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此此机构？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行编码内容页面访问")
        }
    });	
});