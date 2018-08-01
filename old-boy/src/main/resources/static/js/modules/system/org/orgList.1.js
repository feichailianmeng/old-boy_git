layui.use(['element', 'layer', 'form', 'upload', 'treeGrid'], function () {
    var treeGrid = layui.treeGrid,
	    $ = layui.jquery,
	    laydate = layui.laydate,
	    laytpl = layui.laytpl; //很重要
    var treeTable =treeGrid.render({
        elem: '#orgTree'
        ,url:'../../../../static/json/org.json'
        ,cellMinWidth: 100    
        ,id: "orgTreeTable"
        ,treeId:'id'//树形id字段名称
        ,treeUpId:'pId'//树形父id字段名称
        ,treeShowName:'name'//以树形式显示的字段
        ,cols: [[
            {field:'name', edit:'text',title: '机构名称'}
            ,{field:'id', edit:'text',title: 'id'}
            ,{field:'pId', edit:'text',title: '父ID'}
            ,{fixed:'right', title:'操作',align:'center', toolbar:'#optBar'}
        ]]
        ,page:false
    });
    
    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
        	treeTable.reload("orgTreeTable",{
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
});