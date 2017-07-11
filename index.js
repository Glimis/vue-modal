module.exports = function(content) {
  console.log(content)

  return content
}
// var count=1;
// import Vue from 'vue'
// export default function Modal(div){
//   return function(target,name,des){
//     div = div.childNodes[0];
//      div.id="modal_"+count++;
//      $('body').append(div);
 
//      var promise_obj={};
//      //本次模态框以来数据
//      var modalObj={
//           //每次进入后,重新定义,close依赖
//           resolve:undefined,
//           reject:undefined,
//           //vue 实例
//           vobj:undefined,
//           //bs 模态框,
//           dialog:undefined,
//           deferred:undefined
//      }

//      return {
//       async open(params){
//           var _dialog=modalObj.dialog
//           // bootstrap依赖jq,也可以直接使用Promise
//           var _deferred=$.Deferred() ;
//           modalObj.deferred=_deferred;
//             if(_dialog){
//               _dialog.one('show.bs.modal', function () {
//                 //二次初始化,如进入后,清空数据
//                 modalObj.vobj.init&&modalObj.vobj.init(params);
//               })
//               _dialog.modal('show');
//             }else{
//               var vm = new target(params);
//               vm.el=div;
//               modalObj.vobj = createVue(vm,modalObj);
//               modalObj.dialog=$("#"+div.id).modal();
//             }
//           return _deferred;
//       }
//      };
//   }
// }


// function createVue(vm,modalObj){
//       //注入close事件
//       vm.mixins=vm.mixins||[];

//       vm.mixins.push({
//         methods:{
//         //resolve([]),代表全部删除
//         //reject(),代表取消
//         //在联动时,有区别
//         //可以使用cancle调用reject
//           $close(data){
//               modalObj.dialog.modal('hide');
//               if(data){
//                 modalObj.deferred.resolve(data);
//               }else{
//                 modalObj.deferred.reject([]);
//               } 
//           }
//         }
//       })

//       return  new Vue(vm);
// }