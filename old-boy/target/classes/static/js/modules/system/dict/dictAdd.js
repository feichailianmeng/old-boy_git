/**
 * @autor syp
 * @content 字典增加页面js
 * @returns
 * @Time 2018-08-02
 */
layui.use(['form','layer'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    form.on("submit(addDict)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
		$.ajax({
			url: "http://127.0.0.1:8080/sys/sysdict/save", //ajax请求地址
			type: "GET",
			data:{
				id :data.field,
				typeCode : $(".typeCode").val(),
				value : $(".value").val(),
				label : $(".label").val(),
				sort : $(".sort").val(),
				remark : $(".remark").val(),
			},
			
			success: function (data) {
				console.log(data)
				if(data == "success"){
				 	top.layer.close(index);
		            top.layer.msg("编码添加成功！");
		            layer.closeAll("iframe");
		            //刷新父页面
		            parent.location.reload();	
				}
			}
		}); 
        return false;
    })
})