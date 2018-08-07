/**
 * @autor syp
 * @content 字典增加页面js
 * @returns
 * @Time 2018-08-02
 */
layui.config({
	base : "../../../../static/js/"
}).extend({
	"validparam"  : "validparam"
}) 
layui.use(['form','layer','application','validparam'],function(){
    var form = layui.form,
    	application = layui.application,
    	validparam = layui.validparam,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    
    form.verify(validparam);
    form.on("submit(addDict)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
		$.ajax({
			url: application.SERVE_URL+"/sys/sysdict/save", //ajax请求地址
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
				if(data == "success"){
				 	top.layer.close(index);
		            top.layer.msg("编码添加成功！");
		            layer.closeAll("iframe");
		            //刷新父页面
		            parent.location.reload();	
				}else{
					//console.data();
					top.layer.msg("编码添加失败！");
				}
			}
		}); 
        return false;
    })
})