/*// JavaScript Document

({"list":[{"text":"贷款管理1",
		"childSecond":[
		{"text":"资金管理1"},
        {"text":"资金管理2",
    	"childThird":
        [{"text":"发标待审21","hrefVla":"'/admin/borrow/showTrialBorrow.html"},{"text":"发标待审22","hrefVla":"'/admin/borrow/showAllBorrow.html"},{"text":"发标待审23","hrefVla":"'/admin/borrow/showAllBorrow.html"}]}]},
		
        {"text":"贷款管理2",
		"childSecond":[
		{"text":"资金管理3",
    	"childThird":
        [{"text":"发标待审31","hrefVla":"'/admin/borrow/showTrialBorrow.html"},{"text":"发标待审32","hrefVla":"'/admin/borrow/showAllBorrow.html"},{"text":"发标待审33","hrefVla":"'/admin/borrow/showAllBorrow.html"}]},
        {"text":"资金管理4",
    	"childThird":
        [{"text":"发标待审41","hrefVla":"'/admin/borrow/showTrialBorrow.html"},{"text":"发标待审42","hrefVla":"'/admin/borrow/showAllBorrow.html"},{"text":"发标待审43","hrefVla":"'/admin/borrow/showAllBorrow.html"}]}]},
		
        {"text":"贷款管理3",
		"childSecond":[
		{"text":"资金管理5", 
    	"childThird":
        [{"text":"发标待审51","hrefVla":"'/admin/borrow/showTrialBorrow.html"},{"text":"发标待审52","hrefVla":"'/admin/borrow/showAllBorrow.html"},{"text":"发标待审53","hrefVla":"'/admin/borrow/showAllBorrow.html"}]},
        {"text":"资金管理6",
    	"childThird":
        [{"text":"发标待审61","hrefVla":"'/admin/borrow/showTrialBorrow.html"},{"text":"发标待审62","hrefVla":"'/admin/borrow/showAllBorrow.html"},{"text":"发标待审63","hrefVla":"'/admin/borrow/showAllBorrow.html"}]}]}
	]
})*/

[{
    "id":1,
    "text":"Folder1",
    "iconCls":"icon-save",
    "children":[{
        "text":"File1",
        "checked":true
    },{
        "text":"Books",
        "state":"open",
        "attributes":{
            "url":"/demo/book/abc",
            "price":100
        },
        "children":[{
            "text":"PhotoShop",
            "checked":true
        },{
            "id": 8,
            "text":"Sub Bookds",
            "state":"closed"
        }]
    }]
},{
    "text":"Languages",
    "state":"closed",
    "children":[{
        "text":"Java"
    },{
        "text":"C#"
    }]
}]