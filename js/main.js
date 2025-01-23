
// -------------------------------
//テキストのカウントアップ+バーの設定を一回だけ表示

jQuery(function () {

  var webStorage = function () {

    if (sessionStorage.getItem('access')) {

      //2回目以降アクセス時の処理をここに書く
      $('#splash').hide();

    } else {
      
      sessionStorage.setItem('access', 0);

      //初回アクセス時の処理をここに書く
      countber();

    }
  }

  webStorage();

});
//テキストのカウントアップ+バーの設定を一回だけ表示
// -------------------------------

// -------------------------------
//テキストのカウントアップ+バーの設定
function countber(){


var bar = new ProgressBar.Line(splash_text, {//id名を指定

  easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能

  duration: 2500,//時間指定(1000＝1秒)

  strokeWidth: 0.2,//進捗ゲージの太さ
  color: '#555',//進捗ゲージのカラー
  trailWidth: 0.2,//ゲージベースの線の太さ
  trailColor: '#bbb',//ゲージベースの線のカラー

  text: {//テキストの形状を直接指定				
    style: {//天地中央に配置
      position: 'absolute',
      left: '50%',
      top: '50%',
      padding: '0',
      margin: '-30px 0 0 0',//バーより上に配置
      transform:'translate(-50%,-50%)',
      'font-size':'1rem',
      color: '#fff',
    },

    autoStyleContainer: false //自動付与のスタイルを切る

  },

  step: function(state, bar) {

    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値

  }

});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
  $("#splash_text").fadeOut(10);//フェイドアウトでローディングテキストを削除
  $(".loader_cover-up").addClass("coveranime");//カバーが上に上がるクラス追加
  $(".loader_cover-down").addClass("coveranime");//カバーが下に下がるクラス追加
  $("#splash").fadeOut();//#splashエリアをフェードアウト
});

}

//テキストのカウントアップ+バーの設定
// -------------------------------



// -------------------------------
//ドロップダウンの設定を関数でまとめる
  
  function mediaQueriesWin(){

    var width = $(window).width();

    if(width <= 768) {//横幅が768px以下の場合 $(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ

      $(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら

        var parentElem =  $(this).parent();// aタグから見た親要素のliを取得し
        $(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
        $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
        return false;//リンクの無効化

      });

    }else{//横幅が768px以上の場合

      $(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
      $(".has-child").removeClass('active');//activeクラスを削除
      $('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする

    }
    
  }


  // ページがリサイズされたら動かしたい場合の記述
  $(window).resize(function() {
    mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load',function(){
    mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  });

//ドロップダウンの設定を関数でまとめる
// -------------------------------

// -------------------------------
// スライド開く・閉じる

if(window.matchMedia("(max-width: 768px)").matches){
	// ウィンドウサイズが 768px以下の場合のコードをここに

    // スライド開く
    $(function(){
        $('.headC').click(function() {
            $('.headB').slideToggle();

        });
    });

    // スライド閉じる
    $(function(){
        $('.headB').click(function() {
            $('.headB').hide();
        });
    });

}else{ 
	// ウィンドウサイズが 768px以上の場合のコードをここに
}

// スライド開く・閉じる
// -------------------------------

// -------------------------------
// 要素が画面に入ると要素をフェードインで表示
$(function () {

    $(window).scroll(function(){

      var windowHeight = $(window).height(),
      scrollY = $(window).scrollTop();

      $('.scroll_fadein').each(function(){
        var thisPosition = $(this).offset().top;

        if(scrollY > thisPosition - windowHeight){

          $(this).addClass('fadein_animation_start');

        }

      });
    });
  });

// 要素が画面に入ると要素をフェードインで表示
// -------------------------------

// -------------------------------
//左からふわっと順番に表示
function fluffyAnime() {
	var time = 0.5; //表示時間
	var value = time;
	$('.fluffy').each(function () {
		var parent = this; //親要素を取得
		var elemPos = $(this).offset().top; //要素の位置まで来たら
		var scroll = $(window).scrollTop(); //スクロール値取得
		var windowHeight = $(window).height(); //画面の高さ取得
		var childs = $(this).children(); //子要素を取得
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) { //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				if (!$(this).hasClass("fadeup")) { //アニメーションのクラス名が指定されているかどうかをチェック
					$(parent).addClass("play"); //親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s"); //アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeup"); //アニメーションのクラス名を追加
					value = value + time; //delay時間を増加させる
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("fadeup"); //アニメーションのクラス名を削除
			value = time; //delay初期値の数値に戻す
		}
	})
}
$(window).scroll(function (){
  fluffyAnime(); /* アニメーション用関数を呼ぶ*/
});
$(window).on('load', function(){
  fluffyAnime(); /* アニメーション用関数を呼ぶ*/
});
//左からふわっと順番に表示
// -------------------------------

// -------------------------------
// トップのお知らせ部分に別ページの新着情報だけを表示
// デベロッパーだと表示されないので実際にUPして検証すること！
$(function() {

	$.ajax({
    url: 'https://momoko0402.web.fc2.com/news.html', //読み込むファイルを指定 
    dataType : 'html'
	})
  
	.then(
    
    // 1つめは通信成功時のコールバック※ローカルではエラーになるので注意
    function(html) { 
      
			$(html).find('#news-area').each(function(){ //外部HTMLの読み込みたい部分を指定

				 $('#top-info').html($(this).html()); //読み込んだ外部HTMLを表示するエリアを指定
				 return false;

			});
      $('#top-info th:gt(2),#top-info td:gt(2)').remove(); //2件目以降の dt,dd を削除
    // },

    // 2つめは通信失敗時のコールバック
    // function() {

      // alert("読み込み失敗");

    // }

  });

});

// トップのお知らせ部分に別ページの新着情報だけを表示
// -------------------------------

// -------------------------------
// お問い合わせフォーム
function postToGoogle() {

  //フォームの隊を取得
  var field1 = $('[name="entry.1564263618"]').val();
  var field2 = $('[name="entry.292870337"]').val();
  var field3 = $('[name="entry.1735355409"]').val();
  var field4 = $('[name="entry.1370003883"]').val();

  
  //urlやentryは書き換えてね。
            $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYEsQyqY1EzHRB7w8vg46BP_26vIJuk0lQjoJ_G1KD4qYslw/formResponse",
            data: {"entry.1564263618": field1,
  "entry.292870337": field2,
  "entry.1735355409": field3,
  "entry.1370003883": field4,
  },
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {
                    //Success message
  location.href="success.html";
                },
                200: function() {
                    //Success Message
  location.href="success.html";
                }
            }
        });
        }

//必須項目が空かどうかフラグ


  $(function() {
    //始めにjQueryで送信ボタンを無効化する
    $('.send').prop("disabled", true);
    
    //始めにjQueryで必須欄を加工する
    $('form input:required').each(function () {

        $(this).prev("label").addClass("required");

    });
    
    //入力欄の操作時
    $('form input:required').change(function () {

        //必須項目が空かどうかフラグ
        let flag = true;

        //必須項目をひとつずつチェック
        $('form input:required').each(function(e) {

            //もし必須項目が空なら
            if ($('form input:required').eq(e).val() === "") {
                flag = false;
            }

        });
        //全て埋まっていたら
        if (flag) {
            //送信ボタンを復活
            $('.send').prop("disabled", false);
        }

        else {
            //送信ボタンを閉じる
            $('.send').prop("disabled", true);

        }

    });

});
// お問い合わせフォーム
// -------------------------------

// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor'); 

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');   
    });
}
 
