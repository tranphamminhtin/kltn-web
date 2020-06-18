
$(function(){
	$.validator.setDefaults({
		errorClass:'help-block',
		highlight: function(element){
			$(element)
				.closest('.form-group')
				.addClass('has-error');
		},
		unhighlight: function(element){
			$(element)
				.closest('.form-group')
				.removeClass('has-error');
		}
		
	});
	$("#register-form").validate({
		rules:{
			name:{
				required: true,
			},
			email:{
				required:true,
				email: true
			},
			numberPhone:{
				required:true,
				minlength:10
			},
			address:{
				required:true,
			},
			username:{
				required:true,
				nowhitespace: true
			},
			password: {
				required:true,
				minlength: 6,
				maxlength: 45,
			},
			password2:{
				required: true,
				equalTo:"#password1"
			}
		},	
		messages:{
			name:{
				required: 'Hãy nhập họ và tên của bạn.',
			},
			email:{
				required: 'Hãy nhập địa chỉ email.',
				email:'Vui lòng nhập đúng email.'
			},
			numberPhone:{
				required: 'Hãy nhập số điện thoại.',
				minlength: 'Số điện thoại của bạn ngắn quá.'
			},
			address:{
				required:'Hãy nhập địa chỉ nhà bạn.'
			},
			username:{
				required: 'Hãy nhập tên đăng nhập.',
				nowhitespace:'Vui lòng nhập tên đăng nhập không có dấu cách.'
			},
			password:{
				required: 'Hãy nhập mật khẩu của bạn.',
				minlength:'Mật khẩu ít nhất 6 ký tự',
				maxlength: 'Mật khẩu quá dài',
			},
			password2:{
				required: 'Vui lòng xác nhận lại mật khẩu.',
				equalTo: 'Xác nhận không đúng mật khẩu.'
			}
		}
	});
	$("#forgot-fomr").validate({
		rules:{
			email:{
				required:true,
				email: true
			},
			username:{
				required:true,
				nowhitespace: true
			}
		},	
		messages:{
			email:{
				required: 'Hãy nhập địa chỉ email.',
				email: 'Vui lòng nhập đúng email.'
			},
			username:{
				required: 'Hãy nhập tên đăng nhập.',
				nowhitespace: 'Vui lòng nhập tên đăng nhập không có dấu cách.'
			}
		}
	});
	$("#LienHe-form").validate({
		rules:{
			name:{
				required: true,

			},
			email:{
				required:true,
				email: true
			},
			subject:{
				required:true,
			},
			comment:{
				required:true,
			}
		},
		messages:{
			name:{
				required: 'Hãy nhập họ và tên của bạn.',

			},
			email:{
				required: 'Hãy nhập địa chỉ email.',
				email:'Vui lòng nhập đúng email.'
			},
			subject:{
				required:'Nhập tên tiêu đề',

			},
			comment:{
				required:'Nhập vào nôi dung cần hổ trợ.',
				
			}
		}
			
	});
	
	$("#login-admin").validate({
		rules:{
			username:{
				required: true,
				nowhitespace: true
			},
			password:{
				required:true,
				minlength: 6
			},
		},
		messages:{
			username:{
				required: 'Vui lòng nhập Username.',
				nowhitespace: 'Tên đăng nhập sai.'
			},
			password:{
				required: 'Vui lòng nhập password.',
				minlength: 'Mật khẩu ít nhất 6 kí tự'
			},
		}		
	});
	$("#login-form").validate({
		rules:{
			username:{
				required: true,
				nowhitespace: true
			},
			password:{
				required:true
			},
		},
		messages:{
			username:{
				required: 'Vui lòng nhập tên đăng nhập.',
				nowhitespace: 'Tên đăng nhập sai.'
			},
			password:{
				required: 'Vui lòng nhập mật khẩu.'
			},
		}		
	});
	$("#ttcn-fomr").validate({
		rules:{
			name:{
				required: true,
			},
			email:{
				required:true,
				email: true
			},
			numberPhone:{
				required:true,
				minlength: 10
			},
			address:{
				required:true,
			},
		},
		messages:{
			name:{
				required: 'Vui lòng điền họ tên',
			},
			email:{
				required: 'Vui lòng điền email',
				email: 'Vui lòng nhập đúng địa chỉ email'
			},
			numberPhone:{
				required: 'Vui lòng điền số điện thoại',
				minlength: 'Số điện thoại gồm 10 kí tự'
			},
			address:{
				required: 'Vui lòng điền địa chỉ',
			},
		}		
	});
	$("#infomation-order-form").validate({
		rules:{
			name:{
				required: true,
			},
			numberPhone:{
				required:true,
				minlength: 10
			},
			address:{
				required:true,
			},
		},
		messages:{
			name:{
				required: 'Vui lòng điền họ tên',
			},
			numberPhone:{
				required: 'Vui lòng điền số điện thoại',
				minlength: 'Số điện thoại bao gồm 10 kí tự'
			},
			address:{
				required: 'Vui lòng điền địa chỉ',
			},
		}		
	});
	$("#change-pass-form").validate({
		rules:{
			oldpassword: {
				required:true,
				minlength: 6,
			},
			password1: {
				required:true,
				minlength: 6,
				maxlength: 45,
			},
			password2:{
				required: true,
				equalTo:"#password1",
			},
		},	
		messages:{
			oldpassword: {
				required: 'Hãy điền mật khẩu cũ',
				minlength: 'Mật khẩu quá ngắn',
			},
			password1:{
				required: 'Hãy nhập mật khẩu của bạn.',
				minlength:'Mật khẩu ít nhất 6 ký tự',
				maxlength: 'Mật khẩu quá dài'
			},
			password2:{
				required: 'Vui lòng xác nhận lại mật khẩu.',
				equalTo: 'Xác nhận không đúng mật khẩu.',
			}
		}
	});
	$("#nhom-quyen-form").validate({
		rules:{
			description: {
				required:true,
			},
		},	
		messages:{
			description: {
				required:'Hãy nhập mô tả',
			},
		}
	});
	$("#fix-nv-form").validate({
		rules:{
			manv:{},
			password: {
				minlength: 6
			},
			name:{
				required:true,
			},
			Phone:{
				minlength: 10
			},
			email:{
				required:true,
				email:true
			},
		},	
		messages:{
			manv:{},
			password: {
				minlength: 'Mật khẩu phải từ 6 kí tự trở lên.'
			},
			name:{
				required: 'Hãy điền họ tên.',
			},
			numberPhone:{
				minlength: 'Số điện thoại gồm 10 số.'
			},
			email:{
				required: 'Hãy điền email.',
				email: 'Hãy nhập đúng email.'
			},
		}
	});
	$("#add-nv-form").validate({
		rules:{
			name:{
				required: true,
			},
			email:{
				required:true,
				email: true
			},
			numberPhone:{
				required:true,
				minlength: 10
			},
			username:{
				required:true,
				nowhitespace: true
			},
			password1: {
				required:true,
			},
			password2:{
				required: true,
				equalTo:"#password1"
			}
		},	
		messages:{
			name:{
				required: 'Hãy nhập họ và tên của bạn.',
			},
			email:{
				required: 'Hãy nhập địa chỉ email.',
				email:'Vui lòng nhập đúng email.'
			},
			numberPhone:{
				required: 'Hãy nhập số điện thoại.',
				minlength: 'Số điện thoại 10 kí tự'
			},
			username:{
				required: 'Hãy nhập tên đăng nhập.',
				nowhitespace:'Vui lòng nhập tên đăng nhập không có dấu cách.'
			},
			password1:{
				required: 'Hãy nhập mật khẩu của bạn.',
			},
			password2:{
				required: 'Vui lòng xác nhận lại mật khẩu.',
				equalTo: 'Xác nhận không đúng mật khẩu.'
			}
		}
	});
	$("#suatk-form").validate({
		rules:{
			username:{},
			quyen:{},
			name:{
				required:true,
			},
			numberPhone:{
				required:true,
			},
			email:{
				required:true,
				email:true
			},
		},	
		messages:{
			username:{},
			quyen:{},
			name:{
				required: 'Hãy điền họ tên.',
			},
			numberPhone:{
				required: 'Hãy điền số điện thoại của bạn',
			},
			email:{
				required: 'Hãy điền email.',
				email: 'Hãy nhập đúng email.'
			},
		}
	});
	$("#doimk-form").validate({
		rules:{
			oldpassword: {
				required:true,
			},
			password1: {
				required:true,
				minlength: 6
			},
			password2:{
				required: true,
				equalTo:"#password1",
			},
		},	
		messages:{
			oldpassword: {
				required: 'Hãy điền mật khẩu cũ',
			},
			password1:{
				required: 'Hãy nhập mật khẩu của bạn.',
				minlength: 'Mật khẩu phải từ 6 kí tự trở lên.'
			},
			password2:{
				required: 'Vui lòng xác nhận lại mật khẩu.',
				equalTo: 'Xác nhận không đúng mật khẩu.',
			}
		}
	});
	$("#Them_SanPham").validate({
		rules:{
			_id:{
				required:true,
			},
			name:{
				required:true,
			},
			promotion:{
				required:true,
			},
			price:{
				required:true,
			},
			image:{
				required: true
			},
			image2:{
				required: true
			},
			image3:{
				required: true
			},
			image4:{
				required: true
			},
			
		},
		message:{
			_id:{
				required:'Nhập mã sản phẩm .',
			},
			name:{
				required:'Nhập tên sản phẩm',
			},
			promotion:{
				required:'Nhập giá khuyến mãi',
			},
			price:{
				required:'Nhập giá bán .',
			},
			image:{
				required: 'Chọn hình'
			},
			image2:{
				required: 'Chọn hình'
			},
			image3:{
				required: 'Chọn hình'
			},
			image4:{
				required: 'Chọn hình'
			},
		}
	})
	$("#ss").validate({
		rules:{
			TieuDe: {
				required:true,
			},
			NoiDung: {
				required:true,
			},
			HinhAnh:{
			},
		},	
		messages:{
			TieuDe: {
				required: 'Hãy nhập tiêu đề tin tức.',
			},
			NoiDung:{
				required: 'Hãy nhập nội dung tin tức.',
			},
			HinhAnh:{
			}
		}
	});
});

