layui.use(['table','form','element','layer','jquery'],function(){
		var layer = layui.layer,
				laydate = layui.laydate,
				table = layui.table;
			//节点标记
			var treeObj;
			var tableIns;
			//ztree设置
			var setting = {
				view: {
					selectedMulti: false
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: onClick
					
				}
			};
			initTree();
			function initTree() {
				$.ajax({
					url: "../../../../static/json/orgTree_sim.json", //ajax请求地址
					success: function (data) {
						treeObj = $.fn.zTree.init($("#orgTree"), setting, covert(data)); //加载数据
						//初始化
						var node = treeObj.getNodeByParam('id', 111);//获取id为1的点
						treeObj.selectNode(node);//选择点
						treeObj.setting.callback.onClick(null, treeObj.setting.treeId, node);//调用事件	
					}
				});
			
				// $.fn.zTree.init($("#treeDemo"), setting);
			}
                 

			//根据Id 加载右侧用户数据
			/**
			 * treeNode 为选中的节点
			 */
			function onClick(event, treeId, treeNode, clickFlag) {
				// console.log(treeNode.id);
				//生产坏境下请求后台
			
				$.ajax({
					url: "../../../../static/json/user.json", //ajax请求地址
					success: function (data) {
						//加载数据
						var tabData =[];

						for(var i =0;i<data.length;i++){
							
							if(data[i].orgId == treeNode.id){
									tabData.push(data[i]);
							}
						}
						tableIns = table.render({
							elem: '#userList',
							//生产坏境下请求后台
							data : tabData,
							cellMinWidth : 95,
							page : true,
							height : "full-125",
							id : "userListTable",
							cols : [[
								{field: 'id', title: 'ID', align:"center"},
								{field: 'orgId', title: '所属机构ID'},
								{field: 'name', title: '机构名称'},
								{title: '操作', width:170, templet:'#userListBar',fixed:"right",align:"center"}
							]]
						});	
					}
				});

			}		
			
			function covert(data) {
				var nodes = [];
				for (var i = 0; i < data.length; i++) {
					if(data[i].open == true){
						nodes.push({
							id: data[i].id,
							pId: data[i].parentId,
							name: data[i].name,
							open: data[i].open
						});
					}else{
						nodes.push({
							id: data[i].id,
							pId: data[i].parentId,
							name: data[i].name
						});
					}

				}
				return nodes;
			}
			
    //列表操作
    table.on('tool(userList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
        	addOrg(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
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

})