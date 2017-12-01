/*********************************************************************************/
/**                                                                             **/
/**                         author:   fei                                       **/
/**                         date:     2017-11-30                                **/
/**                         describe：基于Bootstrap的一个分页器组件               **/
/**                         version:  2.0.0                                     **/
/**                                                                             **/
/*********************************************************************************/

1、引入Boostrap相关包

2、引入组件

3、在页面引用组件
        <fei-pager
                ng-if="rmc.pages.length>0"
                pager="rmc.pager"
                page-array="rmc.pages"
                local-page-no="rmc.pager.pageNum"
                update-pager="rmc.updatePager($event)"
                go-page="rmc.search();">
        </fei-pager>

4、指令参数说明
        ng-if:         数据有分页时才显示分页组件
        pager：        分页参数对象，包含页码pageNum、分页大小pageSize以及起始页码startPageNum(只有0或1)三个属性（为啥有这个么奇葩的起始页码startPageNum属性？遇到分页从第0页开始）
        page-array:    分页页码数组（[1,2,3,4,5...]）
        local-page-no: 当前页码
        update-pager:  事件输出：通知下一个查询的分页页码
        go-page:       事件输出：分页查询函数

5、分页页码达到界限时，通过CSS控制首页、上一页、下一页、尾页的是否点击状态

6、本插件为AngularJS 1.6.4版本下开发