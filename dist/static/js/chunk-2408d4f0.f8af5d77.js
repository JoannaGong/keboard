(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2408d4f0"],{2017:function(e,s,n){"use strict";var t=n("3b76"),o=n.n(t);o.a},"3b76":function(e,s,n){},"4c55":function(e,s,n){},"9ed6":function(e,s,n){"use strict";n.r(s);var t=function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[e._v("Login Form")])]),e._v(" "),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),n("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(s){e.$set(e.loginForm,"username",s)},expression:"loginForm.username"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),n("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.handleLogin(s)}},model:{value:e.loginForm.password,callback:function(s){e.$set(e.loginForm,"password",s)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleLogin(s)}}},[e._v("Login")])],1)],1)},o=[],a=(n("5c96"),n("61f7"),n("5f87")),r=n("c24f"),i={name:"Login",data:function(){return{loginForm:{username:"admin",password:"admin"},loginRules:{username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick(function(){e.$refs.password.focus()})},handleLogin:function(){var e=this;this.loading=!0,Object(r["a"])({username:this.loginForm.username,password:this.loginForm.password}).then(function(s){Object(a["c"])("admin"),e.$router.push({path:"/example"}),e.loading=!1}).catch(function(s){e.loading=!1})}}},l=i,c=(n("2017"),n("df09"),n("2877")),d=Object(c["a"])(l,t,o,!1,null,"20662a5d",null);s["default"]=d.exports},df09:function(e,s,n){"use strict";var t=n("4c55"),o=n.n(t);o.a}}]);