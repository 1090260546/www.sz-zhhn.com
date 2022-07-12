/*
 * JS补充
 * -- 本文件由肖国梁维护，其他人请勿随意修改 -- *

 * QQ：532226007
 */
var  xglJs={
    is_submiting:false,
    form:null,
    btn:null,
    input_major:null,
    input_company:null,
    input_addr:null,
    input_username:null,
    input_tel:null,
    input_email:null,
    input_code:null,
    input_content:null,
    chk:null,
    showyz:null,
    form_pop_wrap:null,
    form_pop_inner:null,
    form_success_reply:null,
    assign:function(){
        this.form=$('#form_pop_form');
	    if(this.form.length==0){
            return false;
        }
        this.btn=$('#form_pop_button');
        this.input_major=this.form.find('[name=major]');
        this.input_company=this.form.find('[name=company]');
        this.input_addr=this.form.find('[name=addr]');
        this.input_username=this.form.find('[name=username]');
        this.input_tel=this.form.find('[name=tel]');
        this.input_email=this.form.find('[name=email]');
        this.input_code=this.form.find('[name=code]');
        this.input_content=this.form.find('[name=content]');
        this.showyz=$('#showyz');
        this.chk=$('#form_pop_chk');
        this.form_pop_wrap=$('.form_pop_wrap');
        this.form_pop_inner=$('.form_pop_inner');
        this.form_success_reply=$('.form_success_reply');
    },
    verify:function(){
        var input_username_val=$.trim(this.input_username.val());
        var input_tel_val= $.trim(this.input_tel.val());
        var input_email_val= $.trim(this.input_email.val());
        var input_code_val=this.input_code.val();
        this.showyz.click();
        if(this.input_major.filter(':checked').length==0){
            alert('请选择某个行业');
            return false;
        }
        if(input_username_val==''){
            alert('姓名不能为空');
            this.input_username.focus();
            return false;
        }
        if(input_tel_val==''){
            alert('电话不能为空');
            this.input_tel.focus();
            return false;
        }
        if(input_tel_val!='' && !/^0{1,2}[0-9]{2,3}[\s\-]?[0-9]{7,11}$/.test(input_tel_val) && !/^1[3-9][0-9]{9}$/.test(input_tel_val)){
            alert('电话格式不正确');
            this.input_tel.focus();
            return false;
        }
        if(input_email_val!='' && !/^([\w\.\-])+@([\w\-]+\.)+[a-zA-Z]{2,6}$/.test(input_email_val)){
            alert('邮箱格式不正确');
            this.input_email.focus();
            return false;
        }
        if(input_code_val.length!=4 && !/^\w{4}$/.test(input_code_val)){
            alert('验证码输入错误');
            this.input_code.val('');
            this.input_code.focus();
            this.showyz.click();
            return false;
        }
        if(!this.chk.prop('checked')){
            alert('请勾选下方的《隐私保护说明》复选框');
            return false;
        }
        return true;
    },
    submit:function(){
        var _this=this;
        var input_major_val='';
        var input_company_val=$.trim(this.input_company.val());
        var input_addr_val=$.trim(this.input_addr.val());
        var input_username_val=$.trim(this.input_username.val());
        var input_tel_val= $.trim(this.input_tel.val());
        var input_email_val= $.trim(this.input_email.val());
        var input_code_val=this.input_code.val();
        var input_content_val=$.trim(this.input_content.val());
        var data;
        if(this.verify()){
            this.is_submiting=true;
            input_major_val=this.input_major.filter(':checked').val();
            data={
                major:input_major_val,
                company:input_company_val,
                addr:input_addr_val,
                username:input_username_val,
                tel:input_tel_val,
                email:input_email_val,
                code:input_code_val,
                content:input_content_val
            };
            $.ajax({
                url:'/index.php?c=Guestbook&a=add',
                type:'POST',
                data:data,
                dataType:'json',
                success:function(data){
                    if(data.status){
                        _this.input_major.prop('checked',false);
                        _this.input_company.val('');
                        _this.input_addr.val('');
                        _this.input_username.val('');
                        _this.input_tel.val('');
                        _this.input_email.val('');
                        _this.input_code.val('');
                        _this.input_content.val('');
                        _this.showyz.click();
                        _this.form_pop_inner.addClass('form_inner_active');
                        _this.form_success_reply.addClass('form_success_active');
                        _this.is_submiting=false;
                    }else{
                        _this.showyz.click();
                        alert(data.error);
                        _this.is_submiting=false;
                    }
                },
                error:function(){
                    alert('提交失败');
                    _this.showyz.click();
                    _this.is_submiting=false;
                }
            });
        }
        return false;
    },
    init:function(){
	this.assign();
	if(this.form.length==0){
            return false;
        }
        this.btn.on('click',this.submit.bind(this));
    }
};
$(function(){
    xglJs.init();
});
