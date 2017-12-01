/**
 * Name:   AngularJS 分页组件
 * Date:   2017/11/30
 * Author: fei
 * Version:2.0.0
 */
var feiPager = {
    restrict: 'E',
    bindings: {
        pager: "<",        // 分页参数，包含当前页码pageNum，分页大小pageSize，起始页码startPageNum
        pageArray: "<",    // 分页页码数组[1,2,3,4,5...]
        localPageNo: "<",  // 当前分页页码
        updatePager: "&",  // 分页页码同步事件（事件输出：将下一个要查询的页码返回）
        goPage: "&"        // 分页查询事件（事件输出：调用实际分页查询函数）
    },
    templateUrl: "pagerComponent/pager.html",     // 分页组件模版Url（这个值，根据实际项目作调整）
    controller: function () {
        var fp = this;
        fp.$onInit = function () {                                 // $onInit生命周期勾子
            fp.pageSpan = 4;                                       // 分页差值
            fp.pageMin = fp.pager.startPageNum;                    // 可以显示的分页页码最小值
            fp.pageMax = fp.pager.startPageNum + fp.pageSpan;      // 可以显示的分页页码最大值
        };
        fp.turnPage = function (mark, num) {
            if ("first"===mark) {// 首页
                fp.pageMin = fp.pager.startPageNum;
                fp.pageMax = fp.pager.startPageNum + fp.pageSpan;
                fp.localPageNo = fp.pager.startPageNum;
            } else if ("pre"===mark) {// 上一页
                if (num === fp.pageMin) {
                    if (fp.pageMin>fp.pageArray[0]) {
                        fp.pageMin -= 1;
                        fp.pageMax -= 1;
                    }
                }
                if (fp.pager.startPageNum!=num) {
                    fp.localPageNo = num - 1;
                }
            } else if ("local"===mark) {// 选择具体页码
                if (num === fp.pageMin) {
                    if (fp.pageMin>fp.pageArray[0]) {
                        fp.pageMin -= 1;
                        fp.pageMax -= 1;
                    }
                }
                if (num === fp.pageMax) {
                    if (fp.pageMax<fp.pageArray[fp.pageArray.length-1]) {
                        fp.pageMin += 1;
                        fp.pageMax += 1;
                    }
                }
                fp.localPageNo = num;
            } else if ("next"===mark) {// 下一页
                if (num === fp.pageMax) {
                    if (fp.pageMax<fp.pageArray[fp.pageArray.length-1]) {
                        fp.pageMin += 1;
                        fp.pageMax += 1;
                    }
                }
                if (fp.pager.startPageNum<=num<fp.pageArray[fp.pageArray.length-1]) {
                    fp.localPageNo = num + 1;
                }
            } else if ("last"===mark) {// 尾页
                fp.pageMin = fp.pageArray[fp.pageArray.length-1] -fp.pageSpan;
                fp.pageMax = fp.pageArray[fp.pageArray.length-1];
                fp.localPageNo = fp.pageArray[fp.pageArray.length-1];
            }
            fp.updatePager({//调用fp.updatePager函数更新分页页码
                $event: {
                    pager: {
                        startPageNum: fp.pager.startPageNum,
                        pageNum:      fp.localPageNo,
                        pageSize:     fp.pager.pageSize
                    }
                }
            });
            fp.goPage();//调用fp.goPage作分页查询
        };
    }
};
app.component("feiPager", feiPager);

