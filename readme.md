这不是modal的具体实现(此处依赖bootstrap-modal)    
是复用modal的写法上的探讨,vue版    
多数模态框可做参照使用,复用极性强,且使用组件/指令的方式并不实用(改变组件or指令在视图中的位置对modal并没有影响)    
此处使用@(Decorator)的方式定义Model    
Decorator需要Class,不喜欢这种风格可以自行改为工厂


## 使用
```javascript
export default {
  methods:{
    async showmodal(){
        try{
            var data = await TypeModal.open({
                data:this.types,
                form:this.data.form
            });
        }catch(e){
            
        }
    }
  }
} 
```

## 定义
```javascript
import Modal from 'Modal'
@Modal(require('dom!./index.html'))
export default class M{
    constructor(params={
        data:{
            list:[]
        }
    }){
      _.extend(this.data,params);
    }
    data={
       
    }
    methods={
        save(){
            this.$close(this.form);
        },
        init(params){
            _.extend(this.data,params.data);
            this.form=params.form;
        }
    }
}
```
```html
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">洗涤物件</h4>
      </div>
      <div class="modal-body">
        <div class="ibox float-e-margins">
          <div class="ibox-content">
              <table class="table table-bordered">
                  <thead>
                  <tr>
                      <th>洗涤物件</th>
                      <th>参考价</th>
                      <th>参考重</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.list">
                        <td>{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.weight}}</td>
                    </tr>
                  </tbody>
              </table>
          </div>
        </div>
      </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="save" >确定</button>
      </div
    </div>
  </div>
</div>
```

## 实现
``` javascript
var count=1;
import Vue from 'vue'
export default function Modal(div){
  return function(target,name,des){
    div = div.childNodes[0];
     div.id="modal_"+count++;
     $('body').append(div);
 
     var promise_obj={};
     //本次模态框以来数据
     var modalObj={
          //每次进入后,重新定义,close依赖
          resolve:undefined,
          reject:undefined,
          //vue 实例
          vobj:undefined,
          //bs 模态框,
          dialog:undefined,
          deferred:undefined
     }

     return {
      async open(params){
          var _dialog=modalObj.dialog
          // bootstrap依赖jq,也可以直接使用Promise
          var _deferred=$.Deferred() ;
          modalObj.deferred=_deferred;
            if(_dialog){
              _dialog.one('show.bs.modal', function () {
                //二次初始化,如进入后,清空数据
                modalObj.vobj.init&&modalObj.vobj.init(params);
              })
              _dialog.modal('show');
            }else{
              var vm = new target(params);
              vm.el=div;
              modalObj.vobj = createVue(vm,modalObj);
              modalObj.dialog=$("#"+div.id).modal();
            }
          return _deferred;
      }
     };
  }
}


function createVue(vm,modalObj){
      //注入close事件
      vm.mixins=vm.mixins||[];

      vm.mixins.push({
        methods:{
        //resolve([]),代表全部删除
        //reject(),代表取消
        //在联动时,有区别
        //可以使用cancle调用reject
          $close(data){
              modalObj.dialog.modal('hide');
              if(data){
                modalObj.deferred.resolve(data);
              }else{
                modalObj.deferred.reject([]);
              } 
          }
        }
      })

      return  new Vue(vm);
}
```