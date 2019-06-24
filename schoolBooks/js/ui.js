/* 섬네일 미리보기 */
function previewImg(img){
	if(img.files && img.files[0]){
		var reader = new FileReader();
		reader.onload = function(e){
			$('#previewImg img').attr('src', e.target.result);
		}
		reader.readAsDataURL(img.files[0]);
	}
}

/* 팝업 열기 */
function openPopup(id){
	var popup = $('#'+id);
	popup.fadeIn(300);
}

/* 팝업 닫기 */
function closePopup(id){
	var popup = $('#'+id);
	popup.fadeOut(300);
}

/* 웹페이지 등록 */
function webpageWriteFn(){
	$('#webpageAppendBox, #webpageFinish').show();
	$('#webpageWrite').hide();
}

/* 웹페이지 완료 */
function webpageFinishFn(){
	$('#webpageAppendBox, #webpageFinish').hide();
	$('#webpageWrite').show();
}

/* 영상자료 등록 */
function videoWriteFn(){
	$('#videoAppendBox, #videoFinish').show();
	$('#videoWrite').hide();
}

/* 영상자료 완료 */
function videoFinishFn(){
	$('#videoAppendBox, #videoFinish').hide();
	$('#videoWrite').show();
}

/* 대표도서 도서등록 */
function representWriteFn(){
	$('#representBook').show();
}

/* 활동 - 웹페이지,영상자료, 관련서적 +(입력란추가)버튼 클릭 */
function inpRemoveRn(){
	$('.list_append .btn.remove').on('click', function(){
		var itemCount = $(this).parents('.list_append').find('li').length;
		var listType = $(this).parents('.box_append');
		$(this).parents('li').remove();
		if(itemCount == 2){
			listType.find('.btn.remove').hide();
			listType.find('.btn.add').addClass('alone');
		}
	});
}

/* 활동 - 웹페이지,영상자료, 관련서적 +(입력란추가)버튼 클릭 */
function inpAppendFn(listType){
	var inpHTML = '';
	var appendPosition = $('.box_append'+'.'+listType+' .list_append');
	var addBtn = $('.box_append'+'.'+listType+' .btn.add');

	if(listType=='book'){
		inpHTML += '<li>';
		inpHTML += '<input type="text" name="" class="inp_book" placeholder="ISBN 입력" />';
		inpHTML += '<button type="button" class="btn remove">제거</button>';
		inpHTML += '</li>';

	}else if(listType=='video'){
		inpHTML += '<li>';
		inpHTML += '<input type="text" name="" class="inp_video" placeholder="링크제목 입력" />';
		inpHTML += '<button type="button" class="btn remove">제거</button>';
		inpHTML += '</li>';

	}else if(listType=='webpage'){
		inpHTML += '<li>';
		inpHTML += '<input type="text" name="" class="inp_web" placeholder="링크제목 입력" />';
		inpHTML += '<input type="text" name="" class="inp_web" placeholder="URL 입력" />';
		inpHTML += '<button type="button" class="btn remove">제거</button>';
		inpHTML += '</li>';
	}	
	appendPosition.append(inpHTML);
	addBtn.removeClass('alone');
	inpRemoveRn();
}

$(function(){
	/* [quick menu] 퀵메뉴를 위한 설정 */
	bodyHeight = $('body').height();
	deviceHeight = $(window).height();
	headerHeight = $('.header_discuss').height();
	footerHeight = $('.footer_discuss').height();
	quickMenu = $('#quickMenu');
	contentsPosition = $('.main_contents, .sub_contents').offset().top+20;
	if(contentsPosition <  300) contentsPosition = 400;
	quickMenu.css('top', contentsPosition+'px');
	quickMenuPosition = quickMenu.offset().top;

	/* header의 사용자이름 클릭 시 */
	$('#myMenuBtn').on('click',function(){
		$('#myMenu').slideToggle(200);
	});

	/* 보기방식-웹진리스트 */
	$('#listTypeBtn').on('click',function(){
		$(this).addClass('on').siblings('.view_type').removeClass('on');
		$('.list_webzine').removeClass('thumbnail');
	});
	
	/* 보기방식-섬네일리스트 */
	$('#thumbTypeBtn').on('click',function(){
		$(this).addClass('on').siblings('.view_type').removeClass('on');
		$('.list_webzine').addClass('thumbnail');
	});

	/* datepicker */
	$.datepicker.setDefaults({
		dateFormat: 'yy.mm.dd'
	});
	$('.cal_comm').datepicker();
	
	/* 상세페이지-탭내용 */
	$('.tab_comm2 li').on('click',function(){
		var idx = $(this).index();
		$(this).addClass('on').siblings('li').removeClass('on');
		$('.tab_cont').hide();
		$('.tab_cont').eq(idx).fadeIn();
	});

	/* 섬네일 미리보기-이미지찾기 */
	$('#previewFile').change(function(){
		previewImg(this);
	});

	/* 섬네일 미리보기-삭제 */
	$('#previewDel').on('click',function(){
		$('#previewImg img').attr('src', '');
	});
	
	/* 체크박스-전체선택 */
	$('#chkAll').on('change',function(){
		var allCheckBox = $(this).parents('.tbl_comm').find('input:checkbox');
		if($(this).prop('checked')){
			allCheckBox.prop('checked',true);
		}else{
			allCheckBox.prop('checked',false);
		}
	});

	/* 체크박스-전체선택 */
	$('.chk_item').on('change',function(){
		if($('.tbl_comm .chk_item').length==$('.tbl_comm .chk_item:checked').length){
			$('#chkAll').prop('checked',true);
		}else{
			$('#chkAll').prop('checked',false);
		}
	});
	
	/* 활동후기-별점주기 */
	$('#replyStar .star').on('click',function(){
		$(this).addClass('on');
		$(this).prevAll('.star').addClass('on');
		$(this).nextAll('.star').removeClass('on');
	});
	
	/* 활동후기-접기,더보기 */
	$('.btn_fold').on('click',function(){
		if($(this).hasClass('close')){
			$(this).removeClass('close').text('더보기');
			$(this).parents('.info_reply').siblings('.comment').removeClass('open');
		}else{
			$(this).addClass('close').text('접기');
			$(this).parents('.info_reply').siblings('.comment').addClass('open');
		}
	});

	/* 참석인원-접기,더보기 */
	$('#attendMoreBtn').on('click',function(){
		if($(this).hasClass('close')){
			$(this).removeClass('close').text('접기');
			$('#attendPerson').addClass('open');
		}else{
			$(this).addClass('close').text('더보기');
			$('#attendPerson').removeClass('open');
		}
	});

	/* quick menu - 맨위로이동 */
	$('#quickTop').on('click',function(){
		$('html, body').stop().animate({scrollTop: 0}, 300);
	});
	
	/* quick menu - 아래로이동 */
	$('#quickBottom').on('click',function(){
		$('html, body').stop().animate({scrollTop: $('html, body').height()}, 300);
	});

	/* 게시판등록타입 - 기본 or 투표 */
	$('#boardType').on('change',function(){
		if($(this).val() == 'vote'){
			$('#editerWrap').hide();
			$('#voteWrite, #previewBtn').show();
		}else{
			$('#voteWrite, #previewBtn').hide();
			$('#editerWrap').show();
		}
	});
	
	/* 투표결과 - 그래프 */
	$('.result_data').each(function(idx){
		var percentVal = $(this).find('.percent').text();
		var percentPx = parseInt(percentVal) / 100 * 180;
		$(this).find('.bar').width(percentPx);
		if(idx == ($('.result_data').length-1)){
			$(this).addClass('last');
		}
	});

	/* 투표결과 - 투표자목록 */
	$('.btn_voter').on('click',function(){
		$('.voter').stop().fadeOut(200);
		$(this).siblings('.voter').stop().fadeToggle(200);
	});

	/* 참여인원설정 */
	$('.chk_attend').on('click', function(){
		var item =	$(this).parents('.item_attend');
		if($(this).is(':checked')){
			if($('#attendList > *').length < 1){
				$('#attendList').append('<span class="screen_out"></span>');
			}
			item.insertAfter('#attendList > *:last');
		}else{
			if($('#clubList > *').length < 1){
				$('#clubList').append('<span class="screen_out"></span>');
			}
			item.insertAfter('#clubList > *:last');
		}
	});
	
	/* 활동 - 웹페이지,영상자료,관련서적 입력란 1개일경우 */
	$('.list_append').each(function(){
		inpRemoveRn();
		var itemCount = $(this).find('li').length;
		if(itemCount < 2){
			$(this).find('.btn.remove').hide();
			$(this).siblings('.btn.add').addClass('alone');
		}
	});
	
});

/* [quick menu] 스크롤 했을 경우 따라다니기 */
$(window).scroll(function() {
	var position = $(window).scrollTop(); // 현재 스크롤바의 위치값
	var transPosition = position+quickMenuPosition; // 이동할 스크롤바의 위치값
	var footerArea = deviceHeight + position + headerHeight + footerHeight;

	if(bodyHeight > footerArea) {
		$('#quickMenu').stop().animate({'top':transPosition+'px'}, 400);
	}
});