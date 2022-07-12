
var IqwXiongJs = {
    Width: $(window).width(),
    Height: $(window).height(),
    //锚点距离
    maoNumber: 150,
    //数字滚动判断
    NumberIf: true,
    FootNumberIf: true,
    Number: [],
    //有锚点才吸顶
    maoTop: false,
    bannerAnimation: 'AddFadeInUp',
    //滚动条
    MyScroll: null,
    //增加----------------------------------
    WapNavIF: true,
    indexPageTab: null,
    indexBanner: null,
    indexWapBanner: null,
    InitBanner: false,
    //加载（定时器）
    SvgTimeOver: null,
    SvgTime: 0,
    ImagesLoad: false,
    //加载（圆圈）
    StrokeC: 0,
    //bannerCanvas
    CanvasDrap: null,
    CanvasStop: null,
    CanvasNewsDrap: null,
    //BannerText
    BannerNumber: 0,
    interleaveOffset: 0.5,
    BannerIF: false,
    BannerClick: false,
    //loading
    LoadingIf: false,
    IndexSwiperIf: false,
    IndexSwiperClick: 0,
    //index page1
    BannerTime: null,
    CanvasTime: null,
    IconTime: null,
    //index page3
    AnimateTime: [],
    //index page4
    TabTime: null,
    //index page5
    PartnerTab: null,
    //index page6
    ParallaxIf: false,
    AddressTab: null,
    PjaxIf: false,
    PjaxTime: 0,
    PjaxTimeOver: null,
    contentTime: 0,
    contentTimeOver: null,
    allImages: [],
    ImgArray: [],
    //算法平台
    CorPlatTab: null,
    //社会责任
    SocialTab: null,
    //发展历程
    DevelopmentTab: null,
    DevelopPaginationTab: null,
    //应用场景
    ScenarioTab: null,
    //企业文化
    CultureTab: null,
    intelTab: null,
    //员工福利
    WelfareTab: null,
    FamilyTab: null,
    AdvantageTab: null,
    CertifyTab: null,
    //移动端
    WapCoreTab: null,
    WapPlatformTab: null,
    WapPlatIconTab: null,
    WapScenarioTab: null,
    WapFaqBackTab: null,
    WapFaqContentTab: null,
    AtmosphereContentTab: null,
    indexNumber: function () {
        var that = this;
        if (that.NumberIf) {
            var numberL = $('.index_number');
            for (var i = 0; i < numberL.length; i++) {
                numberL.eq(i).html(that.Number[i]);
            }
            console.log(that.Number);
            $('.index_number').each(function () {
                $(this).prop('counter', 0).animate({
                    counter: $(this).text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function (now) {
                        now = Math.ceil(now);
                        now = now.toString();
                        now = now.replace(/\B(?=(\d{3})+(?!\d))/g, '');
                        $(this).text(now);
                    }
                });
            });
            that.NumberIf = false;
        }
    },
    //InedxPage
    indexSwiper: function () {
        var that = this;
        var TouchMove = false;
        if (that.Width < 1200) {
            TouchMove = true;
        }
        that.indexPageTab = new Swiper('.index_page_swiper', {
            initialSlide: 0,
            // direction: 'vertical',
            //禁止滑动时swiper移动
            followFinger: false,
            //禁止手指滑动
            allowTouchMove: TouchMove,
            //鼠标
            mousewheel: true,
            //键盘
            keyboard: {
                enabled: true,
            },
            //切换时间
            speed: 1000,
            //位移
            grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            keyboardControl: true,
            //切换时滑动无效直到切换结束
            preventInteractionOnTransition: true,
            on: {
                transitionStart: function () {
                    if (this.realIndex == 0) {
                    }
                    if (this.realIndex == 1) {
                        $('.cursor_banner_wrap').removeClass('cursor_banner_current');

                        //清除时间动画(第三页)
                        for (var j = 0; j < $('.feature_page_item').length; j++) {
                            clearTimeout(that.AnimateTime[j]);
                        }
                    }
                    if (this.realIndex == 2) {
                        $('.cursor_banner_wrap').removeClass('cursor_banner_current');
                    }
                    if (this.realIndex == 3) {
                        //清除时间动画(第三页)
                        for (var j = 0; j < $('.feature_page_item').length; j++) {
                            clearTimeout(that.AnimateTime[j]);
                        }
                        $('.cursor_banner_wrap').removeClass('cursor_banner_current');
                    }
                    if (this.realIndex == 4) {
                        $('.cursor_banner_wrap').removeClass('cursor_banner_current');
                    }
                    if (this.realIndex == 5) {
                        $('.cursor_banner_wrap').removeClass('cursor_banner_current');
                    }
                },
                transitionEnd: function () {
                    if (this.realIndex == 0) {
                        //添加第1页
                        $('.index_canvas').addClass('index_canvas_active');
                        that.BannerSwiper();
                        // that.BannerCanvas();
                        that.BannerTime = setTimeout(function () {
                            $('.index_btn_box').addClass('index_btn_init');
                            $('.index_banner_line').addClass('index_line_init');
                        }, 400);
                        //清除动画(第2页)
                        $('.advantage_wap_wrap').removeClass('advantage_wap_active');
                    }
                    if (this.realIndex == 1) {
                        //添加第2页
                        $('.advantage_wap_wrap').addClass('advantage_wap_active');
                        //清除时间动画(第一页)
                        $('.index_title_item,.index_en_item,.index_read_label,.index_title_load').attr('style', '');
                        $('.index_btn_box').removeClass('index_btn_init');
                        $('.index_banner_wrap').removeClass('index_banner_init');
                        $('.index_canvas').removeClass('index_canvas_active');
                        $('.index_banner_line').removeClass('index_line_init');
                        $('.index_banner_swiper .swiper-slide').removeClass('index_animate_active index_animate_end index_animate_load');
                        $('.wap_banner_box').removeClass('wap_banner_current');
                        if (that.Width > 1200) {
                            that.indexBanner.destroy(false); //销毁swper
                        } else {
                            that.indexWapBanner.destroy(false); //销毁swper
                        }

                        var c = document.getElementById("index_banner_canvas");
                        var ctx = c.getContext("2d");
                        ctx.clearRect(0, 0, c.width, c.height);
                        clearInterval(that.CanvasNewsDrap);
                        //清除动画(第3页)
                        for (var j = 0; j < $('.feature_page_item').length; j++) {
                            clearTimeout(that.AnimateTime[j]);
                        }
                        $('.feature_page_item').removeClass('featureAnimate');
                        $('.feature_page_wrap').removeClass('feature_page_active');
                    }
                    if (this.realIndex == 2) {
                        //添加第3页
                        $('.feature_page_wrap').addClass('feature_page_active');
                        for (var i = 0; i < $('.feature_page_item').length; i++) {
                            (function (item) {
                                that.AnimateTime[i] = setTimeout(function () {
                                    $('.feature_page_item').eq(item).addClass('featureAnimate');
                                }, item * 400);
                            })(i)
                        }
                        //清除动画(第2页)
                        $('.advantage_wap_wrap').removeClass('advantage_wap_active');
                        //清除动画(第4页)
                        $('.index_tab_wrap').removeClass('index_tab_active index_tab_current');
                        $('.wap_faq_wrap').removeClass('wap_faq_active');
                        if (that.Width > 1200) {
                            $('.tab_back_active').css({
                                cx: -65 + '%',
                            });
                        } else {
                            $('.tab_back_active').css({
                                cy: -58 + '%',
                            });
                        }

                    }
                    if (this.realIndex == 3) {
                        //清除动画(第3页)
                        for (var j = 0; j < $('.feature_page_item').length; j++) {
                            clearTimeout(that.AnimateTime[j]);
                        }
                        $('.feature_page_item').removeClass('featureAnimate');
                        $('.feature_page_wrap').removeClass('feature_page_active');
                        //清除动画(第5页)
                        $('.partner_swiper_box .swiper-slide-active').removeClass('partner_active');
                        $('.partner_title_box').removeClass('partner_title_active');
                        $('.partner_swiper_pagination').removeClass('partner_swiper_active');
                        //添加第4页动画
                        $('.index_tab_wrap').addClass('index_tab_active');
                        $('.wap_faq_wrap').addClass('wap_faq_active');
                        $('.tab_back_active').attr('style', '');

                    }
                    if (this.realIndex == 4) {
                        //清除动画(第4页)
                        $('.wap_faq_wrap').removeClass('wap_faq_active');
                        $('.index_tab_wrap').removeClass('index_tab_active index_tab_current');
                        if (that.Width > 1200) {
                            $('.tab_back_active').css({
                                cx: -65 + '%',
                            });
                        } else {
                            $('.tab_back_active').css({
                                cy: -58 + '%',
                            });
                        }

                        //清除动画(第6页)
                        $('.index_footer_wrap').removeClass('index_footer_active');
                        //添加第五页动画
                        $('.partner_swiper_box .swiper-slide-active').addClass('partner_active');
                        $('.partner_title_box').addClass('partner_title_active');
                        $('.partner_swiper_pagination').addClass('partner_swiper_active');

                    }
                    if (this.realIndex == 5) {
                        //清除动画(第5页)
                        $('.partner_swiper_box .swiper-slide-active').removeClass('partner_active');
                        $('.partner_title_box').removeClass('partner_title_active');
                        $('.partner_swiper_pagination').removeClass('partner_swiper_active');
                        //添加第6页动画
                        $('.index_footer_wrap').addClass('index_footer_active');
                        that.IndexParallax();

                    }
                },
                progress: function (progress) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slideProgress = this.slides[i].progress;
                        var innerOffset = this.height * that.interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        this.slides[i].querySelector(".index_slide_inner").style.transform =
                            "translateY(" + innerTranslate + "px)";
                    }
                },
                touchStart: function () {
                    for (var i = 0; i < this.slides.length; i++) {
                        this.slides[i].style.transition = "";
                    }
                },
                setTransition: function (speed) {
                    for (var i = 0; i < this.slides.length; i++) {
                        this.slides[i].style.transition = speed + "ms";
                        this.slides[i].querySelector(".index_slide_inner").style.transition =
                            speed + "ms";
                    }
                }
            }
        });
    },
    //banner
    BannerSwiper: function () {
        var that = this;
        if (that.Width > 1200) {
            that.indexBanner = new Swiper('.index_banner_swiper', {
                effect: 'fade',
                speed: 1000,
                //禁止滑动时swiper移动
                followFinger: true,
                //禁止手指滑动
                allowTouchMove: true,
                loopAdditionalSlides: 0,
                //切换时滑动无效直到切换结束
                preventInteractionOnTransition: true,
                autoplay: {
                    delay: 13000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                    waitForTransition: false,
                },
                pagination: {
                    el: '.index_banner_pagination',
                    clickable: true,
                },
                on: {
                    init: function () {
                        that.BannerAnimate();
                        $('.title_load_text').html('01');
                        $('.index_banner_swiper .swiper-slide').removeClass('index_animate_load');
                        $('.index_banner_swiper .swiper-slide-active').addClass('index_animate_active index_animate_load');

                    },
                    transitionStart: function () {
                        that.BannerNumber = this.realIndex;
                        that.BannerText();
                        console.log('banner播放至第几：' + this.realIndex + '页');
                        $('.index_banner_swiper .swiper-slide').removeClass('index_animate_load');
                        $('.index_banner_swiper .swiper-slide-active').addClass('index_animate_load');
                        $('.index_banner_swiper .swiper-slide').eq(that.indexBanner.realIndex - 1).addClass('index_animate_end');
                        that.BannerAnimate();
                    },
                    transitionEnd: function () {
                        that.BannerClick = false;
                        $('.index_title_item,.index_en_item,.index_read_label,.index_title_load').attr('style', '');
                        $('.title_load_text').html('0' + (this.realIndex + 1));
                        // $('.index_btn_box').removeClass('index_btn_active');
                        $('.index_banner_swiper .swiper-slide').removeClass('index_animate_end index_animate_active');
                        $('.index_banner_swiper .swiper-slide-active').addClass('index_animate_active');
                        that.BannerAnimate();
                    },
                }
            });
        } else {
            that.indexWapBanner = new Swiper('.wap_banner_swiper', {
                speed: 600,
                effect: 'fade',
                loop: true,
                autoplay: {
                    delay: 10000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                    waitForTransition: false,
                },
                loopedSlides: document.querySelectorAll('.swiper-slide').length,
                on: {
                    init: function () {
                        $('.wap_banner_box').removeClass('wap_banner_current');
                        $('.wap_banner_box0').addClass('wap_banner_current');
                    },
                    slideChangeTransitionStart: function () {
                        $('.wap_banner_box').removeClass('wap_banner_current');
                        for (var i = 0; i < this.loopedSlides; i++) {
                            if (this.realIndex == i) {
                                $('.wap_banner_box' + i).addClass('wap_banner_current');
                            }
                        }
                    },
                },
            });
        }

    },
    //地址Tab
    AddressSwiper: function () {
        var that = this;
        that.AddressTab = new Swiper('.footer_address_swiper', {
            //禁止手指滑动
            allowTouchMove: false,
            speed: 600,
            on: {
                init: function () {
                    $('.footer_address_label').eq(0).addClass('footer_address_current');
                    $('.footer_address_label').on('click', function (e) {
                        e.preventDefault();
                        $('.footer_address_label').eq($(this).index()).addClass('footer_address_current').siblings().removeClass('footer_address_current');
                        $('.footer_address_after').css({
                            top: $(this).index() * $('.footer_address_label').height() + 'px'
                        });
                        that.AddressTab.slideTo($(this).index());
                    })
                }
            }
        });
    },
    //合作伙伴
    partnerSwiper: function () {
        var that = this;
        var TouchMove = false;
        if (that.Width < 1200) {
            TouchMove = true;
        }
        that.PartnerTab = new Swiper('.partner_swiper_box', {
            effect: 'fade',
            speed: 1000,
            loop: true,
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: TouchMove,
            loopAdditionalSlides: 0,
            //切换时滑动无效直到切换结束
            preventInteractionOnTransition: true,
            navigation: {
                nextEl: '.partner_next',
                prevEl: '.partner_prev',
            },
            pagination: {
                el: '.partner_swiper_pagination',
                clickable: true,
            },
            on: {
                init: function () {
                    $('.partner_title_box').addClass('partner_title_active');
                    $('.partner_swiper_pagination').addClass('partner_swiper_active');
                },
                transitionStart: function () {
                    $('.partner_swiper_box .swiper-slide-active').addClass('partner_active');
                },
                transitionEnd: function () {
                    $('.partner_swiper_box .swiper-slide').removeClass('partner_active');
                    $('.partner_swiper_box .swiper-slide-active').addClass('partner_active');
                },
            }

        });
    },
    //算法平台
    CorPlatSwiper: function () {
        var that = this;
        var Effect = 'fade';
        if (that.Width > 1200) {
            Effect = 'fade'
        } else {
            Effect = 'slide'
        }
        that.CorPlatTab = new Swiper('.core_plat_tab', {
            effect: Effect,
            speed: 600,
            on: {
                transitionStart: function () {
                    if (that.Width < 1200) {
                        that.WapCoreTab.slideTo(this.realIndex);
                        $('.wap_core_tab .swiper-slide .wap_core_tab_title').removeClass('wap_core_tab_current');
                        $('.wap_core_tab .swiper-slide').eq(this.realIndex).find('.wap_core_tab_title').addClass('wap_core_tab_current');
                    }


                },
            }
        });
    },
    //社会责任
    SocialSwiper: function () {
        var that = this;
        var SlidesPerView = 2;
        if (that.Width < 1200) {
            SlidesPerView = 1
        }
        that.SocialTab = new Swiper('.about_social_swiper', {
            speed: 600,
            loop: true,
            slidesPerView: SlidesPerView,
            centeredSlides: true,
            loopedSlides: document.querySelectorAll('.swiper-slide').length,
            navigation: {
                nextEl: '.about_social_next',
                prevEl: '.about_social_prev',
            },
            pagination: {
                el: ".about_social_pagination",
                clickable: true,
            },
            on: {
                slideChangeTransitionStart: function () {
                    $('.social_img_content').removeClass('social_img_current');
                    for (var i = 0; i < this.loopedSlides; i++) {
                        if (this.realIndex == i) {
                            $('.social_img_content' + i).addClass('social_img_current');
                        }
                    }
                },
            },
        });
    },
    //应用场景
    ScenarioSwiper: function () {
        var that = this;
        that.ScenarioTab = new Swiper('.scenario_swiper', {
            speed: 600,
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: false,
            loopAdditionalSlides: 0,
        });
    },
    intel_swiper: function () {
        var that = this;
        var TouchMove = false
        if (that.Width < 1200) {
            TouchMove = true;
        }
        that.intelTab = new Swiper('.intelligence_swiper', {
            autoplay: false,//可选选项，自动滑动
            loopAdditionalSlides: 0,
            allowTouchMove: TouchMove
        });
    },
    //企业文化
    CultureSwiper: function () {
        var that = this;
        var TouchMove = false
        if (that.Width < 1200) {
            TouchMove = true;
        }
        that.CultureTab = new Swiper('.culture_swiper', {
            speed: 600,
            effect: 'fade',
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: TouchMove,
            loopAdditionalSlides: 0,
            pagination: {
                el: ".culture_swiper_pagination",
                clickable: true,
            },
            // loop: true,
            // loopedSlides: document.querySelectorAll('.swiper-slide').length,
            on: {
                init: function () {
                    $('.culture_slide_box').removeClass('culture_slide_current');
                    $('.culture_slide_box0').addClass('culture_slide_current');
                },
                slideChangeTransitionEnd: function () {
                    $('.culture_slide_box').removeClass('culture_slide_current');
                    for (var i = 0; i < $('.culture_swiper .swiper-slide').length; i++) {
                        if (this.realIndex == i) {
                            $('.culture_slide_box' + i).addClass('culture_slide_current');
                        }
                    }
                },
            },
        });
    },
    //员工福利
    WelfareSwiper: function () {
        var that = this;
        that.WelfareTab = new Swiper('.welfare_item_swiper', {
            speed: 600,
            loop: true,
            effect: 'fade',
            loopedSlides: document.querySelectorAll('.swiper-slide').length,
            on: {
                init: function () {
                    var Item = $('.welfare_item_swiper');
                    //员工福利-tab
                    for (var i = 0; i < this.loopedSlides; i++) {
                        Item.find('.welfare_pagination_tab').append("<div class='welfare_item_label'>0" + (i + 1) + "</div>")
                    }

                    Item.find('.welfare_item_label').eq(0).addClass('welfare_pagination_current');
                    Item.find('.welfare_pagination_after').css({
                        width: Item.find('.welfare_item_label').eq(0).width(),
                        left: Item.find('.welfare_item_label').eq(0).position().left
                    });
                    Item.find('.welfare_item_label').on('click', function (e) {
                        e.preventDefault();
                        that.WelfareTab.slideTo($(this).index());
                        Item.find('.welfare_item_label').eq($(this).index()).addClass('welfare_pagination_current').siblings().removeClass('welfare_pagination_current');
                        Item.find('.welfare_pagination_after').css({
                            width: Item.find('.welfare_item_label').eq($(this).index()).width(),
                            left: Item.find('.welfare_item_label').eq($(this).index()).position().left
                        });
                    });
                },
                slideChangeTransitionStart: function () {
                    var Item = $('.welfare_item_swiper');
                    if (Item.find('.welfare_item_label').length > 0) {
                        Item.find('.welfare_pagination_after').css({
                            width: Item.find('.welfare_item_label').eq(this.realIndex).width(),
                            left: Item.find('.welfare_item_label').eq(this.realIndex).position().left
                        });
                        Item.find('.welfare_item_label').eq(this.realIndex).addClass('welfare_pagination_current').siblings().removeClass('welfare_pagination_current');
                    }
                },
            }
        });
    },
    FamilySwiper: function () {
        var that = this;
        that.FamilyTab = new Swiper('.family_item_swiper', {
            speed: 600,
            loop: true,
            effect: 'fade',
            loopedSlides: document.querySelectorAll('.swiper-slide').length,
            on: {
                init: function () {
                    var Item = $('.family_item_swiper');
                    //员工福利-tab
                    for (var i = 0; i < this.loopedSlides; i++) {
                        Item.find('.welfare_pagination_tab').append("<div class='welfare_item_label'>0" + (i + 1) + "</div>")
                    }
                    Item.find('.welfare_item_label').eq(0).addClass('welfare_pagination_current');
                    Item.find('.welfare_pagination_after').css({
                        width: Item.find('.welfare_item_label').eq(0).width(),
                        left: Item.find('.welfare_item_label').eq(0).position().left
                    });
                    Item.find('.welfare_item_label').on('click', function (e) {
                        e.preventDefault();
                        that.FamilyTab.slideTo($(this).index());
                        Item.find('.welfare_item_label').eq($(this).index()).addClass('welfare_pagination_current').siblings().removeClass('welfare_pagination_current');
                        Item.find('.welfare_pagination_after').css({
                            width: Item.find('.welfare_item_label').eq($(this).index()).width(),
                            left: Item.find('.welfare_item_label').eq($(this).index()).position().left
                        });
                    });
                },
                slideChangeTransitionStart: function () {
                    var Item = $('.family_item_swiper');
                    if (Item.find('.welfare_item_label').length > 0) {
                        Item.find('.welfare_pagination_after').css({
                            width: Item.find('.welfare_item_label').eq(this.realIndex).width(),
                            left: Item.find('.welfare_item_label').eq(this.realIndex).position().left
                        });
                        Item.find('.welfare_item_label').eq(this.realIndex).addClass('welfare_pagination_current').siblings().removeClass('welfare_pagination_current');
                    }
                },
            }
        });
    },
    //平台优势
    AdvantageSwiper: function () {
        var that = this;
        that.AdvantageTab = new Swiper('.plat_advantage_tab', {
            speed: 600,
            effect: 'fade',
            //禁止手指滑动
            allowTouchMove: false,
            on: {
                init: function () {
                    $('.plat_advantage_tab .swiper-slide').eq(0).find('.plat_advantage_item').addClass('plat_advantage_active');
                },
                slideChangeTransitionStart: function () {
                    for (var i = 0; i < $('.plat_advantage_tab .swiper-slide').length; i++) {
                        if (i == this.realIndex) {
                            $('.plat_advantage_tab .swiper-slide').find('.plat_advantage_item').removeClass('plat_advantage_active');
                            $('.plat_advantage_tab .swiper-slide').eq(i).find('.plat_advantage_item').addClass('plat_advantage_active');
                        }
                    }
                }
            }
        })
    },
    //发展历程
    DevelopmentSwiper: function () {
        var that = this;
        var SlidesPerView = 5;
        if (that.Width < 1200) {
            SlidesPerView = 3;
        }
        that.DevelopmentTab = new Swiper('.develop_back_tab', {
            speed: 600,
            effect: 'fade',
            // loop: true,
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: false,
            loopAdditionalSlides: 0,
            // loopedSlides: document.querySelectorAll('.swiper-slide').length,
            navigation: {
                nextEl: '.develop_back_next',
                prevEl: '.develop_back_prev',
            },
            on: {
                init: function () {
                    $('.develop_tab_box').removeClass('develop_current');
                    $('.develop_tab_box0').addClass('develop_current');

                    $('.develop_back_icon').on('click', function () {
                        $('.develop_box').addClass('develop_animate');
                    })
                },
                slideChangeTransitionStart: function () {
                    $('.develop_back_item').eq(0).remove();
                    $('.develop_back_box').append('<div class="develop_back_item"><div class="develop_back_img"></div></div>');
                    $('.develop_back_icon').addClass('button_none');

                    $('.develop_tab_box').removeClass('develop_current');
                    for (var i = 0; i < $('.develop_back_tab .swiper-slide').length; i++) {
                        if (this.realIndex == i) {
                            $('.develop_tab_box' + i).addClass('develop_current');
                            that.DevelopPaginationTab.slideTo(i);
                            $('.develop_pagination_tab .swiper-slide').eq(i).addClass('develop_pagination_active').siblings().removeClass('develop_pagination_active');


                            if ($('.develop_tab_box' + i).find('.develop_tab_read').height() > $('.develop_tab_box' + i).find('.develop_tab_content').height()) {
                                $('.develop_tab_box' + i).find('.develop_tab_bottom').addClass('develop_animate_active');
                            }
                        }
                    }
                },
                slideChangeTransitionEnd: function () {
                    $('.develop_back_icon').removeClass('button_none');
                }

            }
        });
        that.DevelopPaginationTab = new Swiper('.develop_pagination_tab', {
            slidesPerView: SlidesPerView,
            speed: 600,
            on: {
                init: function () {
                    var Slide = $('.develop_pagination_tab .develop_pagination_click');
                    Slide.eq(0).addClass('develop_pagination_active');
                    Slide.on('click', function (e) {
                        e.preventDefault();
                        Slide.eq($(this).index()).addClass('develop_pagination_active').siblings().removeClass('develop_pagination_active');
                        that.DevelopmentTab.slideTo($(this).index());
                    });
                }
            }
        });

    },
    //Parallax
    IndexParallax: function () {
        var that = this;
        if (!that.ParallaxIf) {
            console.log('加载Parallax');
            $('.scene').parallax();
            that.ParallaxIf = true;
        }
    },
    //banner文字分解
    BannerText: function () {
        var that = this;
        var ThisIndex = $('.index_banner_swiper .swiper-slide').eq(that.BannerNumber);
        if (ThisIndex.find('.index_title_text').length > 0) {
            //中文分割
            var TitleText = ThisIndex.find('.index_title_text').html();
            var TitleReplace = TitleText.replace(/\s*/g, "");
            for (var a = 0; a < TitleReplace.length; a++) {
                ThisIndex.find('.index_title_box').append('<div class="index_title_label"><div class="index_title_item">' + TitleReplace[a] + '</div></div>');
                ThisIndex.find('.index_title_text').remove();
            }
        }
        if (ThisIndex.find('.index_banner_text').length > 0) {
            //小字分割
            var stringText = ThisIndex.find('.index_banner_text').html();
            var stringReplace = stringText.replace(/\s*/g, "");
            for (var c = 0; c < stringReplace.length; c++) {
                ThisIndex.find('.index_read_list').append('<div class="index_read_item"><div class="index_read_label">' + stringReplace[c] + '</div></div>');
                ThisIndex.find('.index_banner_text').remove();
            }
        }
        if (ThisIndex.find('.index_en_text').length > 0) {
            //英文
            var EnText = ThisIndex.find('.index_en_text').html();
            // ThisIndex.find('.index_en_box').append('<div class="index_en_label"><div class="index_en_item">' +'&nbsp;'+ '</div></div>');
            // ThisIndex.find('.index_en_box').append('<div class="index_en_label"><div class="index_en_item">' + '&nbsp;'+ '</div></div>');
            // ThisIndex.find('.index_en_box').append('<div class="index_en_label"><div class="index_en_item">' +'&nbsp;'+ '</div></div>');
            // ThisIndex.find('.index_en_box').append('<div class="index_en_label"><div class="index_en_item">' + '&nbsp;'+ '</div></div>');
            for (var d = 0; d < EnText.length; d++) {
                ThisIndex.find('.index_en_box').append(`<div class="index_en_label"><div class="index_en_item" data-text="${EnText[d]}"><span>` + EnText[d] + '</span></div></div>');
                ThisIndex.find('.index_en_text').remove();
            }
        }


    },
    //banner效果
    BannerAnimate: function () {
        var that = this;
        //中文速度开关
        var CnSpeed = 40;
        //英文速度开关
        var EnSpeed = 20;
        //小字速度开关
        var MinSpeed = 8;
        //按钮速度开关
        var BtnSpeed = 10;
        var AllLength = $('.index_banner_swiper .swiper-slide-active');
        for (var a = 0; a < AllLength.find('.index_title_item').length; a++) {
            AllLength.find('.index_title_item').eq(a).css({
                transitionDelay: ((a * CnSpeed)) + 'ms'
            })
        }

        for (var b = 0; b < AllLength.find('.index_en_item').length; b++) {
            AllLength.find('.index_en_item').eq(b).css({
                transitionDelay: ((b * EnSpeed) + 50) + 'ms'
            })
        }
        for (var c = 0; c < AllLength.find('.index_read_item').length; c++) {
            AllLength.find('.index_read_item').eq(c).find('.index_read_label').css({
                transitionDelay: ((c * MinSpeed) + 100) + 'ms'
            })
        }

        AllLength.find('.index_title_load').css({
            transitionDelay: ((AllLength.find('.index_title_label').length * CnSpeed)) + 'ms'
        });


    },
    //canvas背景
    BannerCanvas: function () {
        var that = this;
        if ($('#index_banner_canvas').length > 0) {
            //默认速度
            var Speed = 10;
            //默认颜色
            var DefaultColor = 'rgba(27,27,27,0.2)';
            //下落颜色
            var DownColor = 'rgba(255,255,255,1)';
            var c = document.getElementById("index_banner_canvas");
            var ctx = c.getContext("2d");
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            //a,b,c,d分别代表x方向偏移,y方向偏移,宽，高
            var string1 = "abcdefghijklmnopqrstuvwxyz";
            string1.split();
            var fontsize = 20;
            columns = c.width / fontsize;
            var drop = [];
            for (var x = 0; x < columns; x++) {
                drop[x] = 0;
            }

            function drap() {
                for (var i = 0; i < drop.length; i++) {
                    var text1 = string1[Math.floor(Math.random() * string1.length)];

                    ctx.fillText(text1, i * fontsize, drop[i] * fontsize);
                    drop[i]++;
                    if (drop[i] * fontsize > c.height && Math.random() > 0.9) {//90%的几率掉落
                        drop[i] = 0;
                    }
                }
                ctx.fillStyle = DefaultColor;
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.fillStyle = DownColor;
                ctx.font = fontsize + "px arial";
            }

            //绘画
            that.CanvasDrap = setInterval(drap, Speed);
            var CanTime = 0;
            that.CanvasStop = setInterval(function () {
                CanTime += 10;
                if (CanTime >= 480) {
                    clearInterval(that.CanvasStop);
                    clearInterval(that.CanvasDrap);
                    Speed = 90;
                    that.CanvasNewsDrap = setInterval(drap, Speed);
                }
            }, 10);
        }
    },
    //导航高亮
    navHover: function () {
        $('.public_nav_item').hover(function () {
            $('.public_nav_item').addClass('public_nav_default');
            $('.public_nav_item').eq($(this).index()).addClass('public_nav_hover');
        }, function () {
            $('.public_nav_item').removeClass('public_nav_default public_nav_hover');
        });


        $('.partner_tab_after').hover(function () {
            $('.partner_tab_after').addClass('partner_tab_default');
            $('.partner_tab_after').eq($(this).index()).addClass('partner_tab_hover');
        }, function () {
            $('.partner_tab_after').removeClass('partner_tab_default partner_tab_hover');
        });


        $('.public_banner_btn_item').hover(function () {
            $('.public_banner_btn_item').addClass('public_banner_btn_default');
            $('.public_banner_btn_item').eq($(this).index()).addClass('public_banner_btn_hover');
        }, function () {
            $('.public_banner_btn_item').removeClass('public_banner_btn_default public_banner_btn_hover');
        });
    },
    AnimatePjax: function () {
        var that = this;
        $(document).pjax('a[data-pjax]', '#content', {
            fragment: '#content',
            replace: true,
        });
        //开始请求
        $(document).on('pjax:click', function () {
            console.log('页面请求开始');
            $('.animate_pjax').addClass('animate_pjax_active');
            $('body').addClass('animate_pjax_none');
            that.IndexSwiperIf = true;
        });

        //ajax请求超时后触发
        $(document).on('pjax:timeout', function () {
            console.log('页面请求超时');
        });

        //ajax请求失败后触发
        $(document).on('pjax:error', function () {
            console.log('页面请求失败');
        });

        //ajax请求成功，内容替换渲染前触发
        $(document).on('pjax:beforeReplace', function () {
            console.log('页面请求成功');
        });
        //内容替换成功后触发
        $(document).on('pjax:success', function () {
            that.PjaxTimeOver = setInterval(function () {
                that.PjaxTime += 10;
                // console.log(that.PjaxTime);
                if (that.PjaxTime >= 1000) {
                    $('body').removeClass('animate_pjax_none body_flex');
                    $('.animate_pjax').addClass('animate_pjax_remove');
                    clearInterval(that.PjaxTimeOver);
                    that.WapNavIF = true;
                    that.PjaxIf = true;
                    that.PjaxTime = 0;
                    console.log('页面内容替换成功');
                }
            }, 10);
        });
        //请求结束
        $(document).on('pjax:end', function () {
            console.log('页面请求结束');
        });


    },
    //滚动条
    Scrollbar: function () {
        setInterval(function () {
            $('body').getNiceScroll().resize();
        }, 300);
        var that = this;
        if (that.Width > 1200) {
            $("body").niceScroll({
                zindex: "99999",
                //滚动条颜色
                cursorcolor: "rgba(255,255,255,0)",
                // 当滚动条是隐藏状态时改变透明度，值范围1到0
                cursoropacitymin: 0,
                // 当滚动条是显示状态时改变透明度，值范围1到0
                cursoropacitymax: 1,
                //使光标拖动滚动像在台式电脑触摸设备 true滚动条拖动不可用
                touchbehavior: false,
                // 隐藏滚动条的方式，可用的值：true|无滚动时隐藏，"cursor"|隐藏，false|不隐藏，"leave"|仅在指针离开内容时隐藏，"hidden"|一直隐藏，"scroll"|仅在滚动时显示
                autohidemode: true,
                //启用滚动跳跃的内容移动
                bouncescroll: true,
                //可以使用 CSS 变型来滚动内容
                enabletranslate3d: true,
                // niceScroll 可以管理水平滚动
                horizrailenabled: true,
                //背景滚动槽颜色
                background: "",
                //滚动条宽度
                cursorwidth: "5px",
                //滚动条两头的圆角
                cursorborderradius: "3px",
                //滚动条的位置
                railpadding: {
                    top: 0,
                    right: 2,
                    left: 0,
                    bottom: 0
                },
                //可以管理鼠标滚轮事件
                enablemousewheel: true,
                //可以管理键盘事件
                enablekeyboard: true,
                //滚动速度
                scrollspeed: 130,
                smoothscroll: 'ease',
                hidecursordelay: 400,
                // 鼠标滚动的滚动速度（像素）
                mousescrollstep: 9 * 3,
                //仅 boxzoom=true 和触屏设备时有效）激活变焦当 out/in （两个手指外账或收缩）
                gesturezoom: false,
                //你可以用鼠标滚动可滚动区域的滚动条和增加鼠标滚轮事件
                preservenativescrolling: true,
                //当按下空格时使页面向下滚动
                spacebarenabled: true,
                //防止多触点时间引发滚动
                preventmultitouchscrolling: true,
            });
            that.NavScroll();

        } else {
            that.NavScroll();
        }
    },
    ImgRoll: function () {
        var that = this;
        var number = 6;
        if ($('.public_page_img').length > 0) {
            if (that.Width > 1200) {
                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    $('.public_page_img img').css({
                        top: (scrollTop / number) + "px"
                    })
                });
            }
        }
        var number2 = 12;
        if ($('.society_back').length > 0) {
            if (that.Width > 1200) {
                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    $('.society_back img').css({
                        top: (scrollTop / number2) + "px"
                    })
                });
            }
        }
    },
    //发展历程滚动条
    DevelopScrollbar: function () {
        setInterval(function () {
            $('.develop_tab_content').getNiceScroll().resize();
        }, 300);
        var that = this;
        $(".develop_tab_content").niceScroll({
            zindex: "99999",
            //滚动条颜色
            cursorcolor: "#e65e44",
            // 当滚动条是隐藏状态时改变透明度，值范围1到0
            cursoropacitymin: 1,
            // 当滚动条是显示状态时改变透明度，值范围1到0
            cursoropacitymax: 1,
            //使光标拖动滚动像在台式电脑触摸设备 true滚动条拖动不可用
            touchbehavior: true,
            // 隐藏滚动条的方式，可用的值：true|无滚动时隐藏，"cursor"|隐藏，false|不隐藏，"leave"|仅在指针离开内容时隐藏，"hidden"|一直隐藏，"scroll"|仅在滚动时显示
            autohidemode: scroll,
            //启用滚动跳跃的内容移动
            bouncescroll: true,
            //可以使用 CSS 变型来滚动内容
            enabletranslate3d: true,
            // niceScroll 可以管理水平滚动
            horizrailenabled: true,
            //背景滚动槽颜色
            background: "",
            //滚动条宽度
            cursorwidth: "5px",
            //滚动条两头的圆角
            cursorborderradius: "3px",
            //滚动条的位置
            railpadding: {
                top: 0,
                right: 2,
                left: 0,
                bottom: 0
            },
            //可以管理鼠标滚轮事件
            enablemousewheel: true,
            //可以管理键盘事件
            enablekeyboard: false,
            //滚动速度
            scrollspeed: 130,
            smoothscroll: 'ease',
            hidecursordelay: 600,
            // 鼠标滚动的滚动速度（像素）
            mousescrollstep: 9 * 3,
            //仅 boxzoom=true 和触屏设备时有效）激活变焦当 out/in （两个手指外账或收缩）
            gesturezoom: false,
            //你可以用鼠标滚动可滚动区域的滚动条和增加鼠标滚轮事件
            preservenativescrolling: true,
            //当按下空格时使页面向下滚动
            spacebarenabled: true,
            //防止多触点时间引发滚动
            preventmultitouchscrolling: true,
        });
    },
    //获取TOP
    NavScroll: function () {
        var that = this;
        that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        that.NavScrollTop();
        // console.log("滚动距离" + that.scrollTop);
        window.onscroll = function () {
            that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            that.NavScrollTop();
            // console.log("滚动距离" + that.scrollTop);
        };

    },
    //判断top值
    NavScrollTop: function () {
        var that = this;
        that.scrollTop = $(window).scrollTop();
        that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //移动端首页导航
        if (that.scrollTop > 100) {
            $('.header_wrap').addClass('header_active');
        } else {
            $('.header_wrap').removeClass('header_active');
        }
        that.FadeInUp();
        that.ImgRoll();
        that.PageBannerInUp();
        that.PublicTitle();
        that.PlatList();
        that.PlatTab();
        that.ChipList();
        that.ChipBottom();
        that.ChipRoundBox();
        that.PlatContent();
        that.PlatItemImg();
        that.PlatFootItem();
        that.PlatTabItem();
        that.FeaturesItem();
        that.FeaturesBoxItem();
        that.ScenarioTabFade();
        that.CaseWrap();
        that.AboutHead();
        that.AboutVision();
        that.AboutSocialTab();
        that.CultureBox();
        that.AtmosphereWrap();
        that.WelfareBox();
        that.WelfareItem();
        that.FamilyItem();
        that.NewsItem();
        that.SocietyBox();
        that.SocietyHead();
        that.SocietyItem();
        that.NewsFixed();
        that.NewsBjqItem();
        that.NewsContent();
        that.NewsFixedCurrent();
        that.PublicMbx();
        that.PublicMbxTop();
        that.AdvantageFade();
        that.AdvantagePagination();
        that.PlatImg();
        that.AboutMap();
        that.AboutNumber();
        that.CoreScrapFade();
        that.NewsHeadFade();
        that.DevelopBox();
        that.PlatPagination();
        that.WapIconPagination();
        that.WapAboutSocialPagination();
        that.WapCulturePagination();
        that.WapAtmospherePagination();
        that.WapNewsBtn();
        that.intellHead();
        that.intelContent();
        that.inttelFooter();
        that.intelFooterend();
    },
    //进场
    FadeInUp: function () {
        var that = this;
        var fadeInUp = $('.FadeInUp');
        for (var i = 0; i < fadeInUp.length; i++) {
            var Height = that.Height * 0.9;
            var Stop = that.scrollTop + Height;
            if (Stop > fadeInUp.eq(i).offset().top) {
                fadeInUp.eq(i).addClass('AddFadeInUp');
            }
        }
    },
    //内页banner
    PageBannerInUp: function () {
        var that = this;
        var PublicItem = $('.public_page_banner');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddBanner');
            }
        }
        var inteli_banner = $('.inteli_banner');
        for (var i = 0; i < inteli_banner.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + Height;
            if (Stop > inteli_banner.eq(i).offset().top) {
                inteli_banner.eq(i).addClass('AddBanner');
            }
        }
    },
    //内页标题
    PublicTitle: function () {
        var that = this;
        var PublicItem = $('.core_platform_title');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPageTitle');
            }
        }
    },
    //算法平台
    intellHead: function () {
        var that = this;
        var PublicItem = $('.tran_content_header');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('start_animate');
            }
        }
    },
    intelContent: function () {
        var that = this;
        var PublicItem = $('.tran_content');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('start_animate');
            }
        }
    },
    inttelFooter: function () {
        var that = this;
        var PublicItem = $('.tran_content_footer');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('start_animate');
            }
        }
    },
    intelFooterend: function () {
        var that = this;
        var PublicItem = $('.tran_content_footer_end');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('start_animate');
            }
        }
    },
    PlatList: function () {
        var that = this;
        var PublicItem = $('.core_platform_item');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatList');
            }
        }
    },
    PlatPagination: function () {
        var that = this;
        var PublicItem = $('.core_wap_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatPagination');
            }
        }
    },
    WapIconPagination: function () {
        var that = this;
        var PublicItem = $('.wap_plat_icon_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWapIconPagination');
            }
        }
    },
    WapAboutSocialPagination: function () {
        var that = this;
        var PublicItem = $('.about_social_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWapAboutSocialPagination');
            }
        }
    },
    WapCulturePagination: function () {
        var that = this;
        var PublicItem = $('.culture_swiper_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWapCulturePagination');
            }
        }
    },
    WapAtmospherePagination: function () {
        var that = this;
        var PublicItem = $('.atmosphere_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .8;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWapAtmospherePagination');
            }
        }
    },
    //算法Tab
    PlatTab: function () {
        var that = this;
        var top = 0;
        var PublicItem = $('.core_tab_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * 1.2;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('core_tab_active');
                PublicItem.css({
                    Transform: 'translateY(-25%)'
                });
            }
        }
    },
    ChipList: function () {
        var that = this;
        var top = 0;
        var PublicItem = $('.core_chip_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .2;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddChipTab');
                that.ChipBox();
            }
        }
    },
    ChipBottom: function () {
        var that = this;
        var top = 0;
        var PublicItem = $('.core_chip_bottom');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddChipBottom');
                that.ChipBox();
            }
        }
    },
    ChipRoundBox: function () {
        var that = this;
        var top = 0;
        var PublicItem = $('.core_round_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddChipRoundBox');
                that.ChipBox();
            }
        }
    },
    PlatContent: function () {
        var that = this;
        var top = 0;
        var PublicItem = $('.core_content_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * 1.2;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatContent');
                PublicItem.css({
                    Transform: 'translateY(-25%)'
                });
            }
        }
    },
    PlatItemImg: function () {
        var that = this;
        var PublicItem = $('.core_content_item');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatItemImg');
            }
        }
    },
    PlatFootItem: function () {
        var that = this;
        var PublicItem = $('.core_foot_item');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatFootItem');
            }
        }
    },
    PlatTabItem: function () {
        var that = this;
        var PublicItem = $('.plat_tab_item');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatTabItem');
            }
        }
    },
    FeaturesItem: function () {
        var that = this;
        var PublicItem = $('.city_features_img');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .4;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddFeaturesItem');
            }
        }
    },
    FeaturesBoxItem: function () {
        var that = this;
        var PublicItem = $('.city_features_list');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddFeaturesList');
            }
        }
    },
    ScenarioTabFade: function () {
        var that = this;
        var PublicItem = $('.scenario_tab');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddScenarioTab');
            }
        }
    },
    CaseWrap: function () {
        var that = this;
        var PublicItem = $('.case_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddCaseWrap');
            }
        }
    },
    AboutHead: function () {
        var that = this;
        var PublicItem = $('.about_head_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAboutHead');
            }
        }
    },
    AboutVision: function () {
        var that = this;
        var PublicItem = $('.about_vision_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAboutVision');
            }
        }
    },
    AboutSocialTab: function () {
        var that = this;
        var PublicItem = $('.about_social_swiper');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAboutSocialTab');
            }
        }
    },
    CultureBox: function () {
        var that = this;
        var PublicItem = $('.culture_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddCultureBox');
            }
        }
    },
    AtmosphereWrap: function () {
        var that = this;
        var PublicItem = $('.atmosphere_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAtmosphereWrap');
            }
        }
    },
    WelfareBox: function () {
        var that = this;
        var PublicItem = $('.culture_welfare_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWelfareBox');
            }
        }
    },
    WelfareItem: function () {
        var that = this;
        var PublicItem = $('.welfare_item_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWelfareItem');
            }
        }
    },
    FamilyItem: function () {
        var that = this;
        var PublicItem = $('.family_item_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddFamilyItem');
            }
        }
    },
    NewsItem: function () {
        var that = this;
        var PublicItem = $('.news_item_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddNewsItem');
            }
        }
    },
    SocietyBox: function () {
        var that = this;
        var PublicItem = $('.society_content_head');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddSocietyBox');
            }
        }
    },
    SocietyHead: function () {
        var that = this;
        var PublicItem = $('.society_list_top');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddSocietyHead');
            }
        }
    },
    SocietyItem: function () {
        var that = this;
        var PublicItem = $('.society_item_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddSocietyItem');
            }
        }
    },
    NewsFixed: function () {
        var that = this;
        var PublicItem = $('.news_fixed_content');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddNewsFixed');
            }
        }
    },
    NewsContent: function () {
        var that = this;
        var PublicItem = $('.news_red_bjq');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddNewsContent');
            }
        }
    },
    NewsBjqItem: function () {
        var that = this;
        $('.news_red_bjq p').addClass('news_bjq_item');
        var PublicItem = $('.news_bjq_item');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddNewsBjqItem');
            }
        }
    },

    NewsFixedCurrent: function () {
        var that = this;
        var InTop = 90;
        if (that.Width < 1200) {
            InTop = 60;
        }
        if (that.Width > 1200) {
            InTop = 30;
        }
        if (that.Width > 1400) {
            InTop = 50;
        }
        if (that.Width > 1900) {
            InTop = 90;
        }
        if (that.Width > 1200) {
            var PublicItem = $('.news_red_fixed');
            for (var i = 0; i < PublicItem.length; i++) {
                var Height = that.Height;
                var Stop = that.scrollTop;
                if (Stop > InTop) {
                    PublicItem.addClass('news_fixed_current');
                } else {
                    PublicItem.removeClass('news_fixed_current');
                }

                // var MaxTop = Height + $('.news_red_bjq').height() - $('.news_fixed_content').height();
                // if (Stop > MaxTop) {
                //     PublicItem.addClass('news_fixed_fade');
                // } else {
                //     PublicItem.removeClass('news_fixed_fade');
                // }
            }
        }
    },
    PublicMbx: function () {
        var that = this;
        var PublicItem = $('.public_nav_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + $('.header_wrap').height() + $('.public_nav_box').height();
            if (Stop > Height) {
                PublicItem.eq(i).addClass('AddPublicMbx AddPublicDefault');
            }
            if (Stop < Height) {
                PublicItem.eq(i).removeClass('AddPublicMbx');
            }
        }
    },
    PublicMbxTop: function () {
        var that = this;
        var PublicItem = $('.public_nav_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * 1.2;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPublicMbxTop');
            }
        }
    },
    AdvantageFade: function () {
        var that = this;
        var PublicItem = $('.plat_advantage_read');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAdvantageFade');
            }
        }
    },
    AdvantagePagination: function () {
        var that = this;
        var PublicItem = $('.plat_advantage_pagination');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAdvantagePagination');
            }
        }
    },
    PlatImg: function () {
        var that = this;
        var PublicItem = $('.plat_images_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddPlatImg');
            }
        }
    },
    AboutMap: function () {
        var that = this;
        var PublicItem = $('.about_map_list');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAboutMap');
            }
        }
    },
    AboutNumber: function () {
        var that = this;
        var PublicItem = $('.about_number_list');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddAboutNumber');
                setTimeout(function () {
                    that.indexNumber();
                }, 300);

            }
        }
    },
    CoreScrapFade: function () {
        var that = this;
        var PublicItem = $('.core_scrap_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .7;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddCoreScrapFade');
            }
        }
    },
    NewsHeadFade: function () {
        var that = this;
        var PublicItem = $('.news_head_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddNewsHeadFade');
            }
        }
    },
    DevelopBox: function () {
        var that = this;
        var PublicItem = $('.develop_wrap');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddDevelopBox');
            }
        }
    },
    WapNewsBtn: function () {
        var that = this;
        var PublicItem = $('.news_wap_box');
        for (var i = 0; i < PublicItem.length; i++) {
            var Height = that.Height * .9;
            var Stop = that.scrollTop + Height;
            if (Stop > PublicItem.eq(i).offset().top) {
                PublicItem.eq(i).addClass('AddWapNewsBtn');
            }
        }
    },
    //返回顶部
    ReturnTop: function () {
        var that = this;
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        $(document.body).animate({
            scrollTop: 0
        }, 700);
        $('html').animate({
            scrollTop: 0
        }, 700)
    },
    //移动端导航
    WapNav: function () {
        var that = this;
        var top = 0;//给top变量一个初始值，以便下方赋值并引用。

        $('.header_button_wrap').on('click', function (e) {
            e.preventDefault();
            if (that.WapNavIF) {
                $('.page_nav_wrap').addClass('page_nav_current');
                $('.header_button_wrap').addClass('header_button_active');
                $('.header_nav_wrap').addClass('header_nav_hide');
                $('.nav_svg_button').addClass('nav_svg_button_active');
                $('.header_wrap').addClass('header_after');
                $('.cursor_banner_wrap').removeClass('cursor_banner_current');
                //移动端
                $('.wap_nav_wrap').addClass('wap_nav_active');
                that.WapNavIF = false;
                top = $(window).scrollTop();
                $('body').css("top", -top + "px");
                $('body').addClass('body_flex');
            } else {
                $('.header_wrap').removeClass('header_after');
                $('.page_nav_wrap').removeClass('page_nav_current');
                $('.header_button_wrap').removeClass('header_button_active');
                $('.header_nav_wrap').removeClass('header_nav_hide');
                $('.nav_svg_button').removeClass('nav_svg_button_active');
                $('.cursor_banner_wrap').addClass('cursor_banner_current');
                //移动端
                $('.wap_nav_wrap').removeClass('wap_nav_active');
                that.WapNavIF = true;
                $('body').removeClass('body_flex');
                $(window).scrollTop(top);
            }
        });


    },
    //锚点特效
    maoAnimate: function () {
        var that = this;
        var _hash = window.location.hash;
        if (that.Width < 1200) {
            that.maoNumber = 59;
        }
        if (that.Width > 1200) {
            that.maoNumber = 120;
        }
        if (that.Width > 1400) {
            that.maoNumber = 128;
        }
        if (that.Width > 1900) {
            that.maoNumber = 150;
        }
        //锚点滑动
        $('.anchor_link').click(function () {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset - that.maoNumber
                },
                    700);
                return false;
            }
        });
        setTimeout(function () {
            if (_hash && $(_hash).get(0)) {
                $('html,body').animate({
                    scrollTop: $(_hash).offset().top - that.maoNumber
                },
                    700);
            }
        }, 500);
    },

    //底部
    footAnimate: function () {
        var that = this;
        var FootWrap = $('.footer_wrap');
        var FootContent = $('.footer_animate');
        if (that.Width > 1200) {
            FootWrap.css({
                height: FootContent.height() + 'px'
            });
            var scrollTop = $(window).scrollTop();
            var footerHeight = FootWrap.offset().top - scrollTop - that.Height;
            if (footerHeight <= 0) {
                FootContent.css({
                    WebkitTransform: 'translateY(' + Math.floor(Math.abs(footerHeight / 2)) + 'px)',
                    transform: 'translateY(' + Math.floor(Math.abs(footerHeight / 2)) + 'px)'
                });
            }
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                var footerHeight = FootWrap.offset().top - scrollTop - that.Height;
                if (footerHeight <= 0) {
                    // console.log('到了');
                    FootContent.css({
                        WebkitTransform: 'translateY(' + Math.floor(Math.abs(footerHeight / 2)) + 'px)',
                        transform: 'translateY(' + Math.floor(Math.abs(footerHeight / 2)) + 'px)'
                    });
                }
            });
        }

    },
    //鼠标
    CursorFollow: function () {
        var that = this;
        if (that.Width > 1200) {
            var clientX;
            var clientY;
            //loading 光标
            if ($('.cursorDiv_circle_box').length > 0) {
                that.StrokeC = Math.ceil($(".cursorDiv_circle_svg circle").get(0).getTotalLength());
                $('.cursorDiv_circle_load circle').css({
                    strokeDasharray: that.StrokeC,
                    strokeDashoffset: that.StrokeC,
                });
            }
            $('body').mousemove(function (e) {
                clientX = e.clientX;
                clientY = e.clientY;
                TweenLite.to('.cursorDiv', 0.1, {
                    transform: 'translate(' + clientX + 'px,' + clientY + 'px) scale(1)',
                    opacity: 1,
                });
            });
            $('body').mouseout(function (e) {
                clientX = e.clientX;
                clientY = e.clientY;
            });
            $('body').mousedown(function (e) {
                clientX = e.clientX;
                clientY = e.clientY;

            });
            $('body').mouseup(function (e) {
                clientX = e.clientX;
                clientY = e.clientY;
            });
        }

    },
    //Loading SVG
    SvgAnimate: function () {
        console.log('执行');
        //加载svg
        for (var i = 0; i < $(".loading_logo_en svg path").length; i++) {
            var OffSet = Math.ceil($(".loading_logo_en svg path").get(i).getTotalLength());
            // console.log(OffSet);
            $('.loading_logo_en svg path').eq(i).css({
                strokeDasharray: OffSet,
                strokeDashoffset: OffSet,
            });
        }
        //svg动画
        setTimeout(function () {
            $('.loading_wrap').addClass('loading_active');
            for (var j = 0; j < $(".loading_logo_en svg path").length; j++) {
                $('.loading_logo_en svg path').eq(j).css({
                    strokeDashoffset: 0,
                    transitionDelay: (j * 60) + 'ms',
                });
            }
        }, setTimeout(function () {
            $('.loading_wrap').addClass('loading_fade');
        }, 800));
    },
    //视频
    VideoPlay: function () {
        var that = this;
        $('.about_video_click').on('click', function (e) {
            e.preventDefault();
            $('.video_pop_wrap').addClass('index_video_active');
            $('#AboutVideo').trigger('play');
        });
        $('.about_video_close').on('click', function (e) {
            e.preventDefault();
            $('.video_pop_wrap').removeClass('index_video_active');
            $('#AboutVideo').trigger('pause');
            document.getElementById("AboutVideo").currentTime = 0;
        });
    },
    LoadPlay: function () {
        var that = this;
        that.SvgTime = 0;
        that.ImagesLoad = false;

        that.SvgTimeOver = setInterval(function () {
            that.SvgTime += 10;
            if (that.SvgTime >= 2000 && that.ImagesLoad) {
                // if (that.SvgTime >= 3000) {
                console.log('进入');
                clearInterval(that.SvgTimeOver);
                that.SvgTime = 0;
                $('.loading_content').addClass('loading_scale');
                $('.loading_wrap').addClass('loading_hide');
                $('.index_page_wrap').addClass('index_page_active');
                $('.cursorDiv_circle_box').addClass('cursorDiv_circle_hide');
                setTimeout(function () {
                    $('.loading_wrap').remove();
                    $('.cursorDiv_circle_box').remove();
                    that.indexInit();
                }, 1000);
            }
        }, 10);

        function handleComplete() {
            console.log('加载成功');
        }
        var queue = new createjs.LoadQueue(false);
        // queue.installPlugin(createjs.Sound); //预加载音频
        queue.loadManifest([
            "image/he/Frame 100.png",
            "image/he/Frame 101.png",
            "image/he/Frame 102.png",
            "image/he/Frame 103.png",
            "image/he/Frame 95.png",
            "image/he/Frame 96.png",
            "image/he/Frame 97.png",
            "image/he/Frame 98.png",
            "image/he/Frame 99.png",
            "image/zhhn.png",
        ], true, "static/");
        //监听进度事件
        queue.on("progress", function (e) {
            var proNum = Math.ceil(e.progress * 100);
            $('.cursorDiv_text_box span').html(proNum);
            $('.loading_wap_text span').html(proNum);
            $('.cursorDiv_circle_load circle').css({
                strokeDashoffset: that.StrokeC - ((that.StrokeC / 100) * (proNum)),
            });
            if (proNum >= 100) {
                console.log('到100了');
                that.ImagesLoad = true;
            }
        });
        queue.on("complete", handleComplete, this);
    },
    //Loading
    Loading: function () {
        var that = this;
        for (var i = 0; i < $('img').length; i++) {
            if ($('img').eq(i).attr('src') == "") {
                // console.log('跳过');
            } else {
                that.ImgArray.push(
                    $('img').eq(i).attr('src')
                );
            }
        }

        //去重Img
        function unique2(array) {
            array.sort();
            var re = [array[0]];
            for (var i = 1; i < array.length; i++) {
                if (array[i] !== re[re.length - 1]) {
                    re.push(array[i]);
                }
            }
            return re;
        }

        var arr = that.ImgArray;
        that.allImages = unique2(arr);
        console.log("", that.allImages);
        //启动svg动画
        that.SvgAnimate();
        that.BannerNumber = 0;
        that.BannerText();
        if (that.allImages.length > 0 && $('.loading_wrap').length > 0) {
            console.log('有加载页面');
            that.LoadPlay();
            if (that.PjaxIf) {
                that.PjaxIf = false;
                setTimeout(function () {
                    $('.animate_pjax').removeClass('animate_pjax_remove animate_pjax_active');
                }, 1000);
            }
        } else {
            console.log('没有加载页面,pjax进来');
            that.indexInit();
            $('.index_banner_swiper .swiper-slide').removeClass('index_animate_active');
            //判断有此div并且无刷新链接点进来
            if ($('.index_banner_swiper').length > 0 && that.IndexSwiperIf) {
                if (that.Width > 1200) {
                    that.indexBanner.destroy(false); //销毁swper
                } else {
                    that.indexWapBanner.destroy(false); //销毁swper
                }

                that.indexPageTab.destroy(false); //销毁swper
            }
            $('.index_page_wrap').addClass('index_page_active');
            setTimeout(function () {
                that.PjaxIf = false;
                $('.animate_pjax').removeClass('animate_pjax_remove animate_pjax_active');
            }, 1000);
        }
    },
    //首页业务咨询遮罩
    FormPop: function () {
        $('.form_head_item').on('click', function (e) {
            $('.form_head_item').eq($(this).index()).addClass('form_head_current').siblings().removeClass('form_head_current');
        });
        var PopIf = true;
        $('.index_footer_pop').on('click', function (e) {
            e.preventDefault();
            $('.form_pop_wrap').addClass('form_pop_active');
        });
        $('.form_pop_close').on('click', function (e) {
            e.preventDefault();
            $('.form_head_item input').prop('checked', false);
            $('.form_pop_book input').prop('checked', false);
            $('.form_head_item').removeClass('form_head_current');
            $('.form_pop_wrap').removeClass('form_pop_active');
            $('.form_pop_inner').removeClass('form_inner_active');
            $('.form_success_reply').removeClass('form_success_active');

        });
    },
    //事件
    AddEventList: function () {
        var that = this;

        function return_false() {
            return false;
        }

        $('#top').on('click', function (e) {
            e.preventDefault();
            that.ReturnTop();
        });


        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if (isiOS) {

        } else {
        }

        $('.advantage_read_item').hover(function () {
            $('.advantage_content_list .advantage_content_item').removeClass('advantage_content_active');
            $('.advantage_content_list .advantage_content_item').eq($(this).index()).addClass('advantage_content_active');
        }, function () {
            $('.advantage_content_list .advantage_content_item').removeClass('advantage_content_active');
        });
        $('.feature_page_item a').hover(function () {
            $(this).addClass('feature_page_hover');
        }, function () {
            $('.feature_page_item a').removeClass('feature_page_hover');
        });


        $('.tab_content_item').hover(function () {
            $('.index_tab_wrap').addClass('index_tab_current');
            $('.tab_content_item').eq($(this).index()).addClass('tab_content_active').siblings().removeClass('tab_content_active');
            if ($(this).index() == 0) {
                $('.index_tab_wrap').addClass('tab_svg_active').removeClass('tab_svg_current');
            }
            if ($(this).index() == 1) {
                $('.index_tab_wrap').addClass('tab_svg_current').removeClass('tab_svg_active');
            }

        }, function () {
            $('.index_tab_wrap').removeClass('index_tab_current');
        });
        // $('.tab_content_item').hover(function () {
        //     $('.index_tab_wrap').addClass('index_tab_current');
        //     $('.tab_content_item').eq($(this).index()).addClass('tab_content_active').siblings().removeClass('tab_content_active');
        //     if (that.Width < 1200) {
        //         $('.tab_back_active').css({
        //             cy: ($(this).index() * 128) - 14 + '%',
        //         });
        //     } else {
        //         $('.tab_back_active').css({
        //             cx: ($(this).index() * 116) - 8 + '%',
        //         });
        //     }
        // }, function () {
        //     $('.index_tab_wrap').removeClass('index_tab_current');
        // });

        //合作伙伴鼠标经过
        $('.partner_tab_item').hover(function () {
            $('.partner_tab_list').addClass('partner_list_hover');
        }, function () {
            $('.partner_tab_list').removeClass('partner_list_hover');
        });
        //banner切换
        $('.index_banner_prev').on('click', function (e) {
            e.preventDefault();
            $('.index_banner_swiper .swiper-slide').eq(that.indexBanner.realIndex).addClass('index_animate_end');
            console.log(that.indexBanner.realIndex);
            that.BannerClick = true;
            if (that.indexBanner.realIndex == 0) {
                that.BannerNumber = $('.index_banner_swiper .swiper-slide').length - 1;
                that.indexBanner.slideTo($('.index_banner_swiper .swiper-slide').length - 1);
                that.BannerText();
            } else {
                that.BannerNumber = that.indexBanner.realIndex - 1;
                that.indexBanner.slideTo(that.indexBanner.realIndex - 1);
                that.BannerText();

            }
        });

        $('.index_banner_next').on('click', function (e) {
            e.preventDefault();
            $('.index_banner_swiper .swiper-slide').eq(that.indexBanner.realIndex - 1).addClass('index_animate_end');
            that.BannerClick = true;
            if (that.indexBanner.realIndex == ($('.index_banner_swiper .swiper-slide').length - 1)) {
                that.BannerNumber = 0;
                that.indexBanner.slideTo(0);
                that.BannerText();
            } else {
                that.BannerNumber = that.indexBanner.realIndex + 1;
                that.indexBanner.slideTo(that.indexBanner.realIndex + 1);
                that.BannerText();
            }

        });


        //按钮经过
        $('.index_banner_more a').hover(function () {
            $(this).removeClass('index_banner_default').addClass('index_banner_hover');
        }, function () {
            $(this).removeClass('index_banner_hover').addClass('index_banner_default');
        });


        //核心技术鼠标经过
        if (that.Width > 1200) {
            $('.core_wap_tab .swiper-wrapper .swiper-slide').hover(function () {
                $('.core_platform_item').removeClass('core_platform_current');
                $('.core_wap_tab .swiper-wrapper .swiper-slide').find('.core_platform_item').eq($(this).index()).addClass('core_platform_current');
            });
        }
        //核心技术tab
        $('.core_tab_link').on('click', function (e) {
            e.preventDefault();
            $('.core_tab_link').eq($(this).index()).addClass('core_tab_current').siblings().removeClass('core_tab_current');
            console.log($(this).index());
            that.CorPlatTab.slideTo($(this).index());
            $('.core_tab_after').css({
                top: $(this).index() * $('.core_tab_link').height()
            });
        });

        //解决方案-应用场景
        $('.wap_scenario_tab .swiper-slide').on('click', function (e) {
            e.preventDefault();
            $('.wap_scenario_tab .swiper-slide .scenario_item').removeClass('scenario_current');
            $('.wap_scenario_tab .swiper-slide').eq($(this).index()).find('.scenario_item').addClass('scenario_current');
            that.ScenarioTab.slideTo($(this).index());
        });

        //解决方案-功能与优势

        $('.features_item_box').hover(function () {
            $('.features_item_box').eq($(this).index()).addClass('features_item_current').siblings().removeClass('features_item_current');
            $('.features_life_min').eq($(this).index()).addClass('features_life_current').siblings().removeClass('features_life_current');
        });

        //企业文化-点击
        $('.culture_click_box .culture_tit_after').css({
            width: $('.culture_click_box .culture_item').eq(0).width()
        });
        $('.culture_click_box .culture_item').on('click', function (e) {
            e.preventDefault();
            $('.culture_click_box .culture_item').eq($(this).index()).addClass('culture_current').siblings().removeClass('culture_current');
            that.CultureTab.slideTo($(this).index());
            $('.culture_click_box .culture_tit_after').css({
                width: $('.culture_click_box .culture_item').eq($(this).index()).width(),
                left: $('.culture_click_box .culture_item').eq($(this).index()).position().left
            });
        });

        //工作氛围-点击
        $('.atmosphere_click_box .culture_tit_after').css({
            width: $('.atmosphere_click_box .culture_item').eq(0).width()
        });
        $('.atmosphere_item').eq(0).addClass('atmosphere_current');
        $('.atmosphere_click_box .culture_item').on('click', function (e) {
            e.preventDefault();
            $('.atmosphere_click_box .culture_item').eq($(this).index()).addClass('culture_current').siblings().removeClass('culture_current');
            $('.atmosphere_item').removeClass('atmosphere_current');
            $('.atmosphere_item').eq($(this).index()).addClass('atmosphere_current');
            $('.atmosphere_click_box .culture_tit_after').css({
                width: $('.atmosphere_click_box .culture_item').eq($(this).index()).width(),
                left: $('.atmosphere_click_box .culture_item').eq($(this).index()).position().left
            });
        });

        //员工福利-点击
        $('.welfare_click_box .culture_tit_after').css({
            width: $('.welfare_click_box .culture_item').eq(0).width()
        });
        $('.welfare_click_box .culture_item').on('click', function (e) {
            e.preventDefault();
            $('.welfare_click_box .culture_item').eq($(this).index()).addClass('culture_current').siblings().removeClass('culture_current');
            $('.welfare_click_box .culture_tit_after').css({
                width: $('.welfare_click_box .culture_item').eq($(this).index()).width(),
                left: $('.welfare_click_box .culture_item').eq($(this).index()).position().left
            });
        });


        //平台优势
        $('.plat_pagination_tab .swiper-slide').on('click', function (e) {
            e.preventDefault();
            that.AdvantageTab.slideTo($(this).index());
            $('.plat_pagination_tab .swiper-slide .plat_pagination_item').removeClass('plat_pagination_current');
            $('.plat_pagination_tab .swiper-slide').eq($(this).index()).find('.plat_pagination_item').addClass('plat_pagination_current');
        });


        //新闻内页导航
        var NewsPublic = $('.header_page_active .header_nav_item');
        for (var i = 0; i < NewsPublic.length; i++) {
            NewsPublic.eq(i).find('a').attr('data-number', i)
        }
        $('.header_page_active .header_nav_item a').hover(function (e) {
            console.log($(this).attr('data-number'));
            $('.news_nav_item_box').stop().slideUp(600).removeClass('news_nav_item_active');
            $('.news_nav_item_box').eq($(this).attr('data-number')).stop().slideDown(600).addClass('news_nav_item_active');
        });
        //首页底部分公司
        $('.footer_address_item').on('click', function () {
            $('.company_pop_wrap').addClass('company_pop_active');
            $('.company_pop_item').eq($(this).index()).addClass('company_pop_current');
        });
        $('.company_pop_close').on('click', function (e) {
            e.preventDefault();
            $('.company_pop_wrap').removeClass('company_pop_active');
            $('.company_pop_item').removeClass('company_pop_current');
        });


        //移动端首页解决方案
        $('.wap_title_item').on('click', function (e) {
            e.preventDefault();
            $('.wap_title_item').eq($(this).index()).addClass('wap_title_current').siblings().removeClass('wap_title_current');
            that.WapFaqBackTab.slideTo($(this).index());
            that.WapFaqContentTab.slideTo($(this).index());
        });

    },
    joinPage: function () {
        //加入云天-招聘
        var item = $('.society_item_box');
        for (var i = 0; i < item.length; i++) {
            item.eq(i).attr('data-height', item.eq(i).find('.society_item_detail').height());
        }
        item.eq(0).addClass('society_item_current');
        item.eq(0).find('.society_item_content').css({
            height: item.eq(0).attr('data-height')
        });
        $('.society_item_head').on('click', function (e) {
            e.preventDefault();
            if ($(this).parents('.society_item_box').hasClass('society_item_current')) {
                $(this).parents('.society_item_box').removeClass('society_item_current');
                $(this).parents('.society_item_box').find('.society_item_content').css({
                    height: 0
                });
            } else {
                $(this).parents('.society_item_box').addClass('society_item_current');
                $(this).parents('.society_item_box').find('.society_item_content').css({
                    height: $(this).parents('.society_item_box').attr('data-height')
                });
            }
        })
    },
    //关于我们使命
    Mission: function () {
        var that = this;
        var Item = $('.about_head_item');
        for (var i = 0; i < Item.length; i++) {
            Item.eq(i).attr('data-height', Item.eq(i).find('.about_item_height').height());
        }
        Item.hover(function () {
            Item.eq($(this).index()).addClass('about_item_current').siblings().removeClass('about_item_current');
            Item.eq($(this).index()).siblings().find('.about_item_read').css({
                height: 0
            });
            Item.eq($(this).index()).find('.about_item_read').css({
                height: Item.eq($(this).index()).find('.about_item_height').height()
            });

        });

    },
    //移动端导航
    WapNavBox: function () {
        if ($('.wap_nav_menu').length > 0) {
            $('.wap_nav_menu').menu();
        }
    },
    //移动端核心技术
    WapCoreSwiper: function () {
        var that = this;
        if (that.Width < 1200) {
            that.WapCoreTab = new Swiper(".wap_core_tab", {
                slidesPerView: "auto",
                spaceBetween: 0,

            });
        }

        $('.wap_core_tab .swiper-slide').on('click', function (e) {
            e.preventDefault();
            that.WapCoreTab.slideTo($(this).index());
            that.CorPlatTab.slideTo($(this).index());
        })
    },
    //移动端算法平台
    WapPlatformSwiper: function () {
        var that = this;
        if (that.Width < 1200) {
            that.WapPlatformTab = new Swiper(".core_wap_tab", {
                speed: 600,
                pagination: {
                    el: ".core_wap_pagination",
                    clickable: true,
                },
            });
        }

    },
    WapPlatIconSwiper: function () {
        var that = this;
        // if (that.Width < 1200) {
        //     that.WapPlatIconTab = new Swiper(".wap_plat_icon_tab", {
        //         speed: 600,
        //         pagination: {
        //             el: ".wap_plat_icon_pagination",
        //             clickable: true,
        //         },
        //     });
        // }

    },
    WapScenarioSwiper: function () {
        var that = this;
        that.WapScenarioTab = new Swiper(".wap_scenario_tab", {
            speed: 600,
            slidesPerView: "auto",
            centerInsufficientSlides: true,
            // pagination: {
            //     el: ".wap_plat_icon_pagination",
            //     clickable: true,
            // },
        });
    },
    WapPlatPaginationSwiper: function () {
        var that = this;
        that.WapPlatPaginationTab = new Swiper(".plat_pagination_tab", {
            speed: 600,
            slidesPerView: "auto",
            centerInsufficientSlides: true,
            // pagination: {
            //     el: ".wap_plat_icon_pagination",
            //     clickable: true,
            // },
        });
    },
    WapFaqBackSwiper: function () {
        var that = this;
        that.WapFaqBackTab = new Swiper(".wap_faq_back_tab", {
            speed: 600,
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: false,
            loopAdditionalSlides: 0,
        });
    },
    WapFaqContentSwiper: function () {
        var that = this;
        that.WapFaqContentTab = new Swiper(".wap_faq_content_tab", {
            speed: 600,
            //禁止滑动时swiper移动
            followFinger: true,
            //禁止手指滑动
            allowTouchMove: false,
            loopAdditionalSlides: 0,
        });
    },
    AtmosphereContentSwiper: function () {
        var that = this;
        if (that.Width < 1200) {
            that.AtmosphereContentTab = new Swiper(".atmosphere_content_tab", {
                speed: 600,
                pagination: {
                    el: ".atmosphere_pagination",
                    clickable: true,
                },
            });
        }
    },
    //解决方案box
    PlatBack: function () {
        if ($('.plat_back').height() < $('.plat_content').height()) {
            $('.plat_back').addClass('plat_min_height');
            $('.plat_back').css({
                height: $('.plat_content').height()
            })
        }
        if ($('.about_development_back').height() < $('.about_development_box').height()) {
            $('.about_development_back').addClass('plat_min_height');
            $('.about_development_back').css({
                height: $('.about_development_box').height()
            })
        }
    },
    //芯片平台
    ChipBox: function () {
        $('.chip_line_max').attr('data-height', $('.chip_line_back').height());
        $('.chip_line_max').css({
            height: $('.chip_line_max').attr('data-height')
        });
    },
    //EventKey: "ontouchstart" in document.documentElement ? "touchstart" : "click",
    Init: function () {
        var that = this;

        that.AnimatePjax();

    },
    indexInit: function () {
        var that = this;
        that.BannerIF = true;
        that.NumberIf = true;
        $('.index_banner_swiper .swiper-slide-active').removeClass('index_animate_active index_animate_load index_animate_end');
        $('.index_canvas').removeClass('index_canvas_active');
        $('.index_banner_line').removeClass('index_line_init');
        $('.header_wrap').removeClass('header_current');
        $('.index_btn_box').removeClass('index_btn_init');
        setTimeout(function () {
            that.Scrollbar();
            that.DevelopScrollbar();
            that.maoAnimate();
            that.BannerAnimate();
            $('.index_banner_swiper .swiper-slide').removeClass('index_animate_remove');
            $('.header_wrap').addClass('header_current');
            $('.index_canvas').addClass('index_canvas_active');
            $('.cursor_banner_wrap').addClass('cursor_banner_current');
            that.BannerText();
            that.partnerSwiper();
            that.AddressSwiper();
            that.navHover();
            that.WapNav();
            that.indexSwiper();
            that.CorPlatSwiper();
            that.Mission();
            that.SocialSwiper();
            that.DevelopmentSwiper();
            that.ScenarioSwiper();
            that.CultureSwiper();
            that.intel_swiper();
            that.WelfareSwiper();
            that.FamilySwiper();
            that.AdvantageSwiper();
            that.joinPage();
            that.FormPop();
            that.VideoPlay();
            that.WapNavBox();
            that.WapCoreSwiper();
            that.PlatBack();
            that.WapPlatformSwiper();
            that.WapPlatIconSwiper();
            that.WapPlatPaginationSwiper();
            that.WapScenarioSwiper();
            that.WapFaqBackSwiper();
            that.WapFaqContentSwiper();
            that.AtmosphereContentSwiper();
            that.AddEventList();

        }, 50);
        setTimeout(function () {
            that.BannerSwiper();
            $('.index_banner_swiper .swiper-slide-active').addClass('index_animate_active');
            // that.BannerCanvas();
        }, 600);
        setTimeout(function () {
            $('.index_btn_box').addClass('index_btn_init');
            $('.index_banner_line').addClass('index_line_init');
        }, 1000);

    },
};

$(function () {
    IqwXiongJs.Init();
    IqwXiongJs.CursorFollow();

});

