/*
	@Author: syp
	@Time: 2018-8
	@Tittle: application
	@Description: 封装一些配置项
*/
layui.define(function(exports){
	var obj ={
		//服务的IP及端口
		SERVE_PORT: "8080",
		SERVE_IP: "127.0.0.1"
	}
    exports('application', obj);
})