<template>
    <div class="container-fluid position-relative pb-5 pb-md-0">
            <!-- 背景 -->
            <div class="row container-fluid">
                <div class="col-12 col-lg-6 doneBg position-absolute no-p15">
                    <div class="bannerOpacity"></div>
                </div>
            </div>
            <!-- 文字 -->
            <div class="container done d-flex align-items-center justify-content-center justify-content-lg-start">
                <div class="doneText col-12 col-sm-6 no-p15 z-5">
                    <h2 class="noto text-main mb-3">結帳完成！</h2>
                    <h5 class="noto text-white mb-3 mb-lg-4">我們已收到訂單，誠摯感謝您的訂購。<br>廚房會盡快出餐，請您耐心等候。</h5>
                    <router-link to="/products" class="btn btn-main rounded-0 pt-2 pb-2 noto">繼續購物</router-link>
                </div>
            </div>
    </div>
</template>
